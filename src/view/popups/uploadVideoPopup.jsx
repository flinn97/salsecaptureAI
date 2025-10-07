/**
 * UploadVideoPopup
 * Minimal video-uploader modal content with drag & drop, title, and Save.
 */
import React from "react";
import { BaseComponent, ParentFormComponent, UpdateButton } from "flinntech";

export default class UploadVideoPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultClass: "fit scroller",
            isDragging: false,
            file: null,
            title: props.defaultTitle || "",
            error: null,
        };
        this.fileInputRef = React.createRef();
    }

    // Drag & drop handlers
    handleDragOver = (e) => {
        e.preventDefault();
        this.setState({ isDragging: true });
    };
    handleDragLeave = (e) => {
        e.preventDefault();
        this.setState({ isDragging: false });
    };
    handleDrop = (e) => {
        e.preventDefault();
        const f = e.dataTransfer?.files?.[0];
        if (f) {
            this.createFileInfo(f);
            this.setState({ isDragging: false });
        }
    };

    // File picker
    handleFileChange = (e) => {
        const f = e.target.files?.[0];
        if (f) this.createFileInfo(f);
    };

    // Save
    handleSave = async (e) => {
        let title = this.propsState.currentPopupComponent.getJson().title
        const { file } = this.state;
        if (!file) return this.setState({ error: "Please choose a video file." });
        if (!title?.trim()) return this.setState({ error: "Please enter a title." });

        this.setState({ error: null });
        this.save(e)
    };
    /**
 * Creates file information object based on the provided File (no event).
 * Generates a unique file path and preview URL for the file.
 * @param {File} file - The selected file (falls back to state if omitted).
 * @returns {Object|undefined} The file information object.
 */
    createFileInfo(file = this.state.file) {
        if (!file) return;

        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const newDay = `${Math.floor(Math.random() * 9999)}-${month}${day}`;

        // Slightly sanitize filename for storage paths
        const safeName = file.name.replace(/\s+/g, "_");

        // Use a videos/ prefix since this is a video uploader
        const path = `videos/${newDay}-${safeName}`;

        this.fileInfo = {
            selectedFile: file,
            path,
            preview: URL.createObjectURL(file),
        };

        this.setState({ file, path, preview: this.fileInfo.preview });
        return this.fileInfo;
    }
    /**
     * Handles the file input change event.
     * Processes the selected file, uploads it, and updates the associated component states.
     * @param {Event} event - The file input change event.
     * @returns {string|undefined} The URL of the uploaded file if applicable.
     */
    /**
 * Uploads file using the prepared fileInfo and updates component state.
 * @returns {string|undefined} The URL of the uploaded file.
 */
    async save() {
        // Ensure fileInfo is prepared
        const info = this.createFileInfo();
        if (!info) return;

        // Upload the selected file to the backend.
        await this.APIService.uploadPics(info.selectedFile, info.path);

        // Download the uploaded file URL.
        const url = await this.APIService.downloadPics(info.path);

        // Keep backward compatibility with the existing (misspelled) key
        await this.propsState.currentPopupComponent.setCompState({
            videoURL: url,  // corrected
        });

        await this.onSubmit();
        return url;
    }

    /**
     * Handles the submission of the form after a file is uploaded.
     * Executes additional operations and calls the finish callback function if provided.
     */
    async onSubmit() {
        await this.operationsFactory.addToComponentList();
        this.dispatch({ videoUploaded: this.propsState.currentPopupComponent, popupSwitch: '' });
    }

    render() {
        const { pageClass } = this.props;
        const { defaultClass, isDragging, file, title, error } = this.state;

        // If you prefer using your ParentFormComponent binding, keep this obj/inPopup:
        const obj = this.propsState.currentPopupComponent;
        const inPopup = true;
        const canSave = !!file && !!(obj?.getJson().title || "").trim();

        return (
            <div
                style={{ padding: "10px", paddingBottom: "100px", height: "100%" }}
                className={pageClass || defaultClass}
            >
                <h2>Upload Video</h2>

                <div className="contact-Add-container">
                    {/* Dropzone */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => this.fileInputRef.current?.click()}
                        onKeyDown={(e) => (e.key === "Enter" ? this.fileInputRef.current?.click() : null)}
                        onDragOver={this.handleDragOver}
                        onDragLeave={this.handleDragLeave}
                        onDrop={this.handleDrop}
                        style={{
                            border: "2px dashed var(--border, #cbd5d1)",
                            borderRadius: "12px",
                            padding: "24px",
                            textAlign: "center",
                            background: isDragging ? "rgba(16,185,129,0.08)" : "var(--bg-soft, #f4f7f6)",
                            cursor: "pointer",
                            marginBottom: "16px",
                        }}
                        aria-label="Drag a video here or click to choose a file"
                    >
                        <div style={{ fontWeight: 600, marginBottom: 6 }}>Drag & drop video</div>
                        <div style={{ opacity: 0.7, marginBottom: 10 }}>or click to choose a file</div>

                        <input
                            ref={this.fileInputRef}
                            style={{ display: "none" }}
                            type="file"
                            accept={this.props.accept || "video/*"}
                            onChange={this.handleFileChange}
                        />

                        {file && (
                            <div style={{ marginTop: 10 }}>
                                <div style={{ fontWeight: 500 }}>{file.name}</div>
                                <div style={{ opacity: 0.7, fontSize: 12 }}>
                                    {Math.round((file.size / 1024 / 1024) * 10) / 10} MB
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="row" style={{ alignItems: "center" }}>
                        <div style={{ minWidth: 100 }}>Title</div>
                        <div style={{ width: "70%", marginLeft: "7px" }}>


                            <ParentFormComponent obj={obj} name="title" inPopup={inPopup} />
                        </div>
                    </div>

                    {/* Error */}
                    {error && <div style={{ color: "#b91c1c", marginTop: 12 }}>{error}</div>}

                    {/* Actions */}
                    <div

                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignContent: "flex-end",
                            background:'white',
                            marginTop: 24,
                        }}
                    >

                        {/* Sticky footer actions */}
                        <div
                            style={{
                                position: "sticky",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                // background: "var(--panel, #fff)",
                                padding: "12px 10px",
                                marginTop: 24,
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 12,
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => this.dispatch({ popupSwitch: "" })}
                                style={{
                                    background: "transparent",
                                    border: "1px solid #d1d5db",
                                    color: "#374151",
                                    padding: "10px 16px",
                                    borderRadius: 9999,
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={this.handleSave}
                                style={{
                                    background: "var(--brand, #2E7D6A)",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 18px",
                                    borderRadius: 9999,
                                    cursor: canSave ? "pointer" : "not-allowed",
                                    opacity: canSave ? 1 : 0.6,
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
