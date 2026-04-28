import BoardDetailLayout from "../common/BoardDetailLayout";

function NewsDetail({ data }) {

    if (!data) return null;

    const newsData = {
        title: data.title,
        date: data.createdAt ? data.createdAt.split('T')[0] : "",
        content: data.contents,
        files: data.fileList?.map(file => ({
            name: file.originalName,
            url: `${import.meta.env.VITE_API_BASE_URL}/board/file/download/${file.fileId}`
        })) || []
    };


    return (
        <BoardDetailLayout
            title={newsData.title}
            date={newsData.date}
            content={newsData.content}
            files={newsData.files}
        />
    );
}

export default NewsDetail;