import React, {Component} from 'react';
import GoogleMap from './GoogleMap';

export default class Map extends Component {
    render() {
      return (
        <div className="container">
          <div className="row justify-content-md-center">
            <GoogleMap />
          </div>
        </div>
      );
  }
}
