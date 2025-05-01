import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';

class StepCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
    }

    render() {
        
        
        return (
            <div onClick={()=>{this.dispatch({popupSwitch:"updateStep", currentPopupComponent:this.props.obj})}}>
                        <div className="icon-row">
                            <div className="icon-container">
                                <div className="col">
                                    <div className="icon">

                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <div className="svg">
                                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                            <line
                                                x1="50%"
                                                y1="0"
                                                x2="50%"
                                                y2="50"
                                                stroke="var(--app-green)"
                                                strokeWidth="3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="message-container">
                                <b>{this.props.obj.getJson().subject}</b>
                                <br />
                                <span>
                                   {this.props.obj.getJson().content}
                                </span>
                            </div>
                        </div>
            </div>
                        

        );
    }
}

export default StepCustomItem;
