import React, {Component} from 'react';
import firebase from '../config/constants';
import 'bootstrap/dist/css/bootstrap.css';
import GoogleMap from './map/GoogleMap';
import {auth, getUid} from "../helpers/auth";
import {addToVisit, isToVisit, removeToVisit} from "./service/UserService";

export default class ObjectiveDP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oid: 0,
            id: 0,
            name: '',
            address: '',
            description: '',
            profile_image: '',
            tag_string: '',
            location: '',
            note: 0,
            start: '',
            end: '',
            isToVisit: false,
            authed: false
        }
        this._addToVisit = this._addToVisit.bind(this);
        this._removeToVisit = this._removeToVisit.bind(this);
    }

    componentDidMount() {
        this.setState({
            authed: getUid()
        })

        firebase.database().ref('items').child(this.props.match.params.id).once('value').then((snapshot) => {
                let item = snapshot.val();
            var res = isToVisit(getUid(),snapshot.key);
                this.setState({
                    oid: snapshot.key,
                    item: item.id,
                    id: item,
                    name:
                    item.name,
                    description:
                    item.description,
                    location:
                    item.location,
                    address:
                    item.address,
                    tag_string:
                    item.tag_string,
                    note:
                    item.note,
                    profile_image:
                    item.profile_image,
                    start:
                    item.start_date,
                    end:
                    item.end_date,
                    image:
                    item.profile_image,
                    isToVisit: res
                })
            }
        )

    }

    getdate(date) {
        var temp = date.split('-');
        var year = temp[0];
        var month = temp[1];

        var day = String(temp[2]).split('T')[0];
        var time = String(temp[2]).split('T')[1];

        return day + '/' + month + '/' + year + ' ' + time;
    }

    _addToVisit(){
        addToVisit(this.state.authed,this.state.oid)
        this.setState({
            isToVisit: true
        })
    }

    _removeToVisit(){
        removeToVisit(this.state.authed,this.state.oid)
        this.setState({
            isToVisit: false
        })
    }

    render() {

        if (this.state.start != undefined)
            return (
                <div>
                    <div className="row login-register pdetails" style={divStyle}>
                        <div className="col-sm-2 col-md-2">
                            <img className="img-rounded" alt="" src={this.state.profile_image}/>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <h3>{this.state.name}</h3>
                            <p><span>Address:</span> {this.state.address}</p>
                            <p><span>Tag:</span> {this.state.tag_string}</p>
                            <p><span>Date: </span>{this.getdate(this.state.start)} - {this.getdate(this.state.end)}</p>
                            <p><span>Note:</span> {this.state.note}</p>
                        </div>
                    </div>
                    <div className="row login-register pdetails" style={divStyle}>
                        <p className="pdtitle">Description:</p>
                        <p>{this.state.description}</p>
                    </div>
                    {this.state.authed != false ? (
                        <div className="pbutton">
                            {
                                !this.state.isToVisit ?
                                <button type="submit" onClick={this._addToVisit} className="btn btn-primary">Add</button> :
                                <button type="submit" onClick={this._removeToVisit} className="btn btn-primary">Remove</button>
                            }
                        </div>
                    ): null}
                </div>
            );
        else
            return (
                <div>
                    <div className="row login-register pdetails" style={divStyle}>
                        <div className="col-sm-2 col-md-2">
                            <img className="img-rounded" alt="" src={this.state.profile_image}/>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <h3>{this.state.name}</h3>
                            <p><span>Address:</span> {this.state.address}</p>
                            <p><span>Tag:</span> {this.state.tag_string}</p>
                            <p><span>Note:</span> {this.state.note}</p>
                        </div>
                    </div>
                    <div className="row login-register pdetails" style={divStyle}>
                        <p className="pdtitle">Description:</p>
                        <p>{this.state.description}</p>
                    </div>
                    {this.state.authed != false ? (
                        <div className="pbutton">
                            {
                                !this.state.isToVisit ?
                                    <button type="submit" onClick={this._addToVisit} className="btn btn-primary">Add</button> :
                                    <button type="submit" onClick={this._removeToVisit} className="btn btn-primary">Remove</button>
                            }
                        </div>
                    ): null}
                </div>
            );
    }
}
var divStyle = {
    background: '#C0C0C0',
    margin: '10px',
    borderRadius: 10,
    top: '50%',
    bottom: '50%'
}
var notes = {
    color: "green"
}
var map = {
    height: '170px'
}
