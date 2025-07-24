/**
 * ContactsCard component. This component renders a card displaying a list of contacts.
 * It includes a header, a button to add a new contact, and a MapComponent to visualize contacts.
 */
import { MapComponent, urlService } from "flinntech";
import { PopupButton } from "flinntech";
import { BaseComponent } from "flinntech";
import add from "../assets/add.png";
import CheckIt from "./components/check";
import ContactsCustomItem from "./components/contactsCustom";
import CsvUpload from "./csvUpload";
import ProspectCustomItem from "./components/prospectCustomItem";

/**
 * ContactsCard class extends BaseComponent to create a contact management card.
 * @extends BaseComponent
 */
export default class ProspectCard extends BaseComponent {
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

  componentDidMount(){
    this.dispatch({ selectedContacts: [] })
  }

  filterFunc() {
    let id = urlService.getIdFromURL();
    let filterText = this.propsState.tags?.split(",") || "";
    let contactList = this.componentList.getList(
      "potentialProspect",
      id,
      "researchId"
    );
    let newList = [];
    if (filterText) {
      for (let tag of filterText) {
        let list = contactList.filter((obj) =>
          obj.getJson().tags.includes(tag)
        );
        newList = [...newList, ...list];
      }
    } else {
      newList = [...contactList];
    }

    this.dispatch({ selectedContacts: newList });
  }

  /**
   * Returns the inner content of the ContactsCard component.
   * @returns {JSX.Element} The inner content of the card.
   */
  getInnerContent() {
    let id = urlService.getIdFromURL();
    let research = this.componentList.getComponent('research', id);

    let selCon = this.propsState.selectedContacts;
    let allCon = this.propsState.componentList.getList(
      "potentialProspect",
      id,
      "researchId"
    );
    let showChecked = selCon?.length > 0;
    let allTotal = allCon?.length ? "/" + allCon?.length : "";
    let allSelect = selCon?.length===allCon?.length;

    return (
      <div className="mobile-container">
        <div className="top-nav-float">
          <nav className="top-nav">
            <div className="nav-left">
              <div className="nav-icon">
                <i className="fas fa-circle"></i>
              </div>
              <div className="nav-title">Researched Potential Prospects</div>
            </div>

            <div className="nav-right">
              <div className="nav-icon">
                <button className="btn">
                  A to Z <i className="fa-solid fa-angle-down"></i>
                </button>
              </div>
              <div className="nav-icon">
                <button onClick={async ()=>{
                  
                  let body = research.getJson();

                  let url = "https://getcontacts-7c5i3vsqma-uc.a.run.app";
                  let json = await JSON.stringify(body)
        
                   // Make the POST request
                   await fetch(url, {
                     method: "POST",
                     headers: {
                       "Content-Type": "application/json",
                     },
                     body:json ,
                   })
                     .then((response) => {
                       if (!response.ok) {
                         throw new Error(`HTTP error! Status: ${response.status}`);
                       }
                       return response.json();
                     })
                     .then((data) => {
                       console.log("Reply sent successfully in thread.", data);
                     })
                     .catch((error) => {
                       console.error("Error sending reply:", error);
                     });

                }} className="btn">
                 Get Research<i className="fa-solid fa-angle-down"></i>
                </button>
              </div>
              <div className="nav-icon">
                <button className="btn">
                  <i className="fa-solid fa-filter"></i>
                </button>
              </div>
            </div>
          </nav>

          <div className="search-container">
            <div className="search-bar">
              <i className="fas fa-search search-icon"></i>
              <input
                onChange={(e) => {
                  this.dispatch({ tags: e.target.value });
                }}
                className="search-input"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="filter-nav">
            <div className="filter-nav-left">
              <>
                <div
                  id="selectBtn"
                  style={{
                    height: "fit-content",
                    marginLeft: "5px",
                    alignContent: "center",
                  }}
                >
                  <CheckIt
                    label={allSelect?"Deselect All":`Select All`}
                    check={this.filterFunc}
                    uncheck={() => {
                      this.dispatch({ selectedContacts: [] });
                    }}
                  />
                </div>
              </>

              <span className="count-desc">
                {this.propsState.selectedContacts?.length
                  ? this.propsState.selectedContacts.length +
                    `${allTotal} Selected`
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Header row for the contacts data table */}

        {/* Scrollable section for the contacts data */}
        <MapComponent
          filterFunc={(o) => {
            if (!this.propsState.tags) {
              return true;
            }
            let filterText = this.propsState.tags.split(",");
            for (let tag of filterText) {
              if (tag === "") {
                continue;
              }
              if (o.getJson().tags.includes(tag)) {
                return true;
              }
            }

            return false;
          }}
          filter={{ search: id, attribute: "researchId" }}
          name="potentialProspect"
          mapContainerclassName="contact-list"
          mapSectionclassName="contact"
          cells={[
            {
              type: "custom",
              custom: ProspectCustomItem,
            },
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
        />
        {this.propsState.selectedContacts?.length > 0 && (
          <div id="floating-select-set" className="floating-select-set">
           
          <button
            onClick={() => {
              for (let contact of this.propsState.selectedContacts) {
                contact.del();
              }
              this.dispatch({ selectedContacts: [] });
            }}
            className="floating-select-btn hover-basic"
          >
            <span className="floating-select-btn-text">Remove</span>
          </button>
          <button onClick={()=>{
            for(let prospect of this.propsState.selectedContacts){
              prospect.copy({type:"contact", ogPPId:prospect.getJson()._id})
            }
          }} className="floating-select-btn floating-select-primary-btn hover-basic">
           
                <span className="floating-select-btn-text">
                  Add Prospect
                </span>
            
          </button>
          <button 
          style={{width:"110px"}}
          className="floating-select-btn floating-select-primary-btn hover-basic">
            <PopupButton
              formclassName="FCImgButton"
              content={
                <span onClick={()=>{
                  let contacts = this.propsState.selectedContacts;
                        for(let pp of contacts){
                            pp.copy({type:"contact", ogPPId:pp.getJson()._id});
                        }
                        this.dispatch({sequenceDataType:"research"})    
                    
                }} className="floating-select-btn-text" 
                style={{color:"white",}}>
                  Add to Sequence
                </span>
              }
              popupSwitch="addToSequence"
            />
          </button>
        </div>
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
