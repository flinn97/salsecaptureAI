/**
 * TemplatePage component. This component renders the page for displaying the details 
 * of a specific template. It extends GetComponentsFromUrl from the flinntech library.
 */
import { GetComponentsFromUrl, RunButton } from "flinntech";
import { ParentFormComponent } from "flinntech";
import { FormComponentInterface, InputBaseClass } from "flinntech";

export default class TemplatePage extends GetComponentsFromUrl {
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
                <h1>Template Details</h1>
                <div className="input-container">
                    <div className="input-bar">
                {this.propsState.currentComponent&&
                <ParentFormComponent type="quill" name="content" obj={this.propsState.currentComponent} />
                }
                    </div>
                </div>
                <RunButton
                        content="Save Template"
                    />

            </div>
        );
    }

    /**
     * Renders the TemplatePage component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || "fit"} style={{marginLeft:"300px"}}>
                {this.state.gotComponents && this.getInnerContent()}
            </div>
        );
    }
}