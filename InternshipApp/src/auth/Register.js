import React, {Component} from 'react'
import {registerUser} from './authUtils'

export default class Register extends Component {
    state = {registerError: null};

    setErrorMsg(error) {
        this.setState({
            registerError: error
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        registerUser(this.email.value, this.pw.value)
            .catch(e => this.setErrorMsg(e.message))
    };

    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3 login-register">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" ref={(email) => this.email = email} placeholder="Your Email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Your Password"
                               ref={(pw) => this.pw = pw}/>
                    </div>
                    {
                        this.state.registerError &&
                        <div className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
                            <span className="sr-only">Error:</span>
                            &nbsp;{this.state.registerError}
                        </div>
                    }
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        )
    }
}
