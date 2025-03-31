import { BaseComponent } from 'flinntech';
import React, { Component } from 'react';

const styles = {
  container: {
    position: 'relative',
    width: '250px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#fff',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  },
  icon: {
    marginLeft: '10px',
    fontSize: '12px'
  },
  menu: {
    listStyle: 'none',
    padding: '0',
    margin: '5px 0 0 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
  },
  menuItem: {
    padding: '10px 12px',
    cursor: 'pointer'
  }
};

class Dropdown extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selected: null,
    };
    this.dropdownRef = React.createRef();

  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // Close dropdown if click is outside of component
  handleClickOutside(event) {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  // Toggle dropdown menu visibility
  toggleDropdown() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  // Handle selection and notify parent component
  handleSelect(option) {
    this.setState({ selected: option, isOpen: false });
    let obj = this.props.obj;
    obj.setCompState({[this.props.name]: option.value})
  }

  render() {
    const { options = [], placeholder = "Select...", className = "" } = this.props;
    const { isOpen, selected } = this.state;

    return (
      <div className={`dropdown ${className}`} ref={this.dropdownRef} style={styles.container}>
        <div onClick={this.toggleDropdown} style={styles.header}>
          <span>{selected ? selected.label : placeholder}</span>
          <span style={styles.icon}>{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && (
          <ul style={styles.menu}>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() =>{ 
                  this.handleSelect(option)
                }}
                style={styles.menuItem}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;