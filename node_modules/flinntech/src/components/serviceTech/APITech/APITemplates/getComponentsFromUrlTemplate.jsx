import GetComponentTemplate from "./getComponentTemplate";

export default class GetComponentsFromUrl extends GetComponentTemplate {

    /**
     * This method fetches components from the backend, retrieves the first component, 
     * and gets associated items if the component exists.
     */
    async getComponentsFromBackend() {
        // Fetch data from the URL and get the first component
        await this.getFromURL();
        await this.getFirstComponent();

        // If a component is found, fetch associated items
        if (this.comp) {
            await this.getAssociatedItems();
        }

        // Mark the components as successfully retrieved
        this.setGotComponents();
    }

    /**
     * This method retrieves the first component based on the URL type and ID.
     * If the component is not found in the local list, it fetches it from the backend.
     * @param {string} urlType - Type of the component (optional).
     * @param {string} urlId - ID of the component (optional).
     */
    async getFirstComponent(urlType, urlId) {
        // Use provided URL type and ID, or fallback to default class properties
        let type = urlType || this.urlType;
        let id = urlId || this.urlId;

        // Try to get the component from the local list using the type and ID
        this.comp = this.componentList.getComponent(type, id);

        // If no component is found locally, fetch it from the backend
        if (!this.comp) {
            // Fetch components from the backend with specified filters
            this.comp = await this.componentList.getComponentsFromBackend({
                type: type,
                ids: id,
                filterKeys: "_id", // Filter by ID
                owner: this.state.owner // Specify the owner in the request
            });

            // If components are found, use the first one
            this.comp = this.comp.length > 0 ? this.comp[0] : undefined;
        }
    }

    /**
     * This method retrieves associated items for the component.
     * It first tries to fetch them from the component itself and then from the backend.
     */
    async getAssociatedItems() {
        // Try fetching associated items from the component
        this.compList = await this.comp.getAssociatedItems(this.state.itemTypes);

        // If items are found, set the state to indicate that components are available
        if (this.compList.length > 0) {
            this.setState({
                gotComponents: true,
            });
        }

        // If no items were found, fetch them from the backend
        this.compList = await this.comp.getAssociatedItemsFromBackend(this.state.itemTypes);

        // After retrieving associated items, update the current items in the state
        await this.setCurrentItems();
    }

    /**
     * This method updates the state with the current component and its associated items.
     */
    setCurrentItems() {
        // Dispatch an action to update the current component and its associated data in the state
        this.dispatch({
            currentComponent: this.comp,
            ["current" + this.getCapitalFirstLetter(this.comp.getJson().type)]: this.comp, // Dynamically set the key based on the component type
            ...this.dispatchItems // Additional dispatch data (from parent or class context)
        });
    }

    /**
     * This method sets the state indicating that components have been successfully retrieved.
     */
    setGotComponents() {
        // Update the state to reflect that components have been successfully fetched from the backend
        this.setState({
            gotComponents: true,
            gotComponentsFromBackend: true, // Mark that components were fetched from the backend
            components: this.compList, // Store the list of associated components
            urlId: this.urlId // Store the URL ID for reference
        });
    }
}/**this needs to be faster.
 * Make sure that someone can pass down props for a component and use the props comp instead. Also be able to do it in a list.
 */