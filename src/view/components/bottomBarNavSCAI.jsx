import { BaseComponent, NavMapContainer } from 'flinntech';
import { Link } from 'react-router-dom';


class BottomNavCustom extends NavMapContainer{
    getHtml(){
        console.log("this.list", this.list)
        console.log("this.mapList", this.mapList)
        
        // debugger
        return <div style={{display:'flex', flexDirection:'row'}}>
            <Link to="/conversation">Messages</Link>
            <Link to="/contacts">Contacts</Link>
            <div>Plus</div> 
            {/* add functionality later. */}
            <Link to="/research">Research</Link>
            <Link to="/content">Content</Link>

        </div>
    }
    
   
}

export default BottomNavCustom;