import BaseClass from './baseClass';

export default class AttributeItem extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey= "MCAttributeItem"

  }
  /**
   * allow for people to not have to put type attribute in the map component
   * THis is backward compadibilty for the last version
   */
  getName(){
    let cell = this.cell;
    this.name = cell.name;
    if(!this.name){
      this.name = cell
    }
  }
  /**
   * 
   * @returns the name in the obj for the attribute given
   */
  getOption(){
    this.getName();
    return this.obj.getJson()[this.name];


  }


  
}
