const BoardWrite = ({
    title,
    children
}) => {
    return (
        <div className='board-write-common-container'>
            <h2 className='board-write-common-title'>{title}</h2>

            {children}
        </div>
    );
}

export default BoardWrite;