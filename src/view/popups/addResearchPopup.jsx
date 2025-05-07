/**
  * @class ContactPopup
  * @extends {BaseComponent}
  * This component renders a popup for adding or editing Contact information with simplified fields.
  * It uses components from 'flinntech' for form elements and buttons.
  */
 import { ParentFormComponent, RunButton, UpdateButton } from "flinntech";
 import {BaseComponent} from "flinntech";

 export default class ResearchPopup extends BaseComponent{
     /**
      * Constructor for the ContactPopup component.
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
      * Renders the ContactPopup component.
      * @returns {JSX.Element} The rendered component.
      */
     render(){
        // The object containing the data for the form, either for adding or editing
        const obj = this.props.obj;

       // Determine the text for the heading based on whether an object is provided
       let text = obj ? "Edit" : "Add";

       // Set default button to RunButton for adding, UpdateButton for editing
       let button = obj ?
         <UpdateButton obj={obj} content="Save" isPopup={true} callbackFunc={this.props.callbackFunc}/> :
         <RunButton content="Save" isPopup={true} callbackFunc={this.props.callbackFunc} />;

         return(
         <div style={{padding:"10px", paddingBottom:"100px", height:"100%"}} className={this.props.pageClass||this.state.defaultClass}>
             <h2>{text} Research Prompt</h2> {/*Heading for the popup*/}
             <div className="contact-Add-container">

                 <div className="row">
                     <div>Name</div>
                     <div style={{width:"70%", marginLeft:"7px"}}> {/*Container for the name input*/}
                         <ParentFormComponent obj={obj} name="name" inPopup={true}/> {/*Component for name input*/}
                     </div>
                 </div>
                 <div className="row">
                     <div>Search Frequency</div>
                     <div style={{width:"70%", marginLeft:"7px"}}> {/*Container for the name input*/}
                         <ParentFormComponent obj={obj} name="searchFrequency" inputType="select" inPopup={true} selectOptions={["daily", "weekly", "monthly"]}/> {/*Component for name input*/}
                     </div>
                 </div>

                 <div className="row">
                     <div>AI Prompt</div>
                     <div style={{width:"90%", marginLeft:"10px"}}> {/*Container for the AI Prompt input*/}
                         <ParentFormComponent obj={obj} name="AIPrompt" inPopup={true}/> {/*Component for AI Prompt input (using Quill editor)*/}
                     </div>
                 </div>

           <div className="popupButton" style={{width:"100%", display:"flex", justifyContent:"flex-end", alignContent:"flex-end"}}> {/*Container for the save button*/}
             <div style={{paddingRight:"50px", paddingBottom:"20px"}}> {/*Container for button spacing*/}
           {button}</div> {/*Button to save changes*/}
           </div>
         </div>
         </div>
         )
     }
 }