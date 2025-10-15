/**
 * Conversation component. This component renders the details of a single conversation,
 * including messages and an input for sending new messages. It extends BaseComponent from 'flinntech'.
 */
 import { MapComponent } from "flinntech";
 import { ParentFormComponent, RunButton } from "flinntech";
 import { BaseComponent } from "flinntech";
 import CustomMessageItem from "./components/messageCustomItem";
 import arrow from "../assets/arrow_back.svg";

 
 export default class Conversation extends BaseComponent {
   /**
    * Constructs the Conversation component.
    * @param {object} props - The properties passed to the component.
    */
   constructor(props) {
     super(props);
     this.state = {
       ...this.state,
       defaultClass: "fit",
       input: "",
       currentConversation: null, // Initializes the currentConversation state
     };
   }
 
   /**
    * Lifecycle method that runs after the component is mounted.
    * Prepares the current conversation's messages.
    */
   async componentDidMount() {
    
    
     await this.prepareMessages(true); // Calls the function to prepare messages
     
     
   }
   async componentDidUpdate(props, state) {
    if (
      this.propsState.currentConversation !== this.state.currentConversation && this.propsState.currentUser?.getJson().role!=="client"
    ) {
      await this.prepareMessages(true);
    }
  }
 
 
   /**
    * Prepares the messages for the current conversation.
    */
   async prepareMessages(skipPrepNewMessage) {
    debugger
     let currentConversation = this.propsState.currentConversation; // Get the current conversation from the global state
     if (!currentConversation) {
       currentConversation = this.componentList.getComponent("conversation");
       if(!currentConversation){
        currentConversation = await this.componentList.getComponentFromBackend({type:"conversation", contact:this.propsState.currentUser?.getJson().email })
       }
       await this.dispatch({ currentConversation: currentConversation });

     }
     if (currentConversation) {
       //REMOVE THE COMMENT
       // await this.componentList.getComponentsFromBackend({ type: "email", ids: this.propsState.currentUser.getJson()._id, filterKeys: "owner" });
      // if(!skipPrepNewMessage){
      //   await this.prepNewMessage();

      // }
      await this.componentList.clearSelectedList("email", "type");
      await this.componentList.getAPIService().firebaseGetter( {
        where: [
          { attribute: "type", val: "email" }, // where type == "email"
          { attribute: "conversationId", val: currentConversation.getJson()._id }
        ],
        order: "date" // order by date
      })
 
       this.setState({ start: true, currentConversation:currentConversation });
     } else {
       this.setState({
         message: "no current conversations",
       });
     }
   }
   
 
 
 
   /**
    * Returns the inner content of the Conversation component.
    * It includes the MapComponent for displaying messages and a form for sending new messages.
    * @returns {JSX.Element} The inner content of the component.
    */
   getInnerContent() {
     const { currentConversation } = this.propsState;
     let currentContact = this.componentList.getComponent(
       "contact",
       currentConversation?.getJson().contact,
       "email"
     );
     return (
       <div>
         {window.innerWidth > 1 && (
           <div
             style={{
               position: "sticky",
               top: 0,
               zIndex: 200,
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               justifyItems: "space-between",
               background:"white",
               padding:"20px",
               paddingBottom:"8px",
               transform: "translateZ(0)", // Force GPU acceleration
             }}
           >
             {window.innerWidth < 600 &&
             <div
               onClick={() => {
                 this.dispatch({ showConversation: undefined });
               }}
             >
               <img src={arrow} style={{ color: "black" }} />
             </div>
             }
 
             <div
               className="contact-avatar"
               style={{ maxWidth: "45px", maxHeight: "45px" }}
             >
               <i className="fa-solid fa-user"></i>
             </div>
 
             <div className="message-header-title">
               <span className="sender-title">
                 {this.propsState.currentConversation?.getJson().contactName}
               </span>
               <span className="sender-details-button">See Details</span>
             </div>
 
             <div style={{fontSize: ".8rem", cursor:"pointer", minWidth: "55px",}} className="hover-basic">
               {currentContact?.getJson()?.autoAI ? (
                 <div
                   style={{ display: "flex", flexDirection: "column", alignItems:"center" }}
                   onClick={() => {
                     currentContact.setCompState(
                       { autoAI: false },
                       { run: true },
                       true
                     );
                   }}
                 >
                   {/* <span>AI On</span> */}
                   <i class="fa-solid fa-comment-nodes" 
                     style={{
                       fontSize:"35px",
                       color: "#36b593",
                     }}></i>
               
                 </div>
               ) : (
                 <div
                   style={{ display: "flex", flexDirection: "column", alignItems:"center" }}
                   onClick={() => {
                     currentContact.setCompState(
                       { autoAI: true },
                       { run: true },
                       true
                     );
                   }}
                 >
                   {/* <span>AI Off</span> */}
                   <i class="fa-solid fa-comment-nodes" 
                     style={{
                       fontSize:"35px",
                       color: "#363636",
                       }}></i>
                 </div>
               )}
             </div>
           </div>
         )}
 
         <div className="layoutColumn conversation-container" style={{padding:"20px", marginBottom:"12px"}}>
           {this.state.message ? (
             <>{this.state.message}</>
           ) : (
             <>
               {this.state.start && (
                 <div style={{ width: "100%", marginTop: "-20px",}}>
                   {/* MapComponent displaying messages connected to the current conversation */}
                   <MapComponent
                     mapContainerClass="message-list"
                     // mapSectionClass="Map-Section-ei"
 
                     // mapSectionStyle={{
                     //     flex: "1",          /* take up remaining space */
                     //     overflowY: 'auto',  /* scrollable if needed */
                     //     padding: "0px",
                     //     margin: "0px",
                     // }}
                     name={currentConversation?.getJson().messageType || "email"} // Use messageType for the MapComponent
                     cells={[
                       // { type: "attribute", name: "body" }
                       { type: "custom", custom: CustomMessageItem },
                     ]} // Custom component type for chat messages
                     filter={{
                       search: this.propsState.currentConversation.getJson()._id,
                       attribute: "conversationId",
                     }}
                     filterFunc={(obj) => {
                       if (obj.getJson().body === undefined) {
                         return false;
                       }
                       if (obj.getJson().body === "") {
                         return false;
                       }
                       return true;
                     }}
                   />
 
                   <div
                     style={{
                       display: "flex",
                       flexDirection: "row",
                       position: "sticky",
                       bottom: 0,
                       zIndex: 1,
                       width: "100%",
                       minHeight: "70px",
                       paddingBottom: "85px",
                       paddingLeft: "12px",
                       background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 1%)`,
                     }}
                   >
                     <div
                       style={{ position: "relative", width: "40px", zIndex: 2 }}
                     >
                     
                           <button 
                           onClick={async ()=>{
                            debugger
                           await this.operationsFactory.clear();
                              let obj = {
                                type:"email",
                                body: this.state.input,
                                conversationId: this.propsState.currentConversation.getJson()._id,
                                ownerMessage: this.propsState.currentUser.getJson().role==="client"?false:true
                              }
                              
                              await this.operationsFactory.prepare(
                                {prepare:
                                {...obj}, clean:true, run:true
                              })
                              this.setState({firstMessageSent:true, input:""});
                              this.dispatch({})
                            
                     

                           }}
                             className="footer-btn"
                             style={{
                               marginBottom: "-15px",
                               position: "absolute",
                               left: 0,
                             }}
                           >
                             <i className="fa-solid fa-circle-plus"></i>
                           </button>
                         
                         
                        
                         
                     </div>
                     {/* Form for sending new messages */}
                     <div style={{ zIndex: 3, width: "100%" }}>
                      
                      <div className="footer-input">
                      <input value={this.state.input} className="search-input" onChange={(e)=>{
                        this.setState({input:e.target.value})
                      }}/>
                      </div>
                     </div>
                   </div>
                 </div>
               )}
             </>
           )}
         </div>
       </div>
     );
   }
 
   /**
    * Renders the Conversation component.
    * @returns {JSX.Element} The rendered component.
    */
   render() {
     return (
       <div className={this.props.pageClass || this.state.defaultClass}>
         {this.getInnerContent()}
       </div>
     );
   }
 }
 