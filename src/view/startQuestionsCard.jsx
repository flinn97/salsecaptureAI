import { BaseComponent } from "flinntech";

export default class StartQuestionsCard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit",
    };
  }

  handleBegin = () => {
    // this will switch the Contacts component over to your "startQuestions" card
    this.dispatch({ clientRegisterState: "clientInfo" });
  };

  getInnerContent() {
    return (
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome to Viridian Coaching</h1>
        <p className="welcome-subtitle">
          Your coach has a few questions for you
        </p>
        <button
          className="begin-button"
          onClick={this.handleBegin}
        >
          Begin
        </button>
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
