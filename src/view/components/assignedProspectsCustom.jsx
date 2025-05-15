import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';
import stripHTML from '../../service/heDecoderService';

class AssignedProspectsCustom extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            plainText: "", // Store the stripped text
          };
    }

   

    render() {
        
        return (
            <div>
                                                <b>{this.props.obj.getJson().firstName}</b>
                                                <div>{this.props.obj.getJson().finished?"Finished":"Active"}</div>

            </div>
                        

        );
    }
}

export default AssignedProspectsCustom;
