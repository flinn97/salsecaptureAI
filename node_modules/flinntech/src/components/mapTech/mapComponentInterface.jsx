import MapFactory from "./itemTypeFactory";
import { Component } from 'react';
import ThemeFactory from "./themes/themeFactory";
import FilterFactory from "./filterFacotry";
import BaseComponent from "../templateTech/baseClasses/BaseComponent";
import BaseInterface from "../templateTech/baseClasses/interfaceBaseClass";
import InterfaceComponentBaseClass from "../templateTech/baseClasses/interfaceComponentBaseClass";


class MapComponentInterface extends BaseInterface {

    FilterFactory;

    constructor() {
        super();

        this.getFilterFactory();
        this.mainFunc=this.getMapComponent

    }

    
    /**
     
     * @returns factory for map items
     */
    getFactory() {
        if (this.factory === undefined) {
            this.factory = new MapFactory();
        }
        return this.factory;

    }

    /**
     * 
     * @returns theme factory for map items
     */
    getThemeFactory() {
        
        if (this.themeFactory === undefined) {
            this.themeFactory = new ThemeFactory();
        }
        return this.themeFactory;
    }


    /**
     * 
     * @returns singleton filter factory;
     */
    getFilterFactory() {
        if (this.filterFactory === undefined) {
            this.filterFactory = new FilterFactory();
        }
        return this.filterFactory;
    }

    /**
     * 
     * @param {*} props 
     * @param {*} type 
     * @returns Map component for ui mapping of objs
     */
    getMapComponent(props, type) {

        type = type || "default";
        let map = this.factory.getComponent(type, props);
        return map;

    }



}



class MapComponent extends InterfaceComponentBaseClass {
    /**
     * Constructor initializes the state and sets the interface to `mapInterface`.
     * @param {Object} props - The props passed to the component.
     */
    constructor(props) {
        super(props); // Calls the parent constructor
        this.state = {
            type: "map", // Sets the type to "map"
        };
        this.interface = mapInterface; // Initializes the interface to mapInterface
    }

    /**
     * Sets up the filter information by initializing the filter factory, filters, 
     * and the filter function from the component props.
     */
    setFilterInfo() {
        this.filterFacotry = this.interface.getFilterFactory(); // Sets the filter factory from the interface
        this.filters = this.props.filters; // Gets the filters from props
        this.filterFunc = this.props.filterFunc; // Gets the filter function from props
        this.filter = this.props.filter; // Gets the filter object from props
    }

    /**
     * Sets the filter function (`filterFunc`) if it hasn't been set already,
     * by searching for a filter of type "filterFunc" from the `filters` array.
     */
    getFilterFunc() {
        if (!this.filterFunc && this.filters !== undefined) {
            let funcOb = this.filters?.find(obj => obj.type === "filterFunc"); // Searches for a filter function
            if (funcOb) {
                this.filterFunc = funcOb.func; // Sets the filter function if found
            }
        }
    }

    /**
     * Sets the filter object (`filter`) if it hasn't been set already,
     * by searching for a filter of type "filter" from the `filters` array.
     */
    getFilter() {
        if (!this.filter && this.filters !== undefined) {
            let filterOb = this.filters?.find(obj => obj.type === "filter"); // Searches for a filter
            if (filterOb) {
                this.filter = { ...filterOb }; // Sets the filter object if found
            }
        }
    }

    /**
     * Initializes the list by checking for the `list` prop or using the `filter`
     * to retrieve the list using the component list's `getList` method.
     */
    getList() {
        let name = this.props.name; // Gets the name from props
        this.list = this.props.list ? this.props.list : this.filter ? this.componentList?.getList(name, this.filter?.search, this.filter?.attribute) : this.componentList?.getList(name);
        // If a list is provided, use it, otherwise retrieve the list based on the filter or just by name
    }

    /**
     * Filters the list using the `filterFunc` function if it exists.
     * If no `filterFunc` is defined, the list is left unchanged.
     */
    filterListByFilterFunc() {
        if (this.list) {
            this.list = this.list.filter((obj) => {
                if (this.filterFunc) {
                    return this.filterFunc(obj); // Filters the list using the filter function if it exists
                } else {
                    return true; // If no filter function, keeps all items
                }
            });
        }
    }

