/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
 import { ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
 import {BaseComponent} from "flinntech";
 
 export default class BigContactProfileCard extends BaseComponent{
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
        // Determine screen-based overrides
        let isWideScreen = window.innerWidth > 600;
        if(this.propsState.popupSwitch?.includes("addContact")){
            isWideScreen = false
        }
        let obj = isWideScreen ? this.propsState.currentContact : this.props.obj;

        const effectivePopupComponent = isWideScreen ? this.propsState.currentContact : this.propsState.currentPopupComponent;
        const inPopup = isWideScreen ? false : true;

       // Determine the text for the heading based on whether an object is provided
       let text = obj?"Edit":"Add"
       // Set default button to RunButton
       let button = <RunButton   content="Save" isPopup={inPopup} callbackFunc={this.props.callbackFunc} />
       //If an object is provided, change button to UpdateButton
       if(this.propsState.popupSwitch?.includes("updateContact")||(window.innerWidth > 600 && !this.propsState.popupSwitch?.includes("addContact"))){
         
         button = <UpdateButton obj={effectivePopupComponent} content="Save" isPopup={inPopup} callbackFunc={this.props.callbackFunc}/>
       }
         return(

         <div style={{padding:"10px", paddingBottom:"100px", height:"100%"}} className={this.props.pageClass||this.state.defaultClass}>
             <h2>{text} Contact</h2> {/*Heading for the popup*/}
             <div className="contact-Add-container">

                 <div className="row">
                     <div>First Name</div>
                     <div style={{width:"70%", marginLeft:"7px"}}> {/*Container for the title input*/}
                         <ParentFormComponent obj={obj} name="firstName" inPopup={inPopup}/> {/*Component for title input*/}

                     </div>
                 </div>



                 <div className="row">
                     <div>Last Name</div>
                     <div style={{width:"70%", marginLeft:"7px"}}> {/*Container for the title input*/}
                         <ParentFormComponent obj={obj} name="lastName" inPopup={inPopup}/> {/*Component for title input*/}

                     </div>
                 </div>



                 <div className="row">
                     <div>Email</div>
                     <div style={{width:"70%", marginLeft:"7px"}}> {/*Container for the title input*/}
                         <ParentFormComponent obj={obj} name="email" inPopup={inPopup}/> {/*Component for title input*/}
                     </div>
                 </div>



                 <div className="row">
                     <div>Tags</div>
                     <div style={{width:"70%", marginLeft:"7px"}}> {/*Container for the title input*/}
                         <ParentFormComponent obj={obj} name="tags" inPopup={inPopup}/> {/*Component for title input*/}
                     </div>
                 </div>



                 <div className="row">
                     <div>Notes</div>
                     <div style={{width:"90%", marginLeft:"10px"}}> {/*Container for the notes input*/}
                         <ParentFormComponent obj={obj} type="quill" name="notes" inPopup={inPopup}/> {/*Component for notes input (using Quill editor)*/}
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