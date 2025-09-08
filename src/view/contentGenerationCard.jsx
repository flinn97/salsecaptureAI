/**
 * TemplatePage component. This component renders the page for displaying the details
 * of a specific template. It extends GetComponentsFromUrl from the flinntech library.
 */
import { GetComponentsFromUrl, RunButton } from "flinntech";
import { ParentFormComponent } from "flinntech";
import aiService from "../service/aiService";
import "./contentEngine.css";
import { Link } from "react-router-dom";

export default class ContentGenerationCard extends GetComponentsFromUrl {
  /**
   * Lifecycle method that runs after the component mounts.
   * It fetches template components from the backend.
   */
  async componentDidMount() {
    await this.getComponentsFromBackend();
    const templateId = this.urlId; // Get the ID from the URL

    // If there's no ID, prepare a new template item
    if (!templateId || templateId === "aigeneration") {
      const newTemplate = await this.operationsFactory.prepare({
        prepare: { type: "template" },
        clean: true,
      });
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
    if (!messageType) {
      messageType = "template";
    }
    const template = this.propsState.currentComponent;
    const user = this.propsState.currentUser;

    if (!messageType) {
      alert("Please select a message type.");
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
      case "reply":
        // For replies, the 'details' input IS the conversation history.
        options.conversationHistory = {
          fullHistory: details,
          lastProspectReply: details, // Using the same content for both is a simple, effective start.
        };
        break;
      case "sequence":
        // For follow-ups, the 'details' input IS the last email sent.
        options.conversationHistory = {
          lastSentEmail: details,
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
      console.log(body);
      this.dispatch({}); // Re-render the component
    } catch (error) {
      console.error("Failed to generate AI message:", error);
      alert(
        "There was an error generating the message. Please check the console."
      );
    }
  }

  /**
   * Returns the inner content of the TemplatePage component.
   * @returns {JSX.Element} The rendered content of the component.
   */
  getInnerContent() {
    // Define all possible message types for the dropdown
    const messageTypes = [
      "Template",
      "Follow Up",
      "Reply",
      "Event",
      "Proposal",
      "Attached Document",
      "Referral",
      "Network",
      "Re-Engage",
    ];
    const messageTypeValues = [
      "template",
      "sequence",
      "reply",
      "event",
      "proposal",
      "document",
      "referral",
      "network",
      "reEngage",
    ];
    // **NEW LOGIC**: Define dynamic label and placeholder for the details input
    let detailsLabel = "Additional Instructions";
    let detailsPlaceholder = "Any extra details or specifications...";

    if (this.state.messageType === "reply") {
      detailsLabel = "Paste Email Thread to Reply To:";
      detailsPlaceholder =
        "e.g., On Fri, Jul 25, 2025, Jane Smith wrote: I'm interested...";
    } else if (this.state.messageType === "sequence") {
      detailsLabel = "Paste Last Email Sent in Sequence:";
      detailsPlaceholder = "e.g., Subject: Checking In...";
    }

    return (
      <div className="fit" style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/content" className="inLine-Link white-button-end">
          <div>Go to Sequences</div>
        </Link>
        <h1>Content Engine</h1>
        <h3>
          The SalesCapture AI content engine is configured to optimize content
          for your products and services.
        </h3>
          <div
          onClick={() =>
            this.setState({ showAIDraft: !this.state.showAIDraft })
          }
          className={
            this.state.showAIDraft ? "dark-button-1" : "green-button-1"
          }
          style={{ position: "relative", width: "fit-content", margin: "1em" }}
        >
          {this.state.showAIDraft ? "Cancel" : "Draft With AI"}
        </div>
        <div className="input-container" style={{ marginTop: "38px" }}>
          {" "}
          Subject
          <div className="input-bar row-container">
            {this.propsState.currentComponent && (
              <ParentFormComponent
                name="subject"
                obj={this.propsState.currentComponent}
              />
            )}
          </div>
        </div>

      
        {this.state.showAIDraft && (
          <div style={{ padding: "1em", marginLeft:"1em", border: "1px solid gray", borderRadius:"14px" }}>
            <h2>Generate Content</h2>
            <div style={{ display: "flex", flexDirection: "column",}}>
              Select Message Type:
              <div style={{marginLeft:"8px"}}>
              <ParentFormComponent
                formClass="input-bar row-container underline-form"
                type="select"
                // textOptions={messageTypes}
                selectOptions={messageTypes}
                handleChange={(e) => {
                  let i = messageTypes.indexOf(e.target.value);
                  let val = messageTypeValues[i];
                  this.setState({ messageType: val });
                }}
              /></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              Persona/Tone
              <input
                className="input-bar row-container"
                style={{ border: "none", paddingBottom: ".3em", margin:".5em"  }}
                name="persona"
                placeholder={`(e.g., "friendly and casual" or "formal and direct")`}
                onChange={(e) => this.setState({ persona: e.target.value })}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{detailsLabel}</div>
              <input
                className="input-bar row-container"
                style={{ border: "none", paddingBottom: ".3em", margin:".5em" }}
                name="details"
                placeholder={detailsPlaceholder}
                value={this.state.details || ""}
                onChange={(e) => this.setState({ details: e.target.value })}
              />
            </div>
            <div
              className="green-button-1"
              onClick={() => this.bridgeAiService()} // Call the refactored bridge function
            >
              Generate
            </div>
          </div>
        )}

        <div className="input-container">
          {" "}
          Content
          <div className="input-bar">
            {this.propsState.currentComponent && (
              <ParentFormComponent
                type="quill"
                name="content"
                obj={this.propsState.currentComponent}
              />
            )}
          </div>
        </div>
        <div>
          <RunButton
            content={<div className="dark-button-1">Save Template</div>}
          />
        </div>
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
