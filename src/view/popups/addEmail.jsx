/**
 * @class ContactPopup
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing Contact information with simplified fields.
 * It uses components from 'flinntech' for form elements and buttons.
 */
 import { ParentFormComponent, RunButton, UpdateButton } from "flinntech";
import aiService from "../../service/aiService";
 import Conversation from "../conversation";
 
 export default class AddEmail extends Conversation {
   /**
    * Constructor for the ContactPopup component.
    * @param {object} props - The component's properties.
    */
   constructor(props) {
     super(props);
     this.state = {
       ...this.state,
       defaultClass: "fit scroller", //Sets a default class for styling
     };
   }
   componentDidMount(){
    
    this.propsState.currentPopupComponent?.setCompState({conversationId: this.propsState.currentConversation?.getJson()._id, originalMessageId:false, ownerMessage:true});
    this.setState({email:this.propsState.currentPopupComponent})
    
 }
 componentDidUpdate(){}
 

 extractSubjectAndBody(emailText) {
  const subjectMatch = emailText.match(/^{{\s*([^}]+?)\s*}}/);
  let subject = '';
  let plainBody = '';

  if (subjectMatch) {
    subject = subjectMatch[1].trim();
    plainBody = emailText.slice(subjectMatch[0].length).trim();
  } else {
    plainBody = emailText.trim();
  }

  // Normalize newlines and convert to HTML
  const htmlBody = plainBody
    .split('\n\n') // Paragraphs
    .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('\n');

  return {
    subject,
    body: htmlBody // Use this for injecting into Quill
  };
} 
   /**
    * Renders the ContactPopup component.
    * @returns {JSX.Element} The rendered component.
    */
   render() {
     // The object containing the data for the form, either for adding or editing
     const obj = this.props.obj;
 
     // Determine the text for the heading based on whether an object is provided
     let text = obj ? "Edit" : "Add";
 
     // Set default button to RunButton for adding, UpdateButton for editing
     let button = (
       <RunButton
         formClass={"dark-button-1"}
         content={<div>Send</div>}
         callbackFunc={() => {
           let obj = this.state.email;
           
 
           //  this.prepNewMessage();
 
           // const { originalMessageId, from, to, subject, text } = req.body;
           let body = {
            from: this.propsState.currentUser.getJson()._id,
            to: this.propsState.currentConversation.getJson().contact,
            subject: obj.getJson().subject,
            text: obj.getJson().body,
          };
          let url = this.propsState.currentUser.getJson().gmailAuthenticated? "https://gmailapiemailhandler-7c5i3vsqma-uc.a.run.app" : "https://sendgridemailhandler-7c5i3vsqma-uc.a.run.app"

           // Make the POST request
           fetch(url, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify(body),
           })
             .then((response) => {
               if (!response.ok) {
                 throw new Error(`HTTP error! Status: ${response.status}`);
               }
               return response.json();
             })
             .then((data) => {
               console.log("Reply sent successfully in thread.", data);
             })
             .catch((error) => {
               console.error("Error sending reply:", error);
             });
             this.dispatch({currentPopupComponent:undefined, popupSwitch:""})
         }} // Callback to re-run the prepareMessages function
       />
     );

     
 
     return (
       <div
         style={{ padding: "10px", paddingBottom: "100px", height: "100%" }}
         className={this.props.pageClass || this.state.defaultClass}
       >
        <div
    onClick={async () => {
        try {
            const user = this.propsState.currentUser;
            const messageType = 'template'; // Explicitly define the message type
            const options = {};             // No extra options are needed for a basic template

            // Call the new unified AI service function
            const email = await aiService.generateMessage(user, messageType, options);

            // Use the consistent helper function from the AI service to parse the response
            const { subject, body } = aiService.extractSubjectAndBody(email);

            // Update the popup component's state
            this.propsState.currentPopupComponent.setCompState({ body: body, subject: subject });
            this.dispatch({});

        } catch (error) {
            console.error("Failed to draft with AI:", error);
            alert("An error occurred while generating the draft. Please check the console.");
        }
    }}
    className="dark-button-1"
    style={{
        position: "relative",
        width: "fit-content",
    }}
>
    Draft With AI
</div>
         <h2>Email</h2> {/*Heading for the popup*/}
         <div className="contact-Add-container">
           <div className="row">
             <div>To:</div>
             <div style={{ width: "70%", marginLeft: "7px" }}>
               {" "}
               {/*Container for the name input*/}
               {this.propsState.currentConversation?.getJson().contactName}
             </div>
           </div>
           <div className="row">
             <div>From:</div>
             <div style={{ width: "70%", marginLeft: "7px" }}>
               {" "}
               {/*Container for the name input*/}
               {/* {this.propsState.currentConversation?.getJson().conversationOwner} */}
               Me
             </div>
           </div>
           <div className="row">
             <div>Subject:</div>
             <div style={{ width: "70%", marginLeft: "7px" }}>
               {" "}
               {/*Container for the subject input*/}
               <ParentFormComponent
                 formClass="underline-form"
                 obj={obj}
                 name="subject"
                 inPopup={true}
               />{" "}
               {/*Component for subject input*/}
             </div>
           </div>
 
           <div>
             {/* <div>body</div> */}
             <div style={{ width: "100%" }}>
               {" "}
               {/*Container for the AI Prompt input*/}
               <ParentFormComponent
                 obj={obj}
                 type="quill"
                 name="body"
                 inPopup={true}
               />{" "}
               {/*Component for AI Prompt input (using Quill editor)*/}
             </div>
           </div>
 
           <div
             // className="popupButton"
             style={{
               width: "100%",
               background:"white",
               display: "flex",
               justifyContent: "flex-end",
               alignContent: "flex-end",
               
             }}
           >
             {" "}
             {/*Container for the save button*/}
             <div style={{marginRight:"-10px"}}>
               {" "}
               {/*Container for button spacing*/}
               {button}
             </div>
           </div>
         </div>
       </div>
     );
   }
 }
 
