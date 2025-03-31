import BaseClass from '../baseClass';


//model
export default class Logout extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey="MCTextItem"


  }
  /**
   * set on click to the logout func or the api service
   */
  additionalPostSetup(){
    this.item.setOnClick(this.cell.logoutFunc||this.APIService.logout)
  }
  
  /**
   * TODO: provide other logout components
   * @returns logout for the ui
   */
  getOption(){
    return "logout"
  }



  
  
}
