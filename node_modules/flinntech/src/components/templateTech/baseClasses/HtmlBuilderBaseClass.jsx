/**
 * HtmlBuilderBaseClass is a utility class to dynamically generate and manage HTML components using React.
 * It allows users to define the HTML element type, manage its properties, content, styles, and render it as a React component.
 */
 import {binder} from "../../serviceTech/Util/binder";
 import { Link } from "react-router-dom";
 
 export default class HtmlBuilderBaseClass {
     /**
      * Constructor to initialize the HtmlBuilderBaseClass instance.
      * @param {Object} obj - Initial properties and content for the HTML element.
      */
     constructor(obj) {
         binder.bind(this);
         this.props = { ...obj };
         this.content = obj.content || '';
         this.type = "div";
     }
 
     /**
      * Sets the HTML element type (e.g., div, span, button).
      * @param {string} type - The type of the HTML element.
      */
     setHtmlType(type) {
         this.type = type;
     }
 
     /**
      * Gets the current HTML element type.
      * @returns {string} - The type of the HTML element.
      */
     getHtmlType() {
         return this.type;
     }
 
     /**
      * Sets a specific property of the HTML element.
      * @param {string} name - The name of the property.
      * @param {*} val - The value of the property.
      */
     setProp(name, val) {
         this.props[name] = val;
     }
 
     /**
      * Sets all properties of the HTML element.
      * @param {Object} p - The properties object.
      */
     setProps(p) {
         this.props = { ...p };
         if (p.content) {
             this.content = p.content;
         }
     }
 
     /**
      * Updates properties of the HTML element by merging with existing properties.
      * @param {Object} p - The properties object to merge.
      */
     updateProps(p) {
         this.props = { ...this.props, ...p };
         if (p.content) {
             this.content = p.content;
         }
     }
 
     /**
      * Adds properties to the HTML element.
      * @param {Object} p - The properties object to add.
      */
     addProps(p) {
         this.props = { ...this.props, ...p };
         if (p.content) {
             this.content = p.content;
         }
     }
 
     /**
      * Retrieves all properties of the HTML element.
      * @returns {Object} - The properties object.
      */
     getProps() {
         return this.props;
     }
 
     /**
      * Retrieves a specific property of the HTML element.
      * @param {string} name - The name of the property.
      * @returns {*} - The value of the property.
      */
     getProp(name) {
         return this.props[name];
     }
 
     /**
      * Sets the style object of the HTML element.
      * @param {Object} style - The style object.
      */
     setStyle(style) {
         this.props.style = style;
     }
 
     /**
      * Updates the style of the HTML element by merging with the existing style.
      * @param {Object} s - The style object to merge.
      */
     updateStyle(s) {
         this.props.style = { ...this.props.style, ...s };
     }
 
     /**
      * Retrieves the style object of the HTML element.
      * @returns {Object} - The style object.
      */
     getStyle() {
         return this.props.style;
     }
 
     /**
      * Sets the CSS class name of the HTML element.
      * @param {string} c - The class name.
      */
     setClass(c) {
         this.props.className = c;
     }
 
     /**
      * Retrieves the CSS class name of the HTML element.
      * @returns {string} - The class name.
      */
     getClass() {
         return this.props.className;
     }
 
     /**
      * Sets the onChange event handler of the HTML element.
      * @param {Function} onChange - The event handler function.
      */
     setOnChange(onChange) {
         this.props.onChange = onChange;
     }
 
     /**
      * Sets the onClick event handler of the HTML element.
      * @param {Function} onClick - The event handler function.
      */
     setOnClick(onClick) {
         this.props.onClick = onClick;
     }
 
     /**
      * Retrieves the onClick event handler of the HTML element.
      * @returns {Function} - The onClick event handler function.
      */
     getOnClick() {
         return this.props.onClick;
     }
 
     /**
      * Sets the content of the HTML element.
      * @param {React.ReactNode} content - The content to set.
      */
     setContent(content) {
         this.content = content;
     }
 
     /**
      * Retrieves the content of the HTML element.
      * @returns {React.ReactNode} - The content of the HTML element.
      */
     getContent() {
         return this.content;
     }
 
     /**
      * Generates and returns the React component based on the current configuration.
      * @param {Object} obj - An object containing additional properties, content, or type to override.
      * @returns {React.ReactNode} - The generated React component.
      */
     getHtml(obj) {
         let { content, props } = obj;
         let type = obj?.type;
         if (content) {
             this.content = content;
         }
 
         props = { ...this.props, ...props };
 
         const types = {
             a: <a {...props}>{this.content}</a>,
             button: <button {...props}>{this.content}</button>,
             div: <div {...props}>{this.content}</div>,
             h1: <h1 {...props}>{this.content}</h1>,
             h2: <h2 {...props}>{this.content}</h2>,
             h3: <h3 {...props}>{this.content}</h3>,
             h4: <h4 {...props}>{this.content}</h4>,
             h5: <h5 {...props}>{this.content}</h5>,
             h6: <h6 {...props}>{this.content}</h6>,
             img: <img {...props} />,
             input: <input {...props} />,
             p: <p {...props}>{this.content}</p>,
             span: <span {...props}>{this.content}</span>,
             table: <table {...props}>{this.content}</table>,
             tr: <tr {...props}>{this.content}</tr>,
             td: <td {...props}>{this.content}</td>,
             th: <th {...props}>{this.content}</th>,
             ul: <ul {...props}>{this.content}</ul>,
             li: <li {...props}>{this.content}</li>,
             ol: <ol {...props}>{this.content}</ol>,
             form: <form {...props}>{this.content}</form>,
             textarea: <textarea {...props}>{this.content}</textarea>,
             select: <select {...props}>{this.content}</select>,
             option: <option {...props}>{this.content}</option>,
             label: <label {...props}>{this.content}</label>,
             nav: <nav {...props}>{this.content}</nav>,
             footer: <footer {...props}>{this.content}</footer>,
             header: <header {...props}>{this.content}</header>,
             article: <article {...props}>{this.content}</article>,
             section: <section {...props}>{this.content}</section>,
             aside: <aside {...props}>{this.content}</aside>,
             main: <main {...props}>{this.content}</main>,
             video: <video {...props}>{this.content}</video>,
             audio: <audio {...props}>{this.content}</audio>,
             iframe: <iframe {...props}>{this.content}</iframe>,
             canvas: <canvas {...props}>{this.content}</canvas>,
             content: <></>,
             fragment: <>{this.content}</>,
             link: <Link {...props}>{this.content}</Link>
         };
 
         if (type === "content" || this.type === "conent") {
             let Comp = this.content;
             types.content = <Comp {...props} />;
         }
 
         let component = type ? types[type] : types[this.type];
 
         return component;
     }
 }
 