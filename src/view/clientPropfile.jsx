/**
 * ClientDashboardCard component. Renders the client-facing dashboard with current goal,
 * life coach info, next appointment, billing status, and current tasks.
 */
 import React from "react";
 import {
   BaseComponent,
   PopupButton,
   MapComponent
 } from "flinntech";
 import HwLightCustom from "./components/hwLightCustom";
 
 export default class ClientDashboardCard extends BaseComponent {
   constructor(props) {
     super(props);
     this.state = {
       ...this.state,
       defaultClass: "dashboard-container scroller"
     };
   }
 
   render() {
     const user = this.propsState.currentUser?.getJson();
     const currentGoal = this.propsState.currentGoal;
     const nextAppointment = this.propsState.nextAppointment;
     const billing = this.propsState.billingStatus;
     const coach = this.propsState.coachProfile;
 
     return (
       <div
         className={this.props.pageClass || this.state.defaultClass}
         style={{ padding: "20px", height: "100%", overflowY: "auto" }}
       >
         {/* Top Row: Goal and Coach */}
         <div className="row row-align-start">
           <div className="col col-expand">
             <div className="dashboard-card">
               <div className="card-header">Your Current Goal</div>
               <div className="card-content">
                 <h2 className="goal-title">
                   {currentGoal?.getJson().title || "No active goal"}
                 </h2>
                 <PopupButton
                   content="Mark Complete"
                   obj={currentGoal}
                   popupSwitch="completeGoal"
                 />
               </div>
             </div>
           </div>
           <div className="col col-fixed">
             <div className="dashboard-card">
               <div className="card-header">Your Life Coach</div>
               <div className="card-content coach-info">
                 {coach?.avatarUrl && (
                   <img
                     className="coach-avatar"
                     src={coach.avatarUrl}
                     alt="Coach avatar"
                   />
                 )}
                 <div className="coach-name">
                   {coach?.firstName} {coach?.lastName}
                 </div>
                 <div className="coach-contact row row-left">
                   <i className="fa-solid fa-phone" /> {coach?.phone}
                 </div>
                 <div className="coach-contact row row-left">
                   <i className="fa-solid fa-envelope" /> {coach?.email}
                 </div>
                 <PopupButton
                   content="Send Message"
                   popupSwitch="messageCoach"
                 />
               </div>
             </div>
           </div>
         </div>
 
         {/* Bottom Row: Appointment, Billing, Tasks */}
         <div className="row row-align-start">
           <div className="col">
             <div className="dashboard-card">
               <div className="card-header">Next Appointment</div>
               <div className="card-content">
                 {nextAppointment ? (
                   <>
                     <h3>
                       {nextAppointment.getJson().dayOfWeek} | {nextAppointment.getJson().time}
                     </h3>
                     <div>{nextAppointment.getJson().date}</div>
                   </>
                 ) : (
                   <div>No upcoming appointments</div>
                 )}
               </div>
             </div>
           </div>
           <div className="col">
             <div className="dashboard-card">
               <div className="card-header">Billing Status</div>
               <div className="card-content">
                 <h3 className="billing-amount">
                   ${billing?.amount?.toFixed(2) || "0.00"}
                 </h3>
                 <PopupButton content="Pay Now" popupSwitch="payNow" />
               </div>
             </div>
           </div>
           <div className="col">
             <div className="dashboard-card">
               <div className="card-header">Current Tasks</div>
               <div className="card-content">
                 <MapComponent
                   name="homework"
                   cells={[{ type: "custom", custom: HwLightCustom }]}
                   filter={{ search: user._id, attribute: "contactId" }}
                 />
               </div>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }
 