import BaseComponent from "../../../templateTech/baseClasses/BaseComponent";
import {urlService} from "../../Util/urlService";


export default class GetComponentTemplate extends BaseComponent {
    dispatchItems = {}

    /**
     * The constructor initializes the component with the provided properties and an optional object for configuration.
     * @param {Object} props - The component props.
     * @param {Object} obj - An optional configuration object.
     */
    constructor(props, obj) {
        super(props);
        this.state = {
            ...this.state,
            type: obj?.type,            // Type of component
            ids: obj?.ids,              // IDs to fetch components by
            filterKeys: obj?.filterKeys, // Filter keys for component fetching
            path: obj?.path,            // Path for URL-based fetching
            snapShot: obj?.snapShot,    // Snapshot of the component
            owner: true                 // Whether the component has an owner (default to true)
        }

        // If owner is explicitly set to false in the configuration object, update state accordingly
        if (obj?.owner === false) {
            this.state.owner = false
        }
    }

    /**
     * This method fetches components from the backend based on the current state.
     * It first tries to get the components from the local component list, 
     * and if that fails, it fetches them from the backend.
     */
    async getComponentsFromBackend() {
        let { type, ids, filterKeys, path, snapShot, owner } = this.state;

        // Try to fetch the components from the local list first
        this.compList = await this.componentList.getList(type, ids, filterKeys);

        // If local components are found, update the state
        if (this.compList.length > 0) {
            await this.setState({
                gotComponents: true
            });
        }

        // If no components were found locally, fetch them from the backend
        this.compList = await this.componentList.getComponentsFromBackend({ type, ids, filterKeys, path, snapShot, owner });

        // Update the state with the fetched components
        this.setState({
            gotComponents: true,
            getComponentsFromBackend: true,
            components: this.compList,
            urlId: ids
        });
    }

    /**
     * This lifecycle method is called when the component is mounted.
     * It fetches components from the backend and sets up a listener for the back button in the browser.
     */
    async componentDidMount() {
        // Fetch components from the backend when the component mounts
        this.getComponentsFromBackend();

        // Set up a listener for the browser's back button to trigger component reload
        let page = this;
        window.addEventListener('popstate', function(event) {
            page.onBackClick(event);
        });
    }

    /**
     * This method is called when the browser's back button is pressed.
     * It triggers a refresh of the components.
     * @param {Event} e - The event object associated with the back button click.
     */
    onBackClick(e) {
        // Re-fetch the components when the back button is clicked
        this.getComponentsFromBackend();
    }

    /**
     * This lifecycle method is called when the component updates.
     * It ensures the components are re-fetched if certain conditions are met.
     */
    componentDidUpdate() {
        this.getComponentsAgain();
    }

    /**
     * This method re-fetches the components if the URL or component ID has changed.
     * It compares the current state with the previous URL to determine if a re-fetch is necessary.
     */
    async getComponentsAgain(props, state) {
        // Fetch the current URL type and ID
        this.getFromURL();

        // Check if the URL has changed or the component needs to be re-rendered
        if (this.app.state.urlChange || (this.state.reRender && this.urlId !== this.state.urlId)) {
            // Update the state with the new URL ID and trigger a re-fetch
            await this.setState({ urlId: this.urlId });
            await this.dispatch({ urlChange: undefined });

            // Prevent multiple renders and trigger a new component fetch
            this.forceRerender = false;
            this.getComponentsFromBackend();
        }
    }

    /**
     * This method fetches the type and ID of the component from the URL using a utility service.
     */
    async getFromURL() {
        // Retrieve the type and ID from the URL
        this.urlType = urlService.getTypeFromURL();
        this.urlId = urlService.getIdFromURL();
    }
}