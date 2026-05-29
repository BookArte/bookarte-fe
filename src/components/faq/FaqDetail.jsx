import BoardDetailLayout from "../common/BoardDetailLayout";

function FaqDetail({ data }) {

    if (!data) return null;

    const faqData = {
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
            title={faqData.title}
            date={faqData.date}
            content={faqData.content}
            files={faqData.files}
        />
    );
}

export default FaqDetail;