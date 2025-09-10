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
    let isWideScreen = window.innerWidth > 600;
    return (
      <div
        className="layoutRow"
        style={{ width: "100%", height: "100%", padding: "12px" }}
      >
        <div className="layoutColumn-welcome" >
          <img src={logo} style={{ width: "50%", marginBottom: "40px" }} />
          <div>
            <span
              style={{
                fontWeight: "900",
                fontSize: "2em",
                color: "#323232",
              }}
            >
              Welcome to SalesCapture AI
            </span>
            <div style={{ marginTop: "20px" }}>
              Leverage the power of AI to supercharge your sales process
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: isWideScreen ? "row" : "column",
              gap: "1em",
              marginTop: "30px",
              paddingBottom:isWideScreen?"0px":"64px"
            }}
          >
            <div className="opener-page-card">
              <div
                style={{
                  maxWidth: "45px",
                  maxHeight: "45px",
                  fontSize: "3em",
                  color: "var(--app-green-3)",
                }}
              >
               <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="main-title">Research Agent</div>
              <div className="main-message">
                Identify the next best salees targets
              </div>
              <Link to="/research" className="inLine-Link">
                <div>Go to Research</div>
              </Link>
            </div>
            <div className="opener-page-card">
              <div
                style={{
                  maxWidth: "45px",
                  maxHeight: "45px",
                  fontSize: "3em",
                  color: "var(--app-green-3)",
                }}
              >
                <i class="fa-solid fa-file-contract"></i>
              </div>
              <div className="main-title">Content Engine</div>
              <div className="main-message">
                Quickly generate effective sales content
              </div>
              <Link to="/content" className="inLine-Link">
                Create Content
              </Link>{" "}
            </div>
            <div className="opener-page-card">
              <div
                style={{
                  maxWidth: "45px",
                  maxHeight: "45px",
                  fontSize: "3em",
                  color: "var(--app-green-3)",
                }}
              >
                <i class="fa-solid fa-envelope-circle-check"></i>
              </div>
              <div className="main-title">Automated BDR</div>
              <div className="main-message">
                Engage prospects with outbound campaigns
              </div>
              <Link to="/contacts" className="inLine-Link">
                Start Campaign
              </Link>{" "}
            </div>
          </div>
        </div>

        {/* <div className="layoutColumn-welcome" style={{ flex: 1 }}>
          <img src={imageCard} className="move-img-btm" />
        </div> */}
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
