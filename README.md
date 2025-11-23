# LabLab IBM - Intelligent Procurement Assistant

AI-powered procurement assistant built with Next.js and IBM Watsonx Orchestrate.

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- IBM Watsonx Orchestrate account (for chat functionality)

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd lablab_IBM_Repo_Frontend

# Install all dependencies (frontend + backend)
npm run install:all
```

Or install separately:
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 2. Configure Environment

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_JWT_SERVER_URL=http://localhost:3003
```

### 4. Start the Application


```bash
npm run dev
```

This starts:
- Frontend on http://localhost:3000

### 5. Verify Everything Works

1. **Open Frontend:**
   - Visit http://localhost:3000
   - Open browser DevTools (F12)
   - Check console for: "Chat started successfully"
   - Chat widget should appear in bottom right


## 🎯 Features


### Website

- ✅ Modern Next.js 16 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui component library
- ✅ Responsive design
- ✅ Express.js JWT server
- ✅ RS256 JWT signing
- ✅ Encrypted user payloads
- ✅ CORS configured for frontend
- ✅ Cookie-based sessions
- ✅ Automatic token renewal

### Watsonx Integration
- ✅ Real-time chat widget
- ✅ Automatic authentication
- ✅ Token auto-renewal
- ✅ Event monitoring
- ✅ Error handling




## 🔧 Configuration

### Watsonx Orchestrate Settings

Update these in `components/watsonx-orchestrate.tsx` if needed:

```typescript
window.wxOConfiguration = {
    orchestrationID: "your-orchestration-id",
    hostURL: "https://au-syd.watson-orchestrate.cloud.ibm.com",
    agentId: "your-agent-id",
    agentEnvironmentId: "your-environment-id",
    // ...
}
```

## 🛠️ Tech Stack

### Website
- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State:** React Hooks
- **Analytics:** Vercel Analytics

### AI/Chat
- **Platform:** IBM Watsonx Orchestrate
- **Integration:** Embedded chat widget
- **Auth:** JWT with automatic renewal


## 📄 License

MIT


## 👥 Team

LabLab IBM Hackathon Team

## Agent Code

https://github.com/Saad-1719/lablab_IBM_Repo_Backend