    /**
     * Filters the list using the filter factory by applying each filter from the `filters` array.
     * The filters are applied sequentially to the list.
     */
    filterListByFilterFactory() {
        if (this.filters) {
            for (let obj of this.filters) {
                let func = this.filterFacotry.getFilter(obj.type); // Retrieves the filter function from the factory
                if (func) {
                    this.list = func({ list: this.list, ...obj }); // Applies the filter function to the list
                }
            }
        }
    }

    /**
     * Sets the props for the component, including the `cells` and the filtered list.
     */
    setProps() {
        let cells = this.props.cells; // Retrieves the cells from props
        this.addToProps = { cells: cells, list: this.list }; // Adds cells and list to the props
    }

    /**
     * Pre-setup function that adds filter-related setup functions to the initial setup.
     * These functions are run before the component is fully set up.
     */
    componentPreSetup() {
        this.addToInitialSetup = [
            this.setFilterInfo, // Sets filter information
            this.getFilterFunc, // Retrieves the filter function
            this.getFilter, // Retrieves the filter object
            this.getList, // Initializes the list
            this.filterListByFilterFunc, // Filters the list by filter function
            this.filterListByFilterFactory, // Filters the list by filter factory
        ];
    }
}



/**
 * allows for a mapcomponent to have a search bar to filter it.
 */

class SearchMapComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {

        }
    }


    render() {

        let mapComponentInterface = mapInterface;
        let app = this.props.app ? this.props.app : mapComponentInterface.getApp();
        let componentList = mapComponentInterface?.getComponentList();
        let name = this.props.name;
        let attribute = this.props.attribute;
        let list = this.props.list ? this.props.list : componentList.getList(name);



        return (<div style={{ display: "flex", flexDirection: "row", }}>
            {this.props.imgLeft && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginRight: "-41px" }}>
                <img src={this.props.imgLeft} style={{ width: "32px", height: "32px", opacity: "71%" }} />
            </div>}
            <input autocomplete="off" name={attribute} placeholder={this.props.placeholder ? this.props.placeholder : "Search..."}
                style={this.props.style ? this.props.style : { width: "120px" }} class={this.props.class ? this.props.class : "flinntechInput"} onChange={(e) => {

                    const { name, value } = e.target

                    if (this.props.onTextChange) {
                        this.props.onTextChange(e);
                    }
                    else {
                        list = list.filter(obj => obj.getJson()[attribute].includes(value));
                        app.dispatch({ searchTags: [...list] })
                    }

                    if (this.props.callBackFunc) {
                        this.props.callBackFunc(e, { list: list, attribute: attribute, name: name })
                    }
                }} />

        </div>
        )
    }
}

const mapInterface = new MapComponentInterface()


export { MapComponent, SearchMapComponent, mapInterface, MapComponentInterface }

/**

 * TODO: TEST if I can create mulitple classes to add to the factory. and test adding different themes.
 * test everythingP
 * Test filtering
 * create other really cool map options.
 *  Create a new map type that allows for any type a list. (non getJson lists are fine. components that use them)
 * refactor the mapComponent so that we can use multiple and also make it so that we don't have to change two things all at once. also it needs to have style ability
 * Also refactor css so that things that are the same can be in one spot
 * Check for null pointers everywhere so people can put in whatever.
 * setup so that individual things can be setup with a different theme then the rest of the map *
 * set up searchMapComponent to be set up with themes *
 * make a component for zoom in zoom out and then use the type.
 * searchcomponent needs to be more refined to work with all sorts of searches
 * make it so that you can do dropdown search
 * make it so interactive map does not need pin type if they provide an object
 * The props do not update in the map component. Either we need to add an observer it can't be done that way. * This actually can't be done on the react side. So temporarily we will add the ability to pass in app as a prop.
 * selector item
 * html should be returned by a function.
 */