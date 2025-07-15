/**
 * ConversationCard component. This component renders the individual conversation card,
 * displaying conversation details and associated components. It extends BaseComponent from 'flinntech'.
 */
 import { Card } from "flinntech";
 import ConversationList from "./ConversationList"; // Custom component for displaying the conversation list
 import { BaseComponent } from "flinntech";
 import Conversation from "./conversation";
 
 export default class ConversationCard extends BaseComponent {
   /**
    * Constructs the ConversationCard component.
    * @param {object} props - The properties passed to the component.
    */
   constructor(props) {
     super(props);
     this.state = {
       ...this.state,
       defaultClass: "fit", // Sets the default class for styling
     };
   }
   async componentDidMount() {
     if(!this.propsState.convoSnapped){
     await this.componentList.getComponentsFromBackend({
       type: "conversation",
       ids: this.propsState.currentUser.getJson()._id,
       filterKeys: "owner",
       snapshot:true,
     });
     await this.componentList.getComponentsFromBackend({
         type: "email",
         ids: this.propsState.currentUser.getJson()._id,
         filterKeys: "owner",
         snapshot:true,
 
       });
     }
     else{
         this.dispatch({convoSnapped:true})
     }
     await this.componentList.sortSelectedListbyFirebaseDate('conversation');
     await this.componentList.sortSelectedListbyFirebaseDate('email');
 
     this.componentList.getAPIService().subscribeToReadObserver(async (l, l2)=>{
         this.setState({start:false})
 
         if (!Array.isArray(l2)) {
           console.error('l2 is not an array:', l2);
           this.setState({ start: true });
           return;
         }
 
         let idObj = {}
         for(let obj of l2){
             idObj[obj._id] = obj
         }
         let list = this.componentList.getList("conversation");
         list = list.map((obj)=>{
             let o = idObj[obj.getJson()._id];
                 if(o){
                     obj.setCompState({...o})
                 }
             return obj
         })
         await this.componentList.clearSelectedList('conversation', list);
         await this.componentList.sortSelectedListbyFirebaseDate('conversation', true);
         await this.componentList.sortSelectedListbyFirebaseDate('email');
 
 
         this.dispatch({ranConversationRead:true});
         this.setState({start:true})
     
 
     })
 
     this.setState({
       start: true,
     });
   }
 
   /**
    * Returns the inner content of the ConversationCard component.
    * It includes a conversation list on the left and a conversation details on the right.
    * @returns {JSX.Element} The inner content of the card.
    */
   getInnerContent() {
     return (
       <div className="layoutRow" style={{ width: "100%", height: "100%" }}>
         {/* Left side card for the conversation list */}
         <div style={{minWidth:window.innerWidth > 600?"50%":""}}>
           {!this.propsState.showConversation && (
             <>
               {this.state.start && (
                 <Card theme="defaultCard" content={<ConversationList />} />
               )}
             </>
           )}
         </div>
         {/* Right side card for the selected conversation details */}
         <div style={{minWidth:window.innerWidth > 600?"50%":""}}>
           {(window.innerWidth > 600 ||
             this.propsState.showConversation !== undefined) && (
             <>
               {this.state.start && (
                 <Card theme="defaultCard" content={<Conversation />} />
               )}
             </>
           )}
         </div>
       </div>
     );
   }
 
   /**
    * Renders the ConversationCard component.
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
 