import BaseInterface from "./baseClasses/interfaceBaseClass";

/**
 * give the entry level an interface to work with. 
 */
class AppInterface extends BaseInterface{
type = "appInterface"

}

const appInterface = new AppInterface();
export {appInterface, AppInterface}