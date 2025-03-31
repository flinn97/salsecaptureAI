import DelItem from './deleteItem';


export default class DelCustomItem extends DelItem {
  constructor(props){
    super(props);
    this.state.classKey= "MCCustomDelItem"
  }

  /**
   * 
   * @returns custom item for deleting objs
   */
  getOption(){
    return <this.cell.custom {...this.props} masterCell={this}/>
  }

}
