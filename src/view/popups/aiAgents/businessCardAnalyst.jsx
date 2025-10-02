import React from "react";
import { BaseComponent, MapComponent, urlService } from "flinntech";

/**
 * BusinessCardAnalyzer
 * - Mobile-first, sticky header/composer
 * - Capture from camera input (capture="environment") or upload file
 * - Also supports paste & drag/drop of an image
 * - Sends { researchId, image } to your Cloud Function
 * - Shows result counts and analyzer preview
 * - Displays a map of contacts tied to this researchId ("potentialProspect")
 *
 * Props:
 * - analyzeUrl?: string (defaults to your function)
 * - mapHeight?: number (px, default 56% of viewport)
 */
const DEFAULT_ANALYZE_URL = "https://analyzebusinesscard-7c5i3vsqma-uc.a.run.app";

export default class BusinessCardAnalyzer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultClass: "fit",
      uploading: false,
      analyzeMsg: null,
      error: null,
      isMobile: false,
      viewportH: typeof window !== "undefined" ? window.innerHeight : 680,

      // UI/preview
      previewUrl: null,
      lastAnalyzer: null,      // { imageUrl, structured, warnings }
      lastCounts: null,        // { created, upserted, skipped }
      lastContacts: [],        // optional echo from backend
      refreshTick: 0,          // bump to force MapComponent re-render
    };

    this.fileInputRef = React.createRef();
    this.cameraInputRef = React.createRef();
    this.dropZoneRef = React.createRef();

    this.researchId = urlService.getIdFromURL();
  }

  componentDidMount() {
    this.detectMobile();
    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("orientationchange", this.onResize, { passive: true });

    // Paste support
    window.addEventListener("paste", this.onPaste);

    // Drag+drop support
    const dz = this.dropZoneRef.current;
    if (dz) {
      dz.addEventListener("dragover", this.onDragOver);
      dz.addEventListener("drop", this.onDrop);
      dz.addEventListener("dragleave", this.onDragLeave);
      dz.addEventListener("dragenter", this.onDragEnter);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("orientationchange", this.onResize);
    window.removeEventListener("paste", this.onPaste);

    const dz = this.dropZoneRef.current;
    if (dz) {
      dz.removeEventListener("dragover", this.onDragOver);
      dz.removeEventListener("drop", this.onDrop);
      dz.removeEventListener("dragleave", this.onDragLeave);
      dz.removeEventListener("dragenter", this.onDragEnter);
    }
  }

  isNarrow = () =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false;

  detectMobile = () => {
    this.setState({ isMobile: this.isNarrow(), viewportH: window.innerHeight });
  };

  onResize = () => {
    this.setState(
      { isMobile: this.isNarrow(), viewportH: window.innerHeight },
      () => {}
    );
  };

  /** ---------- Image intake helpers ---------- **/

  // Convert File → base64 string WITHOUT "data:*;base64," header
  fileToBase64NoHeader(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const raw = String(reader.result || "");
        const commaIdx = raw.indexOf(",");
        resolve(commaIdx >= 0 ? raw.slice(commaIdx + 1) : raw);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // For UI preview (ObjectURL)
  fileToPreviewUrl(file) {
    return URL.createObjectURL(file);
  }

  // Paste handler: accept first image in the clipboard
  onPaste = async (e) => {
    try {
      if (!e.clipboardData) return;
      const item = Array.from(e.clipboardData.items || []).find((it) =>
        it.type?.startsWith("image/")
      );
      if (!item) return;
      const file = item.getAsFile();
      if (file) {
        await this.handleFile(file);
      }
    } catch (err) {
      this.setState({ error: err, analyzeMsg: `Paste failed: ${err?.message || err}` });
    }
  };

  // Drag+drop
  onDragOver = (e) => {
    e.preventDefault();
    if (this.dropZoneRef.current) {
      this.dropZoneRef.current.style.borderColor = "#0b69ff";
      this.dropZoneRef.current.style.background = "#f2f7ff";
    }
  };
  onDragEnter = (e) => {
    e.preventDefault();
  };
  onDragLeave = (e) => {
    e.preventDefault();
    if (this.dropZoneRef.current) {
      this.dropZoneRef.current.style.borderColor = "#eaeaea";
      this.dropZoneRef.current.style.background = "#fff";
    }
  };
  onDrop = async (e) => {
    e.preventDefault();
    if (this.dropZoneRef.current) {
      this.dropZoneRef.current.style.borderColor = "#eaeaea";
      this.dropZoneRef.current.style.background = "#fff";
    }
    try {
      const file = e.dataTransfer?.files?.[0];
      if (file) {
        await this.handleFile(file);
      }
    } catch (err) {
      this.setState({ error: err, analyzeMsg: `Drop failed: ${err?.message || err}` });
    }
  };

  // Input change handlers
  onFilePick = async (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      await this.handleFile(file);
    }
    // allow reselect same file
    if (e?.target) e.target.value = "";
  };
  onCameraPick = async (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      await this.handleFile(file);
    }
    if (e?.target) e.target.value = "";
  };

  // Core handler: file → base64(no header) → POST → set results
  handleFile = async (file) => {
    try {
      this.setState({
        uploading: true,
        analyzeMsg: null,
        error: null,
        lastAnalyzer: null,
        lastCounts: null,
        lastContacts: [],
      });

      const imageBase64 = await this.fileToBase64NoHeader(file);
      const previewUrl = this.fileToPreviewUrl(file);

      const body = {
        researchId: this.researchId,
        image: imageBase64,
        // You may pass config, apiKey, AIType here if desired:
        // config: { ... },
        // apiKey: "...",
        // AIType: "openAI",
      };

      const res = await fetch(this.props.analyzeUrl || DEFAULT_ANALYZE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      const counts = data?.counts || {};
      const analyzer = data?.analyzer || {};
      const contacts = Array.isArray(data?.contacts) ? data.contacts : [];

      this.setState((s) => ({
        uploading: false,
        previewUrl,
        lastAnalyzer: analyzer,
        lastCounts: counts,
        lastContacts: contacts,
        analyzeMsg: `Analyzed. Created: ${counts.created || 0}, Updated: ${counts.upserted || 0}, Skipped: ${counts.skipped || 0}`,
        refreshTick: s.refreshTick + 1, // bump map
      }));
    } catch (err) {
      this.setState({
        uploading: false,
        error: err,
        analyzeMsg: `Analyze failed: ${err?.message || String(err)}`,
      });
      console.error("BusinessCardAnalyzer error:", err);
    }
  };

  /** ---------- UI ---------- **/

  renderHeader() {
    return (
      <div
        style={{
          position: "sticky",
          top: 0,
          padding: "12px calc(12px + env(safe-area-inset-right)) 12px calc(12px + env(safe-area-inset-left))",
          borderBottom: "1px solid #eaeaea",
          fontSize: 15,
          fontWeight: 600,
          background: "#fff",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span>Business Card Analyzer</span>
        {this.state.uploading && (
          <span style={{ fontSize: 12, color: "#666" }}>Processing…</span>
        )}
      </div>
    );
  }

  renderComposer() {
    const { uploading } = this.state;

    const btn = {
      padding: "12px 14px",
      minHeight: 44,
      borderRadius: 12,
      background: uploading ? "#ddd" : "#0b69ff",
      color: "#fff",
      border: "none",
      cursor: uploading ? "not-allowed" : "pointer",
      fontWeight: 700,
      fontSize: 14,
    };

    return (
      <div
        style={{
          position: "sticky",
          bottom: 0,
          borderTop: "1px solid #eaeaea",
          background: "#fff",
          padding: "10px 10px calc(10px + env(safe-area-inset-bottom)) 10px",
          display: "flex",
          gap: 8,
          alignItems: "center",
          zIndex: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Hidden inputs */}
        <input
          ref={this.fileInputRef}
          type="file"
          accept="image/*"
          onChange={this.onFilePick}
          style={{ display: "none" }}
        />
        <input
          ref={this.cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment" // opens back camera on mobile
          onChange={this.onCameraPick}
          style={{ display: "none" }}
        />

        <button
          type="button"
          onClick={() => !uploading && this.cameraInputRef.current?.click()}
          disabled={uploading}
          style={btn}
          title={uploading ? "Please wait…" : "Use Camera"}
        >
          {uploading ? "…" : "Use Camera"}
        </button>
        <button
          type="button"
          onClick={() => !uploading && this.fileInputRef.current?.click()}
          disabled={uploading}
          style={btn}
          title={uploading ? "Please wait…" : "Upload Photo"}
        >
          {uploading ? "…" : "Upload Photo"}
        </button>

        <span style={{ fontSize: 12, color: "#666" }}>
          Tip: you can also paste or drag & drop an image anywhere in this box.
        </span>
      </div>
    );
  }

  renderAnalyzerPanel() {
    const { previewUrl, lastAnalyzer, analyzeMsg, error } = this.state;

    return (
      <div style={{ padding: 12, display: "grid", gap: 12 }}>
        {(analyzeMsg || error) && (
          <div
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: `1px solid ${error ? "#ffb3b3" : "#ececec"}`,
              background: error ? "#fff6f6" : "#fff",
              color: error ? "#b00020" : "#333",
              fontSize: 13,
            }}
          >
            {analyzeMsg || String(error?.message || error)}
          </div>
        )}

        <div
          ref={this.dropZoneRef}
          style={{
            border: "2px dashed #eaeaea",
            borderRadius: 16,
            padding: 16,
            background: "#fff",
            display: "grid",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 14, color: "#666" }}>
            Drag a business card image here, or use the buttons below.
          </div>

          {previewUrl && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(160px, 240px) 1fr",
                gap: 12,
                alignItems: "start",
              }}
            >
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 12,
                  border: "1px solid #ececec",
                }}
              />
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Analyzer Output</div>
                {lastAnalyzer?.imageUrl && (
                  <div style={{ fontSize: 13, color: "#444" }}>
                    Image URL:{" "}
                    <a href={lastAnalyzer.imageUrl} target="_blank" rel="noreferrer">
                      {lastAnalyzer.imageUrl}
                    </a>
                  </div>
                )}
                {lastAnalyzer?.warnings?.length ? (
                  <div style={{ fontSize: 12, color: "#9a6c00" }}>
                    Warnings: {lastAnalyzer.warnings.join(" • ")}
                  </div>
                ) : null}
                {lastAnalyzer?.structured ? (
                  <pre
                    style={{
                      margin: 0,
                      padding: 10,
                      fontSize: 12,
                      background: "#fafafa",
                      border: "1px solid #eee",
                      borderRadius: 10,
                      maxHeight: 240,
                      overflow: "auto",
                    }}
                  >
{JSON.stringify(lastAnalyzer.structured, null, 2)}
                  </pre>
                ) : (
                  <div style={{ fontSize: 12, color: "#666" }}>
                    (Structured output will appear after analysis.)
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderMap() {
    const { viewportH, refreshTick } = this.state;
    const mapHeightPx = Math.max(260, Math.floor((this.props.mapHeight ?? 0) || viewportH * 0.56));
    const id = this.researchId;

    return (
      <div style={{ padding: "0 12px 12px 12px" }}>
        <div
          style={{
            padding: "8px 10px",
            fontSize: 13,
            color: "#666",
          }}
        >
          Contacts created for this research are shown on the map below.
        </div>

        <div style={{ height: mapHeightPx, borderRadius: 12, overflow: "hidden", border: "1px solid #eaeaea", background: "#fff" }}>
          <MapComponent
            key={`map-${id}-${refreshTick}`}
            filterFunc={() => true}
            filter={{ search: id, attribute: "researchId" }}
            name="potentialProspect"
            type="viewPortMap"
            mapContainerClass="contact-list"
            mapSectionClass="contact"
            wrapperClass="none"
            cells={[
              {
                type: "attribute",
                name: "name",
                wrapperClass: "none",
              },
            ]}
            hasLink={true}
          />
        </div>
      </div>
    );
  }

  getInnerContent() {
    const container = {
      position: "relative",
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      background: "#fafafa",
      border: "1px solid #eaeaea",
      borderRadius: 12,
      overflow: "hidden",
    };

    const scrollArea = {
      flex: 1,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 10,
      scrollBehavior: "smooth",
    };

    return (
      <div style={container}>
        {this.renderHeader()}

        <div style={scrollArea}>
          {this.renderAnalyzerPanel()}
          {this.renderMap()}
        </div>

        {this.renderComposer()}
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.pageClass || this.state.defaultClass}>
        {this.getInnerContent()}
      </div>
    );
  }
}
