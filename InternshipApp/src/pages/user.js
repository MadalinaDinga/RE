import React from "react";
import createHistory from 'history/createBrowserHistory'

export class User extends React.Component {
    onNavigateHome() {
        createHistory.push("/home");
    }

    render() {
        return (
            <div>
                <h3>The User Page</h3>
                <p>User ID: {this.props.params.id}</p>
                <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>
            </div>
        );
    }
}
