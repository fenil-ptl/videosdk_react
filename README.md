## Video Call App (React + VideoSDK)

Make video calls in your browser with 1 click. This app lets you create a meeting, share the Meeting ID, and talk with camera and microphone — no extra installs.

---

### 1) What you get
- **Create or Join a Meeting** using a Meeting ID
- **See and Hear Participants** with live video and audio
- **Simple Controls**: Mute/Unmute mic, Start/Stop camera, Leave meeting

---

### 2) Quick start (for non-technical users)
Follow these steps exactly on your own computer:

1. Install Node.js (LTS version is fine). Download from the official Node.js website.
2. Open this project folder `videocall` in your terminal.
3. Run:
   - `npm install`
4. Open `src/API.js` and make sure `authToken` contains a valid VideoSDK token.
   - If the token is expired, replace it with a fresh one. You can generate a temporary token from your VideoSDK account dashboard.
5. Start the app:
   - `npm start`
6. Your browser will open at `http://localhost:3000`.
7. To test with two people, open the same link in another browser window or share the Meeting ID.

That’s it. You can now create a meeting or join one.

---

### 3) How to use the app (in the browser)
1. You’ll see a title “VideoSDK Meeting”.
2. To join an existing meeting: paste the Meeting ID and click “Join Meeting”.
3. To create a new meeting: click “Create New Meeting”. The app will generate a new Meeting ID for you.
4. Click “Join Meeting” when prompted.
5. Inside the meeting:
   - Use “Mute/Unmute” to control your mic.
   - Use “Start/Stop Video” to control your camera.
   - Use “Leave Meeting” to exit.
6. Share your Meeting ID with others so they can join from their own browser.

---

### 4) What’s inside the code (plain English)
- `src/API.js`
  - Holds your `authToken` (the key that lets the app talk to VideoSDK).
  - Has a function `createMeeting` that calls VideoSDK’s API (`https://api.videosdk.live/v2/rooms`) to get a new Meeting ID.

- `src/App.js`
  - Shows a simple screen to enter a Meeting ID or create a new one.
  - Once you have a Meeting ID, wraps the app with VideoSDK’s `MeetingProvider`.
  - Uses VideoSDK hooks:
    - `useMeeting` to join/leave and list participants.
    - `useParticipant` to get each person’s camera and mic streams and show them on screen.
  - Renders:
    - A list of participant cards (name, camera on/off, mic on/off, video preview).
    - Control buttons (mute/unmute, start/stop video, leave).

- `src/index.js` and `public/index.html`
  - Standard React setup that loads the app in the browser.

---

### 5) Security note (important for interviews)
- The project currently keeps a VideoSDK token directly in the code (`src/API.js`). This is OK for local demos, but not for production.
- In a real app, you should:
  - Create a tiny backend endpoint that returns a short-lived token.
  - The React app asks that endpoint for a token when needed.
  - This keeps your secret API keys off the user’s device.

---

### 6) Troubleshooting (common issues)
- “Error: Auth token is missing!”
  - Open `src/API.js` and set `authToken` to a valid token.
- “Meeting error: …” when joining
  - Your token may be expired or invalid. Generate a fresh one and try again.
- I can’t see/hear anything
  - Give the browser permission to use your camera and microphone.
  - Check that your mic/camera are not muted at the OS level.
- Another person can’t join
  - Share the exact Meeting ID shown in the app. Make sure both of you are online.

---

### 7) Project structure (map)
```
videocall/
  public/                 # Static files for the webpage
  src/
    API.js               # Token + createMeeting call
    App.js               # UI, meeting logic, participants and controls
    index.js             # Starts the React app
    App.css, index.css   # Basic styling
    tests + helpers      # CRA defaults
  package.json            # Dependencies and scripts
```

---

### 8) Run scripts
- `npm start` — start the local development server
- `npm run build` — create a production build
- `npm test` — run tests (CRA default)

---

### 9) Why this project is strong
- Clear, minimal UI for an essential video-calling flow.
- Uses a reliable SDK (`@videosdk.live/react-sdk`) with idiomatic React hooks.
- Clean separation between meeting state, participant rendering, and controls.
- Easy to extend: add screen sharing, chat, grid layout, device selection, etc.

---

### 10) Credits
- Built with React (Create React App) and VideoSDK.
