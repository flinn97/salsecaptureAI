/**
 * TemplatePage component. This component renders the page for displaying the details 
 * of a specific template. It extends GetComponentsFromUrl from the flinntech library.
 */
import { Card, GetComponentsFromUrl, RunButton } from "flinntech";
import { ParentFormComponent } from "flinntech";
import { FormComponentInterface, InputBaseClass } from "flinntech";
import AdminCard from "./adminCard";
import AIPromptCard from "./aiPromptCard";

export default class ClientPage extends GetComponentsFromUrl {
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
        if(!this.componentList.getComponentsFromBackend("todo")){
            await this.operationsFactory.prepare({prepare: {type: "todo"}, clean:true})
        }
    }

    /**
     * Returns the inner content of the TemplatePage component.
     * @returns {JSX.Element} The rendered content of the component.
     */
    getInnerContent() {
        let toDoList = this.componentList.getComponentsFromBackend({type: "todo", ids: this.propsState.currentUser.getJson()._id, filterKeys:"owner", })
        return (
            <div className="fit">
                {toDoList.getJson().attribute1}
                {toDoList.getJson().attribute2}
                {toDoList.getJson().attribute3}
                {toDoList.getJson().attribute4}
                {toDoList.getJson().attribute5}
                {toDoList.getJson().attribute6}

                <Card theme="NoBorder" type="fit"content={<AIPromptCard />} />

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