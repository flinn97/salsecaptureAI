import {binder} from "../../serviceTech/Util/binder";

/**
 * base observers with set and get list functionalities
 */
class BaseObserver {
  constructor(){
    binder.bind(this);
  }
  list = [];

  setList(list){
    list = list.filter(f=>f!==undefined)
    this.list = list;
  }
  getList(){
    return this.list;
  }
  // Method to subscribe to the observer
  subscribe(observerFunction) {
    if(observerFunction){
      this.list.push(observerFunction);
    }
  }

  // Method to unsubscribe from the observer
  unsubscribe(observerFunction) {
    this.list = this.list.filter(fn => fn !== observerFunction);
  }

  // Method to run all subscribed functions
   run(...args) {
    
    for(let observerFunction of this.list){
      if(observerFunction){
        
         observerFunction(...args)
      }
    }
  }
}

export default BaseObserver;