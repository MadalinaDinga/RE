import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import * as ReactDOMServer from "react-dom/lib/ReactDOMServer";

const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler',
};

const djsConfig = {
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview dz-file-preview">
            <div className="dz-details">
                <div className="dz-filename"><span data-dz-name="true"></span></div>
                <img data-dz-thumbnail="true" alt="Unavailable image"/>
                <img data-dz-thumbnail="true" alt="Unavailable"/>
            </div>
            <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
            <div className="dz-success-mark"><span>✔</span></div>
            <div className="dz-error-mark"><span>✘</span></div>
            <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
        </div>
    )
};


const eventHandlers = {
    // This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: null,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecomplete: null
};

const callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    }
];

const simpleCallBack = function () {
    console.log('I\'m a simple callback');
};

export default class AddRemoveImages extends Component {
    constructor(props){
        super(props);
        this.state = {
            key: ''
        }
    }

    componentDidMount(){
        this.setState({
            key: this.props.id,
            addedfile: simpleCallBack,
            drop: callbackArray,
        })
    }

    render(){
        return(

            <DropzoneComponent config={componentConfig}
                               eventHandlers={eventHandlers}
                               djsConfig={djsConfig} />

        )
    }
}
