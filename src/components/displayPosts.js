import React, { Component } from 'react';
import { listPosts } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import DeletePost from './DeletePost';
class DisplayPost extends Component {
    state = {
        posts: []
    }
    componentDidMount = async () => {
        this.getPosts();
    }

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts))

        this.setState({
            posts: result.data.listPosts.items
        })
        console.log(`All Posts: ${JSON.stringify(result.data.listPosts.items)}`)
        console.log(result.data.listPosts.items)
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
                        <DeletePost />
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
