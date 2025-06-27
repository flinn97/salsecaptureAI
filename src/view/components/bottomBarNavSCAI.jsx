import { BaseComponent, NavMapContainer } from 'flinntech';
import { Link } from 'react-router-dom';


class BottomNavCustom extends NavMapContainer{
    getHtml(){
        // console.log("this.list", this.list)
        // console.log("this.mapList", this.mapList)
        
        return <div className="bottom-nav">
                <Link to="/conversation" className="bottom-nav-item">
                    <i className="fa-solid fa-message"></i>
                    <span>Messages Beta</span>
                </Link>
                <Link to="/contacts" className="bottom-nav-item">
                    <i className="fa-solid fa-address-book"></i>
                    <span>Contacts</span>
                </Link>

                <a href="#" className="bottom-nav-item">

                    <div id="float-btn-plus" className="float-btn">
                        <i className="fas fa-plus"></i>
                    </div>
                </a>

                <Link to="/research" className="bottom-nav-item">
                    <i className="fa-solid fa-graduation-cap"></i>
                    <span>Research</span>
                </Link>
                <Link to="/content" className="bottom-nav-item">
                    <i className="fa-solid fa-briefcase"></i>
                    <span>Content</span>
                </Link>


            </div>


    }
    
   
}

export default BottomNavCustom;