/**
 * TemplatePage component. This component renders the page for displaying the details 
 * of a specific template. It extends GetComponentsFromUrl from the flinntech library.
 */
import { GetComponentsFromUrl, RunButton } from "flinntech";
import { ParentFormComponent } from "flinntech";
import aiService from "../service/aiService";

export default class TemplatePage extends GetComponentsFromUrl {
    /**
     * Lifecycle method that runs after the component mounts.
     * It fetches template components from the backend.
     */
    async componentDidMount() {
        
        await this.getComponentsFromBackend();
        const templateId = this.urlId; // Get the ID from the URL

        // If there's no ID, prepare a new template item
        if (!templateId || templateId==="template") {
            const newTemplate = await this.operationsFactory.prepare({prepare: {type: "template"}, clean:true });
            this.dispatch({ currentComponent: newTemplate[0] }); // Dispatch the new template as the current component
        }
    }
    /**
     * NEW: Generic bridge to the AI service.
     * This now handles all message types and passes persona/details.
     */
     async bridgeAiService() {
        // Get all relevant data from state and props
        let { persona, details, messageType } = this.state;
        if(!messageType){
            messageType = "template"
        }
        const template = this.propsState.currentComponent;
        const user = this.propsState.currentUser;

        if (!messageType) {
            console.log("Please select a message type.");
            return;
        }

        // Construct the context object for the AI
        const options = {
            persona: persona,
            details: details,
            conversationHistory: {},
            // Add conversation history if needed for 'reply' or 'sequence' types
            // conversationHistory: { lastSentEmail: "..." } 
        };
         // **NEW LOGIC**: Route the 'details' input to the correct field.
         switch (messageType) {
            case 'reply':
                // For replies, the 'details' input IS the conversation history.
                options.conversationHistory = {
                    fullHistory: details,
                    lastProspectReply: details // Using the same content for both is a simple, effective start.
                };
                break;
            case 'sequence':
                // For follow-ups, the 'details' input IS the last email sent.
                options.conversationHistory = {
                    lastSentEmail: details
                };
                break;
            default:
                // For all other types, 'details' is for additional instructions.
                options.details = details;
                break;
        }

        try {
            // Call the new unified AI service method
            const email = await aiService.generateMessage(user, messageType, options);
            const { subject, body } = aiService.extractSubjectAndBody(email);
            
            // Update the component's state with the AI-generated content
            template.setCompState({ content: body, subject: subject });
            console.log(body)
            this.dispatch({}); // Re-render the component
        } catch (error) {
            console.error("Failed to generate AI message:", error);
            console.log("There was an error generating the message. Please check the console.");
        }
    }

    /**
     * Returns the inner content of the TemplatePage component.
     * @returns {JSX.Element} The rendered content of the component.
     */
    getInnerContent() {
         // Define all possible message types for the dropdown
         const messageTypes = ["Template", "Follow Up", "Reply", "Event", "Proposal", "Attached Document", "Referral", "Network", "Re-Engage"];
         const messageTypeValues = ["template", "sequence", "reply", "event", "proposal", "document", "referral", "network", "reEngage"];
         // **NEW LOGIC**: Define dynamic label and placeholder for the details input
        let detailsLabel = "Optional: Add Additional Details or Instructions";
        let detailsPlaceholder = "e.g., Mention our upcoming promotion...";

        if (this.state.messageType === 'reply') {
            detailsLabel = "Paste Email Thread to Reply To:";
            detailsPlaceholder = "e.g., On Fri, Jul 25, 2025, Jane Smith wrote: I'm interested...";
        } else if (this.state.messageType === 'sequence') {
            detailsLabel = "Paste Last Email Sent in Sequence:";
            detailsPlaceholder = "e.g., Subject: Checking In...";
        }
 
        return (
            <div className="fit">
                <h1>Template Details</h1>
                <div
                    onClick={() => this.setState({ showAIDraft: !this.state.showAIDraft })}
                    className="dark-button-1"
                    style={{ position: "relative", width: "fit-content" }}
                >
                    {this.state.showAIDraft ? "Cancel" : "Draft With AI"}
                </div>
                {this.state.showAIDraft && (
                    <div>
                        Select Message Type:
                        <ParentFormComponent 
                            type="select"
                            // textOptions={messageTypes}
                            selectOptions={messageTypes}
                            handleChange={(e) => {
                                let i = messageTypes.indexOf(e.target.value);
                                let val = messageTypeValues[i]
                                this.setState({ messageType: val})
                }}
                        />
                        {/* just make this look good for now isaac and we can add quill later */}
                        Optional: Specify a Persona (e.g., "friendly and casual" or "formal and direct")
                        <input name="persona" onChange={(e) => this.setState({ persona: e.target.value })} />
                        Optional: Add Additional Details or Instructions
                        <div>{detailsLabel}</div> 
                        <input 
                            name="details"  
                            placeholder={detailsPlaceholder}
                            value={this.state.details || ''}
                            onChange={(e) => this.setState({ details: e.target.value })} 
                        />                       
                         <div
                            className="dark-button-1"
                            onClick={() => this.bridgeAiService()} // Call the refactored bridge function
                        >
                            Generate
                        </div>
                    </div>
                )}
                <div className="input-container">
                    <div className="input-bar">
                        {this.propsState.currentComponent&&
                <ParentFormComponent  name="subject" obj={this.propsState.currentComponent} />
                }
               
                    </div>
                </div>
                <div className="input-container">
                    <div className="input-bar">
                     
                {this.propsState.currentComponent&&
                <ParentFormComponent type="quill" name="content" obj={this.propsState.currentComponent} />
                }
                    </div>
                </div>
                <RunButton
                        content="Save Template"
                    />

            </div>
        );
    }

    /**
     * Renders the TemplatePage component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || "fit"}>
                {this.state.gotComponents && this.getInnerContent()}
            </div>
        );
    }
}