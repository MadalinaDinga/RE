import React, {Component} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import AddRemoveImages from "../images/AddRemoveImages";
import ServiceObjective from './ServiceObjective';
import firebase from '../../config/constants';

export default class ObjectiveDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.match.params.id,
            itemRef: this.props.ref,
            name: this.props.name,
            description: this.props.description,
            lan: this.props.lan, // coordoante epntru googlemaps
            lon: this.props.lon,
            address: this.props.adress, // adresa
            tag_string: this.props.tag_string,// utilizat pentru filtrare de exmplu #bar#nightlife#obiective sau #concerct#event
            note: this.props.note, //nota de la 1 la 5, default 0
            profile_image: this.props.profile_image,// web link catre imagine
            start_date: this.props.start_date,
            end_date: this.props.end_date,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }



    render() {
        return (<div className="row">
            <NotificationContainer className="alert alert-success"/>
            <h1>Edit {this.state.name}</h1>
            <img src={this.state.image} alt="" className="img-rounded img-responsive" />
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Name"
                           onChange={this.handleChange} value={this.state.name}/>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" className="form-control" name="profile_image" placeholder="Profile Image"
                           onChange={this.handleChange} value={this.state.profile_image}/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="5" name="description" value={this.state.description}
                              onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <textarea className="form-control" name="location" value={this.state.location}
                              onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea className="form-control" name="address" value={this.state.address}
                              onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label> Tags</label>
                    <textarea className="form-control" name="tag_string" value={this.state.tag_string}
                              onChange={this.handleChange}/>
                </div>
                <div className="form-group"
                     style={{visibility: this.state.start_date !== undefined ? 'visible' : 'hidden'}}>
                    <label>Start Date</label>
                    <input type="datetime-local" className="form-control" name="start_date"
                           value={this.state.start_date} onChange={this.handleChange}/>
                </div>
                <div className="form-group"
                     style={{visibility: this.state.end_date !== undefined ? 'visible' : 'hidden'}}>
                    <label>End Date</label>
                    <input type="datetime-local" className="form-control" name="end_date" value={this.state.end_date}
                           onChange={this.handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Save changes</button>
            </form>
            <AddRemoveImages id={this.state.key}/>
        </div>)
    }
}
