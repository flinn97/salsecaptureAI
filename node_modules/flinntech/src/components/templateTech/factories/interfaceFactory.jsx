import BaseFactory from "./baseFactory";
import { formInterface, FormComponentInterface } from "../../formTech/FormComponentsInterface";
import { mapInterface, MapComponentInterface } from "../../mapTech/mapComponentInterface";
import { navInterface, NavInterface } from "../../navTech/navInterface";
import BaseClassFactory from "./baseClassFactory";
/**
 * interface for putting all created interfaces on one interface
 */
class InterfaceSingletonFactory extends BaseFactory{
    factory={form:formInterface, map:mapInterface, nav:navInterface};
   
}
/**
 * Interface for when you want to create new interfaces
 */
class InterfaceCreationFactory extends BaseClassFactory{
    factory={form:FormComponentInterface, map:MapComponentInterface, nav:NavInterface}
}
const interfaceSingletonFactory= new InterfaceCreationFactory();
const interfaceCreationFactory = new InterfaceCreationFactory();

export {interfaceCreationFactory, interfaceSingletonFactory, InterfaceCreationFactory, InterfaceSingletonFactory, }