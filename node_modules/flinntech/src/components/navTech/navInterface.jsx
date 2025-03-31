import NavFactory from "./navFactory";
import Nav from "./nav";
import NavList from "./navList";
import {binder} from "../serviceTech/Util/binder";
import BaseInterface from "../templateTech/baseClasses/interfaceBaseClass";
import InterfaceComponentBaseClass from "../templateTech/baseClasses/interfaceComponentBaseClass";

// NavInterface class handles the factory, navigation list, and main navigation functions.
class NavInterface extends BaseInterface {
    factory; // The factory that creates navigation components
    navList; // List of navigation items
    
    /**
     * Constructor initializes the interface and binds necessary methods.
     * Sets the main function to getNav.
     */
    constructor(){
        super(); // Calls the parent class constructor (BaseInterface)
        binder.bind(this); // Binds this context to methods (presumably from binder utility)
        this.getFactory(); // Initializes the factory
        this.getNavList(); // Initializes the navigation list
        this.mainFunc = this.getNav; // Sets the main function for navigation
    }

    /**
     * Retrieves the factory for creating navigation components.
     * If it doesn't exist, creates a new instance of NavFactory.
     * @returns {NavFactory} - The NavFactory instance.
     */
    getFactory(){
        if(!this.factory){
            this.factory = new NavFactory(); // Creates a new NavFactory if not present
        }
        return this.factory;
    }

    /**
     * Creates a new Nav component with the given props.
     * @param {Object} props - The props to pass to the Nav component.
     * @returns {JSX.Element} - A Nav component.
     */
    getNav(props){
        return <Nav factory={this.factory} navInterface={this} navList={this.navList} {...props} />;
    }

    /**
     * Creates a new instance of NavList.
     * @returns {NavList} - A new NavList instance.
     */
    getNewNavList(){
        let navList = new NavList(); // Creates a new NavList
        return navList;
    }

    /**
     * Forcefully sets the navigation list.
     * @param {NavList} navList - The navigation list to set.
     */
    setNavListForce(navList){
        this.navList = navList; // Sets the navList to the provided value
    }

    /**
     * Retrieves the navigation list. If it doesn't exist, a new NavList is created.
     * @returns {NavList} - The current NavList.
     */
    getNavList(){
        if(!this.navList){
            this.navList = this.getNewNavList(); // Creates a new NavList if not present
        }
        return this.navList;
    }
}

// Create an instance of NavInterface for use
const navInterface = new NavInterface();

// Navbar class is the interface component for the navigation interface.
class Navbar extends InterfaceComponentBaseClass {
    /**
     * Constructor initializes the Navbar with the provided props and binds to the navInterface.
     * @param {Object} props - The props passed to the Navbar component.
     */
    constructor(props){
        super(props); // Calls the parent constructor (InterfaceComponentBaseClass)
        this.interface = navInterface; // Associates the navbar with the navInterface instance
    }
}

// Exports the navInterface, NavInterface, and Navbar classes for use in other parts of the app
export { navInterface, NavInterface, Navbar };