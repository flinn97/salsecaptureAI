/**
 * ContactsCard component. This component renders a card displaying a list of contacts.
 * It includes a header, a button to add a new contact, and a MapComponent to visualize contacts.
 */
import { MapComponent, ParentFormComponent,urlService } from "flinntech";
import { PopupButton } from "flinntech";
import { BaseComponent } from "flinntech";
import add from "../assets/add.png";
import CheckIt from "./components/check";
import ContactsCustomItem from "./components/contactsCustom";
import SCAIPopupButtonTest from "./components/debug/CustomPopupButton";
import TaskCustomItem from "./components/taskCustomItem";
import CsvUpload from "./csvUpload";

/**
 * ContactsCard class extends BaseComponent to create a contact management card.
 * @extends BaseComponent
 */
export default class ClientRegisterCard extends BaseComponent {
    /**
     * Constructor for the ContactsCard component.
     * Initializes component state and properties.
     * @param {Object} props - Properties passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit",
            title: "Contacts",
        };
    }






    /**
     * Returns the inner content of the ContactsCard component.
     * @returns {JSX.Element} The inner content of the card.
     */
    getInnerContent() {
        
        return (
            <div className="mobile-container">
    <div className="task-name"><div>Register</div></div>
    <input 
        type={"text"} 
        value={this.state.email}  
        onChange={(e) => {
            let { value } = e.target;
            this.setState({ email: value });
        }} 
        placeholder="Enter Email"
    />

    <input 
        type={this.state.showPasswords ? "text" : "password"} 
        value={this.state.password}  
        onChange={(e) => {
            let { value } = e.target;
            this.setState({ password: value });
        }} 
        placeholder="Enter password"
    />

    <input 
        type={this.state.showPasswords ? "text" : "password"} 
        value={this.state.password2} 
        onChange={(e) => {
            let { value } = e.target;
            this.setState({ password2: value });
        }} 
        placeholder="Confirm password"
    />

    <div>
        <label>
            <input 
                type="checkbox" 
                checked={this.state.showPasswords} 
                onChange={(e) => {
                    this.setState({ showPasswords: e.target.checked });
                }} 
            />
            Show Passwords
        </label>
    </div>

    <div onClick={async () => {
        if (this.state.password !== this.state.password2) {
            this.setState({ message: "Please make sure both passwords are the same" });
        } else {
            debugger
            this.setState({ message: "" }); // clear message if needed
            // You handle submit
            let password = this.state.password;
            let email = this.state.email;
            await this.componentList.getAPIService().register(email, password);

            let contactId = urlService.getIdFromURL();
            let contact = await this.componentList.getComponentFromBackend({type:"contact", ids:contactId, filterKeys:"_id"});
            let newUser = await this.operationsFactory.prepare({prepare:{type:'user', role:"client", firstTime:true, coachId: contact.getJson().owner, email:contact.getJson().email, owner:contact.getJson().email, _id:contact.getJson().email, collection:contact.getJson().email}});
            
            let user = newUser[0];
            
            this.dispatch({prepUser:user, clientRegisterState:"startQuestions", currentContact:contact});
            
        }
    }}>Submit</div>

    {this.state.message && (
        <div className="error-message">{this.state.message}</div>
    )}
</div>
        );
    }

    /**
     * Renders the ContactsCard component.
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