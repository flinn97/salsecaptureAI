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
         <div style={{padding:"10px", paddingBottom:"100px", height:"65%"}} className={this.props.pageClass||this.state.defaultClass}>
           <h2>Tags</h2> {/*Heading for the popup*/}
           <input onChange={(e)=>{
            let {value} = e.target;
            this.setState({tags:value})
           }}></input>
 
           <div onClick={async ()=>{
            for(let obj of this.propsState.selectedContacts){
              debugger
              let tags = obj.getJson().tags||"";
              let addTag = tags.length===0? this.state.tags: ","+this.state.tags
              tags = addTag;
              await obj.setCompState({tags:tags});
              obj.update();
            }
            this.dispatch({popupSwitch:''})
           }}>save</div>
         </div>
         )
     }
 
     
 }