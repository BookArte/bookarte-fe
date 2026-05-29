const BoardWrite = ({
    title,
    children
}) => {
    return (
        <div className='board-common-container'>
            <h2 className='board-common-title'>{title}</h2>

            {children}
        </div>
    );
}

export default BoardWrite;