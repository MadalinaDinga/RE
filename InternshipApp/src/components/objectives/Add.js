import React, {Component} from 'react';
import ServiceObjective from './ServiceObjective';
import firebase from '../../config/constants';
import {NotificationContainer,NotificationManager} from "react-notifications";
import FileUploader from 'react-firebase-file-uploader';

export default class Add extends Component {
    constructor() {
        super();
        this.state = {
            baseTag: '#location',
            showButtonText: 'Event Menu Add',
            showButton: false,
            name: '',
            description: '',
            location: '', // coordoante epntru googlemaps
            address: '', // adresa
            tag_string: '',// utilizat pentru filtrare de exmplu #bar#nightlife#obiective sau #concerct#event
            note: 0, //nota de la 1 la 5, default 0
            profile_image: '',// web link catre imagine
            profile_image_url:'',
            start_date: '',
            end_date: '',
            isUploading: false,
            progress: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMenuChange = this.handleMenuChange.bind(this);

    }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
    }
    handleUploadSuccess = (filename) => {
      this.setState({profile_image: filename, progress: 100, isUploading: false});
      firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({profile_image_url: url}));
    };


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        var item;
        if (this.state.baseTag.trim() === '#location'.trim()) {
             item = {
                name: this.state.name,
                description: this.state.description,
                location: this.state.location,
                address: this.state.address,
                tag_string: this.state.baseTag + this.state.tag_string,
                note: this.state.note,
                profile_image: this.state.profile_image_url,
            }
            NotificationManager.success('Location saved', 'Success');
        }else{
            item = {
                name: this.state.name,
                description: this.state.description,
                location: this.state.location,
                address: this.state.address,
                tag_string: this.state.baseTag + this.state.tag_string,
                note: this.state.note,
                profile_image_: this.state.profile_image_url,
                start_date: this.state.start_date,
                end_date: this.state.start_date,
            }
            NotificationManager.success('Event saved', 'Success');
        }

        itemsRef.push(item);



        this.setState({
            name: '',
            description: '',
            location: '',
            address: '',
            tag_string: '',
            note: 0,
            profile_image: '',
            start_date: '',
            end_date: '',
        });
    }

    handleMenuChange(e) {
        this.setState({
            showButton: !this.state.showButton,
        });
        if (this.state.showButton === true) {
            this.setState({
                showButtonText: 'Event Menu Add',
                baseTag: '#location'
            })
        } else {
            this.setState({
                showButtonText: 'Location Menu Add',
                baseTag: '#event'
            })
        }
        console.log(this.state.showButton)
    }





    render() {
        return (
            <div className="row login-register">
                <NotificationContainer className="alert alert-success"/>
                <h1>Add to database</h1>
                <button onClick={this.handleMenuChange} className="btn btn-primary aadddb">{this.state.showButtonText}</button>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Name"
                               onChange={this.handleChange} value={this.state.name}/>
                    </div>

                    <div>
                    <form>
                    <label>Image:</label>
                    {this.state.isUploading &&
                      <p>Progress: {this.state.progress}</p>
                    }
                    {this.state.profile_image_url &&
                      <img src={this.state.profile_image_url} height="300px" width="300px"/>
                    }
                    <FileUploader
                      accept="image/*"
                      name="profile_image"
                      randomizeFilename
                      storageRef={firebase.storage().ref('images')}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}/>
                      </form>
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
                    <div className="form-group" style={{visibility: this.state.showButton ? 'visible' : 'hidden'}}>
                        <label> Start date</label>
                        <input className="form-control" type="datetime-local" name="start_date"
                               value={this.state.start_date} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group" style={{visibility: this.state.showButton ? 'visible' : 'hidden'}}>
                        <label> End date</label>
                        <input className="form-control" type="datetime-local" name="end_date"
                               value={this.state.end_date} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        );
    }
}
