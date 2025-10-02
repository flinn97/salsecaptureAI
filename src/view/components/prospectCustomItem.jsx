import React from "react";
import { BaseComponent } from "flinntech";
import "./Checkbox.css";
import contactImg from "../../assets/contact.png"; // Keep if needed elsewhere, but avatar uses font-awesome now
import CheckIt from "./check";

class ProspectCustomItem extends BaseComponent {
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
    let contacts = this.props.app.state.selectedContacts
      ? [...this.props.app.state.selectedContacts]
      : [];

    // Add the object if it's not already there (filter below handles removal, but prevent duplicates)
    if (!contacts.includes(obj)) {
      contacts.push(obj);
    }
    //same here something seems up with this component making it use a completely seperate dispatch.
    this.dispatch({ selectedContacts: contacts });
  };

  // Use arrow function for auto-binding 'this'
  handleUncheckContact = (obj) => {
    // Ensure we get the latest state within the handler
    let contacts = this.props.app.state.selectedContacts
      ? [...this.props.app.state.selectedContacts]
      : [];

    // Filter out the object
    contacts = contacts.filter((contact) => contact !== obj);

    this.dispatch({ selectedContacts: contacts });
  };

  async componentDidMount() {
    const { obj } = this.props;
    const j = obj.getJson?.() || {};
    let update = false;
  
    // ---------- helpers ----------
    const isBlank = (v) =>
      v === undefined || v === null || (typeof v === "string" && v.trim() === "");
  
    const isPlaceholder = (v) => {
      if (typeof v !== "string") return false;
      const s = v.trim().toLowerCase();
      return (
        s === "n/a" ||
        s === "na" ||
        s === "-" ||
        s === "unknown" ||
        s === "none" ||
        s === "null" ||
        s === "undefined" ||
        s === "(000) 000-0000" ||
        s === "0000000000" ||
        s === "+10000000000"
      );
    };
  
    const isEmptyArray = (a) => !Array.isArray(a) || a.length === 0;
  
    // only set when target field is empty/missing/placeholder
    const setIfEmpty = async (field, value) => {
      if (isBlank(j[field]) || isPlaceholder(j[field])) {
        if (!isBlank(value) && !isPlaceholder(value) && j[field] !== value) {
          await obj.setCompState({ [field]: value });
          update = true;
        }
      }
    };
  
    const setArrayIfEmpty = async (field, valueArr) => {
      if (isEmptyArray(j[field]) && Array.isArray(valueArr) && valueArr.length) {
        await obj.setCompState({ [field]: valueArr });
        update = true;
      }
    };
  
    const pick = (...vals) => vals.find((v) => !isBlank(v) && !isPlaceholder(v));
  
    const normalizePhone = (v) => {
      if (isBlank(v) || typeof v !== "string") return undefined;
      const digits = v.replace(/[^\d]/g, "");
      if (digits.length === 11 && digits.startsWith("1")) return `+1${digits.slice(1)}`;
      if (digits.length === 10) return `+1${digits}`;
      return undefined;
    };
  
    // ---------- SuccessAI legacy mobile-object shape (only if mobile empty) ----------
    if (isBlank(j.mobile) || typeof j.mobile !== "string") {
      if (
        Object.prototype.toString.call(j.mobile) === "[object Object]" &&
        j.raw?.phone_numbers?.[0] &&
        j.mobile !== j.raw?.raw_number
      ) {
        await obj.setCompState({ mobile: j.mobile.raw_number });
        update = true;
      }
    }
  
    // ---------- ZoomInfo: mobile from raw.mobile or raw.raw.phone (only if mobile empty) ----------
    if (isBlank(j.mobile) || isPlaceholder(j.mobile)) {
      const zMobileRaw = pick(j.raw?.mobile, j.raw?.raw?.phone);
      const normalized = normalizePhone(zMobileRaw);
      if (normalized) {
        await obj.setCompState({ mobile: normalized });
        update = true;
      }
    }
  
    // Optional: DNC flag — only set if we don't already have it
    if (j.dncMobile === undefined) {
      const dncZoom =
        typeof j.raw?.mobilePhoneDoNotCall === "boolean"
          ? j.raw.mobilePhoneDoNotCall
          : typeof j.raw?.raw?.mobilePhoneDoNotCall === "boolean"
          ? j.raw.raw.mobilePhoneDoNotCall
          : undefined;
      if (dncZoom !== undefined) {
        await obj.setCompState({ dncMobile: dncZoom });
        update = true;
      }
    }
  
    // ---------- City / State (only fill if empty) ----------
    const rawCity = pick(j.raw?.city, j.raw?.raw?.city, j.moble);
    await setIfEmpty("city", rawCity);
  
    const rawState = pick(j.raw?.state, j.raw?.raw?.state, j.raw?.region, j.raw?.raw?.region);
    await setIfEmpty("state", rawState);
  
    // Clean the 'moble' typo if we can (don’t overwrite anything)
    if (!isBlank(j.moble) && typeof obj.clearField === "function") {
      await obj.clearField("moble");
      update = true;
    }
  
    // ---------- Company domain (only if empty) ----------
    const domain = pick(
      j.companyDomain,
      j.raw?.companyDomain,
      j.raw?.primary_domain,
      j.primary_domain,
      j.raw?.company?.website
    );
    await setIfEmpty("companyDomain", domain);
  
    // ---------- LinkedIn (only if empty) ----------
    if (isBlank(j.linkedin)) {
      const directLi = j.raw?.linkedin;
      let li = directLi;
      if (!li && Array.isArray(j.raw?.raw?.externalUrls)) {
        const hit = j.raw.raw.externalUrls.find((u) => /linkedin\.com\/in\//i.test(u?.url || ""));
        if (hit?.url) li = hit.url;
      }
      await setIfEmpty("linkedin", li);
    }
  
    // ---------- Name / Title / Company / Management Level (only if empty) ----------
    await setIfEmpty("firstName", j.raw?.firstName);
    await setIfEmpty("lastName", j.raw?.lastName);
  
    const titleCandidate = pick(j.raw?.title, j.raw?.raw?.jobTitle);
    await setIfEmpty("title", titleCandidate);
  
    await setIfEmpty("company", j.raw?.company?.name);
  
    if (isEmptyArray(j.managementLevel) && Array.isArray(j.raw?.managementLevel)) {
      await setArrayIfEmpty("managementLevel", j.raw.managementLevel);
    }
  
    // ---------- Primary domain -> companyDomain sync (only if companyDomain still empty) ----------
    if (isBlank(j.companyDomain) && !isBlank(j.primary_domain)) {
      await setIfEmpty("companyDomain", j.primary_domain);
    }
  
    // ---------- persist if anything changed ----------
    if (update) {
      await obj.update();
      this.dispatch?.();
    }
  }
  

  render() {
    const { obj } = this.props;
    // Assuming obj.getJson() is necessary and works
    let user = obj.getJson();
    const cons = this.props.app.state.selectedContacts
            ? [...this.props.app.state.selectedContacts]
            : [];
        let selected = cons.includes(obj);

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div 
          className="contact-item hover-darken" 
          style={{ background: selected ? "#2374ab10" : "white", position:"relative", paddingLeft:"5px"  }}>
          <CheckIt
            checkKey="selectedContacts"
            obj={obj}
            // Pass references to the class methods
            check={this.handleCheckContact}
            uncheck={this.handleUncheckContact}
          />
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
            <div
              onClick={() => {
                
                  if (window.innerWidth > 600) {
                    this.dispatch({ currentContact: obj });
                  } else {
                    this.dispatch({
                      currentContact:obj,
                      currentPopupComponent: obj,
                      popupSwitch: "viewPotentialProspect",
                    });
                  }
                
              
              }}
              className="contact-name"
            >{`${user.firstName} ${user.lastName}`}</div>
            <div className="contact-desc">{user.company}</div>
          </div>
          <div  style={{ cursor: "pointer", width:"fit-content", }}>
            <div
             
              className="contact-icon"
            >
              <i className="fa-solid fa-message" />
            </div>
          </div>
        </div>
        <div
          // The 'active' class here might need dynamic logic if it depends on selection state
          className="contact-tag-container active"
        >
          {/* Use optional chaining and check if tags exist before splitting */}
          {user.tags?.split(",").map((text, index) => (
            // Add a key prop when mapping lists for performance and stability
            <button key={index} className="contact-tag-btn">
              {text}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ProspectCustomItem;
