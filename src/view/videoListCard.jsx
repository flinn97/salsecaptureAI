/**
 * ContentCard component. This component renders a card that contains 
 * two sections: one for Sequences and one for Templates. 
 * It extends the BaseComponent class from 'flinntech'.
 */
 import { Card, PopupButton } from "flinntech";
 import { BaseComponent } from "flinntech";
import VideoList from "./videoList";
 
 export default class VideoListCard extends BaseComponent {
     /**
      * Constructs the ContentCard component.
      * @param {object} props - The component's properties.
      */
     constructor(props) {
         super(props);
         this.state = {
             ...this.state,
             defaultClass: "fit",
         };
     }
 
     /**
      * Returns the inner content of the ContentCard component.
      * @returns {JSX.Element} The rendered content of the card.
      */
     getInnerContent() {
         return (
             <div className="map-container">
                 <div className="top-nav-float">
                     <nav className="top-nav">
                         <div className="nav-left">
                             <div className="nav-icon">
                                 <i className="fas fa-circle"></i>
                             </div>
                             <div className="title-name">Video Content</div>
                         </div>
 
 
 
 
                     </nav>
 
 
                     <div className="search-container">
                         <div className="search-bar">
                             <i className="fas fa-search search-icon"></i>
                             <input onChange={(e) => {
                                 this.dispatch({ tags: e.target.value })
                             }}
                                 className="search-input" placeholder="Search" />
                         </div>
                     </div>
 
                     <div className="filter">
                         <div className="row row-space-between">
                         <PopupButton
                       content="Upload Video"
                       popupSwitch="addVideo"
                   />
                        
                
                         </div>
                     </div>
 
                 </div>
                 {/* Left Card for Sequences */}
                 {/*<div style={{ width: "45%", marginRight: "30px" }}>*/}
                 <div>
                     <Card theme="defaultCard" content={<VideoList />} />
                 </div>
             </div>
         );
     }
 
     /**
      * Renders the ContentCard component.
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