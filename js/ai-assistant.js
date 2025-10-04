// AI Assistant with Advanced Features

class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.chatHistory = [];
        this.isTyping = false;
        
        this.init();
    }

    init() {
        this.createAssistant();
        this.setupEventListeners();
        this.loadChatHistory();
    }

    createAssistant() {
        const assistantHTML = `
            <div class="ai-assistant" id="aiAssistant">
                <div class="ai-assistant-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="ai-pulse"></div>
            </div>
            <div class="ai-chat-container" id="aiChatContainer">
                <div class="ai-chat-header">
                    <div class="ai-chat-title">
                        <i class="fas fa-robot me-2"></i>
                        AI Assistant
                        <span class="ai-status">Online</span>
                    </div>
                    <div class="ai-chat-controls">
                        <button class="ai-btn ai-minimize">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="ai-btn ai-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="ai-chat-body" id="aiChatBody">
                    <div class="ai-welcome-message">
                        <div class="ai-message ai-bot-message">
                            <div class="ai-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="ai-message-content">
                                <p>Hello! I'm your AI assistant. I can help you learn more about Yonatan's skills, projects, and experience. What would you like to know?</p>
                                <div class="ai-quick-questions">
                                    <button class="ai-quick-btn" data-question="skills">View Skills</button>
                                    <button class="ai-quick-btn" data-question="projects">Recent Projects</button>
                                    <button class="ai-quick-btn" data-question="experience">Experience</button>
                                    <button class="ai-quick-btn" data-question="contact">Contact Info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ai-chat-input-container">
                    <div class="ai-typing-indicator" id="aiTypingIndicator">
                        <div class="ai-typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>AI is typing...</span>
                    </div>
                    <div class="ai-input-group">
                        <input type="text" 
                               class="ai-chat-input" 
                               id="aiChatInput" 
                               placeholder="Ask me anything about Yonatan..."
                               maxlength="500">
                        <button class="ai-send-btn" id="aiSendBtn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="ai-input-suggestions">
                        <span>Try asking:</span>
                        <button class="ai-suggestion" data-question="What are Yonatan's technical skills?">Technical skills</button>
                        <button class="ai-suggestion" data-question="Tell me about Yonatan's projects">Projects</button>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('ai-assistant-container') || document.body;
        container.innerHTML = assistantHTML;

        this.assistant = document.getElementById('aiAssistant');
        this.chatContainer = document.getElementById('aiChatContainer');
        this.chatBody = document.getElementById('aiChatBody');
        this.chatInput = document.getElementById('aiChatInput');
        this.sendBtn = document.getElementById('aiSendBtn');
        this.typingIndicator = document.getElementById('aiTypingIndicator');
    }

    setupEventListeners() {
        // Toggle chat
        this.assistant.addEventListener('click', () => this.toggleChat());
        
        // Close chat
        document.querySelector('.ai-close').addEventListener('click', () => this.closeChat());
        
        // Minimize chat
        document.querySelector('.ai-minimize').addEventListener('click', () => this.minimizeChat());
        
        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Quick questions
        document.querySelectorAll('.ai-quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                this.handleQuickQuestion(question);
            });
        });
        
        // Suggestions
        document.querySelectorAll('.ai-suggestion').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                this.chatInput.value = question;
                this.sendMessage();
            });
        });
        
        // Input auto-resize
        this.chatInput.addEventListener('input', () => {
            this.adjustInputHeight();
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.chatContainer.classList.add('active');
        this.assistant.classList.add('active');
        
        // Focus input
        setTimeout(() => {
            this.chatInput.focus();
        }, 300);
        
        // Add opening animation
        gsap.from(this.chatContainer, {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            y: 20,
            ease: 'back.out(1.7)'
        });
    }

    closeChat() {
        this.isOpen = false;
        this.chatContainer.classList.remove('active');
        this.assistant.classList.remove('active');
        
        // Save chat history
        this.saveChatHistory();
    }

    minimizeChat() {
        this.chatContainer.classList.toggle('minimized');
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.adjustInputHeight();

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI processing
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.saveChatHistory();
        }, 1000 + Math.random() * 1000);
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], { 
            hour: '2-digit', minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="ai-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="ai-message-content">
                <p>${content}</p>
                <span class="ai-timestamp">${timestamp}</span>
            </div>
        `;
        
        this.chatBody.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add animation
        gsap.from(messageDiv, {
            duration: 0.3,
            y: 20,
            opacity: 0,
            ease: 'power2.out'
        });

        // Add to history
        this.chatHistory.push({
            sender,
            content,
            timestamp: new Date().toISOString()
        });
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }

    adjustInputHeight() {
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 120) + 'px';
    }

    handleQuickQuestion(questionType) {
        const questions = {
            skills: "What are Yonatan's technical skills and expertise?",
            projects: "Can you tell me about Yonatan's recent projects?",
            experience: "What is Yonatan's educational background and work experience?",
            contact: "How can I get in touch with Yonatan?"
        };

        if (questions[questionType]) {
            this.chatInput.value = questions[questionType];
            this.sendMessage();
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Enhanced response system
        const responses = {
            greetings: {
                patterns: ['hello', 'hi', 'hey', 'greetings'],
                response: "Hello! I'm here to help you learn more about Yonatan Endalkachew. What would you like to know about his skills, projects, or experience?"
            },
            skills: {
                patterns: ['skill', 'technology', 'tech stack', 'expertise', 'what can you do'],
                response: "Yonatan has extensive expertise in:\n\n• **Full-Stack Development**: HTML5, CSS3, JavaScript, React, PHP, Node.js, MySQL\n• **Networking & Security**: CCNA certification, network security, IP services\n• **AI & Data Science**: Machine Learning, Data Analytics, Predictive Modeling\n• **Mobile Development**: Android, Java, API Integration\n\nHe's also certified in Android Development, AI Fundamentals, and Data Analysis from Udacity."
            },
            projects: {
                patterns: ['project', 'work', 'portfolio', 'what have you built'],
                response: "Yonatan has worked on several impressive projects:\n\n• **AI-Powered E-commerce Platform**: Full-stack solution with AI recommendations\n• **Secure Network Infrastructure**: Enterprise networking with advanced security\n• **AI Assistant Mobile App**: Intelligent mobile assistant with NLP\n• **Predictive Analytics Dashboard**: ML-powered business intelligence platform\n\nThese projects showcase his ability to work across different domains and technologies."
            },
            experience: {
                patterns: ['experience', 'education', 'background', 'certification'],
                response: "Yonatan's background includes:\n\n• **Bachelor of Computer Science** - Harambee University (2019-2023)\n• **CCNAv7 Certification** - Cisco Networking\n• **Certificate of Technological Innovation** - Harambee University\n• **Udacity Certifications** in Android Development, Data Analysis, and AI Fundamentals\n\nHe has 3+ years of experience in software development and networking."
            },
            contact: {
                patterns: ['contact', 'email', 'phone', 'get in touch', 'hire'],
                response: "You can reach Yonatan through:\n\n• **Email**: yonatanendalkachew1@gmail.com\n• **Phone**: +251967726215\n• **Location**: Ethiopia\n• **Portfolio**: https://yoniendalk.github.io/selfportfolio/\n\nHe's available for freelance projects and full-time opportunities."
            },
            default: {
                response: "I'm not sure I understand. You can ask me about:\n\n• Yonatan's technical skills and expertise\n• His recent projects and portfolio\n• Educational background and certifications\n• How to contact him for opportunities\n\nTry asking something like 'What are your programming skills?' or 'Tell me about your projects'."
            }
        };

        // Find matching response
        for (const [category, data] of Object.entries(responses)) {
            if (category === 'default') continue;
            
            for (const pattern of data.patterns) {
                if (message.includes(pattern)) {
                    return data.response;
                }
            }
        }

        return responses.default.response;
    }

    saveChatHistory() {
        localStorage.setItem('aiChatHistory', JSON.stringify(this.chatHistory));
    }

    loadChatHistory() {
        const saved = localStorage.getItem('aiChatHistory');
        if (saved) {
            this.chatHistory = JSON.parse(saved);
            
            // Load last 10 messages
            const recentMessages = this.chatHistory.slice(-10);
            recentMessages.forEach(msg => {
                this.addMessage(msg.content, msg.sender);
            });
        }
    }

    // Voice recognition (optional feature)
    initVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.chatInput.value = transcript;
                this.sendMessage();
            };
            
            // Add voice button to UI
            this.addVoiceButton();
        }
    }

    addVoiceButton() {
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'ai-voice-btn';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.addEventListener('click', () => this.toggleVoiceRecognition());
        
        document.querySelector('.ai-input-group').appendChild(voiceBtn);
    }

    toggleVoiceRecognition() {
        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        } else {
            this.recognition.start();
            this.isListening = true;
        }
    }
}

