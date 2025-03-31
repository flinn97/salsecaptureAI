//cards
export {default as Card} from "./components/cardTech/Card";
export {cardInterface, CardInterface} from "./components/cardTech/cardInteface";
//guts of component List
export {default as BaseClass} from "./components/componentListNPM/baseClass";
export {default as ComponentListInterface} from "./components/componentListNPM/componentListInterface";
//forms and buttons
export {default as BaseButton} from "./components/formTech/buttons/baseButton";
export { ParentFormComponent ,UploadButton, PopupButton, UpdateButton, RunButton, formInterface, FormComponentInterface, AddButton, Button, DelButton } from "./components/formTech/FormComponentsInterface";
export {default as InputBaseClass} from "./components/formTech/inputBaseClass";
//maps and map items
export {default as DelItem} from "./components/mapTech/del/deleteItem";
export {default as EditItem} from "./components/mapTech/edit/editItem";
export {default as MapItemBaseClass} from "./components/mapTech/baseClass";
export { MapComponent, SearchMapComponent, mapInterface, MapComponentInterface } from "./components/mapTech/mapComponentInterface";
//nav
export { navInterface, NavInterface, Navbar } from "./components/navTech/navInterface";
export {default as NavMapContainer} from "./components/navTech/navMapContainer";
//popup
export {popupCreater, PopupCreater} from "./components/popupTech/popupCreationInterface";
//services and backend
export {default as GetAllComponents} from "./components/serviceTech/APITech/APITemplates/getAllComponentsByUserTemplate";
export {default as GetComponentTemplate} from "./components/serviceTech/APITech/APITemplates/getComponentTemplate";
export {default as GetComponentsFromUrl} from "./components/serviceTech/APITech/APITemplates/getComponentsFromUrlTemplate";
export {binder, Binder} from "./components/serviceTech/Util/binder";
export {mathService, MathService} from "./components/serviceTech/Util/mathService";
export {urlService, UrlService} from "./components/serviceTech/Util/urlService";
export {default as Auth} from "./components/serviceTech/APITech/auth.service"
export {QuearyGenerator} from "./components/serviceTech/APITech/queryGenerator";
//templates
export {default as Login} from "./components/templateTech/APITemplates/login";
export {default as Register} from "./components/templateTech/APITemplates/register";
    //base classes
export {default as AppBaseClass} from "./components/templateTech/baseClasses/AppBaseClass";
export {default as BaseComponent} from "./components/templateTech/baseClasses/BaseComponent";
export {default as HtmlBuilderBaseClass} from "./components/templateTech/baseClasses/HtmlBuilderBaseClass";
export {default as BaseInterface} from "./components/templateTech/baseClasses/interfaceBaseClass";
export {default as InterfaceComponentBaseClass} from "./components/templateTech/baseClasses/interfaceComponentBaseClass";
    //factories
export {default as BaseClassFactory} from "./components/templateTech/factories/baseClassFactory";
export {default as BaseFactory} from "./components/templateTech/factories/baseFactory";
export {default as BaseReactFactory} from "./components/templateTech/factories/baseReactFactory";
export {interfaceCreationFactory, interfaceSingletonFactory, InterfaceCreationFactory, InterfaceSingletonFactory, } from "./components/templateTech/factories/interfaceFactory";
    //observers
export {default as BaseObserver} from "./components/templateTech/observers/baseObserver";
export {default as BuilderObserver} from "./components/templateTech/observers/builderObserver";
    //pages
export {default as PageTemplate} from "./components/templateTech/pageTemplates/pageTemplate";
export {appInterface, AppInterface} from "./components/templateTech/appInterface";


//does not work on create react app
//vite comes with some pretty bad styles that should be changed
//Needs to be a way to bypass the routes to login from app.js
//need to be able to export scss files
//a lot more ui work needs to be done.
//for instance when I build a side bar nave the classes used should automatically account for it
//fix things so that they don't need props.props like passing props down in a map component from the nav
//add comments to Map base class
//The popup machine needs to pass down props to the content of the card from the component obj
// Need to fix the nav links to be able to be customizable with props.