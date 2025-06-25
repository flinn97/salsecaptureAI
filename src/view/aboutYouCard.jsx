import { BaseComponent, ParentFormComponent } from "flinntech";
import ClientProfilePage from "./clientProfilePage";
import Conversations from "./conversations";
import SchedulePage from "./schedule";
import Settings from "./settings";
import TaskPage from "./TaskPage";

export default class AboutYouCard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      aboutText: "",
      hadCoach: null, // "yes" or "no"
    };
  }

  handleTextChange = (e) => {
    this.setState({ aboutText: e.target.value });
  };

  handleCoachChange = (answer) => () => {
    this.setState({ hadCoach: answer });
    let obj = this.propsState.currentContact;
    obj.setCompState({coachAnswer:answer})

  };

  handleBack = () => {
    // TODO: wire this up to navigate to the previous card
    console.log("Go back");
  };

  handleContinue = async () => {
    await this.operationsFactory.run();
    await this.propsState.currentContact.update();

    this.dispatch({currentUser:this.propsState.currentContact,
      routes:[
        {comp: ClientProfilePage, name:"Dash", path:"/" },
        { comp: TaskPage, name: "Tasks", path: "/tasks" },
        { comp: Conversations, name: "Messages", path: "conversation" },
        { comp: SchedulePage, name: "Schedule", path: "schedule" },


        { comp: Settings, name: "Billing", path: "billing" },
      ],
    })
    
  };

  getInnerContent() {
    let obj = this.propsState.currentContact
    return (
      <div className="about-container">
        <h1 className="about-title">About You</h1>

        <p className="about-question">
          What's your current occupation and life situation? (e.g. work,
          relationships, family, etc.)
        </p>

        <ParentFormComponent type={"quill"} rows={4} obj={obj} name="work" />


        <div className="about-coach">
          <span className="about-question">
            Have you worked with a coach or therapist before?
          </span>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={this.state.hadCoach === "yes"}
              onChange={this.handleCoachChange("yes")}
            />
            Yes
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={this.state.hadCoach === "no"}
              onChange={this.handleCoachChange("no")}
            />
            No
          </label>
        </div>

        <div className="about-nav">
          <button
            className="back-button"
            onClick={this.handleBack}
          >
            Go Back
          </button>
          <button
            className="continue-button"
            onClick={this.handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.pageClass || this.state.defaultClass}>
        {this.getInnerContent()}
      </div>
    );
  }
}
