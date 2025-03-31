/**
 * ConversationCard component. This component renders the individual conversation card,
 * displaying conversation details and associated components. It extends BaseComponent from 'flinntech'.
 */
import { Card } from "flinntech";
import ConversationList from "./ConversationList"; // Custom component for displaying the conversation list
import Conversation from "./Conversation"; // Custom component for displaying conversation details
import { BaseComponent } from "flinntech";

export default class ConversationCard extends BaseComponent {
    /**
     * Constructs the ConversationCard component.
     * @param {object} props - The properties passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit", // Sets the default class for styling
        };
    }
    async componentDidMount(){
        await this.componentList.getComponentsFromBackend({type:"conversation", ids:this.propsState.currentUser.getJson()._id, filterKeys:"owner"});
        this.setState({
            start:true
        })

    }

    /**
     * Returns the inner content of the ConversationCard component.
     * It includes a conversation list on the left and a conversation details on the right.
     * @returns {JSX.Element} The inner content of the card.
     */
    getInnerContent() {
        return (
            <div className="layoutRow" style={{ width: "100%", height: "100%" }}>
                {/* Left side card for the conversation list */}
                <div style={{ width: "50%", padding: "10px" }}>
                    {this.state.start&&<Card theme="defaultCard" content={<ConversationList />} />}
                    
                </div>
                {/* Right side card for the selected conversation details */}
                <div style={{ width: "50%", padding: "10px" }}>
                {this.state.start&&<Card theme="defaultCard" content={<Conversation />} />}
                
                    
                  
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