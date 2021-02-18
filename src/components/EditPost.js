import React, { Component } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { updatePost } from '../graphql/mutations';

class EditPost extends Component {

    state = {
        show: false,
        id: "",
        postOwnerId: "",
        postOwnerUsername: "",
        postTitle: "",
        postBody: "",
        postData: {
            postTitle: this.props.postTitle,
            postBody: this.props.postBody
        }
    }

    componentDidMount = async () => {
        await Auth.currentUserInfo()
            .then(user => {
                console.log('user is', user)
                this.setState({
                    postOwnerId: user.attributes.sub,
                    postOwnerUsername: user.username,
                });
            })
    }

    handleModal = () => {
        this.setState({
            show: !this.state.show
        });
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    handleChange = (event) => {
        this.setState({
            postData: {
                ...this.state.postData,
                [event.target.name]: event.target.value
            }
        })
    }

    handleUpdatePost = async (event) => {
        event.preventDefault();
        const input = {
            id: this.props.id,
            postOwnerId: this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postData.postTitle,
            postBody: this.state.postData.postBody
        };

        await API.graphql(graphqlOperation(updatePost, { input }));

        this.setState({
            show: !this.state.show
        });

    }
    render() {
        console.log(this.props)
        return (
            <>
                {
                    this.state.show && (
                        <div className="modal">
                            <button
                                className="close"
                                onClick={this.handleModal}
                            >
                                x
                            </button>

                            <form
                                className="add-post"
                                onSubmit={(event) => this.handleUpdatePost(event)}>

                                <input
                                    style={{ fontSize: "19px" }}
                                    type="text"
                                    name="postTitle"
                                    value={this.state.postData.postTitle}
                                    placeholder="Title"
                                    onChange={this.handleChange}
                                />

                                <input
                                    style={{ fontSize: "19px", height: "150px" }}
                                    type="text"
                                    name="postBody"
                                    value={this.state.postData.postBody}
                                    onChange={this.handleChange}
                                />

                                <button>Update Post</button>
                            </form>
                        </div>
                    )
                }


                <button
                    onClick={this.handleModal}>
                    Edit
            </button>
            </>
        )
    }
}

export default EditPost;
