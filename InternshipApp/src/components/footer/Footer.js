import React, {Component} from 'react';
import './Footer.css';

class FooterInfo extends Component {
    render(){
        return(
            <div className="footer-info">
                <br/>
                <p>ClujTourist V1.0</p>
                <p>Copyright © 2017 ClujTourist</p>
            </div>
        )
    }
}

class Footer extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row footer-container">
                       <FooterInfo/>
                </div>
            </div>
        )
    }
}

export default Footer;