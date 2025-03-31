import BaseClass from './baseClass';


//model
export default class PlainDisplay extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey = "MCAttributeItem"

  }
  /**
   * 
   * @returns for when you send in arrays with text
   */
  getOption(){
    return this.state.obj
  }


  
}
