import { BaseComponent, DelButton } from "flinntech";

/**
 * @class DeleteSequenceDialog
 * @extends {BaseComponent}
 * Displays a confirmation dialog asking the user
 * if they want to delete the given sequence.
 */
export default class DeleteSequenceDialog extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit scroller",
    };
  }

  render() {
    // Expecting propsState.sequence to be the sequence object
    const { sequence } = this.propsState;

    return (
      <div
        style={{ padding: "18px", paddingBottom: "100px", height: "100%" }}
        className={this.props.pageClass || this.state.defaultClass}
      >
        <h2 style={{ font: 'normal normal 900 18px/25px Satoshi' }}>
          Delete Sequence
        </h2>

        <div
          style={{
            marginTop: "8%",
            padding: "24px",
            border: "none",
            background: "#f0f0f0",
          }}
        >
          <p>
            Are you sure you want to delete the sequence <strong>{this.propsState.delSequence?.getJson().name || 'this'}</strong>? This action cannot be undone.
          </p>
        </div>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}
        >
          <div
            className="dark-button-1"
            onClick={() => {
              // Close dialog without deleting
              this.dispatch({ popupSwitch: '', delSequence:undefined });
            }}
          >
            Cancel
          </div>

          <DelButton 
            obj={this.propsState.delSequence} 
            content={"Delete"} 
            inPopup={true} 
            isPopup={true} 
            callbackFunc={()=>{this.dispatch({popupSwitch:"", delSequence:undefined})}}
            className="dark-button-1 del-button-red"
          />
            
          
        </div>
      </div>
    );
  }
}