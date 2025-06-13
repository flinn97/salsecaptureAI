/**
 * TemplatePage component. This component renders the page for displaying the details 
 * of a specific template. It extends GetComponentsFromUrl from the flinntech library.
 */
import { Card, GetComponentsFromUrl, PopupButton, RunButton, urlService } from "flinntech";
import { ParentFormComponent } from "flinntech";
import { FormComponentInterface, InputBaseClass } from "flinntech";
import AdminCard from "./adminCard";
import AIPromptCard from "./aiPromptCard";
import UserList from "./userList";

export default class ClientPage extends GetComponentsFromUrl {
    /**
     * Lifecycle method that runs after the component mounts.
     * It fetches template components from the backend.
     */
    async componentDidMount() {
        
        let id = urlService.getIdFromURL()

        await this.getComponentsFromBackend();
        
        let users = await this.componentList.getComponentsFromBackend({ type: "user", ids: id, filterKeys: "clientId", })
        let toDoList = await this.componentList.getComponentsFromBackend({ type: "todo", ids: this.propsState.currentUser.getJson()._id, filterKeys: "owner", })

         
        let todo = toDoList.find((obj) => { return obj.getJson().clientId === id })
        if (!todo) {
            let currentTodo = await this.operationsFactory.prepare({ prepare: { type: "todo", clientId: id }, clean: true })
            todo = currentTodo[0]

        }
        this.dispatch({ currentTodo: todo })

    }

    /**
     * Returns the inner content of the TemplatePage component.
     * @returns {JSX.Element} The rendered content of the component.
     */
    getInnerContent() {

        return (
            <div className="fit">
                {[1, 2, 3, 4, 5, 6].map(i => {
                    const attr = `attribute${i}`;
                    const completeKey = `complete${i}`;
                    const json = this.propsState.currentTodo?.getJson();

                    return (
                        <div key={i}>
                            {json?.[attr]}
                            <div
                                onClick={() => {
                                     
                                    const complete = !json[completeKey];
                                    this.propsState.currentTodo?.setCompState({ [completeKey]: complete },{run:true});
                                }}
                            >
                                {json?.[completeKey] ? "Done" : "Mark Done"}
                            </div>
                        </div>
                    );
                })}
                <RunButton obj={this.propsState.currentTodo} content="save"/>
                <div onClick={async()=>{
                    let user = await this.operationsFactory.prepare({prepare:{type:"user"}})
                    user = user[0]
                    this.dispatch({popupSwitch:"addUser", currentPopupComponent:user})
                }}>add user</div>
                 <div>
                    <Card theme="NoBorder" type="fit" content={<UserList />} />
                </div>
                <div>
                    {/* <Card theme="NoBorder" type="fit" content={<AIPromptCard />} /> */}
                </div>
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