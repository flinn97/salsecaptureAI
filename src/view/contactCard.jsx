/**
 * ContactsCard component. This component renders a card displaying a list of contacts.
 * It includes a header, a button to add a new contact, and a MapComponent to visualize contacts.
 */
import { MapComponent, } from "flinntech";
import { PopupButton } from "flinntech";
import { BaseComponent } from "flinntech";
import add from "../assets/add.png";
import CheckIt from "./components/check";
import ContactsCustomItem from "./components/contactsCustom";
import SCAIPopupButtonTest from "./components/debug/CustomPopupButton";
import CsvUpload from "./csvUpload";

/**
 * ContactsCard class extends BaseComponent to create a contact management card.
 * @extends BaseComponent
 */
export default class ContactsCard extends BaseComponent {
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


    filterFunc() {
        
        let filterText = this.propsState.tags?.split(',')||"";
        let contactList = this.componentList.getList("contact");
        let newList = []
        if(filterText){
            for (let tag of filterText) {
                let list = contactList.filter(obj => obj.getJson().tags.includes(tag))
                newList = [...newList, ...list]
            }
        }
        else{
            newList=[...contactList];
        }
        
        this.dispatch({ selectedContacts: newList })

    }



    /**
     * Returns the inner content of the ContactsCard component.
     * @returns {JSX.Element} The inner content of the card.
     */
    getInnerContent() {
        
        return (
            <div className="map-container">
                <div className="top-nav-float">
                    <nav className="top-nav">
                        <div className="nav-left">
                            <div className="nav-icon">
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="nav-title">Contacts</div>
                        </div>

                        <div className="nav-right">
                            <div className="nav-icon">
                                <button className="btn">A to Z <i className="fa-solid fa-angle-down"></i></button>
                            </div>
                            <div className="nav-icon">
                                <button className="btn"><i className="fa-solid fa-filter"></i></button>
                            </div>
                        </div>


                    </nav>


                    <div className="search-container">
                        <div className="search-bar">
                            <i className="fas fa-search search-icon"></i>
                            <input onChange={(e) => {
                                this.dispatch({ tags: e.target.value })
                            }}
                                className="search-input" placeholder="Search" />
                        </div>
                    </div>

                    <div className="filter-nav">
                        <div className="filter-nav-left">
                            <CheckIt check={this.filterFunc} uncheck={() => { this.dispatch({ selectedContacts: [] }) }} />
                            {/* <div id="selectBtn" className="btn-gray">
                                Select
                            </div> */}
                            Select all {this.propsState.selectedContacts?.length? this.propsState.selectedContacts.length +" Selected":""}
                        </div>

                        <div className="filter-nav-right">
                            <CsvUpload callBack={async (data) => {
                                data = data.data.map((obj, i) => {
                                    obj.owner = this.propsState.currentUser.getJson()._id;
                                    obj.type = "contact";
                                    return obj

                                })
                                this.dispatch({
                                    uploadData: data,
                                    popupSwitch: "uploadData"
                                })
                                await this.operationsFactory.prepare({ prepare: data });

                                this.operationsFactory.run();


                            }} />
                            {/* <div className="btn-gray">
                                Views
                            </div> */}
                            {/* <div id="toggleTags" className="btn-gray">
                                Show Tags
                            </div> */}
                            {/* <PopupButton
                                formclassName="FCImgButton"
                                wrapperclassName="none"
                                content={<div  className="btn-gray">
                                    Add Contact
                                </div>}
                                popupSwitch="addContact"
                            /> */}
                            <SCAIPopupButtonTest
                                formclassName="FCImgButton"
                                wrapperclassName="none"
                                content={<div  className="btn-gray">
                                    Add Contact
                                </div>}
                                popupSwitch="addContact"
                            />
                        </div>
                    </div>

                </div>


                



                {/* Header row for the contacts data table */}

                <div> {/*scrollable section */}
                <MapComponent

                    filterFunc={(o) => {
                        if (!this.propsState.tags) {
                            return true
                        }
                        let filterText = this.propsState.tags.split(',');
                        for (let tag of filterText) {
                            if (tag === "") {
                                continue;
                            }
                            if (o.getJson().tags.includes(tag)) {
                                return true;
                            }
                        }

                        return false


                    }}

                    name="contact"
                    mapContainerclassName="contact-list"
                    mapSectionclassName="contact"
                    cells={[
                        {
                            type: "custom",
                            custom: ContactsCustomItem
                        }
                        // {
                        //     type: "custom",
                        //     custom: CheckIt,
                        //     check: (obj) => {

                        //         let contacts = this.propsState.selectedContacts ? [...this.propsState.selectedContacts] : [];
                        //         contacts.push(obj);
                        //         this.dispatch({ selectedContacts: contacts });
                        //     },
                        //     uncheck: (obj) => {
                        //         let contacts = this.propsState.selectedContacts ? [...this.propsState.selectedContacts] : [];
                        //         contacts = contacts.filter(contact => contact !== obj);
                        //         this.dispatch({ selectedContacts: contacts });
                        //     }
                        // },

                        // {
                        //     type: "attribute",
                        //     name: "name",
                        //     style: { cursor: "pointer" },
                        //     itemClick: (obj) => {
                        //         this.dispatch({ currentPopupComponent: obj, popupSwitch: "updateContact" });
                        //     }
                        // },
                        // { type: "attribute", name: "email" },
                        // { type: "attribute", name: "phone" },
                        // { type: "attribute", name: "status" },
                    ]}
                    hasLink={true}
                /> </div>
                {this.propsState.selectedContacts?.length > 0 &&
                    <div id="floating-select-set" className="floating-select-set">
                        <button className="floating-select-btn">
                            <span className="floating-select-btn-text">Export</span>
                        </button>
                        <button onClick={()=>{
                            for(let contact of this.propsState.selectedContacts){
                                contact.del();

                            }
                            this.dispatch({selectedContacts:[]})
                        }}className="floating-select-btn" >
                            <span className="floating-select-btn-text">Delete</span>
                        </button>
                        <button className="floating-select-btn floating-select-primary-btn">
                            <PopupButton
                    formclassName="FCImgButton"
                    content={<span className="floating-select-btn-text">Add to Sequence</span>}
                    popupSwitch="addToSequence"
                />
                            
                        </button>
                    </div>
                }
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