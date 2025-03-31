/**
 * ContactsCard component. This component renders a card displaying a list of contacts.
 * It includes a header, a button to add a new contact, and a MapComponent to visualize contacts.
 */
import { MapComponent, } from "flinntech";
import { PopupButton } from "flinntech";
import { BaseComponent } from "flinntech";
import add from "../assets/add.png";
import CheckIt from "./components/check";
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

    filterFunc(){
        debugger
        let filterText = this.propsState.tags.split(',');
        let contactList = this.componentList.getList("contact");
        let newList =[]
        for(let tag of filterText){
            let list = contactList.filter(obj=>obj.getJson().tags.includes(tag))
            newList=[...newList, ...list]
        }
        this.dispatch({selectedContacts:newList})
        
    }



    /**
     * Returns the inner content of the ContactsCard component.
     * @returns {JSX.Element} The inner content of the card.
     */
    getInnerContent() {
        return (
            <>
                <h4 style={{ marginBottom: "10px" }}>{this.state.title}</h4>
                {/* Button to add a new contact */}
                <PopupButton
                    formClass="FCImgButton"
                    content={<img src={add} style={{ width: "30px", height: "30px" }} />}
                    popupSwitch="addContact"
                />
                <PopupButton
                    formClass="FCImgButton"
                    content={<div>Add to Sequence</div>}
                    popupSwitch="addToSequence"
                />
                <CsvUpload callBack={async (data) => {
                    data = data.data.map((obj, i) => {
                        obj.owner = this.propsState.currentUser.getJson()._id;
                        obj.type = "contact";
                        return obj

                    })
                    await this.operationsFactory.prepare({ prepare: data });
                    this.operationsFactory.run();


                }} />
                <input onChange={(e) => {
                    this.dispatch({ tags: e.target.value })
                }}
                    style={{
                        borderRadius: "50px", background: "#ffdead05", width: "50vw", color: "black", border: "1px solid gray",
                        height: window.innerWidth > 700 ? "3rem" : "1.8rem", fontSize: window.innerWidth > 700 ? "1.8rem" : "1rem", paddingLeft: window.innerWidth > 700 ? "50px" : "52px", paddinRight: "1rem", marginRight: window.innerWidth > 700 ? "29px" : "-20px"
                    }} />
                <CheckIt check={this.filterFunc} uncheck={()=>{this.dispatch({selectedContacts:[]})}} />
                <div className="fit" style={{ backgroundColor: "#f8f5f5", width: "92%" }}>
                    {/* Header row for the contacts data table */}
                    <div className="Map-Section-ei" style={{ padding: "10px", paddingLeft: "15px", display: "flex", flexDirection: "row" }}>
                        <div className="Map-Cell textBold">Name</div>
                        <div className="textBold Map-Cell">Email</div>
                        <div className="textBold Map-Cell">Phone</div>
                        <div className="textBold Map-Cell">Status</div>
                    </div>
                    {/* Scrollable section for the contacts data */}
                    <div className="scroller" style={{ height: "130px", marginLeft: "12px" }}>
                        <MapComponent
                        filterFunc={(o)=>{
                            if(!this.propsState.tags){
                                return true
                            }
                            let filterText = this.propsState.tags.split(',');
                            for(let tag of filterText){
                                if(tag===""){
                                    continue;
                                }
                                if(o.getJson().tags.includes(tag)){
                                    return true;
                                }
                            }
                            
                                return false
                            
                            
                        }}

                            name="contact"
                            mapSectionClass="Map-Section-ei"
                            cells={[
                                {
                                    type: "custom",
                                    custom: CheckIt,
                                    check: (obj) => {
                                        
                                        let contacts = this.propsState.selectedContacts ? [...this.propsState.selectedContacts] : [];
                                        contacts.push(obj);
                                        this.dispatch({ selectedContacts: contacts });
                                    },
                                    uncheck: (obj) => {
                                        let contacts = this.propsState.selectedContacts ? [...this.propsState.selectedContacts] : [];
                                        contacts = contacts.filter(contact => contact !== obj);
                                        this.dispatch({ selectedContacts: contacts });
                                    }
                                },

                                {
                                    type: "attribute",
                                    name: "name",
                                    style: { cursor: "pointer" },
                                    itemClick: (obj) => {
                                        this.dispatch({ currentPopupComponent: obj, popupSwitch: "updateContact" });
                                    }
                                },
                                { type: "attribute", name: "email" },
                                { type: "attribute", name: "phone" },
                                { type: "attribute", name: "status" },
                            ]}
                            hasLink={true}

                        />
                    </div>
                </div>
            </>
        );
    }

    /**
     * Renders the ContactsCard component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass} style={{ marginLeft: "300px", width: "80%" }}>
                {this.getInnerContent()}
            </div>
        );
    }
}