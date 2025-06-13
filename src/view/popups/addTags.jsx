/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
 import { Timestamp } from "firebase/firestore";
import { MapComponent, ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
 import {BaseComponent} from "flinntech";
import SequencePopupCustomItem from "../components/sequencePopupCustom";
 
 export default class AddTags extends BaseComponent{
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
         <div style={{padding:"18px", paddingBottom:"100px", height:"100%"}} className={this.props.pageClass||this.state.defaultClass}>
           <h2 style={{font: 'normal normal 900 18px/25px Satoshi'}}>
           Add Tags to Selected</h2>

           <div className="contact-contact-data" 
           style={{marginTop:"8%", padding:"24px", border:"none", background:"#f0f0f0"}}>
            <div className="row-container">
              <div className="row-name" style={{maxWidth:"fit-content"}}>Tags:</div>
              <div className="row-field">
              <input class="underline-form" onChange={(e)=>{
                let {value} = e.target;
                this.setState({tags:value})
              }}></input>
              </div>
            </div>
          </div>
           
 
           <div class="dark-button-1" 
           style={{justifySelf:"flex-end", marginTop:"20px"}}
           onClick={async ()=>{
            for(let obj of this.propsState.selectedContacts){
              let tags = obj.getJson().tags||"";
              let addTag = tags.length===0? this.state.tags: ","+this.state.tags
              tags = addTag;
              await obj.setCompState({tags:tags});
              obj.update();
            }
            this.dispatch({popupSwitch:''})
           }}>Save</div>
         </div>
         )
     }
 
     
 }