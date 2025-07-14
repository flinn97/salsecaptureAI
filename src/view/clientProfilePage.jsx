/**
 * Contacts component. This component renders the contacts page,
 * including a large card with the custom ContactsCard component.
 * It extends the GetAllComponents class from 'flinntech'.
 */
import { Card } from "flinntech";
import { GetAllComponents } from "flinntech";
import ContactsCard from "./contactCard"; // Custom component for displaying contacts
import ContactProfileCard from "./contactProfileCard";
import "./contacts.css";
import ContactPopup from "./popups/contactPopup";
import ContactProfileDetailCard from "./contactProfileDetailCard.jsx";
import ClientDashboardCard from "./clientPropfile";
export default class ClientProfilePage extends GetAllComponents {
    /**
     * Constructor for the Contacts component.
     * @param {object} props - Properties passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            defaultClass: "fit client-dash-div",
            owner:this.app.state.currentUser.getJson()._id
        };
    }

    /**
     * Lifecycle method that runs after the component is mounted.
     * Fetches components data from the backend.
     */
    async componentDidMount() {
        
        try{
            await this.getComponentsFromBackend();
            let contact = await this.componentList.getComponentFromBackend({type:"contact", ids:this.propsState.currentUser.getJson()._id, filterKeys:"email"});
            //goals hw tasks calendar events conversations
            let goals = await this.componentList.getComponentsFromBackend({type:"goal", ids:contact.getJson()._id, filterKeys:"contactId"});
            let hw = await this.componentList.getComponentsFromBackend({type:"homework", ids:contact.getJson()._id, filterKeys:"contactId"});
            let events = await this.componentList.getComponentsFromBackend({type:"calendarEvent", ids:contact.getJson()._id, filterKeys:"contactId"});
            let conversations = await this.componentList.getComponentsFromBackend({type:"conversation", ids:contact.getJson()._id, filterKeys:"contactId"});
            let coach = await this.componentList.getComponentFromBackend({type:"user", ids:contact.getJson().owner, filterKeys:"_id"});
            this.dispatch({currentContact:contact, coach:coach})
        }
        catch(e){
            
            
            alarm(e.toString())
        }
        




    }

    /**
     * Renders the Contacts component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass}>
                
                    {/* JARED create a new card like this right here just below it that displays the contact info which component is found on contactPopup you can literally use that component for the content section.
                    This is only conditional on clicking the name of a contact and that contact becoming the currentContact in global state this.propsState.currentContact
                    */}
                {this.propsState.currentContact &&<Card theme="NoBorder" type="fit" content={<ClientDashboardCard />} /> }
                    {/* {(this.propsState.currentContact && window.innerWidth > 600) && <Card theme="NoBorder" type="fit"  content={<ContactProfileCard/>}/>} */}
            </div>
        );
    }
}