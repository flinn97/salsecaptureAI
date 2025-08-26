import { BaseComponent } from "flinntech";
import React from "react";

export default class ViewVideo extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit scroller",
      isDragging: false,
      file: null,
      title: props.defaultTitle || "",
      error: null,
      isPlaying: false,
      muted: false,
      duration: 0,
      currentTime: 0,
    };
    this.videoRef = React.createRef(); // <-- add this
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    this._patchBackdropPadding();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this._restoreBackdropPadding();
  }

  // --- Backdrop padding patch ---
  _patchBackdropPadding = () => {
    const apply = (el) => {
      // Remember original inline padding (if any) so we can restore precisely.
      this._backdropEl = el;
      this._priorInlinePadding = el.style.getPropertyValue("padding") || null;
      this._priorInlinePriority = el.style.getPropertyPriority("padding") || "";
      // Force our value to win even against framework "!important"
      el.style.setProperty("padding", "15vh", "important");
    };

    const el = document.querySelector(".backDropPopup");
    if (el) {
      apply(el);
      return;
    }

    // If it's not in DOM yet, watch briefly until it appears.
    this._backdropObserver = new MutationObserver(() => {
      const node = document.querySelector(".backDropPopup");
      if (node) {
        apply(node);
        if (this._backdropObserver) {
          this._backdropObserver.disconnect();
          this._backdropObserver = null;
        }
      }
    });
    this._backdropObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  _restoreBackdropPadding = () => {
    if (this._backdropObserver) {
      this._backdropObserver.disconnect();
      this._backdropObserver = null;
    }
    const el = this._backdropEl || document.querySelector(".backDropPopup");
    if (!el) return;

    if (this._priorInlinePadding !== null) {
      // Restore whatever inline padding was there (and its priority)
      el.style.setProperty(
        "padding",
        this._priorInlinePadding,
        this._priorInlinePriority || ""
      );
    } else {
      // If there was no inline padding originally, remove ours so CSS takes over
      el.style.removeProperty("padding");
    }
  };
  // --- end backdrop patch ---

  handleKeyDown = (e) => {
    const tag = (e.target?.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    switch (e.key) {
      case " ":
        e.preventDefault();
        this.togglePlay();
        break;
      case "m":
      case "M":
        this.toggleMute();
        break;
      case "f":
      case "F":
        this.enterFullscreen();
        break;
      case "ArrowRight":
        this.seekBy(5);
        break;
      case "ArrowLeft":
        this.seekBy(-5);
        break;
      default:
        break;
    }
  };

  togglePlay = () => {
    const v = this.videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      this.setState({ isPlaying: true });
    } else {
      v.pause();
      this.setState({ isPlaying: false });
    }
  };

  toggleMute = () => {
    const v = this.videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    this.setState({ muted: v.muted });
  };

  seekBy = (secs) => {
    const v = this.videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + secs));
  };

  enterFullscreen = () => {
    const v = this.videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iOS Safari
  };

  onLoadedMetadata = () => {
    const v = this.videoRef.current;
    if (!v) return;
    this.setState({ duration: v.duration || 0 });
  };

  onTimeUpdate = () => {
    const v = this.videoRef.current;
    if (!v) return;
    this.setState({ currentTime: v.currentTime || 0, isPlaying: !v.paused });
  };

  formatTime = (s) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  render() {
    const { pageClass } = this.props;
    const { defaultClass, duration, currentTime } = this.state;

    const obj = this.propsState.currentPopupComponent;
    const json = obj?.getJson ? obj.getJson() : {};
    const src = json.videoURL || json.url || json.src || "";
    const poster = json.thumbnailURL || json.poster || undefined;

    return (
      <div
        style={{ padding: "10px", paddingBottom: "100px", height: "100%" }}
        className={pageClass || defaultClass}
      >
        <h2 style={{ marginBottom: 12 }}>{json.title || "Video"}</h2>

        {!src ? (
          <div style={{ opacity: 0.7 }}>No video URL found.</div>
        ) : (
          <>
            <video
              ref={this.videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                maxHeight: "65vh",
                background: "#000",
                borderRadius: 12,
                outline: "none",
              }}
              onLoadedMetadata={this.onLoadedMetadata}
              onTimeUpdate={this.onTimeUpdate}
            />

            <div style={{ marginTop: 8, opacity: 0.8, fontSize: 12 }}>
              {this.formatTime(currentTime)} / {this.formatTime(duration)}
              &nbsp;•&nbsp;Space: Play/Pause &nbsp;•&nbsp; M: Mute &nbsp;•&nbsp; F:
              Fullscreen &nbsp;•&nbsp; ←/→: Seek
            </div>
          </>
        )}
      </div>
    );
  }
}