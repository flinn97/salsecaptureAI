/**
 * Conversations component. This component renders the main view for conversations,
 * displaying a list of conversation cards. It extends the GetAllComponents class from 'flinntech'.
 */
import { Card } from "flinntech";
import ConversationCard from "./ConversationCard"; // Custom component for individual conversation cards
import { GetAllComponents } from "flinntech";
import "./conversations.css";

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
        };
    }

    /**
     * Lifecycle method that runs after the component is mounted.
     * Fetches conversation data from the backend.
     */
    async componentDidMount() {
        await this.dispatch({ currentTopic: undefined, currentSubTopic: undefined, currentComponent: undefined });
        this.getComponentsFromBackend();
    }

    /**
     * Renders the Conversations component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass} style={{ padding: "20px" }}>
                {/* Container for the conversations card */}
                <div className="fit" style={{width:"50%", marginLeft:"300px", height:"60%"}}>
                    <Card theme="defaultCard" content={<ConversationCard />} />
                </div>
            </div>
        );
    }
}