import { ParentFormComponent } from '../formTech/FormComponentsInterface';
import BaseClass from './baseClass';


//model
export default class FormItem extends BaseClass {
  constructor(props){
    super(props);


  }
  /**
   * create forms in the map though a cutom item usually works better
   * TODO figure out how to make this work better.
   */
  getOption(){
    <ParentFormComponent {...this.cell} {...this.props}/>
  }


}
