import BaseClass from './baseClass';
//model
export default class CustomComponentItem extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey="MCCustom"


  }
  /**
   * 
   * @returns a custom component sent into the map component
   */
  getOption(){
    
    let Comp = this.cell.custom
    return <Comp {...this.props} masterCell={this}/>
  }


}
