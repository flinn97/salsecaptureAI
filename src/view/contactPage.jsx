/**
 * ContactPage component. This component displays the detailed view of a contact,
 * including editable fields for each property of the contact object.
 */
import { GetComponentsFromUrl } from "flinntech";
import { ParentFormComponent } from "flinntech";
import { Card } from "flinntech";

/**
 * ContactPage class extends GetComponentsFromUrl to handle fetching and displaying a specific contact.
 * @extends GetComponentsFromUrl
 */
export default class ContactPage extends GetComponentsFromUrl {
    /**
     * Constructor for the ContactPage component.
     * @param {object} props - Properties passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit", // Default class for layout
            contact: null // Will hold the contact details
        };
    }

    /**
     * Lifecycle method that runs after the component is mounted.
     * Fetches the contact details based on the ID from the URL.
     */
    async componentDidMount() {
        await this.getComponentsFromBackend(); // Fetch contact details
    }

    /**
     * Renders the ContactPage component.
     * It iterates over the contact object properties and creates form components for each.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        const { contact } = this.state; // Get the contact from state

        // Ensure the contact is loaded before rendering
        if (!contact) {
            return <div>Loading...</div>;
        }

        return (
            <div className={this.props.pageClass || this.state.defaultClass}>
                <Card theme="defaultCard" content={this.getInnerContent(contact)} />
            </div>
        );
    }

    /**
     * Returns the inner content of the contact page, creating editable fields for each property.
     * @param {Object} contact - The contact object fetched from the backend.
     * @returns {JSX.Element} The inner content of the ContactPage.
     */
    getInnerContent(contact) {
        return (
            <div>
                <h4>Edit Contact Details</h4>
                {Object.keys(contact).map((key) => (
                    <ParentFormComponent key={key} name={key} update={true} obj={contact} />
                ))}
            </div>
        );
    }
}