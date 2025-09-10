/**
 * ContactsCard component. This component renders a card displaying a list of contacts.
 * It includes a header, a button to add a new contact, and a MapComponent to visualize contacts.
 */
import { MapComponent } from "flinntech";
import { PopupButton } from "flinntech";
import { BaseComponent } from "flinntech";
import add from "../assets/add.png";
import CheckIt from "./components/check";
import ContactsCustomItem from "./components/contactsCustom";
import SCAIPopupButtonTest from "./components/debug/CustomPopupButton";
import CsvUpload from "./csvUpload";
import React from "react";

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
      showFilter: false,
      filterAll: true,
      filterTags: true,
      filterCompany: true,
      filterName: true,
    };

    this.dropdownRef = React.createRef(); //for hiding filter
    this.buttonRef = React.createRef();
  }

  async componentDidMount() {
    this.dispatch({ selectedContacts: [] })

    this.APIService.subscribeToReadObserver(async ()=>{

      
      
      await this.componentList.sortSelectedListbyFirebaseDate('contact', true);
      this.setState({start:true})

    })
    this.APIService.subscribeToDispatchObserver(async (changes) => {
      debugger
      
      // grab the live array of contact-components
      const list = this.componentList.getList("contact");
    
      for (let change of changes) {
        if (change.added) {
          for (let contact of change.added) {
            if (contact.type === "contact") {
              // 1. find existing index in the list
              const idx = list.findIndex(c =>
                // adapt to your shape: maybe c.id === contact.id, or c.getJson()._id === contact._id
                c.getJson()._id === contact._id
              );
              let addToFront = list[idx]

    
              // 2. if it exists, remove it
              if (idx > -1) {
                list.splice(idx, 1);
              }
    
              // 3. then put it at the front
              list.unshift(addToFront);
            }
          }
        }
      }
      await this.componentList.setSelectedList("contact", list)
      await this.componentList.sortSelectedListbyFirebaseDate('contact', true);

    
      // trigger your view to re-render
      this.dispatch({});
    });

    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    // Clean up
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target) &&
      !this.buttonRef.current.contains(event.target) &&
      this.state.showFilter
    ) {
      this.setState({ showFilter: false });
    }
  };

  // flip the dropdown open/closed
  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  // “All” toggles everything
  onAllChange = e => {
    const all = e.target.checked;
    this.setState({
      filterAll: all,
      filterTags: all,
      filterCompany: all,
      filterName: all,
    });
  };

  // individual boxes turn off “All”
  onFilterChange = key => e => {
    this.setState({ [key]: e.target.checked, filterAll: false });
  };

  filterFunc() {
    const { tags } = this.propsState;
    const contactList = this.componentList.getList("contact");
  
    // 1️⃣ If there's no text in the search bar, show all contacts.
    if (!tags) {
      this.dispatch({ selectedContacts: [...contactList] });
      return;
    }
  
    // 2️⃣ If no filter categories are active, show none.
    const noFiltersActive = !this.state.filterName &&
                            !this.state.filterCompany &&
                            !this.state.filterTags;
    if (noFiltersActive) {
      this.dispatch({ selectedContacts: [] });
      return;
    }
  
    // 3️⃣ Prepare search terms (lowercased, trimmed, non-empty).
    const searchTerms = tags
      .toLowerCase()
      .split(",")
      .map(term => term.trim())
      .filter(term => term);
  
    // 4️⃣ Filter the list.
    const newList = contactList.filter(o => {
      const json = o.getJson();
      return searchTerms.some(term => {
        // Name filter
        if (this.state.filterName) {
          const first = (json.firstName || "").toLowerCase();
          const last  = (json.lastName  || "").toLowerCase();
          if (`${first} ${last}`.includes(term)) {
            return true;
          }
        }
  
        // Company filter
        if (this.state.filterCompany &&
            json.company &&
            json.company.toLowerCase().includes(term)) {
          return true;
        }
  
        // Tags filter
        if (this.state.filterTags) {
          // standard tags
          if (typeof json.tags === "string") {
            const tagList = json.tags
              .toLowerCase()
              .split(",")
              .map(t => t.trim());
            if (tagList.some(t => t.includes(term))) {
              return true;
            }
          }
          // finishedSequenceTags
          if (typeof json.finishedSequenceTags === "string") {
            const seqTags = json.finishedSequenceTags
              .toLowerCase()
              .split(",")
              .map(t => t.trim());
            if (seqTags.some(t => t.includes(term))) {
              return true;
            }
          }
          // special “replied” case
          if (term === "replied" && json.replied) {
            return true;
          }
        }
  
        return false;
      });
    });
  
    // 5️⃣ Dispatch the filtered result.
    this.dispatch({ selectedContacts: newList });
  }

  /**
   * Returns the inner content of the ContactsCard component.
   * @returns {JSX.Element} The inner content of the card.
   */
  getInnerContent() {
    let selCon = this.propsState.selectedContacts;
    let allCon = this.propsState.componentList.getList("contact");
    let showChecked = selCon?.length > 0;
    let allTotal = allCon?.length ? "/" + allCon?.length : "";
    let allSelect = selCon?.length === allCon?.length;

    return (<>
      {this.state.start&&
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
              {/* <div className="nav-icon">
                <button className="btn">
                  A to Z <i className="fa-solid fa-angle-down"></i>
                </button>
              </div> */}
              <div className="nav-icon">
                <button ref={this.buttonRef} onClick={() => { this.setState({ showFilter: !this.state.showFilter }) }} className="btn">
                  <i className="fa-solid fa-filter"></i>
                </button>
                <div>
                  {this.state.showFilter && (
                    <div className="filter-dropdown" ref={this.dropdownRef}>
                      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Search:</div>
                      <label className="filter-row"><input style={{marginRight:"8px"}}
                        type="checkbox"
                        checked={this.state.filterAll}
                        onChange={this.onAllChange}
                      /> All:</label>
                      <label className="filter-row"><input className="filter-check"
                        type="checkbox"
                        checked={this.state.filterTags}
                        onChange={this.onFilterChange('filterTags')}
                      /> Tags</label>
                      <label className="filter-row"><input className="filter-check"
                        type="checkbox"
                        checked={this.state.filterCompany}
                        onChange={this.onFilterChange('filterCompany')}
                      /> Company</label>
                      <label className="filter-row"><input className="filter-check"
                        type="checkbox"
                        checked={this.state.filterName}
                        onChange={this.onFilterChange('filterName')}
                      /> Name</label>
                    </div>
                  )}
                </div>
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
                    label={allSelect ? `Deselect All` : `Select All`}
                    check={this.filterFunc}
                    uncheck={() => {
                      this.dispatch({ selectedContacts: [] });
                    }}
                  />
                </div>
              </>

              <span className="count-desc">
                {this.propsState.selectedContacts?.length
                  ? this.propsState.selectedContacts.length + `${allTotal} Selected`
                  : ""}
              </span>
            </div>

            {!showChecked && (
              <div className="filter-nav-right">
                <CsvUpload
                  callBack={async (data) => {
                    data = data.data.map((obj, i) => {
                      obj.owner = this.propsState.currentUser.getJson()._id;
                      obj.type = "contact";
                      obj.companyOwnerId = this.propsState.currentUser.getJson().companyId;
                      return obj;
                    });
                    this.dispatch({
                      uploadData: data,
                      popupSwitch: "uploadData",
                    });
                    await this.operationsFactory.prepare({ prepare: data });

                    this.operationsFactory.run();
                  }}
                />
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
                  wrapperclassName="none"
                  content={
                    <div

                      className="dark-button-1"
                      style={{
                        position: "relative",
                        width: "fit-content",
                      }}
                    >
                      Add Contact
                    </div>
                  }
                  popupSwitch="addContact"
                />

              </div>)}
          </div>
        </div>

        {/* Header row for the contacts data table */}

        <div style={{ paddingBottom: '60px' }}>
          {" "}
          {/*scrollable section */}
          <MapComponent
            filterFunc={(o) => {
              // If there's no text in the search bar, we show all contacts.
              if (!this.propsState.tags) {
                  return true;
              }
          
              // If the user has unchecked all filter categories (Name, Company, Tags),
              // then no contact can match the search criteria.
              const noFiltersActive = !this.state.filterName && !this.state.filterCompany && !this.state.filterTags;
              if (noFiltersActive) {
                  return false;
              }
          
              // Prepare the search terms from the input field.
              // This splits a comma-separated string into an array of individual terms,
              // converts them to lowercase, trims whitespace, and removes any empty entries.
              const searchTerms = this.propsState.tags.toLowerCase().split(",").map(term => term.trim()).filter(term => term);
              const contactJson = o.getJson();
          
              // We now check if any of the search terms match the contact in any of the active filter categories.
              for (const term of searchTerms) {
                  // Search by Name (if enabled)
                  if (this.state.filterName) {
                      // Safely get lowercase first and last names, defaulting to an empty string if null/undefined.
                      const firstName = (contactJson.firstName || '').toLowerCase();
                      const lastName = (contactJson.lastName || '').toLowerCase();
                      const fullName = `${firstName} ${lastName}`;
          
                      // Check if the search term is a substring of the full name.
                      if (fullName.includes(term)) {
                          return true;
                      }
                  }
          
                  // Search by Company (if enabled)
                  // Performs a case-insensitive substring search on the contact's company.
                  if (this.state.filterCompany && contactJson.company && contactJson.company.toLowerCase().includes(term)) {
                      return true;
                  }
          
                  // Search by Tags (if enabled)
                  if (this.state.filterTags) {
                    
                      // Handle standard tags, now treated as a comma-separated string.
                      if (contactJson.tags && typeof contactJson.tags === 'string') {
                          const tagList = contactJson.tags.split(',').map(t => t.trim().toLowerCase());
                          for(let check of tagList){
                            if (check.includes(term)) {
                              return true;
                          }
                          }
                         
                      }
          
                      // Handle finished sequence tags, also a comma-separated string.
                      if (contactJson.finishedSequenceTags && typeof contactJson.finishedSequenceTags === 'string') {
                          const finishedTagList = contactJson.finishedSequenceTags.split(',').map(t => t.trim().toLowerCase());
                          for(let check of finishedTagList){
                            if (check.includes(term)) {
                              return true;
                          }
                          }
                         
                      }
                      
                      // Special case to check for replied status.
                      if (term === "replied" && contactJson.replied) {
                          return true;
                      }
                  }
              }
          
              // If, after checking all terms against all active filters, no match was found,
              // the contact should be filtered out.
              return false;
          }}
            name="contact"
            type="viewPortMap"
            mapContainerClass="contact-list"
            mapSectionClass="contact"
            wrapperClass="none"

            cells={[
              {
                type: "custom",
                custom: ContactsCustomItem,
                wrapperClass:"none"
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
          />{" "}
        </div>
        {this.propsState.selectedContacts?.length > 0 && (
          <div id="floating-select-set" className="floating-select-set">
            <button
              onClick={() => { this.dispatch({ popupSwitch: "addTags" }) }}
              className="floating-select-btn">
              <span className="floating-select-btn-text">Tags</span>
            </button>
            <button
              onClick={() => {
                for (let contact of this.propsState.selectedContacts) {
                  contact.del();
                }
                this.dispatch({ selectedContacts: [] });
              }}
              className="floating-select-btn"
            >
              <span className="floating-select-btn-text">Delete</span>
            </button>
            <button className="floating-select-btn floating-select-primary-btn">
              <PopupButton
                content={
                  <span className="floating-select-btn-text" style={{ color: "white" }}>
                    Add to Sequence
                  </span>
                }
                popupSwitch="addToSequence"
              />
            </button>
          </div>
        )}
      </div>}
      </>
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
