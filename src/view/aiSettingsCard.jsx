/**
 * ContentCard component. This component renders a card that contains
 * two sections: one for Sequences and one for Templates.
 * It extends the BaseComponent class from 'flinntech'.
 */
import { BaseComponent } from "flinntech";

export default class AISettingsCard extends BaseComponent {
  /**
   * Constructs the ContentCard component.
   * @param {object} props - The component's properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit",
    };
  }

  /**
   * Returns the inner content of the ContentCard component.
   * @returns {JSX.Element} The rendered content of the card.
   */
  getInnerContent() {
    let aiSettings = this.componentList.getComponent("aiSettings");
    return (
      <div
        id="aiSettings"
        className="map-container"
        style={{
          width: "fit-content",
          minWidth: "400px",
          height: "fit-content",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d1d1",
        }}
      >
        <div style={{display:"flex", flexDirection:"row"}}>
          <div
            className="contact-avatar"
            style={{ maxWidth: "45px", maxHeight: "45px", background:"#323232" }}
          >
            <i className="fa-solid fa-gears"></i>
          </div>
          <h1>AI Settings</h1>
        </div>
        <p style={{ color: "#333333", margin: "12px 0px 12px 0px" }}>
          Enable AI functionality within the platform
        </p>
        {aiSettings?.getJson()?.autoAI ? (
          <div
            onClick={() => {
              aiSettings.setCompState({ autoAI: false }, { run: true }, true);
            }}
            className="blue-button-1"
            style={{
              position: "relative",
              width: "fit-content",
            }}
          >
            Turn off AI
          </div>
        ) : (
          <div
            onClick={() => {
              aiSettings.setCompState({ autoAI: true }, { run: true }, true);
            }}
            className="blue-button-1"
            style={{
              position: "relative",
              width: "fit-content",
            }}
          >
            Turn on AI
          </div>
        )}
      </div>
    );
  }

  /**
   * Renders the ContentCard component.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    return (
      <div className={this.props.pageClass || this.state.defaultClass}>
        {this.getInnerContent()}
      </div>
    );
  }
}
