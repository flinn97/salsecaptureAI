/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import {
  DelButton,
  ParentFormComponent,
  RunButton,
  UpdateButton,
  UploadButton,
} from "flinntech";
import { BaseComponent } from "flinntech";

export default class SessionCard extends BaseComponent {

  /**
   * Constructor for the OemPopupContent component.
   * @param {object} props - The component's properties.
   */
  constructor(props) {
    super(props);
    this.projectName = "Homework"
    this.state = {
      ...this.state,
      defaultClass: "fit scroller", //Sets a default class for styling
    };
  }
  getSessionIdFromPath() {
    const path = window.location.pathname;          // e.g. "/session/rt606052125"
    const match = path.match(/^\/session\/([^/]+)/);
    return match ? match[1] : null;                 // "rt606052125" or null
  }
  componentDidMount() {
    let id = this.getSessionIdFromPath();
    let session = this.componentList.getComponent("session", id);
    this.dispatch({ currentSession: session })
  }
  async getHWFromAI() {
    // Show a loading indicator to the user
    this.setState({ isGenerating: true, generationError: null });

    try {

      // 1. GATHER DATA
      // Get the current session and its associated goal
      const currentSessionJson = this.propsState.currentSession.getJson();
      const goal = this.componentList.getComponent("goal", currentSessionJson.contactId, "contactId");

      // Validate that essential data exists
      if (!goal) {
        throw new Error("Could not find the client's goal. Please ensure it is set.");
      }
      if (!currentSessionJson.owner) {
        throw new Error("Session owner ID is missing. Cannot proceed.");
      }

      const goalText = goal.getJson().name;
      const sessionNotes = currentSessionJson.content;
      // 'coachNotes' can be added to your component's state if needed
      const coachNotes = this.state.coachNotes || "";
      const ownerId = currentSessionJson.owner;

      // 2. CONSTRUCT PAYLOAD for the backend
      const payload = {
        contactId: currentSessionJson.contactId,
        goal: goalText,
        sessionNotes: sessionNotes,
        coachNotes: coachNotes,
        owner: ownerId,
        sessionId: currentSessionJson._id
      };

      // 3. CALL THE BACKEND ENDPOINT
      // IMPORTANT: Replace 'your-firebase-project-id' with your actual Firebase project ID.
      const endpointUrl = "https://getpotentialhomework-dleyjvnyfa-uc.a.run.app";

      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // 4. HANDLE THE RESPONSE
      if (!response.ok) {
        // Try to parse error from backend, otherwise use status text
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      console.log("✅ Homework generation successfully triggered on the backend.");
      // You can add a success notification for the user here
      this.dispatch({ popupSwitch: "showPotentialHomework" });

    } catch (error) {
      console.error("❌ Failed to generate homework:", error);
      this.setState({ generationError: error.message });
      // Display a user-friendly error message
      alert(`Error: ${error.message}`);

    } finally {
      // Reset the loading state regardless of outcome
      this.setState({ isGenerating: false });
    }
  }
  /**
   * Renders the OemPopupContent component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    // Determine the text for the heading based on whether an object is provided
    let text = this.props.obj ? "Edit" : "Add";
    // Set default button to RunButton
    let button = (
      <RunButton
        formClass={"dark-button-1"}
        content="Save"
        isPopup={true}
        callbackFunc={this.props.callbackFunc}
      />
    );

    return (
      <div
        style={{ padding: "10px", paddingBottom: "100px" }}
        className={this.props.pageClass || this.state.defaultClass}
      >
        <br />
        {this.propsState.currentSession && <>
          <div className="content-home-add">
            <div>Session</div>
            <div className="row">
              <div>Name: </div>

              <ParentFormComponent
                obj={this.propsState.currentSession}
                name="name"
                wrapperClass="underline-form"
              />
            </div>
            <div className="row">
              {/* <div>content</div> */}
              <ParentFormComponent
                type="quill"
                obj={this.propsState.currentSession}
                name="content"
                wrapperClass="contentWrapper"
              />
            </div>


            <div className="row">
              {button}          </div>
            <div className="row">
              Generate Homework
            </div>
            <div className="row">
              Notes for AI
              <div className="underline-form"><input style={{ border: "none", width: "100%" }} onChange={(e) => { this.setState({ coachNotes: e.target.value }) }}></input></div>

            </div>
            <div className="row">
              <div style={{ paddingRight: "50px", paddingBottom: "20px" }}>
                <div onClick={() => { this.getHWFromAI() }}>Generate Homework</div></div>           </div>
          

          </div>
        </>}
      </div>
    );
  }
}
