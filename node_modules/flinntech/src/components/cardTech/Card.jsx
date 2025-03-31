import BaseComponent from "../templateTech/baseClasses/BaseComponent";
import React from "react";
import { cardInterface } from "./cardInteface";
/**
 * Card component for rendering a customizable card UI with optional popup functionality.
 */
export default class Card extends BaseComponent {
  // Class properties
  type;
  theme;
  interface;

  /**
   * Constructor initializes the Card component.
   * Sets up state, references, and initial properties.
   * @param {Object} props - Properties passed to the component.
   */
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef(); // Reference for detecting clicks outside the popup.
    this.setWrapperRef = this.setWrapperRef; // Ensures the wrapper ref is properly assigned.
    this.initialPropsSetupFunctions = [
      ...this.initialPropsSetupFunctions,
      this.setApp,
      this.setType,
      this.setClassStr,
    ]; // Adds custom setup functions to the parent class.

    // Initial state for theme and type configuration
    this.state = {
      defaultType: this.props.type ? this.props.type : "fit",
      defaultTheme: this.props.theme ? this.props.theme : "Default",
      typeKey: "type",
      themeKey: "theme",
    };
    this.interface = cardInterface; // Assigns the card interface for additional functionality.
  }

  /**
   * Lifecycle method called after the component is mounted.
   * Adds an event listener to detect clicks outside the popup if `popup` prop is true.
   */
  componentDidMount() {
    if (this.props.popup) {
      document.addEventListener("mousedown", this.handleClickOutside);
    }
  }

  /**
   * Lifecycle method called before the component is unmounted.
   * Removes the event listener added during `componentDidMount`.
   */
  componentWillUnmount() {
    if (this.props.popup) {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  /**
   * Handles click events outside the popup element and triggers the `handleClose` prop callback.
   * @param {Event} event - The click event object.
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (this.props.handleClose) {
        this.props.handleClose();
      }
    }
  }

  /**
   * Wraps the provided HTML content inside a popup if the `popup` prop is true.
   * @param {JSX.Element} html - The HTML content to wrap.
   * @returns {JSX.Element} The updated HTML content with popup elements if applicable.
   */
  isPopup(html) {
    if (this.props.popup) {
      let closePopup = this.closePopup.getHtml({
        content: this.props.closeUI || <>X</>,
        props: {
          onClick: () => {
            if (this.props.handleClose) {
              this.props.handleClose();
            }
          },
        },
      });
      let popup = this.popupContent.getHtml({
        content: <>{closePopup}{html}</>,
        props: { ref: this.wrapperRef },
      });
      let backDrop = this.backDrop.getHtml({ content: popup });
      html = backDrop;
    }
    return html;
  }

  /**
   * Sets the theme of the card based on props or default values.
   */
  setTheme() {
    this.theme = this.props[this.state.themeKey]
      ? this.props[this.state.themeKey]
      : this.state.defaultTheme;
  }

  /**
   * Sets the type of the card based on props or default values.
   */
  setType() {
    this.type = this.props[this.state.typeKey]
      ? this.props[this.state.typeKey]
      : this.state.defaultType;
  }

  /**
   * Sets the CSS class strings for various card and popup elements.
   */
  setClassStr() {
    this.defaultcardClass = this.type + this.theme + " scroller";
    this.defaultcardClass = this.props.popup
      ? this.defaultcardClass + " cardPopup"
      : this.defaultcardClass;

    if (this.props.popup) {
      this.defaultbackDropClass = "backDropPopup";
      this.defaultpopupContentClass = "popupContent";
      this.defaultclosePopupClass = "closePopup";
    }
  }

  /**
   * Generates the final HTML content for the card, including any popup elements if applicable.
   * @returns {JSX.Element} The HTML content for the card.
   */
  getHtml() {
    let content = this.getContent();
    this.html = this.card.getHtml({ content: content });
    this.html = this.isPopup(this.html);
    return this.html;
  }

  /**
   * Retrieves the card's content from the `content` prop.
   * @returns {JSX.Element} The card content.
   */
  getContent() {
    this.content = this.props.content;
    return this.content;
  }

  /**
   * Prepares the necessary components for rendering the card.
   * Adds specific components if the `popup` prop is true.
   */
  preSetup() {
    let arr = ["card"];
    if (this.props.popup) {
      arr = [...arr, "backDrop", "popupContent", "closePopup"];
    }
    this.setComponents(arr);
  }
}

// TODO:
// - Figure out how to provide the mod file to change the color theme from the root to node modules.
// - Add support for more themes.
// - Incorporate technologies like Bootstrap to achieve a professional look.
// - Ensure that components properly update when receiving new props.
