import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png"; // Keep if needed elsewhere, but avatar uses font-awesome now
import CheckIt from './check';
import { Link } from 'react-router-dom';

class TaskCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
        // No explicit state needed here if using propsState for selectedContacts
    }

    // Use arrow function for auto-binding 'this'
    handleCheckContact = (obj) => {
        
        // Ensure we get the latest state within the handler
        // Although BaseComponent's dispatch might handle this, accessing state inside the handler
        // defined as a class method is safer.
        //for some reason propsState didn't update in this component though it did for all the other components
        let contacts = this.props.app.state.selectedContacts ? [...this.props.app.state.selectedContacts] : [];

        // Add the object if it's not already there (filter below handles removal, but prevent duplicates)
        if (!contacts.includes(obj)) {
            contacts.push(obj);
        }
        //same here something seems up with this component making it use a completely seperate dispatch.
        this.dispatch({ selectedContacts: contacts });
    }

    // Use arrow function for auto-binding 'this'
    handleUncheckContact = (obj) => {
        // Ensure we get the latest state within the handler
        let contacts = this.props.app.state.selectedContacts ? [...this.props.app.state.selectedContacts] : [];

        // Filter out the object
        contacts = contacts.filter(contact => contact !== obj);

        this.dispatch({ selectedContacts: contacts });
    }

    render() {
        const { obj } = this.props;
        // Assuming obj.getJson() is necessary and works
        let task = obj.getJson();

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="contact-item">
                    {/*<CheckIt*/}
                    {/*    checkKey="selectedContacts"*/}
                    {/*    obj={obj}*/}
                    {/*    // Pass references to the class methods*/}
                    {/*    check={this.handleCheckContact}*/}
                    {/*    uncheck={this.handleUncheckContact}*/}
                    {/*/>*/}
                    {/*<img*/}
                    {/* src={user.picURL !== "" ? user.picURL || contactImg : contactImg}*/}
                    {/* alt="头像"*/}
                    {/* className="contact-avatar"*/}
                    {/*/>*/}

                    
                    <div className="contact-info">
                        {/* Consider if this onClick logic is correct. It seems to open a popup for the *clicked* obj, not based on selection state. */}
                        <Link to={`../session/${this.componentList.getComponent("session", task._id, "taskId")?.getJson()._id}`} className="contact-name">{`${task.name}`}</Link>
                        <div className="contact-desc">{task.dueDate}</div>
                    </div>
                    {/*<div className="contact-icon">*/}
                    {/*    <i className="fa-solid fa-message" />*/}
                    {/*</div>*/}
                </div>
                <div
                    // The 'active' class here might need dynamic logic if it depends on selection state
                    className="contact-tag-container active"
                >
                    {/* Use optional chaining and check if tags exist before splitting */}
                    {task.tags?.split(",").map((text, index) =>
                         // Add a key prop when mapping lists for performance and stability
                         <Link to={`../session/${this.componentList.getComponent("session", task._id, "taskId")?.getJson()._id}`}  key={index} className="contact-tag-btn">{text}</Link>
                    )}
                </div>
            </div>
        );
    }
}

export default TaskCustomItem;