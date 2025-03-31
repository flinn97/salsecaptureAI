import AttributeItem from './attributeItem';


//model
export default class TextItem extends AttributeItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCTextItem"


  }
  /**
   * 
   * @returns plain text that you sent in
   */
  getOption(){
    return <>{this.cell.name}</>
  }


  
}
