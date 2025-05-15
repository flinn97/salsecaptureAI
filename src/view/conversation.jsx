/**
 * Conversation component. This component renders the details of a single conversation,
 * including messages and an input for sending new messages. It extends BaseComponent from 'flinntech'.
 */
import { MapComponent } from "flinntech";
import { ParentFormComponent, RunButton } from "flinntech";
import { BaseComponent } from "flinntech";
import CustomMessageItem from "./components/messageCustomItem";

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
      currentConversation: null, // Initializes the currentConversation state
    };
  }

  /**
   * Lifecycle method that runs after the component is mounted.
   * Prepares the current conversation's messages.
   */
  async componentDidMount() {
    await this.prepareMessages(); // Calls the function to prepare messages
  }

  /**
   * Prepares the messages for the current conversation.
   */
  async prepareMessages() {
    let currentConversation = this.propsState.currentConversation; // Get the current conversation from the global state
    if (!currentConversation) {
      currentConversation = this.componentList.getComponent("conversation");
      await this.dispatch({ currentConversation: currentConversation });
    }
    if (currentConversation) {
      //REMOVE THE COMMENT
      // await this.componentList.getComponentsFromBackend({ type: "email", ids: this.propsState.currentUser.getJson()._id, filterKeys: "owner" });

      await this.prepNewMessage();

      this.setState({ start: true });
    } else {
      this.setState({
        message: "no current conversations",
      });
    }
  }
  async prepNewMessage() {
    let currentConversation = this.propsState.currentConversation;
    const messageType = currentConversation.getJson().messageType || "email"; // Get the message type from the current conversation
    let replyTo = this.componentList.getList(
      "email",
      this.propsState.currentConversation.getJson()._id,
      "conversationId"
    );
    replyTo = replyTo[replyTo.length - 1];
    let replyToId = replyTo.getJson().originalMessageId;
    let subject = replyTo.getJson().subject;
    const prepared = await this.operationsFactory.prepare({
      prepare: {
        type: messageType,
        conversationId: currentConversation.getJson()._id,
        originalMessageId: replyToId,
        subject: subject,
        ownerMessage: true,
      }, clean: true // Prepare with messageType and conversationId
    });
    // Dispatch to set the current component in the global state
    this.dispatch({
      currentComponent: prepared[0], // Set the first prepared item as the current component
    });
    this.setState({
        currentConversation:currentConversation
    })
  }

  componentDidUpdate(props, state){
    if(this.propsState.currentConversation!==this.state.currentConversation){
        this.prepNewMessage()
    }


  }

  /**
   * Returns the inner content of the Conversation component.
   * It includes the MapComponent for displaying messages and a form for sending new messages.
   * @returns {JSX.Element} The inner content of the component.
   */
  getInnerContent() {
    const { currentConversation } = this.propsState;

    return (
      <div>
        {window.innerWidth < 600 && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 200,
              marginBottom: "-20px",
            }}
          >
            <div
              className="dark-button-1"
              onClick={() => {
                this.dispatch({ showConversation: undefined });
              }}
            >
              {`< Back`}
            </div>
          </div>
        )}
        <div className="layoutColumn conversation-container">
          {this.state.message ? (
            <>{this.state.message}</>
          ) : (
            <>
              {this.state.start && (
                <div style={{ width: "100%", marginTop:"-20px", }}>
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
                    filterFunc={(obj)=>{
                      if(obj.getJson().body===undefined){
                          return false
                      }
                      if(obj.getJson().body===""){
                          return false
                      }
                      return true
                  }}
                  />

                  <div
                    style={{
                      display:"flex",
                      flexDirection:"row",
                      position: "sticky",
                      bottom: 0,
                      zIndex: 1,
                      width: "100%",
                      minHeight: "60px",
                      paddingBottom: "65px",
                      paddingLeft:"12px",
                      background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 1%)`,
                    }}
                  >
                   <div style={{ position:"relative",
                    width:"40px", zIndex:2,
                    }}>
                    <RunButton
                      content={
                          <button className="footer-btn"
                          style={{marginBottom:"-15px", position:"absolute", left:0}}>
                            <i className="fa-solid fa-circle-plus"></i>
                          </button>
                      }
                      callbackFunc={() => {
                        
                        let obj = this.propsState.currentComponent;
                        if(obj.getJson().body===""){
                            return
                        }
                        
                        this.prepNewMessage();

                        // const { originalMessageId, from, to, subject, text } = req.body;
                        let body = {
                          originalMessageId: obj.getJson().originalMessageId,
                          from: obj.getJson().owner,
                          to: this.propsState.currentConversation.getJson()
                            .contact,
                          subject: obj.getJson().subject,
                          text: obj.getJson().body,
                        };
                        // Make the POST request
                        fetch(
                          "https://sendgridemailhandler-7c5i3vsqma-uc.a.run.app",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body),
                          }
                        )
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error(
                                `HTTP error! Status: ${response.status}`
                              );
                            }
                            return response.json();
                          })
                          .then((data) => {
                            console.log(
                              "Reply sent successfully in thread.",
                              data
                            );
                          })
                          .catch((error) => {
                            console.error("Error sending reply:", error);
                          });
                      }} // Callback to re-run the prepareMessages function
                    /></div>
                     {/* Form for sending new messages */}
                     <div style={{zIndex:3, width:"100%"}}>
                      <ParentFormComponent
                        wrapperClass="footer-input"
                        formClass="search-input"
                        name="body" // Name for the input field
                        obj={this.propsState.currentComponent} // Connect to the current conversation
                      />
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
