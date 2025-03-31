import BaseClass from '../baseClass';


export default class DelItem extends BaseClass {
  constructor(props){
    super(props);
    this.state.classKey= "MCDelItem";
    this.initialPropsSetupFunctions=[...this.initialPropsSetupFunctions, this.setDel]

    //define options for base class.

  }
  setDel(){
    this.cell.itemClick=this.del;

  }


  /**
   * delete or send a popup dispatch according to user preference.
   */
  del(){
    let app = this.props.app;
    if(this.cell.popop){
      app.dispatch({popupSwitch:"del", delComponent:this.obj})

    }
    else{
      this.obj.del();
    }
  }

  /**
   * 
   * @returns by default X with the class is chosen for deletion ui
   */
  getOption(){
    return <div>X</div>
  }



  
}
