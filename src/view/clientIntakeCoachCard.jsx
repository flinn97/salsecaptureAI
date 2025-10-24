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

/**
 * ContactsCard class extends BaseComponent to create a contact management card.
 * @extends BaseComponent
 */
export default class ClientIntakeCoachCard extends BaseComponent {
  /**
   * Constructor for the ContactsCard component.
   * Initializes component state and properties.
   * @param {Object} props - Properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit client-div",
      title: "Contacts",
    };
  }

  /**
   * Returns the inner content of the ContactsCard component.
   * @returns {JSX.Element} The inner content of the card.
   */
  getInnerContent() {
    let selCon = this.propsState.selectedContacts;
    let allCon = this.propsState.componentList.getList("contact");
    let showChecked = selCon?.length > 0;
    let allTotal = allCon?.length?"/"+allCon?.length:"";

    return (
      <div className="map-container">
       <div className="intake-dash">
         <div className="intake-col col">
           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Personal Info</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>               </div>
             </div>
             <div className="intake-personal-info">
               <div className="row row-space-between">
                 <div className="col col-left">
                   <div className="row">
                     <p>firstname</p>
                   </div>
                   <div className="row">
                     <p>Phone</p>
                   </div>

                 </div>
                 <div className="col col-left">
                   <div className="row">
                     <p>lastname</p>
                   </div>
                   <div className="row">
                     <p>address</p>
                   </div>
                 </div>
                 <div className="col col-left">
                   <div className="row">
                     <p>Email</p>
                   </div>
                   <div className="row">
                     <p>birthday</p>
                   </div>
                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 1</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>"What's your current occupation and life situation? (e.g., work, relationships, family, etc.)"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 2</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>Have you worked with a coach or therapist before? If yes, what was helpful or not helpful?</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 3</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>What do you hope to gain from life coaching?"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 4</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>"What is one area of your life you most want to improve right now?"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 5</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>What's getting in the way of your goals?</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 6</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>Are there habits or patterns you'd like to change?"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 7</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>"What are you naturally good at or passionate about?"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 8</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>"How do you take care of your mental, emotional, and physical well-being?"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 9</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>"How do you prefer to receive feedback? (e.g., direct, gentle, witten, verbal)"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 10</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>"How often would you like to meet for sessions?"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

           <div className="intake-card">
             <div className="intake-header row row-space-between">
               <div className="intake-header-left">Question 11</div>
               <div className="intake-header-right">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>               </div>
             </div>
             <div className="intake-question">
               <div className="col col-left">
                 <div className="question row">
                   <p>"Anything Else You'd like to share?"</p>
                 </div>
                 <div className="answer row">
                   <input type="text"/>

                 </div>
               </div>
             </div>

           </div>

         </div>

       </div>
        {/*<h3>Person Info</h3>*/}
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
