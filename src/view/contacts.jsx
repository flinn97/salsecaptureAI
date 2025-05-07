/**
 * Contacts component. This component renders the contacts page,
 * including a large card with the custom ContactsCard component.
 * It extends the GetAllComponents class from 'flinntech'.
 */
import { Card } from "flinntech";
import { GetAllComponents } from "flinntech";
import ContactsCard from "./contactCard"; // Custom component for displaying contacts
import "./contacts.css";
import ContactPopup from "./popups/contactPopup";
export default class Contacts extends GetAllComponents {
    /**
     * Constructor for the Contacts component.
     * @param {object} props - Properties passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            defaultClass: "fit",
            owner:this.app.state.currentUser.getJson()._id
        };
    }

    /**
     * Lifecycle method that runs after the component is mounted.
     * Fetches components data from the backend.
     */
    async componentDidMount() {
        await this.getComponentsFromBackend();
    }

    /**
     * Renders the Contacts component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass}
            style={{display:"flex"}}>
                <div style={{width: window.innerWidth > 600?"50%":"100%"}}>
                    <Card theme="NoBorder" type="fit" content={<ContactsCard />} />
                </div>
                    
                    {/* JARED create a new card like this right here just below it that displays the contact info which component is found on contactPopup you can literally use that component for the content section.
                    This is only conditional on clicking the name of a contact and that contact becoming the currentContact in global state this.propsState.currentContact
                    */}
                <div style={{width: window.innerWidth > 600?"50%":"100%", position:"relative"}}>
                    {(this.propsState.currentContact && window.innerWidth > 600) && <Card theme="NoBorder" type="fit"  content={<ContactPopup/>}/>}
                </div>
            </div>
        );
    }
}