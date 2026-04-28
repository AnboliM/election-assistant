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
    title: 'Delimitation of Constituencies',
    date: 'Stage 1',
    description: 'The Delimitation Commission redraws boundaries of parliamentary and assembly constituencies based on the latest Census data for equal representation.',
    icon: <Users size={20} />
  },
  {
    id: 2,
    title: 'Preparation of Electoral Rolls',
    date: 'Stage 2',
    description: 'The ECI updates the voter list. Citizens register using Form 6, and existing entries can be corrected via Form 8.',
    icon: <Calendar size={20} />
  },
  {
    id: 3,
    title: 'Announcement of Election Schedule',
    date: 'Stage 3',
    description: 'The ECI announces the election schedule. The Model Code of Conduct (MCC) comes into effect immediately.',
    icon: <Flag size={20} />
  },
  {
    id: 4,
    title: 'Issue of Notification',
    date: 'Stage 4',
    description: 'The President (for Lok Sabha) or Governor (for State Assembly) issues a formal notification calling upon constituencies to elect representatives.',
    icon: <Landmark size={20} />
  },
  {
    id: 5,
    title: 'Filing of Nominations',
    date: 'Stage 5',
    description: 'Candidates file nomination papers with the Returning Officer, declaring criminal cases, assets, liabilities, and educational qualifications.',
    icon: <Users size={20} />
  },
  {
    id: 6,
    title: 'Scrutiny of Nominations',
    date: 'Stage 6',
    description: 'The Returning Officer examines all nomination papers for validity. Nominations can be rejected for incorrect forms or missing criteria.',
    icon: <Flag size={20} />
  },
  {
    id: 7,
    title: 'Withdrawal of Candidature',
    date: 'Stage 7',
    description: 'Candidates wishing to exit the race can withdraw their nomination before the deadline. The final list of contesting candidates is published.',
    icon: <Calendar size={20} />
  },
  {
    id: 8,
    title: 'Election Campaigning',
    date: 'Stage 8',
    description: 'Candidates campaign following the Model Code of Conduct. All campaigning strictly stops 48 hours before polling begins.',
    icon: <Users size={20} />
  },
  {
    id: 9,
    title: 'Polling Day (Voting)',
    date: 'Stage 9',
    description: 'Citizens cast votes at polling stations using EVMs with VVPAT verification. Voters get indelible ink on their left index finger.',
    icon: <Flag size={20} />
  },
  {
    id: 10,
    title: 'Counting & Declaration of Results',
    date: 'Stage 10',
    description: 'EVMs are opened in counting halls under supervision. The candidate with the most votes is officially declared the winner.',
    icon: <Landmark size={20} />
  }
];

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
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

      <div style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => { setShowTimeline(!showTimeline); setShowGuide(false); }}
          style={{ background: showTimeline ? 'var(--primary)' : 'transparent', border: '2px solid var(--primary)', color: showTimeline ? 'white' : 'var(--primary)', padding: '0.75rem 2.5rem', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', transition: 'all 0.2s' }}
        >
          {showTimeline ? 'Hide Timeline' : 'View Timeline'}
        </button>
        <button 
          onClick={() => { setShowGuide(!showGuide); setShowTimeline(false); }}
          style={{ background: showGuide ? 'var(--primary)' : 'transparent', border: '2px solid var(--primary)', color: showGuide ? 'white' : 'var(--primary)', padding: '0.75rem 2.5rem', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', transition: 'all 0.2s' }}
        >
          {showGuide ? 'Hide Registration Guide' : 'View Registration Guide'}
        </button>
      </div>

      {showGuide && (
        <section className="timeline-section" style={{ margin: '0 0 3rem 0', padding: '2.5rem', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--card-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem', color: 'var(--text-main)', fontSize: '2rem' }}>📋 Voter Registration Guide</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ Eligibility</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                <li>Indian citizen</li>
                <li>18 years or older (as of Jan 1 of revision year)</li>
                <li>Ordinary resident of the constituency</li>
                <li>Not disqualified under any law</li>
              </ul>
            </div>
            
            <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📄 Documents Required</h3>
              <p style={{ fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Age Proof (any one):</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                <li>Aadhaar Card, PAN Card, or Birth Cert.</li>
                <li>Class X / XII Marksheet</li>
                <li>Driving License</li>
              </ul>
              <p style={{ fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Address Proof (any one):</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                <li>Aadhaar Card or Passport</li>
                <li>Bank Passbook or Utility Bill</li>
                <li>Rent Agreement</li>
              </ul>
            </div>
            
            <div style={{ gridColumn: '1 / -1', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🗳️ On Voting Day</h3>
              <ul style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                <li>Carry your EPIC (Voter ID) or any approved photo ID.</li>
                <li>Go to your assigned polling station (check on Voter Helpline App).</li>
                <li>Stand in the queue; your identity will be verified.</li>
                <li>Indelible ink is applied on your left index finger.</li>
                <li>Enter the voting booth, press the button next to your chosen candidate on the EVM.</li>
                <li>Verify your vote on the VVPAT paper slip (visible for 7 seconds).</li>
                <li>Exit the polling station — your vote is cast! 🎉</li>
              </ul>
            </div>
          </div>
        </section>
      )}

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
