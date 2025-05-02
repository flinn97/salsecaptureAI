/**
 * ConversationList component. This component renders a list of conversations using the MapComponent from 'flinntech'.
 * It extends the BaseComponent class.
 */
import { MapComponent } from "flinntech";
import { BaseComponent } from "flinntech";
import CustomMessageListItem from "./components/customessageListItem";
import contactPng from "../assets/contactpng.png"

export default class ConversationList extends BaseComponent {
    /**
     * Constructs the ConversationList component.
     * @param {object} props - The properties passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit messages-container", // Sets the default class for styling
        };
    }

    searchFilter() {

        //search for names
        //search for message body
        //can also search for subjects
    }

    /**
     * Returns the inner content of the ConversationList component.
     * This includes a MapComponent that lists all conversations.
     * @returns {JSX.Element} The inner content of the list.
     */
    getInnerContent() {
        return (
            <MapComponent
                name="conversation" // Name for the MapComponent to identify the type
                mapContainerClass="message-list-scai"
                mapSectionClass="message-item-scai"
                cells={[
                    { type: "customBuilt", custom: <div className="chat-avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>, wrapperStyle: { width: "50px"}, itemStyle: { width: "50px" }  },
                    {
                        type: "custom", custom: CustomMessageListItem, itemClick: (obj) => {
                            // Dispatch to set the currentConversation in global state
                            this.dispatch({ currentConversation: obj, showConversation:window.innerWidth<600? true:undefined });
                            // Set the seen attribute of the conversation to true
                            obj.setCompState({ seen: true });
                        }
                    },

                ]}
                filterFunc={(o) => {
                    let retVal = false;
                    if (!this.propsState.searchText) {
                        retVal= true
                    }
                    let filterText = this.propsState.searchText;



                    if (o.getJson().senderName?.toLowerCase().includes(filterText?.toLowerCase())) {
                        retVal= true;
                    }
                    let messageList = this.componentList.getList("email", o.getJson()._id, "conversationId");
                    for(let m of messageList){
                        if(m.getJson().body?.toLowerCase().includes(filterText?.toLowerCase())){
                            retVal=true
                        }
                    }



                    return retVal


                }}
            />
        );
    }

    /**
     * Renders the ConversationList component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass}>
                {/* Header */}
                <div className="header">Messages</div>
                
                {/* Optional Search Bar */}
                <div className="search-container">
                    <div className="search-bar">
                        <i className="fas fa-search search-icon"></i>
                    <input type="text" placeholder="Search messages..."  onChange={(e) => {
                    this.dispatch({ searchText: e.target.value })
                }}
                           className="search-input"/>
                </div>
                </div>
                {this.getInnerContent()}
            </div>
        );
    }
}