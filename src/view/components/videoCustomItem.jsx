import React from 'react';
import { BaseComponent, DelButton } from 'flinntech';
import './Checkbox.css';
import contactImg from "../../assets/contact.png";
import CheckIt from './check';
import { Link } from 'react-router-dom';
import thumb from "../../assets/vidPlaceholder.png"

class VideoCustomItem extends BaseComponent {
    constructor(props) {
        super(props);
        // preserve any initial state from BaseComponent
    }

    render() {
        const { obj } = this.props;
        let video = obj.getJson();
        let title = video.title;
        return (
            <div
            onClick={()=>{
                this.dispatch({popupSwitch:"showVideo", currentPopupComponent:obj})
            }}
        className="video-card"
        role="button"
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        aria-label={`Open video ${title}`}
        style={{maxWidth:'300px'}}
      >
        <div className="thumb">
          <img src={thumb} alt={title} loading="lazy" />

          <button
            type="button"
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              // Let your existing DelButton handle the deletion
            }}
            aria-label={`Delete ${title}`}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Keep your real delete action in the DOM for functionality */}
          <div className="hidden-del">
            <DelButton obj={obj} />
          </div>

          <div className="play-overlay">
            <i className="fa-solid fa-play"></i>
          </div>
        </div>

        <div className="meta">
          <div className="video-title" title={title}>
            {title}
          </div>
          {video.uploader && (
            <div className="subtle">{video.uploader}</div>
          )}
        </div>
      </div>
        );
    }
}

export default VideoCustomItem;
