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

### 2. Generate RSA Keys for Backend

**IMPORTANT:** The backend requires RSA keys to work.

```bash
cd backend/keys

# Generate your private key
openssl genrsa -out private.key 2048

# Generate your public key  
openssl rsa -in private.key -pubout -out public.key
```

Then:
1. Get IBM's public key from Watsonx Orchestrate console
2. Save it as `backend/keys/ibm_public.pub`
3. Upload your `public.key` to Watsonx Orchestrate settings

See [`backend/keys/README.md`](./backend/keys/README.md) for detailed instructions.

### 3. Configure Environment

Create `.env.local` in the root directory (already created):

```env
NEXT_PUBLIC_JWT_SERVER_URL=http://localhost:3003
```

### 4. Start the Application

#### Option A: Run Both Servers Together (Recommended)

```bash
npm run dev:all
```

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:3003

#### Option B: Run Separately

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run backend
```

### 5. Verify Everything Works

1. **Check Backend:**
   ```bash
   curl http://localhost:3003/health
   ```
   Should return: `{"status":"ok","keysLoaded":true,...}`

2. **Open Frontend:**
   - Visit http://localhost:3000
   - Open browser DevTools (F12)
   - Check console for: "Chat started successfully"
   - Chat widget should appear in bottom right

---

## 📁 Project Structure

```
lablab_IBM_Repo_Frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Watsonx integration
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── watsonx-orchestrate.tsx  # Watsonx chat integration
│   ├── hero.tsx                 # Hero section with CTA
│   ├── header.tsx              # Site header
│   ├── footer.tsx              # Site footer
│   └── ui/                     # shadcn/ui components
│
├── backend/               # JWT authentication server
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   ├── README.md         # Backend documentation
│   └── keys/             # RSA keys (git ignored)
│       ├── README.md     # Key generation guide
│       ├── private.key   # Your private key (generate this)
│       └── ibm_public.pub # IBM's public key (from console)
│
├── public/               # Static assets
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
│
├── .env.local           # Environment variables
├── package.json         # Frontend dependencies + scripts
├── tsconfig.json        # TypeScript configuration
├── next.config.mjs      # Next.js configuration
│
└── Documentation/
    ├── README_WATSONX.md           # Complete Watsonx guide
    ├── WATSONX_SETUP_GUIDE.md      # Troubleshooting guide
    ├── QUICK_FIX.md                # Quick reference
    └── CRITICAL_FIX_REQUIRED.md    # Common issues
```

---

## 🎯 Features

### Frontend
- ✅ Modern Next.js 16 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui component library
- ✅ Responsive design
- ✅ Dark mode support (theme provider included)

### Backend
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

---

## 📝 Available Scripts

### Frontend Scripts
```bash
npm run dev              # Start Next.js dev server (port 3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
```

### Backend Scripts
```bash
npm run backend         # Start backend server (port 3003)
npm run backend:dev     # Start backend with auto-reload
npm run backend:install # Install backend dependencies
```

### Combined Scripts
```bash
npm run dev:all         # Run frontend + backend together
npm run install:all     # Install all dependencies
```

---

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

### Backend Configuration

Edit `backend/server.js` for:
- CORS origins
- JWT expiration time
- Cookie settings
- Custom context data

### Environment Variables

Create `.env.local`:
```env
# JWT Server URL
NEXT_PUBLIC_JWT_SERVER_URL=http://localhost:3003

# Add other environment variables here
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend won't start - "Keys not loaded"

**Solution:** Generate RSA keys following [`backend/keys/README.md`](./backend/keys/README.md)

#### 2. Frontend shows 401 errors

**Solutions:**
- Check backend is running: `curl http://localhost:3003/health`
- Verify keys are loaded
- Check CORS configuration
- See [`WATSONX_SETUP_GUIDE.md`](./WATSONX_SETUP_GUIDE.md)

#### 3. Chat widget doesn't appear

**Solutions:**
- Open browser console (F12) and check for errors
- Verify backend is returning JWT tokens
- Check Network tab for failed requests
- See [`QUICK_FIX.md`](./QUICK_FIX.md)

#### 4. Token renewal fails

**Solutions:**
- Check `authTokenNeeded` event handler logs
- Verify backend `/createJWT` endpoint works
- Check cookies are being sent (`credentials: 'include'`)

### Testing Tools

Run the setup test script:
```bash
./setup-test.sh
```

This checks:
- ✓ Backend server status
- ✓ Keys loaded correctly
- ✓ JWT generation working
- ✓ Frontend files present

---

## 📚 Documentation

- **[README_WATSONX.md](./README_WATSONX.md)** - Complete Watsonx integration guide
- **[WATSONX_SETUP_GUIDE.md](./WATSONX_SETUP_GUIDE.md)** - Detailed troubleshooting
- **[QUICK_FIX.md](./QUICK_FIX.md)** - Quick reference for common fixes
- **[backend/README.md](./backend/README.md)** - Backend server documentation
- **[backend/keys/README.md](./backend/keys/README.md)** - Key generation guide

---

## 🔒 Security

### Important Security Notes

- ✅ Never commit `private.key` to git (already in .gitignore)
- ✅ Keep your private key secure
- ✅ Use HTTPS in production
- ✅ Set `secure: true` on cookies in production
- ✅ Limit CORS origins to your actual domains
- ✅ Regenerate keys periodically

### Production Deployment

For production:

1. **Generate production keys**
2. **Update CORS origins** in `backend/server.js`
3. **Enable secure cookies:**
   ```javascript
   secure: true,
   sameSite: 'strict'
   ```
4. **Set environment variables:**
   ```bash
   export NODE_ENV=production
   export NEXT_PUBLIC_JWT_SERVER_URL=https://your-backend.com
   ```
5. **Use HTTPS** for both frontend and backend
6. **Use a process manager** (pm2, systemd)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State:** React Hooks
- **Analytics:** Vercel Analytics

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Auth:** JWT (RS256)
- **Encryption:** RSA with OAEP padding

### AI/Chat
- **Platform:** IBM Watsonx Orchestrate
- **Integration:** Embedded chat widget
- **Auth:** JWT with automatic renewal

---

## 📄 License

MIT

---

## 👥 Team

LabLab IBM Hackathon Team

---

## 🆘 Support

### Getting Help

1. **Check documentation** in the docs files listed above
2. **Run diagnostics:** `./setup-test.sh`
3. **Check logs:**
   - Backend: Check terminal output
   - Frontend: Check browser console (F12)
4. **Review guides:**
   - Quick fixes: `QUICK_FIX.md`
   - Full troubleshooting: `WATSONX_SETUP_GUIDE.md`

### Reporting Issues

When reporting issues, please provide:
- Backend terminal output
- Frontend browser console errors
- Network tab screenshot (F12 → Network)
- Output of `curl http://localhost:3003/health`

---

## ✅ Quick Checklist

Before running the app, ensure:

- [ ] Node.js 14+ installed
- [ ] All dependencies installed (`npm run install:all`)
- [ ] RSA keys generated in `backend/keys/`
- [ ] IBM public key saved as `ibm_public.pub`
- [ ] Your public key uploaded to Watsonx Orchestrate
- [ ] `.env.local` created with JWT server URL
- [ ] Backend starts without errors
- [ ] Health check returns `"keysLoaded": true`
- [ ] Frontend starts without errors
- [ ] Chat widget appears in browser

---

## 🎉 Ready to Go!

Start both servers:
```bash
npm run dev:all
```

Open http://localhost:3000 and enjoy your AI-powered procurement assistant! 🚀
