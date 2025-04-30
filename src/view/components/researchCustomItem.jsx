import React from 'react';
import { BaseComponent } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png"; // Keep if needed elsewhere, but avatar uses font-awesome now
import CheckIt from './check';

class ResearchCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
        // No explicit state needed here if using propsState for selectedContacts
    }

   

   

    render() {
        const { obj } = this.props;
        // Assuming obj.getJson() is necessary and works
        let research = obj.getJson();

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="contact-item">
                   
                    {/*<img*/}
                    {/* src={user.picURL !== "" ? user.picURL || contactImg : contactImg}*/}
                    {/* alt="头像"*/}
                    {/* className="contact-avatar"*/}
                    {/*/>*/}

                    <div className="contact-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="contact-info">
                        {/* Consider if this onClick logic is correct. It seems to open a popup for the *clicked* obj, not based on selection state. */}
                        <div onClick={() => {
                             // Assuming obj here refers to the current contact object being rendered
                            this.dispatch({ currentPopupComponent: obj, popupSwitch: "updateContact" });
                        }} className="contact-name">{`${research.name} `}</div>
                        <div className="contact-desc">{research.company}</div>
                    </div>
                    <div className="contact-icon">
                        <i className="fa-solid fa-message" />
                    </div>
                </div>
                <div
                    // The 'active' class here might need dynamic logic if it depends on selection state
                    className="contact-tag-container active"
                >
                    {/* Use optional chaining and check if tags exist before splitting */}
                    {research.tags?.split(",").map((text, index) =>
                         // Add a key prop when mapping lists for performance and stability
                        <button key={index} className="contact-tag-btn">{text}</button>
                    )}
                </div>
            </div>
        );
    }
}

export default ResearchCustomItem;