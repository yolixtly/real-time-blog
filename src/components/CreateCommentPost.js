import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { Component } from 'react';
import { createComment } from '../graphql/mutations';

class CreateCommentPost extends Component {
    state = {
        commentOwnerId: "",
        commnetOwnerUserName: "",
        content: ""
    }

    componentDidMount = async () => {
        await Auth.currentUserInfo()
            .then(user => {
                this.setState({
                    commentOwnerId: user.attributes.sub,
                    commentOwnerUsername: user.username
                });
            })
    }

    handleChangeContent = event => {
        this.setState({
            content: event.target.value
        })
    }

    handleComment = async (event) => {
        event.preventDefault();
        const input = {
            commentPostId: this.props.postId,
            commentOwnerId: this.state.commentOwnerId,
            commentOwnerUsername: this.state.commentOwnerUsername,
            content: this.state.content,
            createdAt: new Date().toISOString()
        }

        await API.graphql(graphqlOperation(createComment, { input }));

        this.setState({
            content: ""
        });
    }

    render() {
        return (
            <div>
                <form className="add-comment"
                    onSubmit={this.handleComment}>
                    <textarea
                        name="content"
                        type="text"
                        cols="40"
                        rows="3"
                        placeholder="Add your Comment..."
                        value={this.state.content}
                        onChange={this.handleChangeContent} />

                    <input
                        type="submit"
                        className="btn"
                        style={{ fontSize: '19px' }}
                        placeholder="Add Comment"
                    />
                </form>
            </div>
        )
    }
}

export default CreateCommentPost;
