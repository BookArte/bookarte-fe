import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from '@/constants/url';
import DOMPurify from "dompurify";

export function useBoardForm({
    type,
    submitFn,
    initialData = null,
    isEdit = false,
    redirectUrl = null
}) {
    const navigate = useNavigate();
    const thumbnailInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const MAX_FILE_COUNT = 10;

    const [formData, setFormData] = useState({
        noticeYn: "N",
        category: "",
        orderNum: 0,
        title: "",
        editor: "",
        contents: "",
        thumbnail: null,
        thumbnailFile: null,
        files: [],
        existingFiles: [],
        deletedFiles: [],
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData,
                editor: initialData.editor || initialData.contents || "",
                contents: initialData.contents || initialData.editor || "",
                thumbnail: initialData.thumbnailPath || null,
                existingFiles: initialData.fileList || [],
            }));
        }
    }, [isEdit, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (editor) => {
        setFormData(prev => ({ ...prev, editor }));
    };

    const onThumbnailClick = () => thumbnailInputRef.current?.click();

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (formData.thumbnail && formData.thumbnail.startsWith('blob:')) {
                window.URL.revokeObjectURL(formData.thumbnail);
            }
            const previewUrl = window.URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                thumbnail: previewUrl,
                thumbnailFile: file
            }));
        }
        e.target.value = '';
    };

    const onFileAddClick = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const currentTotalCount = formData.existingFiles.length + formData.files.length;

        if (currentTotalCount + selectedFiles.length > MAX_FILE_COUNT) {
            toast.warn(`파일은 최대 ${MAX_FILE_COUNT}개까지만 등록 가능합니다.`);
            e.target.value = '';
            return;
        }

        setFormData(prev => ({
            ...prev,
            files: [...prev.files, ...selectedFiles]
        }));
        e.target.value = '';
    };

    const handleFileDelete = (index, isExisting = false, fileId = null) => {
        if (isExisting) {
            setFormData(prev => ({
                ...prev,
                existingFiles: prev.existingFiles.filter((_, i) => i !== index),
                deletedFiles: [...prev.deletedFiles, fileId]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                files: prev.files.filter((_, i) => i !== index)
            }));
        }
    };

    const handleCancel = () => {
        if (window.confirm(`${isEdit ? '수정' : '작성'}을 취소하시겠습니까?`)) {
            navigate(-1);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!formData.title.trim()) {
            toast.warn("제목을 입력해주세요.");
            return;
        }

        const totalCount = formData.existingFiles.length + formData.files.length;
        if (totalCount > MAX_FILE_COUNT) {
            toast.error(`파일은 최대 ${MAX_FILE_COUNT}개까지만 첨부할 수 있습니다.`);
            return;
        }

        setLoading(true);
        try {
            const sendData = new FormData();
            const cleanContents = DOMPurify.sanitize(formData.editor);
            const cleanAdmAnswer = DOMPurify.sanitize(formData.admAnswer);

            sendData.append("noticeYn", formData.noticeYn);
            sendData.append("category", formData.category);
            sendData.append("orderNum", formData.orderNum);
            sendData.append("title", formData.title);
            sendData.append("editor", cleanContents);
            sendData.append("contents", formData.contents);
            sendData.append("admAnswer", cleanAdmAnswer);

            if (isEdit && formData.deletedFiles.length > 0) {
                formData.deletedFiles.forEach(id => {
                    sendData.append("deletedFileIds", id);
                });
            }

            const MAX_SIZE = 10 * 1024 * 1024;
            const isTooLarge = formData.files.some(file => file.size > MAX_SIZE);
            if (isTooLarge) {
                toast.error("10MB를 초과하는 파일이 포함되어 있습니다.");
                setLoading(false);
                return;
            }

            if (formData.thumbnailFile) {
                sendData.append("thumbnailFile", formData.thumbnailFile);
            }

            if (formData.files.length > 0) {
                formData.files.forEach(file => sendData.append("files", file));
            }

            const res = await submitFn(type, sendData);

            if (res.success) {
                toast.success(isEdit ? "수정되었습니다." : "등록되었습니다.");
                if (redirectUrl) {
                    navigate(redirectUrl);
                } else {
                    navigate(URL.ADMIN_BOARD_LIST(type));
                }
            }
        } catch (error) {
            toast.error(`${isEdit ? '수정' : '등록'} 중 오류가 발생했습니다.`);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        loading,
        refs: { thumbnailInputRef, fileInputRef },
        handlers: {
            handleChange, handleEditorChange, onThumbnailClick,
            handleThumbnailChange, onFileAddClick, handleFileChange,
            handleFileDelete, handleCancel, handleSubmit
        }
    };
}