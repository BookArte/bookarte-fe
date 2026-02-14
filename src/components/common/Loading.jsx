function Loading({ fullScreen = true }) {
    return (
        <div className={`spinner-container ${fullScreen ? 'full-screen' : ''}`}>
            <div className="loading-spinner"></div>
        </div>
    );
}

export default Loading;