// Initialize AI Assistant
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
});

// Add CSS for AI Assistant
const aiAssistantCSS = `
.ai-assistant {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    box-shadow: var(--shadow);
    transition: var(--transition);
    animation: pulse 2s infinite;
}

.ai-assistant:hover {
    transform: scale(1.1);
}

.ai-assistant-icon {
    font-size: 1.8rem;
    color: var(--dark);
}

.ai-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: inherit;
    animation: pulse-ring 2s infinite;
}

.ai-chat-container {
    position: fixed;
    bottom: 120px;
    right: 30px;
    width: 380px;
    height: 600px;
    background: var(--glass);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
    z-index: 1000;
    box-shadow: var(--shadow);
    display: none;
    flex-direction: column;
    overflow: hidden;
}

.ai-chat-container.active {
    display: flex;
}

.ai-chat-header {
    padding: 1.5rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: var(--dark);
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ai-chat-title {
    display: flex;
    align-items: center;
}

.ai-status {
    font-size: 0.8rem;
    background: var(--success);
    color: var(--dark);
    padding: 0.2rem 0.5rem;
    border-radius: 20px;
    margin-left: 0.5rem;
}

.ai-chat-controls {
    display: flex;
    gap: 0.5rem;
}

.ai-btn {
    background: none;
    border: none;
    color: var(--dark);
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 4px;
    transition: var(--transition);
}

.ai-btn:hover {
    background: rgba(0,0,0,0.1);
}

.ai-chat-body {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.ai-message {
    display: flex;
    gap: 1rem;
    max-width: 85%;
}

.ai-user-message {
    align-self: flex-end;
    flex-direction: row-reverse;
}

.ai-bot-message {
    align-self: flex-start;
}

.ai-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dark);
    flex-shrink: 0;
}

.ai-message-content {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 1rem;
    border-radius: 1rem;
    backdrop-filter: blur(10px);
}

.ai-user-message .ai-message-content {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: var(--dark);
}

.ai-message-content p {
    margin: 0;
    line-height: 1.5;
    white-space: pre-line;
}

.ai-timestamp {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 0.5rem;
    display: block;
}

.ai-quick-questions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.ai-quick-btn {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: inherit;
    padding: 0.3rem 0.6rem;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: var(--transition);
}

.ai-quick-btn:hover {
    background: rgba(255,255,255,0.3);
}

.ai-chat-input-container {
    padding: 1.5rem;
    border-top: 1px solid var(--glass-border);
}

.ai-typing-indicator {
    display: none;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: var(--gray);
    font-size: 0.9rem;
}

.ai-typing-dots {
    display: flex;
    gap: 0.2rem;
}

.ai-typing-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary);
    animation: typing-bounce 1.4s infinite ease-in-out;
}

.ai-typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.ai-typing-dots span:nth-child(2) { animation-delay: -0.16s; }

.ai-input-group {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
}

.ai-chat-input {
    flex: 1;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 25px;
    padding: 1rem 1.5rem;
    color: var(--light);
    font-family: inherit;
    resize: none;
    max-height: 120px;
    transition: var(--transition);
}

.ai-chat-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 245, 212, 0.1);
}

.ai-send-btn {
    background: var(--primary);
    color: var(--dark);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.ai-send-btn:hover {
    transform: scale(1.1);
}

.ai-input-suggestions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    font-size: 0.8rem;
    color: var(--gray);
    flex-wrap: wrap;
}

.ai-suggestion {
    background: none;
    border: 1px solid var(--glass-border);
    color: var(--primary);
    padding: 0.2rem 0.6rem;
    border-radius: 15px;
    font-size: 0.7rem;
    cursor: pointer;
    transition: var(--transition);
}

.ai-suggestion:hover {
    background: rgba(0, 245, 212, 0.1);
}

@keyframes pulse-ring {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
}

@keyframes typing-bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}

@media (max-width: 768px) {
    .ai-chat-container {
        width: calc(100vw - 60px);
        height: 70vh;
        right: 30px;
        left: 30px;
    }
    
    .ai-assistant {
        bottom: 20px;
        right: 20px;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = aiAssistantCSS;
document.head.appendChild(style);