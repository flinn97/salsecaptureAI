/**
 * TemplatePage component. This component renders the page for displaying the details 
 * of a specific template. It extends GetComponentsFromUrl from the flinntech library.
 */
import { Card, GetComponentsFromUrl, RunButton } from "flinntech";
import { ParentFormComponent } from "flinntech";
import { FormComponentInterface, InputBaseClass } from "flinntech";
import AdminCard from "./adminCard";

export default class AdminPage extends GetComponentsFromUrl {
    /**
     * Lifecycle method that runs after the component mounts.
     * It fetches template components from the backend.
     */
    async componentDidMount() {
        
        await this.getComponentsFromBackend();
        const templateId = this.urlId; // Get the ID from the URL

        // If there's no ID, prepare a new template item
        if (!templateId || templateId==="template") {
            const newTemplate = await this.operationsFactory.prepare({prepare: {type: "template"}, clean:true });
            this.dispatch({ currentComponent: newTemplate[0] }); // Dispatch the new template as the current component
        }
    }

    /**
     * Returns the inner content of the TemplatePage component.
     * @returns {JSX.Element} The rendered content of the component.
     */
    getInnerContent() {
        return (
            <div className="fit">
                <Card theme="NoBorder" type="fit"content={<AdminCard />} />

            </div>
        );
    }

    /**
     * Renders the TemplatePage component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || "fit"}>
                {this.state.gotComponents && this.getInnerContent()}
            </div>
        );
    }
}