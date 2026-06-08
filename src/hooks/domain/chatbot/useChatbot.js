import { useEffect, useState } from 'react';
import { getHistory, sendChat } from '@/api/chatbot.api';
import { useAuthStore } from '@/store/useAuthStore';

export const useChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const defaultMessage = '안녕하세요! 북아티 AI 챗봇입니다 ✨\n사이트 이용 안내나 도서 추천이 필요하신가요?';
    const [messages, setMessages] = useState([
        { sender: 'ai', text: defaultMessage }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const accessToken = useAuthStore((state) => state.accessToken);
    const isLoggedIn = !!accessToken;

    useEffect(() => {
        const loadHistory = async () => {

            resetMessages();

            try {
                const result = await getHistory();
                const history = result.data;

                if (history && history.length > 0) {
                    const formattedHistory = history.map(h => ({
                        sender: h.sender,
                        text: h.message
                    }));
                    setMessages([
                        { sender: 'ai', text: defaultMessage },
                        ...formattedHistory
                    ]);
                }
            } catch (error) {
                console.error("채팅 내역을 불러오는데 실패했습니다.", error);
            }
        };

        loadHistory();
    }, [isLoggedIn]);

    const resetMessages = () => {
        setMessages([
            { sender: 'ai', text: defaultMessage }
        ]);
    };

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;

        setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendChat(userMessage);
            const aiData = response.data || response;
            setMessages((prev) => [...prev, { sender: aiData.sender, text: aiData.message }]);
        } catch (error) {
            console.error("채팅 전송 실패:", error);
            setMessages((prev) => [...prev, { sender: 'ai', text: '죄송합니다. 답변을 받아오는 중 오류가 발생했습니다.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return {
        isOpen,
        input,
        setInput,
        messages,
        toggleChat,
        handleSend,
        handleKeyDown,
        isLoading
    };
};