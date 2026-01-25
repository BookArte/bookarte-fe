const ErrorMsg = ({ message }) => {
    if (!message) return null;

    return (
        <div className='book-error-message'>
            {message}
        </div>
    );
};

export default ErrorMsg;