import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';
import stripHTML from '../../service/heDecoderService';

class StepCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            plainText: "", // Store the stripped text
          };
    }

    componentDidMount() {
        const body = this.props.obj?.getJson().content;
        const plainText = stripHTML(body);
        this.setState({ plainText });
      }

    componentDidUpdate(prevProps) {
        const currentBody = this.props.obj?.getJson().content;
        const prevBody = this.props.obj?.getJson().content;
        if (currentBody !== prevBody) {
          const plainText = stripHTML(currentBody);
          this.setState({ plainText });
        }
    }

    render() {
        
        return (
            <div onClick={()=>{this.dispatch({popupSwitch:"updateStep", currentPopupComponent:this.props.obj})}}>
                        <div className="icon-row">
                            <div className="icon-container">
                                <div className="col">

                                    <div className="icon" style={{cursor:"pointer"}}>
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
                                   {this.state.plainText}
                                </span>
                            </div>
                        </div>
            </div>
                        

        );
    }
}

export default StepCustomItem;
