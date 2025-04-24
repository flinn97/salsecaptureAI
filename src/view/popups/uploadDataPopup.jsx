/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import { Timestamp } from "firebase/firestore";
import { MapComponent, ParentFormComponent, RunButton, UpdateButton, UploadButton } from "flinntech";
import { BaseComponent } from "flinntech";

export default class UploadDataPopup extends BaseComponent {
  /**
   * Constructor for the OemPopupContent component.
   * @param {object} props - The component's properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit scroller", //Sets a default class for styling
    }
  }
  /**
   * Renders the OemPopupContent component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {


    return (
      <div style={{ padding: "10px", paddingBottom: "100px", height: "65%" }} className={this.props.pageClass || this.state.defaultClass}>
        <h2>Add Data</h2> {/*Heading for the popup*/}
        <div>Data: {this.propsState.uploadData?.length} contacts</div>
        <div>Tag data</div>
        <input onChange={(e) => {
          this.setState({
            tags: e.target.value

          })
        }} />
        <div onClick={async () => {
          await this.operationsFactory.prepare({ prepare: this.propsState.uploadData });

          this.operationsFactory.run();
        }}>
          Upload
        </div>



      </div>
    )
  }


}