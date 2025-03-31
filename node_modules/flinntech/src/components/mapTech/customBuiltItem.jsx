import BaseClass from './baseClass';
//model
export default class CustomBuiltItem extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey="MCCustom"


  }
  /**
   * 
   * @returns custum item that came in in the <Component /> format
   */
  getOption(){
    
    return this.cell.custom
  }


}
