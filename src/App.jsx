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
 //  import Settings from './view/settings';
 //  import AddContactPopup from './view/addContactPopup';
 
 /**
  * Main application class extending AppBaseClass.
  */
 export default class App extends AppBaseClass {
   constructor(props) {
     super(props, { db: db, endpoint: "salescaptureAI", auth: auth, storage: storage });
     this.popupComponents = { contact: ContactPopup, step: CreateStepPopup };
     this.popupComponentsProps = {};
     //REMOVE
     let user = {
       type: "user",
       owner: "alan@salescapture.com",
       email: "alan@salescapture.com",
       _id: "alan@salescapture.com",
 
 
     }
     //REMOVE
    //  this.componentList.addComponents([...data], true)
 
 
     this.state = {
       ...this.state,
       navBarProps:{
        style:{backgroundColor:"#35b593", color:"white"},
        cardStyle:{backgroundColor:"#35b593",}, 
        logoURL:Logo, linkItemStyle:{color:"white"}, },
       routes: [
         { comp: Home, name: "Home", path: "/" },
         { comp: Conversations, name: "Messages", path: "conversation" },
 
         { comp: Contacts, name: "Contacts", path: "contacts" },
         { comp: Contacts, name: "Research", path: "contacts" },

         { comp: Content, name: "Content", path: "content" },
         { comp: SequencePage, name: "", path: "sequence" },
        //  { comp: TemplatePage, name: "add template", path: "template" },
         //  { comp: Settings, name: "settings" },
       ],
       popups: [
         { content: AddToSequence, popupSwitch: "addToSequence" },
       ],
     };
 
     this.registerListWithFactory([...Object.values(MyComponents)]);
     
     let navList = navInterface.getNavList();
     navList.update(0, {class:"SCAILogo"})
     navList.update(1, {activeClass:"SCAILink"})
     
     //REMOVE
     this.getUser(user);
 
   }
   async getUser(user) {
     await this.componentList.addComponents([user], true);
     user = this.componentList.getComponent("user");
     this.state.currentUser = user;
 
   }
 
 }
 
 class Home extends BaseComponent { }