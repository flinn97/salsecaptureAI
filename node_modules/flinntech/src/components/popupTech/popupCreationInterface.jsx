import {binder} from "../serviceTech/Util/binder"
import BaseInterface from "../templateTech/baseClasses/interfaceBaseClass";
import PopupContentFactory from "./popupContentFactory";
import PopupMachine from "./popupMachine";

 class PopupCreater extends BaseInterface{
    factory
    constructor(){
        super();
        binder.bind(this);
        this.getFactory()
    }
    /**
     * TODO: since we are doing this on every interface we might as well do this on the base class
     * @returns get a popup factory for the interface
     */
    getFactory(){
        if(!this.factory){
            this.factory = new PopupContentFactory();
        }
        return this.factory;
    }
    /**
     * 
     * @param {} props 
     * @returns a react component that acts as the popup generator
     */
    createPopupMachine(props){
        return <PopupMachine app ={props?.app||this.getAppComponent()} factory = {this.factory} />

    }
}
let popupCreater = new PopupCreater();

export {popupCreater, PopupCreater}