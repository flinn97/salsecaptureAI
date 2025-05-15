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

    getText(obj) {
        let text = "Active";
        if (obj.getJson().finished) {
            text = "Finished"
            if (obj.getJson().bounced) {
                text = "bounced"
            }
            if (obj.getJson().replied) {
                text = "replied"
            }
        }
        return text
    }



    render() {

        return (
            <div>
                <b>{this.props.obj.getJson().firstName}</b>
                <div>{this.getText(this.props.obj)}</div>
                {!this.props.obj.getJson().finished &&
                    <div
                        onClick={() => {
                            this.props.obj.setCompState({ finished: true })
                            this.props.obj.update();
                            let sequence = this.propsState.currentSequence;
                            let finished = parseInt(sequence.getJson().finished) + 1;
                            sequence.setCompState({ finished: finished });
                            sequence.update();
                        }}

                        className="dark-button-1"
                        style={{
                            position: "relative",
                            width: "fit-content",
                        }}
                    >
                        Remove From Sequence
                    </div>}

            </div>


        );
    }
}

export default AssignedProspectsCustom;
