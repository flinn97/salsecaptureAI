/**
 * Imports necessary modules and components.
 */
import { db, auth, storage } from './firebase.config.js';
import * as MyComponents from './models/myComponents.js';
import { AppBaseClass, BaseComponent, navInterface } from 'flinntech';
import logo from "./assets/flinntechlogo.svg";

import ContactPopup from './view/popups/contactPopup.jsx';
import { User } from './models/myComponents.js';

import Contacts from './view/contacts';
import Conversations from './view/conversations.jsx';
import Content from './view/content';
import SequencePage from './view/sequencePage';
import TemplatePage from './view/templatePage.jsx';
import AddToSequence from './view/popups/addToSequence.jsx';
import "./salescaptureAI.scss"
//REMOVE
import { data } from './models/fakeData.js';
import "./style.scss"
import "./finalSCAICss.css"
import CreateStepPopup from './view/popups/createStepPopup.jsx';
import Logo from "./assets/scailogofake.png"
import Settings from './view/settings.jsx';
import ResearchPage from './view/researchPage.jsx';
import ProspectPage from './view/potentialProspectPage.jsx';
import BottomNavCustom from './view/components/bottomBarNavSCAI.jsx';
import ResearchPopup from './view/popups/addResearchPopup.jsx';
import AddEmail from './view/popups/addEmail.jsx';
import AdminPage from './view/adminPage.jsx';
import AddTags from './view/popups/addTags.jsx';
import ClientPage from './view/clientPage.jsx';
import AddUserPopup from './view/addUserPopup.jsx';
import UserPage from './view/userPage.jsx';
import DeleteSequenceDialog from './view/popups/delSequencePopup.jsx';
import WelcomePage from './view/welcomePage.jsx';
import ContentGenerationPage from './view/contentGenerationpage.jsx';
//  import Settings from './view/settings';
//  import AddContactPopup from './view/addContactPopup';

/**
 * Main application class extending AppBaseClass.
 */
export default class App extends AppBaseClass {
  constructor(props) {
    super(props, { db: db, endpoint: "salescaptureAI", auth: auth, storage: storage });
    this.popupComponents = { contact: ContactPopup, step: CreateStepPopup, research: ResearchPopup, email: AddEmail, user: AddUserPopup };
    this.popupComponentsProps = {};
    navInterface.getFactory().registerComponent("bottomNavMap", BottomNavCustom);

    //REMOVE
    //  let user = {
    //    type: "user",
    //    owner: "alan@salescapture.com",
    //    email: "alan@salescapture.com",
    //    _id: "alan@salescapture.com",


    //  }
    //REMOVE
    //  this.componentList.addComponents([...data], true)


    this.state = {
      ...this.state,
      navBarProps: {
        mapType: window.innerWidth < 1000 ? "bottomNavMap" : undefined,
        type: window.innerWidth < 1000 ? "topBar" : undefined,
        style: { backgroundColor: "#35b593", color: "white", fontFamily: "'Satoshi-Variable', sans-serif" },
        cardStyle: { backgroundColor: "#35b593", position: window.innerWidth < 1000 && "absolute", bottom: window.innerWidth < 1000 && "0px", fontFamily: "'Satoshi-Variable', sans-serif" },
        logoURL: window.innerWidth > 1000 && Logo, linkItemStyle: { color: "white", fontFamily: "'Satoshi-Variable', sans-serif" },
      },
      routes: [

        { comp: WelcomePage, name: "Home", path: "/" },
        { comp: Conversations, name: "Messages Beta", path: "conversation" },


        { comp: Contacts, name: "Contacts", path: "contacts" },
        { comp: ResearchPage, name: "Research", path: "research", idComp: ProspectPage },
        { comp: ContentGenerationPage,  path: "aigeneration", name:"Content Engine"},

        { comp: Settings, name: "Settings", path: "settings" },


        { comp: Content, name: "", path: "content" },


        { comp: SequencePage, name: "", path: "sequence", idComp: SequencePage },

        { comp: TemplatePage, name: "", path: "template", idComp: TemplatePage },
        { comp: ClientPage, name: "", path: "client", idComp: ClientPage },


        { comp: AdminPage, name: "Admin", path: "admin", },
        { comp: UserPage, name: "", path: "user", idComp: UserPage }

      ],
      refresh: true,
      popups: [
        { content: AddToSequence, popupSwitch: "addToSequence" },
        { content: AddTags, popupSwitch: "addTags" },
        { content: DeleteSequenceDialog, popupSwitch: "delSequence" },
        { content: ContactPopup, popupSwitch: "viewPotentialProspect" },

      ],
    };

    this.registerListWithFactory([...Object.values(MyComponents)]);

    let navList = navInterface.getNavList();
    navList.update(0, { class: "SCAILogo" })
    navList.update(1, { activeClass: "SCAILink" })

    if (window.innerWidth < 1000) {
      navList.remove(2)
      navList.remove(0);
    }

    //REMOVE
    //  this.getUser(user);

  }
  //  async getUser(user) {
  //    await this.componentList.addComponents([user], true);
  //    user = this.componentList.getComponent("user");
  //    this.state.currentUser = user;

  //  }
  componentDidMount() {
    super.componentDidMount();
    let div = document.getElementById("signUpFT");
    if (div) {
      div.style.display = "none"
    }
    const ALREADY_FLAG = 'data-login-img-inserted';

    const findLoginHeading = () => {
      // Be flexible: any heading tag with text that includes "login"
      const headings = document.querySelectorAll('h1, h2, h3, [role="heading"]');
      return Array.from(headings).find(h => /login/i.test(h.textContent.trim()));
    }; 

    const insertOnce = () => {
      const h = findLoginHeading();
      if (!h) return false;

      const parent = h.parentElement;
      if (!parent || parent.hasAttribute(ALREADY_FLAG)) return false;

      const img = document.createElement('img');
      img.src = Logo;               // your imported png
      img.alt = 'Login icon';
      img.style.display = 'block';
      img.style.borderRadius = '15px';
      img.style.marginBottom = '15px'; // optional: gives breathing room
      img.style.width = "200px";
      img.style.padding = "10px";

      // You can also set size if needed:
      // img.style.width = '64px'; img.style.height = '64px';

      parent.insertBefore(img, h);
      parent.setAttribute(ALREADY_FLAG, 'true'); // ensure it's only ever inserted once
      return true;
    };

    // 1) Try immediately (handles initial render)
    if (insertOnce()) return;

    // 2) Watch for SPA route changes / late renders, then stop after first insert
    const observer = new MutationObserver(() => {
      if (insertOnce()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  componentDidUpdate(props, state) {
    if (this.state.gotUser && this.state.refresh) {

      if (this.state.currentUser.getJson()._id !== "alan@salescapture.com") {
        this.dispatch({
          refresh: false,
          routes: [
            { comp: WelcomePage, name: "Home", path: "/" },
            { comp: Conversations, name: "Messages Beta", path: "conversation" },

            { comp: Contacts, name: "Contacts", path: "contacts" },
            { comp: ResearchPage, name: "Research", path: "research", idComp: ProspectPage },
            { comp: ContentGenerationPage,  path: "aigeneration", name:"Content Engine"},

            { comp: Settings, name: "Settings", path: "settings" },

            { comp: Content, name: "", path: "content" },

            { comp: SequencePage, name: "", path: "sequence", idComp: SequencePage },

            { comp: TemplatePage, name: "", path: "template", idComp: TemplatePage },

            //  { comp: Settings, name: "settings" },
          ]
        })
      }
    }
  }

}

