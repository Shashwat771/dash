import { useState, useRef, useEffect } from 'react';
import '../styles/ChatPanel.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * ChatPanel - Ask natural language questions about your data
 * Uses AI to analyze and answer questions about the current dashboard data
 */
export default function ChatPanel({ isOpen, onClose, dashboardData }) {
  const [messages, setMessages] = useState([
    {
      id: 'init',
      type: 'assistant',
      content: 'Hi! Ask me questions about your data, like "What was the highest revenue?" or "Which product had the most sales?"',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage.content,
          dashboardData: {
            title: dashboardData?.dashboardConfig?.dashboardTitle || 'Dashboard',
            columns: dashboardData?.columns || [],
            rowCount: dashboardData?.data?.length || 0,
            insights: dashboardData?.insights,
            metrics: dashboardData?.dashboardConfig?.metrics || [],
          },
          dataPreview: JSON.stringify(dashboardData?.data?.slice(0, 100) || []),
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat failed: ${response.statusText}`);
      }

      const result = await response.json();
      const assistantMessage = {
        id: `msg_${Date.now()}`,
        type: 'assistant',
        content: result.answer || 'Sorry, I could not process that question. Try asking about specific columns or metrics.',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        id: `msg_${Date.now()}`,
        type: 'assistant',
        content: `I encountered an error: ${err.message}. Please try again.`,
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'init',
        type: 'assistant',
        content: 'Chat history cleared. Ask me anything about your data!',
        timestamp: Date.now(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="chat-overlay" onClick={onClose} aria-hidden="true" />
    <aside className="chat-panel" role="complementary" aria-label="Data chat assistant">
      <div className="chat-header">
        <h3 className="chat-title">Chat with Your Data</h3>
        <button
          className="chat-close-btn"
          onClick={onClose}
          aria-label="Close chat"
          title="Close chat panel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="chat-info">
        <span className="chat-subtitle">Ask questions about your data</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.type} ${msg.isError ? 'error' : ''}`}
            role={msg.type === 'user' ? 'article' : 'region'}
            aria-label={`${msg.type === 'user' ? 'Your message' : 'Assistant message'}`}
          >
            {msg.type === 'assistant' && (
              <div className="msg-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
            )}
            <div className="msg-content">
              {msg.content}
            </div>
            {msg.type === 'user' && (
              <div className="msg-avatar user-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-message assistant">
            <div className="msg-avatar">
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="msg-content">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        {error && <div className="chat-error">{error}</div>}
        <form className="chat-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chat-input"
            placeholder="Ask a question about your data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            aria-label="Chat input"
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!input.trim() || loading}
            aria-label="Send message"
            title="Send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.98521575 L3.03521743,10.4262088 C3.03521743,10.5833061 3.19218622,10.7404035 3.50612381,10.7404035 L16.6915026,11.5258905 C16.6915026,11.5258905 17.1624089,11.5258905 17.1624089,12.0000000 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
            </svg>
          </button>
        </form>

        <button
          className="chat-clear-btn"
          onClick={clearHistory}
          disabled={loading}
          aria-label="Clear chat history"
          title="Clear history"
        >
          Clear history
        </button>
      </div>
    </aside>
    </>
  );
}
