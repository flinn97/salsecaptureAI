import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';
import { Timestamp } from "firebase/firestore";

class SequencePopupCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
    }

    render() {
        const { obj } = this.props;
        let sequence = obj.getJson();
        return (
            <div className="sequence">
            <div onClick={()=>{
            debugger
            let obj = this.props.obj
            
            let contacts = this.propsState.selectedContacts;
            let step1 = this.componentList.getList("step", [obj.getJson()._id, 0], ["sequenceId", "step"])[0];
            if(contacts?.length>0){
              let delay = parseFloat(step1.getJson().nextSend)
              let nextSend = new Date(Date.now() + delay * 60 * 60 * 1000);
              nextSend = Timestamp.fromDate(nextSend)
              for(let c of contacts){
                c.setCompState({sequenceId:obj.getJson()._id, finished:false, emailNumber:0, nextSend: nextSend}, {run:true})
              }
              this.dispatch({popupSwitch:"", selectedContacts:[]})
            }
           }} className="title">
                <div className="title-left">
                    {sequence.name}
                </div>
    
                
    
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

export default SequencePopupCustomItem;
