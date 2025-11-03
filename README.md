# Portfolio Chat Application

A modern, interactive portfolio chat application built with Next.js and React, featuring a Q&A system that provides information about projects, skills, experience, and more.

## 🚀 Features

- **Interactive Q&A Chat Interface** - Ask questions and get instant answers about the Mann
- **Smart Question Matching** - Intelligent matching system that understands various question phrasings
- **Suggested Questions** - Dynamic question suggestions based on conversation context
- **Preset Quick Replies** - Fast access to common queries (About Me, Projects, Skills, Resume, Contact)
- **Beautiful UI/UX** - Modern, responsive design with smooth animations using Framer Motion
- **Portfolio Components** - Interactive display of projects, skills, resume, and contact information
- **Dark Mode Support** - Fully responsive with dark mode compatibility

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-main
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Getting Started

1. **Configure your portfolio data:**
   - Edit `portfolio-config.json` with your personal information, projects, skills, etc.

2. **Start the development server:**
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
portfolio-main/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/         # API routes
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/       # React components
│   │   ├── chat/        # Chat-related components
│   │   ├── projects/    # Project components
│   │   └── ui/          # UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   │   ├── config-loader.ts    # Portfolio config loader
│   │   ├── config-parser.ts    # Config parser
│   │   └── qa-data.ts          # Q&A data and matching
│   └── types/           # TypeScript types
├── public/              # Static assets
├── portfolio-config.json # Portfolio configuration
└── package.json
```

## ⚙️ Configuration

All portfolio data is configured in `portfolio-config.json`. Update this file with:

- Personal information (name, bio, contact)
- Education and experience
- Skills and technologies
- Projects and achievements
- Social media links
- Resume details
- Internship/job availability

## 🎨 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Custom components with Radix UI primitives
- **State Management:** React Hooks
- **Markdown:** React Markdown with GFM support

## 📝 Key Features Explained

### Q&A System
- Questions and answers are stored in `src/lib/qa-data.ts`
- Smart matching algorithm finds the best answer for user queries
- Suggested questions help guide conversations

### Preset Replies
- Quick-access responses for common questions
- Instant component rendering (Projects, Skills, Resume, etc.)
- Saves API quota with optimized preset responses

### Components
- **Chat Interface** - Main chat component with landing page
- **Project Display** - Beautiful vertical project cards
- **Skills Showcase** - Interactive skills visualization
- **Contact Information** - Easy-to-use contact component
- **Resume Download** - Resume preview and download

Built with ❤️ using Next.js and React
