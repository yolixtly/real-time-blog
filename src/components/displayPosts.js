import React, { Component } from 'react';
import { listPosts } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

class DisplayPost extends Component {
    componentDidMount = async () => {
        this.getPosts();
    }

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts))

        console.log(`All Posts: ${JSON.stringify(result.data.listPosts.items)}`)
        console.log(result.data.listPosts.items)
    }
    render() {
        return (
            <div className="App">
                Hello World
            </div>
        )
    }
}

export default DisplayPost;
