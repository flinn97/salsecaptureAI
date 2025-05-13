/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
 import { ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
 import {BaseComponent} from "flinntech";
 
 export default class ContactProfileDetailCard extends BaseComponent{
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

             <div>
                 <div className="div client-profile-dash">
                     <div className="row client-profile">
                         <div className="client-avatar">
                             <i className="fa-solid fa-user"></i>
                         </div>
                         <div className="client-info">
                             <div className="client-name">{this.propsState.currentContact?.getJson().firstName} {this.propsState?.currentContact?.getJson().lastName}</div>
                             <div className="client-desc">Edit Profile</div>
                         </div>
                     </div>
                     <div className="row row-left padding-0 client-contact-div">
                         <div className="client-contact col col-left padding-0">
                             <div className="client-contact-phone row">
                                 <div><i className="fa-solid fa-phone"></i></div>
                                 <div>{this.propsState.currentContact?.getJson().mobile}</div>
                             </div>
                             <div className="client-contact-email row">
                                 <div><i className="fa-solid fa-envelope"></i></div>
                                 <div>{this.propsState.currentContact?.getJson().email}</div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <div className="row row-align-start">
                 <div className="col client-appointments">
                     <div className="appointment-title">Appointment History</div>
                     <div className="row appointment-upcoming">
                         <svg viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                             <line x1="0" y1="5" x2="100" y2="5" stroke="currentColor" stroke-width="1"/>
                         </svg>
                         <div className="appointment-upcoming-text">Upcoming Appointments</div>
                         <svg viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                             <line x1="0" y1="5" x2="100" y2="5" stroke="currentColor" stroke-width="1"/>
                         </svg>
                     </div>
                     <div className="appointment">
                         <div className="row row-space-between">
                             <div className="appointment-left">
                                 <div className="row row-left padding-0 appointment-time">8AM</div>
                                 <div className="row row-left padding-0">View Notes</div>
                             </div>
                             <div className="appointment-right">

                                 <div className="appointment-date">Apr 9, 2025</div>
                             </div>
                         </div>
                     </div>
                     <div className="appointment">
                         <div className="row row-space-between">
                             <div className="appointment-left">
                                 <div className="row row-left padding-0 appointment-time">8AM</div>
                                 <div className="row row-left padding-0">View Notes</div>
                             </div>
                             <div className="appointment-right">

                                 <div className="appointment-date">Apr 9, 2025</div>
                             </div>
                         </div>
                     </div>
                     <div className="appointment">
                         <div className="row row-space-between">
                             <div className="appointment-left">
                                 <div className="row row-left padding-0 appointment-time">8AM</div>
                                 <div className="row row-left padding-0">View Notes</div>
                             </div>
                             <div className="appointment-right">

                                 <div className="appointment-date">Apr 9, 2025</div>
                             </div>
                         </div>
                     </div>

                 </div>
                 <div className="col client-second-col">
                     <div className="col col-left client-notes">
                         <div className="client-note-title">Notes</div>
                         <div className="client-note-detail">These are short, famous texts in English from classic
                             sources like the Bible or Shakespeare. Some texts have word definitions and explanations to
                             help you. Some of these texts are written in an old style of English. Try to understand
                             them, because the English that we speak today is based on what our great, great, great,
                             great grandparents spoke before! Of course, not all these texts were originally written in
                             English. The Bible, for example, is a translation. But they are all well known in English
                             today, and many of them express beautiful thoughts.
                         </div>
                     </div>
                     <div className="row client-modules">
                         <div className="col">Billing History</div>
                         <div className="col"></div>
                         <div className="col"></div>
                     </div>
                     <div className="row client-form-responses">
                         <div className="client-form-responses-cell"></div>
                     </div>
                 </div>
             </div>
           
 
         </div>
         )
     }
 
     
 }