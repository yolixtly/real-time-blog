import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { Component } from 'react';
import { createComment } from '../graphql/mutations';

class CommentPost extends Component {
    render() {
        const {
            content,
            commentOwnerUsername,
            createdAt
        } = this.props.commentData;
        return (
            <div className="comment">
                <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
                    {"Commment by: "} {commentOwnerUsername}
                    {" on "}
                    <time style={{ fontStyle: "italic" }}>
                        {" "}
                        {new Date(createdAt).toDateString()}

                    </time>
                </span>
                <p> {content}</p>

            </div>
        )
    }
}

export default CommentPost;
