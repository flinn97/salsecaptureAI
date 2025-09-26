/**
 * ContactsCard component. This component renders a card displaying a list of contacts.
 * It includes a header, a button to add a new contact, and a MapComponent to visualize contacts.
 */
import { MapComponent, UploadButton, urlService } from "flinntech";
import { PopupButton } from "flinntech";
import { BaseComponent } from "flinntech";
import add from "../assets/add.png";
import CheckIt from "./components/check";
import ContactsCustomItem from "./components/contactsCustom";
import CsvUpload from "./csvUpload";
import ProspectCustomItem from "./components/prospectCustomItem";
import AskIsaac from "./popups/aiAgents/askIsaac";
const ANALYZE_BUSINESS_CARD_URL = "https://analyzebusinesscard-7c5i3vsqma-uc.a.run.app";

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
      uploadingCard: false,
      analyzeMsg: null,
      
      defaultClass: "fit",
      title: "Contacts",
    };
    this.id = urlService.getIdFromURL();        // compute once
    this.state = { ...this.state, defaultClass: "fit", title: "Contacts", start:false };
    this.setSearch = this.debounce((val)=> this.dispatch({ tags: val }), 220);
  }

// --- helper: convert File to base64 WITHOUT the 'data:*;base64,' header ---
fileToBase64NoHeader(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result || "");
      const commaIdx = raw.indexOf(",");
      resolve(commaIdx >= 0 ? raw.slice(commaIdx + 1) : raw);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- handler: send file → Cloud Function ---
handleBusinessCardFile = async (evt) => {
  try {
    const file = evt?.target?.files?.[0];
    if (!file) return;

    this.setState({ uploadingCard: true, analyzeMsg: null });

    // researchId = current page id (you already compute this.id in ctor)
    const researchId = this.id;

    // convert to base64 string without header
    const imageBase64 = await this.fileToBase64NoHeader(file);

    // build request body (you can add config/apiKey/AIType if you want)
    const body = { researchId, image: imageBase64 };

    const res = await fetch(ANALYZE_BUSINESS_CARD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || `HTTP ${res.status}`);
    }

    // Show counts returned by the function
    const c = data?.counts || {};
    this.setState({
      analyzeMsg: `Analyzed. Created: ${c.created || 0}, Updated: ${c.upserted || 0}, Skipped: ${c.skipped || 0}`,
    });

    // optional: refresh your list so new potentialProspects show up
    // If your framework has a refresh hook, call it here; otherwise force a render.
    this.setState({});
  } catch (err) {
    this.setState({ analyzeMsg: `Analyze failed: ${err?.message || String(err)}` });
    console.error("Business card analyze error:", err);
  } finally {
    this.setState({ uploadingCard: false });
    // reset the input so the same file can be re-selected if needed
    if (evt?.target) evt.target.value = "";
  }
};
 // simple debounce helper
 debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(()=> fn(...args), ms);
  };
}
  componentDidMount() {
    this.dispatch({ selectedContacts: [] });

    // let the browser paint, then mount the heavy list
    if ('requestIdleCallback' in window) {
      requestIdleCallback(()=> this.setState({ start:true }), { timeout: 300 });
    } else {
      setTimeout(()=> this.setState({ start:true }), 0);
    }
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
          obj?.getJson().tags.includes(tag)
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
    let allSelect = selCon?.length === allCon?.length;

    return (
      <div className="mobile-container">
        {research?.getJson().agentType==="askIsaac"?(<><AskIsaac/></>):(<>
        <div className="top-nav-float">
          <nav className="top-nav">
            <div className="nav-left">
              <div className="nav-icon">
                <i className="fas fa-circle"></i>
              </div>
              <div className="nav-title">Researched Potential Prospects</div>
            </div>

            <div onClick={() => {
              research.setCompState({ active: !research?.getJson().active })
              research.update();
              this.setState();

            }}>{research?.getJson().active ? "Pause" : "activate"}</div>
            {research?.getJson().researchType === "businessCard" && (
  <div className="bizcard-uploader" style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <input
      id="bizcard-input"
      type="file"
      accept="image/*"
      capture="environment"     // mobile: open rear camera by default
      onChange={this.handleBusinessCardFile}
      style={{ display: "none" }}
    />
    <label htmlFor="bizcard-input" className="btn">
      {this.state.uploadingCard ? "Analyzing..." : "Scan Business Card"}
    </label>
    {this.state.analyzeMsg && (
      <span style={{ fontSize: 12, opacity: 0.8 }}>{this.state.analyzeMsg}</span>
    )}
  </div>
)}



            <div className="nav-right">
              <div className="nav-icon">
                <button className="btn">
                  A to Z <i className="fa-solid fa-angle-down"></i>
                </button>
              </div>
              <div className="nav-icon">
                <button
                  onClick={async () => {
                    try {
                      const r = (research?.getJson?.() || research) || {};
                      const payload = {
                        companyId: r.companyId || r.companyOwnerId,       // backend resolves by companyId
                        researchIds: [r._id || r.id].filter(Boolean),     // send the one you're running
                      };

                      if (!payload.companyId) throw new Error("Missing companyId on research");
                      if (payload.researchIds.length === 0) throw new Error("Missing research id");

                      const url = "https://getcontacts-7c5i3vsqma-uc.a.run.app";
                      const res = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      });

                      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                      const data = await res.json();
                      console.log("getContacts triggered:", data);
                    } catch (error) {
                      console.error("Error calling getContacts:", error);
                    }
                  }}
                  className="btn"
                >
                  Get Research <i className="fa-solid fa-angle-down"></i>
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
  onChange={(e) => this.setSearch(e.target.value)}
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
                    label={allSelect ? "Deselect All" : `Select All`}
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
        {this.state.start && (
        <div style={{ paddingBottom: '60px' }}>
        
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
                if (o?.getJson().tags.includes(tag)) {
                  return true;
                }
              }

              return false;
            }}
            filter={{ search: id, attribute: "researchId" }}
            name="potentialProspect"
            type="viewPortMap"
            mapContainerClass="contact-list"
            mapSectionClass="contact"
            wrapperClass="none"

            cells={[
              {
                type: "custom",
                custom: ProspectCustomItem,
                wrapperClass: "none",
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
  
        </div>
        )}
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
            <button onClick={() => {
              for (let prospect of this.propsState.selectedContacts) {
                prospect.copy({ type: "contact", ogPPId: prospect?.getJson()._id })
              }
            }} className="floating-select-btn floating-select-primary-btn hover-basic">

              <span className="floating-select-btn-text">
                Add Prospect
              </span>

            </button>
            <button
              style={{ width: "110px" }}
              className="floating-select-btn floating-select-primary-btn hover-basic">
              <PopupButton
                formclassName="FCImgButton"
                content={
                  <span onClick={() => {
                    let contacts = this.propsState.selectedContacts;
                    for (let pp of contacts) {
                      pp.copy({ type: "contact", ogPPId: pp?.getJson()._id });
                    }
                    this.dispatch({ sequenceDataType: "research" })

                  }} className="floating-select-btn-text"
                    style={{ color: "white", }}>
                    Add to Sequence
                  </span>
                }
                popupSwitch="addToSequence"
              />
            </button>
          </div>
        )}</>)}
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
