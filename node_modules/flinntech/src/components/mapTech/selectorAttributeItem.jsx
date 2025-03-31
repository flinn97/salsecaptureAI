import AttributeItem from './attributeItem';

export default class SelectorAttributeItem extends AttributeItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCAttributeItem";
    

  }

  /**
   * select items in the map
   */
  getItemClass(){
    let cell = this.cell;
    let bool = cell.activeAttribute? cell.activeAttribute: "_id";
    let id = this.state.obj.getJson()[bool] 

    if(id===cell.activeItem?.getJson()[bool]){
      let style = cell.activeClass? cell.activeClass: this.theme.MCActiveItem;
      this.item.setClass(this.item.getClass() + " " + style)
    }
  }
  /**
   * setup the component with the items to select
   */
  additionalPostSetup(){
    this.getItemClass();
  }


}
