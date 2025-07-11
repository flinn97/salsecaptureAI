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
      priority:0
    };
  }



  handleBack = () => {
    if(this.state.priority!==0){
      this.setState({priority:this.state.priority-1})

    }
    else{
      this.dispatch({clientRegisterState:'clientInfo'})
    }
  };

  handleContinue = async () => {
    if(this.state.priority+1 === this.componentList.getList("question").length){
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
    }
    else{
      this.setState({priority:this.state.priority+1})

    }

    
  };

  getInnerContent() {
    let obj = this.propsState.currentContact
    let question = this.componentList.getComponent("question", this.state.priority, "priority");
    return (
      <div className="about-container">
        <h1 className="about-title">{question.getJson().subject}</h1>

        <p className="about-question">
          {question.getJson().question}
        </p>

        <ParentFormComponent type={"quill"} rows={4} obj={obj} name={question.getJson()._id}/>


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
