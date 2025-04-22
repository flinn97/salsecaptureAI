/**
 * SequencePage component. This component displays the details of a specific sequence 
 * and a list of steps associated with it. It extends GetComponentsFromUrl to handle 
 * fetching the sequence based on the URL parameters.
 */
import { GetComponentsFromUrl, UploadButton } from "flinntech";
import { MapComponent } from "flinntech";
import { ParentFormComponent, RunButton } from "flinntech";
import { Card } from "flinntech";
import { Timestamp } from "firebase/firestore";
import Dropdown from "./components/dropdown";

export default class SequencePage extends GetComponentsFromUrl {
    /**
     * Fetches the necessary components from the backend based on the URL
     * and prepares a new Step object if no ID is provided.
     */

    async componentDidMount() {


        let sequence;
        await this.getComponentsFromBackend();
        sequence = this.comp

        if (!sequence) {
            sequence = await this.operationsFactory.prepare({ prepare: { type: "sequence" }, clean: true })
            sequence = sequence[0]
        }
        else {
            await this.componentList.getComponentsFromBackend({ type: "step", ids: sequence.getJson()._id, filterKeys: "sequenceId" });
        }

        await this.dispatch({ currentSequence: sequence });
        this.createStep(sequence);

    }

    async createStep(sequence) {
        let list = this.componentList.getList("step", sequence ? sequence.getJson()._id : this.propsState.currentSequence.getJson()._id, "sequenceId");

        // If no ID in the URL, prepare a new Step objectx
        const newStep = await this.operationsFactory.prepare({
            prepare: { type: "step", sequenceId: sequence ? sequence.getJson()._id : this.propsState.currentSequence.getJson()._id, step: list.length }
        });
        this.dispatch({ currentStep: newStep.length === 2 ? newStep[1] : newStep[0] }); // Dispatch the currentStep as the new step
    }

    /**
     * Returns the inner content of the SequencePage component.
     * @returns {JSX.Element} The rendered content of the sequence page.
     */
    getInnerContent() {
        // Compute timestamps based on the current time
        // const now = Timestamp.now();
        // const fiveMinutesFromNow = Timestamp.fromDate(
        //     new Date(Date.now() + 5 * 60 * 1000)
        // );
        // const tenMinutesFromNow = Timestamp.fromDate(
        //     new Date(Date.now() + 10 * 60 * 1000)
        // );


        const selectOptions = [{ value: 0, label: "now" }, { label: "5 m", value: 5 / 60 }, { value: 10 / 60, label: "10 m" }];

        return (
            <div className="fit">
                <div className="mobile-container">
                    <div className="title-bar">
                        <div className="title-left">
                            <div className="title-icon">
                                <i className="fas fa-angle-left"></i>
                            </div>
                            <div className="title-name">{this.propsState.currentSequence?.getJson().name}</div>
                        </div>
                        <div className="title-right">
                            <div className="title-icon">
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="title-name">Active</div>
                        </div>
                    </div>

                    {/* <div className="sequence">
        <div className="row row-space-around">
          <div className="col">
            <div>Active</div>
            <div>455</div>
          </div>
          <div className="col">
            <div>Completed</div>
            <div>650</div>
          </div>
          <div className="col">
            <div>Opened</div>
            <div>4%</div>
          </div>
          <div className="col">
            <div>Reply</div>
            <div>1%</div>
          </div>
          <div className="col">
            <div>Bounce</div>
            <div>7%</div>
          </div>
        </div>
      </div> */}

                    <div className="switch-tab">
                        <div className="row row-space-around">
                            <div className="switch-tab-btn">
                                Assigned
                                <br />
                                Prospects
                            </div>
                            <div className="switch-tab-btn active">
                                Sequence
                                <br />
                                Steps
                            </div>
                        </div>
                    </div>

                    <div className="icon-list">
                        <div className="icon-row">
                            <div className="icon-container">
                                <div className="col">
                                    <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                                    <div className="svg">
                                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                            <line
                                                x1="50%"
                                                y1="0"
                                                x2="50%"
                                                y2="50"
                                                stroke="var(--app-green)"
                                                strokeWidth="3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="message-container">
                                <b>Welcome! How Can We Best Help You?</b>
                                <br />
                                <span>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </span>
                            </div>
                        </div>




                        <div className="icon-row">
                            <div className="svg-last">
                                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M25,0 Q25,25 50,25 H50"
                                        fill="none"
                                        stroke="var(--app-green)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="icon-last">
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <h4 style={{ marginBottom: "10px" }}>Steps for Sequence</h4>

                <div className="input-container">
                    <div className="input-bar">
                        <div className="input-icon">Name:</div>
                {this.propsState.currentSequence && (
                    <ParentFormComponent
                        obj={this.propsState.currentSequence}
                        name="name"
                    />
                )}
                    </div>
                </div>

                {/* MapComponent to display steps associated with the current sequence */}
                <MapComponent
                    name="step"
                    filter={{ search: this.propsState.currentSequence?.getJson()._id, attribute: "sequenceId" }}
                    cells={[
                        { type: "attribute", name: "subject" },
                        { type: "attribute", name: "content" }
                        // { type: "custom", custom: StepComponent}
                    ]}
                />


                {/* If there is a currentStep, show the form to edit it */}
                <div className="input-container">
                    <div className="input-bar">
                        <div className="input-icon">Subject:</div>
                {this.propsState.currentStep && (
                    <ParentFormComponent
                        obj={this.propsState.currentStep}
                        name="subject"
                    />
                )}
                    </div>
                </div>

                <div className="input-container">
                    <div className="input-bar">
                        <div className="col col-left">
                            <div style={{fontWeight:"700"}}>Content:</div>
                            {this.propsState.currentStep && (
                                <ParentFormComponent
                                    type="quill"
                                    obj={this.propsState.currentStep}
                                    name="content"
                                    wrapperClass="contentWrapper"
                                />
                            )}
                        </div>

                    </div>
                </div>
                <>next send in days</>
                {this.propsState.currentStep && (
                    //     <Dropdown
                    //     options={selectOptions} // Assuming selectOptions is an array of objects like: [{ label: "ASAP" }, { label: "5 minutes" }, { label: "10 minutes" }]
                    //     obj = {this.propsState.currentStep}
                    //     placeholder="Select next send"
                    //     className="custom-dropdown"
                    //     name="nextSend"
                    //   />
                    <ParentFormComponent

                        obj={this.propsState.currentStep}
                        name="nextSend"
                    />
                )}
                <UploadButton obj={this.propsState.currentStep} />


                {/* If there is a currentStep, show a RunButton to clear it */}
                {this.propsState.currentStep && (
                    <RunButton
                        content="Add"
                        callbackFunc={async () => {

                            await this.dispatch({ currentStep: undefined }); // Clear the current step
                            this.createStep();
                        }}
                    />
                )}
                {/* If there is a currentStep, show a RunButton to clear it */}
                {/* {this.propsState.currentSequence && (
                    <RunButton
                        content="Save Sequence"
                    />
                )} */}
            </div>
        );
    }
    /**
     * Renders the Sequences component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div className={this.props.pageClass || this.state.defaultClass} style={{ marginLeft: "300px" }}>
                {this.getInnerContent()}
            </div>
        );
    }
}