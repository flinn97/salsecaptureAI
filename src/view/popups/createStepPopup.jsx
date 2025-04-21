/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
 import { ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
 import {BaseComponent} from "flinntech";
 
 export default class CreateStepPopup extends BaseComponent{
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
       // Determine the text for the heading based on whether an object is provided
       let text = this.props.obj?"Edit":"Add"
       // Set default button to RunButton
       let button = <RunButton   content="Save" isPopup={true} callbackFunc={this.props.callbackFunc} />
       //If an object is provided, change button to UpdateButton
       if(this.propsState.popupSwitch.includes("updateContact")){
         
         button = <UpdateButton obj={this.propsState.currentPopupComponent} content="Save" isPopup={true} callbackFunc={this.props.callbackFunc}/>
       }
         return(
         <div style={{padding:"10px", paddingBottom:"100px", height:"65%"}} className={this.props.pageClass||this.state.defaultClass}>
          <>subject</>
                {this.propsState.currentStep && (
                    <ParentFormComponent
                        obj={this.propsState.currentStep}
                        name="subject"
                    />
                )}
                <>content</>
                {this.propsState.currentStep && (
                    <ParentFormComponent
                        type="quill"
                        obj={this.propsState.currentStep}
                        name="content"
                        wrapperClass="contentWrapper"
                    />
                )}
                <>next send in days</>
                {this.propsState.currentStep && (
                    //     <Dropdown
                    //     options={selectOptions} // Assuming selectOptions is an array of objects like: [{ label: "ASAP" }, { label: "5 minutes" }, { label: "10 minutes" }]
                    //     obj = {this.propsState.currentStep}
                    //     placeholder="Select next send"
                    //     className="custom-dropdown"
                    //     name="nextSend"
                    //   />
                    <ParentFormComponent

                        obj={this.propsState.currentStep}
                        name="nextSend"
                    />
                )}
                <UploadButton obj={this.propsState.currentStep} />
           <div className="popupButton" style={{width:"100%", display:"flex", justifyContent:"flex-end", alignContent:"flex-end"}}> {/*Container for the save button*/}
             <div style={{paddingRight:"50px", paddingBottom:"20px"}}> {/*Container for button spacing*/}
           {button}</div> {/*Button to save changes*/}
           </div>
 
           
 
         </div>
         )
     }
 
     
 }