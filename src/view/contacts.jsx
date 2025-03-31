/**
 * Contacts component. This component renders the contacts page,
 * including a large card with the custom ContactsCard component.
 * It extends the GetAllComponents class from 'flinntech'.
 */
import { Card } from "flinntech";
import { GetAllComponents } from "flinntech";
import ContactsCard from "./contactCard"; // Custom component for displaying contacts

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
            <div className={this.props.pageClass || this.state.defaultClass}>
                <div style={{ margin: "20px" }}>
                    <Card theme="defaultCard" content={<ContactsCard />} />
                </div>
            </div>
        );
    }
}