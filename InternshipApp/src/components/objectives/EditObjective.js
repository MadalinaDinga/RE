import React, {Component} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import AddRemoveImages from "../images/AddRemoveImages";
import ServiceObjective from './ServiceObjective';
import firebase from '../../config/constants';
import FileUploader from 'react-firebase-file-uploader';

export default class EditObjective extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img:undefined,
            key: this.props.match.params.id,
            itemRef: firebase.database().ref('items').child(this.props.match.params.id),
            item: '',
            name: '',
            description: '',
            location: '', // coordoante epntru googlemaps
            address: '', // adresa
            tag_string: '',// utilizat pentru filtrare de exmplu #bar#nightlife#obiective sau #concerct#event
            note: 0, //nota de la 1 la 5, default 0
            profile_image: '',// web link catre imagine
            start_date: '',
            end_date: '',
            isUploading: false,
            progress: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            key: this.props.match.params.id,
        });
        this.state.itemRef.once('value')
            .then((snapshot) => {
                    let item = snapshot.val();
                    this.setState({
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
                        start_date:
                        item.start_date,
                        end_date:
                        item.end_date,
                        image:
                        item.profile_image
                    })
                }
            )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.start_date === undefined || this.state.end_date === undefined) {
            this.state.itemRef.update({
                "name": this.state.name,
                'description': this.state.description,
                'location': this.state.location,
                'address': this.state.address,
                'tag_string': this.state.tag_string,
                'note': this.state.note,
                'profile_image': this.state.profile_image
            });
        }else{
            this.state.itemRef.update({
                "name": this.state.name,
                'description': this.state.description,
                'location': this.state.location,
                'address': this.state.address,
                'tag_string': this.state.tag_string,
                'note': this.state.note,
                'profile_image': this.state.profile_image,
                'start_date': this.state.start_date,
                'end_date': this.state.end_date,
            });
        }
        NotificationManager.success('Update completed', 'Success');

    }


    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
    }
    handleUploadSuccess = (filename) => {
      this.setState({ progress: 100, isUploading: false});
      firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({profile_image: url}));
    };

    render() {
        return (<div className="row login-register objedit">
            <NotificationContainer className="alert alert-success"/>
            <h1>Edit {this.state.name}</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="Name"
                           onChange={this.handleChange} value={this.state.name}/>
                </div>
                <div className="form-group">
                    <img src={this.state.profile_image} height="300px" width="300px"/>
                    <div>
                    <form>
                    {this.state.isUploading &&
                      <p>Progress: {this.state.progress}</p>
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
                </div>
                <div className="form-group desc_form">
                    <textarea className="form-control" rows="5" name="description" value={this.state.description}
                              onChange={this.handleChange}/>
                </div>
                <div className="form-group desc_form">
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
