function AgreementTerm({ id, title, checked, onChange, contents }) {
    return (
        <div className="agreement-group">
            <label htmlFor={id} className="agree-label">
                <input type="checkbox" id={id} checked={checked} onChange={onChange} />
                <p>{title}</p>
            </label>
            <p className="agree-terms">
                {contents}
            </p>
        </div>
    )
}

export default AgreementTerm;