/**
 * Conversations component. This component renders the main view for conversations,
 * displaying a list of conversation cards. It extends the GetAllComponents class from 'flinntech'.
 */
import { Card } from "flinntech";
import { GetAllComponents } from "flinntech";
import "./conversations.css";
import ConversationCard from "./conversationCard";

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
            owner: this.app.state.currentUser.getJson()._id
        };
    }

    /**
     * Lifecycle method that runs after the component is mounted.
     * Fetches conversation data from the backend.
     */
    async componentDidMount() {
        await this.dispatch({ currentTopic: undefined, currentSubTopic: undefined, currentComponent: undefined });
        await this.getComponentsFromBackend();
        // let emails = this.componentList.getList("email");
        // for(let e of emails){
        //     e.del();
        // }
    }

  
    componentWillUnmount() {
        this.operationsFactory.clear();
        this.dispatch({ currentComponent: undefined })
    }


    /**
     * Renders the Conversations component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass}>
                {/* Container for the conversations card */}
                <div className="fit">
                    {this.state.getComponentsFromBackend &&
                        <Card theme="defaultCard" content={<ConversationCard />} />
                    }
                </div>
            </div>
        );
    }
}