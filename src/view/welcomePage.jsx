/**
 * Welcome component. This component renders the main view ,
 */
import { BaseComponent, Card } from "flinntech";
import "./welcomePage.css";
import { Link } from "react-router-dom";
import logo from "./../assets/LogoGreen.svg";
import imageCard from "./../assets/imageCard.png";

export default class WelcomePage extends BaseComponent {
  /**
   * Constructor for the welcomePage component.
   * @param {object} props - Properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit", // Sets the default class for styling
    };
  }

  componentWillUnmount() {
    this.operationsFactory.clear();
    this.dispatch({ currentComponent: undefined });
  }

  /**
   * Returns the inner content of the ConversationCard component.
   * It includes a conversation list on the left and a conversation details on the right.
   * @returns {JSX.Element} The inner content of the card.
   */
  getInnerContent() {
    return (
      <div className="layoutRow" style={{ width: "100%", height: "100%" }}>
        <div className="layoutColumn-welcome">
          <img src={logo} style={{ width: "100%" }} />
          <div>
            Welcome to{" "}
            <span style={{ fontWeight: "600" }}>SalesCapture AI</span>! Get
            things started by creating a new research profile so we can help you
            find your next best sales target.
            <Link
              to="/research"
              className="inLine-Link"
              style={{ marginLeft: "8px" }}
            >
              <div>Go to Research</div>
            </Link>
          </div>
          <div>
            Work your contacts in the{" "}
            <Link to="/contacts" className="inLine-Link">
              Contact Center
            </Link>
            , the CRM is great for sales prospecting.
          </div>
          <div>
            <Link to="/content" className="inLine-Link">
              Create content
            </Link>{" "}
            using our awesome AI sales content generator that is tailored to
            your company’s value proposition. The Messaging center is currently
            in Beta with new features being added. More to come there.
          </div>
        </div>

        <div className="layoutColumn-welcome" style={{ flex: 1 }}>
          <img src={imageCard} className="move-img-btm" />
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
