import Login from "./login";
import { Link } from "react-router-dom";

export default class Register extends Login{
    /**
     * change the onsub to allow registration
     */
    async onSub(){
        if(this.validate()){
            
            let user = await this.APIService.register(this.state.email,this.state.password);
            if(!user.error){
                let json = {type:"user", email:this.state.email, _id: this.state.email}
                user = await this.componentList.addComponents(json);
                window.history.pushState({}, '', '/');
                this.dispatch({currentUser:user});
                
            }
        }
    }
    /**
     * 
     * @returns ui to change the heading to register
     */
    getHeaderHtml(){

            let headerHtml = this.header.getHtml({ type: "h1", content: "Register" });
            return headerHtml;
    
        
    }

    /**
     * 
     * @returns creates a link to go back to login
     */
    getSwitchLink(){
        return <div>Have an Account? <Link to="/login">Login</Link></div>
    }
}