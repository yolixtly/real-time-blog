import { API, graphqlOperation } from 'aws-amplify';
import React, { Component } from 'react';
import { deletePost } from '../graphql/mutations';

class DeletePost extends Component {
    handleDeletePost = async (postId) => {
        const input = {
            id: postId
        }

        await API.graphql(graphqlOperation(deletePost, { input }));
    }

    render() {
        return (
            <button onClick={() => { this.handleDeletePost(this.props.postId) }}>Delete</button>
        )
    }
}

export default DeletePost;
