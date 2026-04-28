import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Calendar, Users, Flag, Landmark } from 'lucide-react';

const QA_DATABASE = {
  "how to register": "You can register to vote in India by filling out Form 6 online on the Voter Portal (voters.eci.gov.in) or offline. To be eligible, you must be an Indian citizen, at least 18 years old on the qualifying date, and a resident of the polling area.",
  "when is the election": "General elections to the Lok Sabha and State Legislative Assemblies are held every 5 years. The Election Commission of India (ECI) announces the specific dates and phases a few months prior to the end of the current term.",
  "what is lok sabha": "The Lok Sabha, or House of the People, is the lower house of India's bicameral Parliament. Members of Parliament (MPs) are elected directly by the citizens of India to represent their constituencies.",
  "who conducts elections": "Elections in India are conducted by the Election Commission of India (ECI), an autonomous constitutional authority responsible for administering election processes to Lok Sabha, Rajya Sabha, State Legislative Assemblies, and the offices of the President and Vice President.",
  "what is evm": "EVM stands for Electronic Voting Machine. India uses EVMs along with VVPAT (Voter Verifiable Paper Audit Trail) machines to record votes securely and transparently.",
  "who can vote": "To vote in Indian elections, you must be an Indian citizen, 18 years of age or older on January 1st of the year of electoral roll revision, normally resident in the polling area, and not disqualified under any law.",
  "types of elections": "In India, there are mainly three types of elections: 1) General Elections (Lok Sabha) to elect the Central Government, 2) State Assembly Elections (Vidhan Sabha) to elect State Governments, and 3) Local Body Elections (Panchayats and Municipalities)."
};

const TIMELINE_STEPS = [
  {
    id: 1,
    title: 'Announcement & Model Code of Conduct',
    date: 'Phase 1',
    description: 'The Election Commission of India announces the election schedule. The Model Code of Conduct (MCC) comes into effect immediately to ensure free and fair elections.',
    icon: <Flag size={20} />
  },
  {
    id: 2,
    title: 'Nominations & Scrutiny',
    date: 'Phase 2',
    description: 'Candidates file their nomination papers. The Returning Officer scrutinizes the papers to ensure validity. Candidates can withdraw nominations before a specific date.',
    icon: <Users size={20} />
  },
  {
    id: 3,
    title: 'Campaigning & Polling',
    date: 'Phase 3 (Multiple Dates)',
    description: 'Political parties and candidates campaign. Polling happens in multiple phases using EVMs and VVPATs across millions of polling stations nationwide.',
    icon: <Calendar size={20} />
  },
  {
    id: 4,
    title: 'Counting & Results',
    date: 'Final Phase',
    description: 'Votes are counted on a single, designated day. The party or coalition with a majority of seats in the Lok Sabha or State Assembly is invited to form the government.',
    icon: <Landmark size={20} />
  }
];

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    const userMessage = text || inputText;
    if (!userMessage.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { id: Date.now(), sender: 'user', text: userMessage }
    ];
    setMessages(newMessages);
    setInputText('');

    // Simulate bot thinking
    setTimeout(() => {
      let botResponse = "I'm not completely sure about that. Try asking about 'how to register', 'what is Lok Sabha', or 'types of elections'.";
      
      const lowerInput = userMessage.toLowerCase();
      
      // Simple intent matching
      if (lowerInput.includes('register') || lowerInput.includes('sign up') || lowerInput.includes('voter id')) {
        botResponse = QA_DATABASE['how to register'];
      } else if (lowerInput.includes('when') || lowerInput.includes('date')) {
        botResponse = QA_DATABASE['when is the election'];
      } else if (lowerInput.includes('lok sabha') || lowerInput.includes('parliament')) {
        botResponse = QA_DATABASE['what is lok sabha'];
      } else if (lowerInput.includes('conducts') || lowerInput.includes('eci') || lowerInput.includes('commission')) {
        botResponse = QA_DATABASE['who conducts elections'];
      } else if (lowerInput.includes('evm') || lowerInput.includes('machine') || lowerInput.includes('how to vote')) {
        botResponse = QA_DATABASE['what is evm'];
      } else if (lowerInput.includes('who') || lowerInput.includes('can i vote') || lowerInput.includes('requirements') || lowerInput.includes('eligible')) {
        botResponse = QA_DATABASE['who can vote'];
      } else if (lowerInput.includes('types') || lowerInput.includes('what kinds') || lowerInput.includes('how many elections')) {
        botResponse = QA_DATABASE['types of elections'];
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'bot', text: botResponse }
      ]);
    }, 600);
  };

  const quickReplies = [
    "How to register?",
    "What is the Lok Sabha?",
    "Who conducts elections?",
    "What is an EVM?"
  ];

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <header style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '3rem', background: 'linear-gradient(to right, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', color: 'transparent', marginBottom: '0.5rem', fontWeight: '700' }}>
          Indian Election Assistant
        </h1>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '0.5rem', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
          <input 
            type="text" 
            placeholder="Ask a question about the Indian election process..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.5rem 1rem', fontSize: '1.05rem', outline: 'none', color: 'var(--text-main)' }}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '24px', padding: '0.5rem 1.5rem', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', transition: 'all 0.2s' }}
          >
            Search
          </button>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
          {quickReplies.map((reply, index) => (
            <button 
              key={index} 
              className="quick-reply-btn"
              onClick={() => handleSend(reply)}
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {messages.length > 0 && (
        <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--card-border)', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxHeight: '400px', overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            <div key={msg.id} style={{ marginBottom: idx === messages.length - 1 ? 0 : '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {msg.sender === 'bot' ? <Bot size={18} color="var(--primary)" /> : <span style={{fontSize: '18px'}}>👤</span>}
                <strong style={{ color: msg.sender === 'bot' ? 'var(--primary)' : 'var(--text-main)' }}>
                  {msg.sender === 'bot' ? 'Assistant' : 'You'}
                </strong>
              </div>
              <div style={{ 
                padding: '1rem', 
                borderRadius: '12px', 
                background: msg.sender === 'bot' ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-color)',
                color: 'var(--text-main)',
                border: '1px solid var(--card-border)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <button 
          onClick={() => setShowTimeline(!showTimeline)}
          style={{ background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem 2.5rem', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', transition: 'all 0.2s' }}
        >
          {showTimeline ? 'Hide Timeline' : 'View Timeline'}
        </button>
      </div>

      {showTimeline && (
        <section className="timeline-section" style={{ margin: '0' }}>
          <h2 className="section-title">The Election Timeline</h2>
          <div className="timeline">
            {TIMELINE_STEPS.map((step) => (
              <div key={step.id} className="timeline-item">
                <div className="timeline-icon">
                  {step.icon}
                </div>
                <div className="timeline-content">
                  <span className="timeline-date">{step.date}</span>
                  <h3 className="timeline-title">{step.title}</h3>
                  <p className="timeline-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
