import React, { Component } from 'react';
import Papa from 'papaparse';

class CsvUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,       // Treat the first row as header
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parsed CSV data:', results.data);
        this.props.callBack({ data: results.data });
      },
      error: (error) => {
        console.error('Error while parsing:', error);
      },
    });
  }

  render() {
    const { data } = this.state;

    return (
        <div className="btn-gray" style={{position:'relative'}}>
        Upload CSV
        <input style={{opacity:0, width:'100%', height:"100%", position:"absolute", left:"0px", top:"0px"}} type="file" accept=".csv" onChange={this.handleFileUpload} />

                            </div>

    );
  }
}

export default CsvUpload;