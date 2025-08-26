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
 import Logo from "./assets/viridianLogo.png"
import Settings from './view/settings.jsx';
import ResearchPage from './view/researchPage.jsx';
import ProspectPage from './view/potentialProspectPage.jsx';
import BottomNavCustom from './view/components/bottomBarNavSCAI.jsx';
import TaskPage from './view/TaskPage.jsx';
import SchedulePage from './view/schedule.jsx';
import AddCalendarPopup from './view/popups/addAppointmentPopup.jsx';
import AddHw from './view/popups/addHw.jsx';
import AddGoal from './view/popups/addGoal.jsx';
import SessionPage from './view/sessionPage.jsx';
import ClientRegister from './view/clientRegister.jsx';
import { Route, Router, Routes } from 'react-router-dom';
import ClientProfilePage from './view/clientProfilePage.jsx';
import VideoContent from './view/videoContent.jsx';
import UploadVideoPopup from './view/popups/uploadVideoPopup.jsx';
import ViewVideo from './view/popups/viewVideo.jsx';
import PotentialHomeworkPopup from './view/popups/potentialHomeworkPopup.jsx';
 //  import Settings from './view/settings';
 //  import AddContactPopup from './view/addContactPopup';
 
 /**
  * Main application class extending AppBaseClass.
  */
 export default class App extends AppBaseClass {
   constructor(props) {
     super(props, { db: db, endpoint: "viridian", auth: auth, storage: storage });
     this.popupComponents = { contact: ContactPopup, step: CreateStepPopup, calendarEvent:AddCalendarPopup, homework:AddHw, goal:AddGoal, video:UploadVideoPopup };
     this.popupComponentsProps = {};
     navInterface.getFactory().registerComponent("bottomNavMap", BottomNavCustom);
    
    
     //REMOVE
    //  this.componentList.addComponents([...data], true)
 
 
     this.state = {
       ...this.state,
       navBarProps:{
        mapType: window.innerWidth<600? "bottomNavMap":undefined,
        type:window.innerWidth<600? "topBar":undefined,
        style:{backgroundColor:"white", color:"black", },
        cardStyle:{backgroundColor:"white", position:window.innerWidth<600&& "absolute",bottom:window.innerWidth<600&& "0px", }, 
        logoURL:window.innerWidth>600&&Logo, linkItemStyle:{color:"black"}, },
       routes: [
         { comp: TaskPage, name: "Tasks", path: "/" },
         { comp: Conversations, name: "Messages", path: "conversation" },
         { comp: SchedulePage, name: "Schedule", path: "schedule" },

         { comp: Contacts, name: "Clients", path: "clients" },

         { comp: Content, name: "Content", path: "content" },
         { comp: VideoContent, name: "Video Content", path: "videocontent" },

        //  { comp: Settings, name: "Billing", path: "billing" },
         { comp: SessionPage, name: "", path: "session", idComp:SessionPage},

        //  { comp: SequencePage, name: "", path: "sequence", idComp:SequencePage },

         { comp: TemplatePage, name: "", path: "template", idComp:TemplatePage  },
          { comp: Settings, name: "settings" },
       ],
       extraAuthRoutes: [
        {comp: ClientRegister, path:"/clientregister", idComp:ClientRegister}
       ],
       popups: [
         { content: AddToSequence, popupSwitch: "addToSequence" },
         { content: PotentialHomeworkPopup, popupSwitch: "showPotentialHomework" },

         { content: ViewVideo, popupSwitch: "showVideo", popupType:"biggestCard"},

       ],
     };
 
     this.registerListWithFactory([...Object.values(MyComponents)]);
     
     let navList = navInterface.getNavList();
     navList.update(0, {class:"SCAILogo"})
     navList.update(1, {activeClass:"SCAILink"})

     if(window.innerWidth<600){
      navList.remove(2)
      navList.remove(0);
    }
     
     
 
   }
   
   async checkForUser() {
    
    let user = await this.APIService.getCurrentUser();

    if (user) {
      let loggedIn = await this.APIService.checkIfLoggedIn();

      if (loggedIn) {
        await this.APIService.getuser(user.email);
      }
    }
    
    if(this.state.currentUser?.getJson().role==="client"){
      this.dispatch({
        routes:[
          {comp: ClientProfilePage, name:"Dash", path:"/" },
          { comp: TaskPage, name: "Tasks", path: "/tasks" },
          { comp: Conversations, name: "Messages", path: "conversation" },
          { comp: SchedulePage, name: "Schedule", path: "schedule" },
  
  
          // { comp: Settings, name: "Billing", path: "billing" },
        ],
      })
    }
  }

componentDidUpdate(props,state){
  if(state.currentUser===undefined && this.state.currentUser){ 
    if(this.state.currentUser?.getJson().role==="client"){
    this.dispatch({
      routes:[
        {comp: ClientProfilePage, name:"Dash", path:"/" },
        { comp: Conversations, name: "Messages", path: "conversation" },
        { comp: SchedulePage, name: "Schedule", path: "schedule" },


        // { comp: Settings, name: "Billing", path: "billing" },
      ],
    })
  }
  }
}
    

   

  
 
 }


