import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';

class ContactsCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
    }

    render() {
        const { obj } = this.props;
        let user = obj.getJson();
        console.log(user)
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="contact-item">
                    <CheckIt check={(obj) => {

                        let contacts = this.propsState.selectedContacts ? [...this.propsState.selectedContacts] : [];
                        contacts.push(obj);
                        this.dispatch({ selectedContacts: contacts });
                    }}
                        uncheck={(obj) => {
                            let contacts = this.propsState.selectedContacts ? [...this.propsState.selectedContacts] : [];
                            contacts = contacts.filter(contact => contact !== obj);
                            this.dispatch({ selectedContacts: contacts });
                        }
                        } />
                    {/*<img*/}
                    {/*    src={user.picURL !== "" ? user.picURL || contactImg : contactImg}*/}
                    {/*    alt="头像"*/}
                    {/*    className="contact-avatar"*/}
                    {/*/>*/}

                    <div className="contact-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="contact-info">
                        <div onClick={(obj) => {
                            this.dispatch({ currentPopupComponent: obj, popupSwitch: "updateContact" });
                        }} className="contact-name">{`${user.name}`}</div>
                        <div className="contact-desc">{user.company}</div>
                    </div>
                    <div className="contact-icon">
                        <i className="fa-solid fa-message" />

                    </div>
                </div>
                <div
                    className="contact-tag-container active"
                >
                    {user.tags?.split(",").map((text, index) =>
                        <button className="contact-tag-btn">{text}</button>

                    )}
                </div>
            </div>
        );
    }
}

export default ContactsCustomItem;
