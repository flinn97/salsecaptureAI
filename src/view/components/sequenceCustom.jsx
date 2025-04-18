import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';

class SequenceCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
    }

    render() {
        const { obj } = this.props;
        let sequence = obj.getJson();
        return (
            <div className="sequence">
            <div className="title">
                <Link to={"/sequence/"+sequence._id} onClick={()=>{this.dispatch({popupSwitch: "", currentPopupComponent: undefined })}} className="title-left">
                    {sequence.name}
                </Link>
    
                <Link to={"/sequence/"+sequence._id} onClick={()=>{this.dispatch({popupSwitch: "", currentPopupComponent: undefined })}}  className="title-right">
                    View Details
                </Link>
    
            </div>
            {/* <div className="row row-space-around">
                <div className="col">
                    <div>Active</div>
                    <div>455</div>
                </div>
                <div className="col">
                    <div>Completed</div>
                    <div>650</div>
                </div>
                <div className="col">
                    <div>Opened</div>
                    <div>4%</div>
                </div>
                <div className="col">
                    <div>Reply</div>
                    <div>1%</div>
                </div>
                <div className="col">
                    <div>Bounce</div>
                    <div>7%</div>
                </div>
            </div> */}
        </div>
        );
    }
}

export default SequenceCustomItem;
