import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapDisplayObject from "./MapDisplayObject";
import firebase from '../../config/constants'
import 'bootstrap/dist/css/bootstrap.css';
import {isToVisit} from "../service/UserService";
import {getUid} from "../../helpers/auth";

const a = ({text}) => <div>{text}</div>;

class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: [],
            filter: 'events'
        };
        this._getLat = this._getLat.bind(this);
        this._getLng = this._getLng.bind(this);
        this._getStyle = this._getStyle.bind(this);
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('items');

        itemsRef.on('value', (snapshot) => {
            const items = snapshot.val();
            this.setState({
                items: Object.keys(items).map(id => ({id, ...items[id]}))
            })
        });
        this.setState({
            isLoading: false
        })
    }

    _getLat(coor) {
        return coor.split(',')[0]
    }

    _getLng(coor) {
        return coor.split(',')[1]
    }

    _getStyle(tag_string) {
        const K_WIDTH = 35;
        const K_HEIGHT = 35;

        const event = {
            zIndex: '10',
            width: '30px',
            height: '30px',
            borderRadius: '50% 50% 50% 0',
            background: '#ff8000',
            border: '1px solid black',
            position: 'absolute',
            transform: 'rotate(-45deg)',
            left: '50%',
            top: '50%',
            margin: '-20px 0 0 -20px',
            animationName: 'bounce',
            animationFillMode: 'both',
            animationDuration: '1s',

            width: K_WIDTH,
            height: K_HEIGHT,
            left: -K_WIDTH / 2,
            top: -K_HEIGHT / 2,
        };

        const location = {
            zIndex: '0',
            width: '30px',
            height: '30px',
            borderRadius: '50% 50% 50% 0',
            background: '#3f51b5',
            border: '1px solid black',
            position: 'absolute',
            transform: 'rotate(-45deg)',
            left: '50%',
            top: '50%',
            margin: '-20px 0 0 -20px',
            animationName: 'bounce',
            animationFillMode: 'both',
            animationDuration: '1s',

            width: K_WIDTH,
            height: K_HEIGHT,
            left: -K_WIDTH / 2,
            top: -K_HEIGHT / 2,
        };

        if(tag_string.indexOf('location')>=0){
            return location;
        }else{
            return event;
        }
    }

    changeFilter(value) {
        this.setState({
            filter: value
        })
    }

    renderFilter() {
        const {filter} = this.state

        return (
            <div className="btn-group" style={{marginBottom: 20}}>
                <button
                    className={'btn btn-default active'}
                    onClick={() => this.changeFilter('all')}
                >
                    All
                </button>
                <button
                    className={'btn btn-default active'}
                    onClick={() => this.changeFilter('events')}
                >
                    Events
                </button>
                <button
                    className={'btn btn-default active'}
                    onClick={() => this.changeFilter('locations')}
                >
                    Locations
                </button>
                {getUid()?
                <button
                    className={'btn btn-default active'}
                    onClick={() => this.changeFilter('wishlist')}
                >
                    Wishlist
                </button> : null
                }
            </div>
        )
    }

    render() {
        const K_SIZE = 40;
        let objectives;

        if (this.state.filter === 'all') {
            objectives = this.state.items.filter(item => item.location).map((item, index) => (
              <MapDisplayObject
                text={item.name}
                lat={this._getLat(item.location)}
                lng={this._getLng(item.location)}
                style={this._getStyle(item.tag_string)}
                id={item.id}
                image={item.profile_image}
                key={index}
              />
            ));
        }

        if (this.state.filter === 'events') {
            objectives = this.state.items.filter(item => item.start_date && item.location).map((item, index) => (
              <MapDisplayObject
                text={item.name}
                lat={this._getLat(item.location)}
                lng={this._getLng(item.location)}
                style={this._getStyle(item.tag_string)}
                id={item.id}
                image={item.profile_image}
                desc={item.description}
                key={index}
              />
            ));
        }

        if (this.state.filter === 'locations') {
            objectives = this.state.items.filter(item => !item.start_date && item.location).map((item, index) => (
              <MapDisplayObject
                text={item.name}
                lat={this._getLat(item.location)}
                lng={this._getLng(item.location)}
                style={this._getStyle(item.tag_string)}
                id={item.id}
                image={item.profile_image}
                desc={item.description}
                key={index}
              />
            ));
        }

        if (this.state.filter === 'wishlist') {
            objectives = this.state.items.filter(item => isToVisit(getUid(),item.id)).map((item, index) => (
                <MapDisplayObject
                    text={item.name}
                    lat={this._getLat(item.location)}
                    lng={this._getLng(item.location)}
                    style={this._getStyle(item.tag_string)}
                    id={item.id}
                    image={item.profile_image}
                    desc={item.description}
                    key={index}
                />
            ));
        }

        if (this.state.isLoading) {
            return (<div>
                <text>Loading...</text>
            </div>)
        } else
            return (
              <div>
                <div>
                  {this.renderFilter()}
                </div>
                <div>
                <GoogleMapReact
                    hoverDistance={K_SIZE / 2}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    style={{height: '300px', height: '20px', width: '20px'}}
                    center={[46.7712101, 23.623635299999933]}
                    zoom={13}
                >
                    {
                        objectives
                    }
                </GoogleMapReact>
                </div>
                </div>
              );
    }
}

GoogleMap.defaultProps = {
    center: {lat: 46.77, lng: 23.62},
    zoom: 150
};

export default GoogleMap;
