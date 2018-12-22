import React, {Component} from 'react'
import {login, resetPassword} from './authUtils'

export default class Login extends Component {
    state = {loginMessage: null};

    setErrorMsg(error) {
        this.setState({
            loginMessage: error
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        login(this.email.value, this.pw.value)
            .catch(() => {
                this.setErrorMsg('Invalid username/password.')
            })
    };

    resetPassword = () => {
        resetPassword(this.email.value)
            .then(() => this.setErrorMsg(`Password reset email sent to ${this.email.value}.`))
            .catch((error) => this.setErrorMsg(`Email address not found.`))
    };

    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3 login-register">
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" ref={(email) => this.email = email} placeholder="Your Email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Your Password"
                               ref={(pw) => this.pw = pw}/>
                    </div>
                    {
                        this.state.loginMessage &&
                        <div className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
                            <span className="sr-only">Error:</span>
                            &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword}
                                                               className="alert-link">Forgot Password?</a>
                        </div>
                    }
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}
