import EditItem from "./editItem";


export default class EditCustomItem extends EditItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCCustomEditItem"

    
  }

  /**
   * 
   * @returns custom item for edit
   */
  getOption(){
    return <this.cell.custom {...this.props} masterCell={this}/>
  }
}
