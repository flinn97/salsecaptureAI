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
        
       let c = await this.componentList.getComponentsFromBackend({type:"client", ids: "alan@salescapture.com", filterKeys: "owner",})
       console.log(c)
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