function InfoField({ label, name, value, isEditing, onChange, type = "text", readOnly = false }) {
    return (
        <div className="info-row">
            <label className="info-label">{label}</label>
            <div className="info-content">
                {isEditing && !readOnly ? (
                    <input
                        type={type}
                        name={name}
                        value={value || ''}
                        onChange={onChange}
                        className="info-input"
                    />
                ) : (
                    <div className="info-value-text">
                        {name === 'grade' ? (
                            <span className="status-badge">{value}</span>
                        ) : (
                            value
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoField;