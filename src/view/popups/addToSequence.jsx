/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
 import { Timestamp } from "firebase/firestore";
import { MapComponent, ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
 import {BaseComponent} from "flinntech";
 
 export default class AddToSequence extends BaseComponent{
     /**
      * Constructor for the OemPopupContent component.
      * @param {object} props - The component's properties.
      */
     constructor(props){
         super(props);
         this.state={
           ...this.state,
             defaultClass:"fit scroller", //Sets a default class for styling
         }
     }
     /**
      * Renders the OemPopupContent component.
      * @returns {JSX.Element} The rendered component.
      */
     render(){

   
         return(
         <div style={{padding:"10px", paddingBottom:"100px", height:"65%"}} className={this.props.pageClass||this.state.defaultClass}>
           <h2>Add to Sequence</h2> {/*Heading for the popup*/}
           contacts: {this.propsState.selectedContacts?.length||"0"} 
           <MapComponent name="sequence" cells={[{type:"attribute", name:"name", itemClick:(obj)=>{
            
            let contacts = this.propsState.selectedContacts;
            let step1 = this.componentList.getList("step", [obj.getJson()._id, 0], ["sequenceId", "step"])[0];
            if(contacts?.length>0){
              let delay = parseFloat(step1.getJson().nextSend)
              let nextSend = new Date(Date.now() + delay * 60 * 60 * 1000);
              nextSend = Timestamp.fromDate(nextSend)
              for(let c of contacts){
                c.setCompState({sequenceId:obj.getJson()._id, finished:false, emailNumber:0, nextSend: nextSend}, {run:true})
              }
            }
           }}]}/>
         
 
           
 
         </div>
         )
     }
 
     
 }