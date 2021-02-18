import React, { Component } from 'react';
import { listPosts } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import { onCreatePost, onDeletePost, onUpdatePost } from '../graphql/subscriptions';
class DisplayPost extends Component {
    state = {
        posts: []
    }
    componentDidMount = async () => {
        // Load Initial data from source
        this.getPosts();

        // Subscribe to Additions in data
        this.createPostListener = API.graphql(graphqlOperation(onCreatePost))
            .subscribe({
                next: postData => {
                    const newPost = postData.value.data.onCreatePost
                    const prevPosts = this.state.posts.filter(post => post.id !== newPost.id)

                    const updatedPosts = [newPost, ...prevPosts]

                    this.setState({ posts: updatedPosts })
                }
            })

        // Subscribe to deletes in data
        this.deletePostListener = API.graphql(graphqlOperation(onDeletePost))
            .subscribe({
                next: postData => {
                    const deletedPost = postData.value.data.onDeletePost
                    const updatedPosts = this.state.posts.filter(post => post.id !== deletedPost.id)
                    this.setState({ posts: updatedPosts })
                }
            });

        // Subscribe to Updates in data
        this.updatePostListener = API.graphql(graphqlOperation(onUpdatePost))
            .subscribe({
                next: postData => {
                    const { posts } = this.state
                    const updatePost = postData.value.data.onUpdatePost
                    const index = posts.findIndex(post => post.id === updatePost.id) //had forgotten to say updatePost.id!
                    const updatePosts = [
                        ...posts.slice(0, index),
                        updatePost,
                        ...posts.slice(index + 1)
                    ]

                    this.setState({ posts: updatePosts })

                }
            });
    }

    componentWillUnmount() {
        this.createPostListener.unsubscribe();
        this.deletePostListener.unsubscribe();
        this.updatePostListener.unsubscribe();
    }

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts))

        this.setState({
            posts: result.data.listPosts.items
        });
    }
    render() {
        const { posts } = this.state;
        return posts.map((post) => {
            return (
                <div key={post.id} className="posts" style={rowStyle}>
                    <h1>{post.postTitle}</h1>
                    <h4>
                        {post.postBody}
                    </h4>
                    <span>
                        <time style={{ fontStyle: "italic", color: "#0ca5e297" }}>
                            {"Wrote by: "} {post.postOwnerUsername}
                            {" on "}
                            {" "}
                            {new Date(post.createdAt).toDateString()}
                        </time>
                    </span>
                    <br />
                    <span>
                        <DeletePost postId={post.id} />
                        <EditPost {...post} />
                    </span>
                </div >
            )
        })
    }
}

const rowStyle = {
    background: '#f4f4f4',
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px'
}

export default DisplayPost;
