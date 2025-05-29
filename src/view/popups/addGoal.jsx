/**
 * @class OemPopupContent
 * @extends {BaseComponent}
 * This component renders a popup for adding or editing OEM information.  It uses other components from 'flinntech' for form elements and buttons.
 */
import {
  DelButton,
  ParentFormComponent,
  RunButton,
  UpdateButton,
  UploadButton,
} from "flinntech";
import { BaseComponent } from "flinntech";
import AddHw from "./addHw";

export default class AddGoal extends AddHw {

  /**
   * Constructor for the OemPopupContent component.
   * @param {object} props - The component's properties.
   */
  constructor(props) {
    super(props);
    this.projectName= "Goal"
    this.state = {
      ...this.state,
      defaultClass: "fit scroller", //Sets a default class for styling
    };
  }
}
