# Indian Election Assistant

An interactive, responsive web application built with React and Vite that guides users through the Indian election process. The application provides a modern, intuitive interface where users can ask questions about elections and explore an interactive timeline of the election phases.

## 🚀 Features

- **Interactive Timeline**: Step-by-step visual representation of the election process (Announcement, Nominations, Polling, Results).
- **Dynamic Assistant Chat**: Users can ask natural language questions about the election.
- **Quick Replies**: One-click prompt buttons for the most common questions.
- **Modern UI**: Clean, glassmorphic design with seamless animations and transitions.

---

## 🧠 Prompting Logic & Intent Matching

The assistant utilizes a lightweight, rule-based NLP (Natural Language Processing) approach to map user queries to accurate, pre-verified information.

### Intent Resolution
When a user submits a query, the application converts the text to lowercase and scans for specific semantic keywords to determine the **intent**.

The current supported intents and their keyword triggers are:

1. **Voter Registration**
   - *Keywords*: `register`, `sign up`, `voter id`
   - *Action*: Provides instructions on Form 6 and eligibility criteria.

2. **Election Dates / Timing**
   - *Keywords*: `when`, `date`
   - *Action*: Explains the 5-year cycle and the ECI announcement phases.

3. **Parliamentary Structure (Lok Sabha)**
   - *Keywords*: `lok sabha`, `parliament`
   - *Action*: Explains the structure and purpose of the lower house.

4. **Conducting Authority**
   - *Keywords*: `conducts`, `eci`, `commission`
   - *Action*: Details the role of the Election Commission of India.

5. **Voting Machinery (EVMs)**
   - *Keywords*: `evm`, `machine`, `how to vote`
   - *Action*: Explains the use of Electronic Voting Machines and VVPATs.

6. **Voter Eligibility**
   - *Keywords*: `who`, `can i vote`, `requirements`, `eligible`
   - *Action*: Outlines the age and citizenship requirements.

7. **Election Types**
   - *Keywords*: `types`, `what kinds`, `how many elections`
   - *Action*: Distinguishes between General, State Assembly, and Local Body elections.

### Fallback Mechanism
If the input contains no recognizable keywords, the system gracefully falls back to a default prompt:
> *"I'm not completely sure about that. Try asking about 'how to register', 'what is Lok Sabha', or 'types of elections'."*

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **Styling**: Vanilla CSS with modern CSS variables for theming
- **Icons**: Lucide React
- **Deployment**: Dockerized and deployed via Google Cloud Run

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
