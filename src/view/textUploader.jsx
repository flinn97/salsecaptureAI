import React from 'react';
import { BaseComponent } from 'flinntech';

// pdf.js (works nicely with Vite)
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import workerURL from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
GlobalWorkerOptions.workerSrc = workerURL;

class PdfTextUpload extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { loading: false, error: null };
  }

  // Use arrow methods so we don't need to bind in constructor
  handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    this.setState({ loading: true, error: null });
    try {
      const ext = (file.name.split('.').pop() || '').toLowerCase();

      if (ext === 'pdf') {
        const data = await this._parsePdf(file);
        this.props?.callBack?.({ data });
      } else if (['txt', 'md', 'log'].includes(ext)) {
        const data = await this._parseText(file);
        this.props?.callBack?.({ data });
      } else {
        throw new Error('Unsupported file type. Please upload a .pdf or .txt/.md/.log file.');
      }
    } catch (err) {
      console.error('Upload/parse error:', err);
      this.setState({ error: err?.message || 'Failed to parse file.' });
    } finally {
      this.setState({ loading: false });
      // reset input so same file can be re-selected
      e.target.value = '';
    }
  };

  _parseText = async (file) => {
    const text = await file.text();
    return {
      type: 'text',
      fileName: file.name,
      size: file.size,
      text,
      // keep top-level "results-like" symmetry with your CSV shape
      lines: text.split(/\r?\n/),
    };
  };

  _parsePdf = async (file) => {
    const buffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: buffer }).promise;

    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      // Combine text items in reading order
      const pageText = content.items
        .map((it) => ('str' in it ? it.str : it?.text || ''))
        .join(' ')
        .replace(/\s+([.,;:!?])/g, '$1') // tidy spaces before punctuation
        .replace(/\s+/g, ' ')
        .trim();
      pages.push(pageText);
    }

    return {
      type: 'pdf',
      fileName: file.name,
      size: file.size,
      numPages: pdf.numPages,
      pages,                         // array of per-page text
      fullText: pages.join('\n\n'),  // convenient combined text
    };
  };

  render() {
    const { loading, error } = this.state;

    return (
      <div className="dark-button-1" style={{ position: 'relative', width: 'fit-content' }}>
        <label  style={{ cursor: 'pointer' }}>
          {loading ? 'Processing…' : 'Upload PDF/Text'}
        </label>
        <input
          type="file"
          accept=".pdf,.txt,.md,.log"
          onChange={this.handleFileUpload}
          style={{ display: 'block' }}
        />

        {error && (
          <div style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>
            {error}
          </div>
        )}
      </div>
    );
  }
}

export default PdfTextUpload;
