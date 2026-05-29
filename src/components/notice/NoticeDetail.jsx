import BoardDetailLayout from "../common/BoardDetailLayout";

function NoticeDetail({ data }) {

    if (!data) return null;

    const noticeData = {
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
            title={noticeData.title}
            date={noticeData.date}
            content={noticeData.content}
            files={noticeData.files}
        />
    );
}

export default NoticeDetail;