import React, {Component} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/main.css'

import 'react-notifications/lib/notifications.css'

import {Route, BrowserRouter, Link, Redirect, Switch} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Home from './components/Home'

import AddObjective from './components/objectives/AddObjective'

import Map from './components/map/Map'
import {isAuthenticated, logout} from './auth/authUtils'
import {firebaseAuth} from './config/constants'

import EditObjective from "./components/objectives/EditObjective";
import ObjectiveDP from "./components/objectives/ObjectiveDetailPage";
import {isCompany} from "./components/api/UserService";

function PrivateRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}

function PublicRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === false
                ? <Component {...props} />
                : <Redirect to='/'/>}
        />
    )
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

export default class App extends Component {
    state = {
        isAuth: false,
        loading: true,
        isCompany: false
    };

    componentDidMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    isAuth: true,
                    loading: false,
                });

                this.setState({
                    isCompany: isCompany(isAuthenticated())
                });
            } else {
                this.setState({
                    isAuth: false,
                    loading: false
                })
            }
        })
    }

    componentWillUnmount() {
        this.removeListener()
    }

    render() {
        return this.state.loading === true ? <h1>Loading...</h1> : (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-default navbar-static-top">
                        <div className="container">
                            <div className="navbar-header">
                                <Link to="/" className="navbar-brand">Internship Advisor</Link>
                            </div>
                            <ul className="nav navbar-nav pull-right">
                                <li>
                                    <Link to="/" className="navbar-brand">Home</Link>
                                </li>
                                <li>
                                    <Link to="/map" className="navbar-brand">Map</Link>
                                </li>
                                <li>
                                    {this.state.isAuth
                                        ?
                        <span>
                            {this.state.isCompany ? <Link to="/dashboard" className="navbar-brand">Dashboard</Link> : null}
                              <button
                                  style={{border: 'none', background: 'transparent'}}
                                  onClick={() => {
                                      logout()
                                  }}
                                  className="navbar-brand">Logout</button>
                       </span>
                                        :
                        <span>
                            <Link to="/login" className="navbar-brand">Login</Link>
                            <Link to="/register" className="navbar-brand">Register</Link>
                        </span>}
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="container">
                        <div className="row">
                            <Switch>
                                {/*<Route path='/' exact component={Home} />*/}
                                <PropsRoute path='/' exact component={Home} authed={this.state.isAuth} isCompany = {this.state.isCompany}/>
                                <PropsRoute authed={this.state.isAuth} path='/map' exact component={Map}/>
                                <PublicRoute authed={this.state.isAuth} path='/login' component={Login}/>
                                <PublicRoute authed={this.state.isAuth} path='/register' component={Register}/>
                                <PrivateRoute authed={this.state.isAuth} path='/dashboard' component={AddObjective}/>
                                <PrivateRoute authed={this.state.isAuth} path='/objectives/:id'
                                              component={EditObjective}/>
                                <PrivateRoute authed={this.state.isAuth} path='/objective/:id' component={ObjectiveDP}/>
                                <Route render={() => <h3>No Match</h3>}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
