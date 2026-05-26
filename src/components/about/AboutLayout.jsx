function AboutLayout({ title, children }) {
    return (
        <div className="about-page-wrapper">
            <div className="about-page-container">
                {title && <h2 className="page-title">{title}</h2>}
                <div className="about-page-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AboutLayout;