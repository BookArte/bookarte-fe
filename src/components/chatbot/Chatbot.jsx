import { useChatbot } from '@/hooks/domain/chatbot/useChatbot';
import '@/css/chatbot.css';

function Chatbot() {
    const {
        isOpen,
        input,
        setInput,
        messages,
        toggleChat,
        handleSend,
        handleKeyDown,
        isLoading
    } = useChatbot();

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <span>북아티 AI 봇</span>
                        <button onClick={toggleChat} className="close-btn">✖</button>
                    </div>

                    <div className="chatbot-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-bubble-wrapper ${msg.sender}`}>
                                <div className="chat-bubble">
                                    <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chat-bubble-wrapper ai">
                                <div className="chat-bubble loading">AI가 생각 중입니다...</div>
                            </div>
                        )}
                    </div>

                    <div className="chatbot-footer">
                        <input
                            type="text"
                            placeholder={isLoading ? "답변을 기다리는 중..." : "질문을 입력해주세요..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading}>
                            {isLoading ? '...' : '전송'}
                        </button>
                    </div>
                </div>
            )}

            <button className="chatbot-fab" onClick={toggleChat}>
                {isOpen ? '💬' : '🤖'}
            </button>
        </div>
    );
}

export default Chatbot;