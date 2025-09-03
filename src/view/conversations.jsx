/**
 * Conversations component. This component renders the main view for conversations,
 * displaying a list of conversation cards. It extends the GetAllComponents class from 'flinntech'.
 */
import { Card } from "flinntech";
import { GetAllComponents } from "flinntech";
import "./conversations.css";
import ConversationCard from "./conversationCard";
import logo from "../assets/LogoGreen.svg";
import { Link } from "react-router-dom";

export default class Conversations extends GetAllComponents {
  /**
   * Constructor for the Conversations component.
   * @param {object} props - Properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit",
      owner: this.app.state.currentUser.getJson()._id,
    };
  }

  /**
   * Lifecycle method that runs after the component is mounted.
   * Fetches conversation data from the backend.
   */
  async componentDidMount() {
    await this.dispatch({
      currentTopic: undefined,
      currentSubTopic: undefined,
      currentComponent: undefined,
    });
    await this.getComponentsFromBackend();
    // let emails = this.componentList.getList("email");
    // for(let e of emails){
    //     e.del();
    // }
  }

  componentWillUnmount() {
    this.operationsFactory.clear();
    this.dispatch({ currentComponent: undefined });
  }

  /**
   * Renders the Conversations component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    let isWideScreen = window.innerWidth > 600;
    return (
      <div className={this.props.pageClass || this.state.defaultClass}>
        {/* Container for the conversations card */}
        {/* <div className="fit">
                    {this.state.getComponentsFromBackend &&
                        <Card theme="defaultCard" content={<ConversationCard />} />
                    }
                </div> */}

        <div style={{ paddingTop:"22px", display:"flex", flexDirection:"column",  paddingLeft: isWideScreen?"0%":"8%"}}>
             <img src={logo} style={{ width: "50%", marginBottom: "40px" }} />
          <span
            style={{
              fontWeight: "900",
              fontSize: "1.12em",
              color: "#323232",
             
            }}
          >
           Messaging Management Platform Coming Soon
          </span>
          <div style={{ marginTop: "20px", width: "80%", }}>
            We're polishing the Messaging experience. In the meantime, you can manage contacts and research from the left navigation.
          </div>

          <Link to="/contacts" className="inLine-Link" style={{alignSelf:"flex-start", marginTop:"22px"}}>
                Go to Contacts
              </Link>{" "}
        </div>
      </div>
    );
  }
}
