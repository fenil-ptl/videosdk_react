import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";

// Component 1: Join/Create Meeting Screen
function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState("");
  
  const handleJoin = () => {
    if (meetingId.trim()) {
      getMeetingAndToken(meetingId);
    } else {
      alert("Please enter a meeting ID");
    }
  };
  
  const handleCreate = () => {
    getMeetingAndToken(null);
  };
  
  return (
    <div>
      <h2>VideoSDK Meeting</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Meeting ID"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
        />
        <button onClick={handleJoin}>Join Meeting</button>
      </div>
      <div>
        <button onClick={handleCreate}>Create New Meeting</button>
      </div>
    </div>
  );
}

// Component 2: Individual Participant Display
function ParticipantView({ participantId }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  
  const { 
    webcamStream, 
    micStream, 
    webcamOn, 
    micOn, 
    isLocal, 
    displayName 
  } = useParticipant(participantId);

  // Handle video stream
  useEffect(() => {
    if (videoRef.current && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch(console.error);
    }
  }, [webcamStream]);

  // Handle audio stream (only for remote participants)
  useEffect(() => {
    if (audioRef.current && micStream && !isLocal) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);
      audioRef.current.srcObject = mediaStream;
      audioRef.current.play().catch(console.error);
    }
  }, [micStream, isLocal]);

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h4>{displayName || participantId} {isLocal && "(You)"}</h4>
      <p>Camera: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}</p>
      
      {/* Audio element (hidden) */}
      <audio ref={audioRef} autoPlay muted={isLocal} />
      
      {/* Video display */}
      {webcamOn ? (
        <video
          ref={videoRef}
          autoPlay
          muted={isLocal}
          width="300"
          height="200"
          style={{ backgroundColor: "#000" }}
        />
      ) : (
        <div 
          style={{ 
            width: "300px", 
            height: "200px", 
            backgroundColor: "#333", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            color: "white"
          }}
        >
          Camera Off
        </div>
      )}
    </div>
  );
}

// Component 3: Meeting Control Buttons
function Controls() {
  const { leave, toggleMic, toggleWebcam, micOn, webcamOn } = useMeeting();
  
  return (
    <div>
      <h3>Controls</h3>
      <button onClick={toggleMic}>
        {micOn ? "Mute" : "Unmute"}
      </button>
      <button onClick={toggleWebcam}>
        {webcamOn ? "Stop Video" : "Start Video"}
      </button>
      <button onClick={leave}>Leave Meeting</button>
    </div>
  );
}

// Component 4: Main Meeting Room
function MeetingView({ meetingId, onMeetingLeave }) {
  const [joined, setJoined] = useState(false);
  
  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined(true);
      console.log("Meeting joined successfully");
    },
    onMeetingLeft: () => {
      console.log("Meeting left");
      onMeetingLeave();
    },
    onError: (error) => {
      console.error("Meeting error:", error);
      alert("Meeting error: " + error.message);
    }
  });

  if (!joined) {
    return (
      <div>
        <h3>Meeting ID: {meetingId}</h3>
        <button onClick={join}>Join Meeting</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Meeting ID: {meetingId}</h3>
      <Controls />
      
      <div>
        <h4>Participants ({participants.size})</h4>
        {[...participants.keys()].map((participantId) => (
          <ParticipantView
            key={participantId}
            participantId={participantId}
          />
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [meetingId, setMeetingId] = useState(null);

  // Function to create or join meeting
  const getMeetingAndToken = async (id) => {
    try {
      const newMeetingId = id || await createMeeting({ token: authToken });
      setMeetingId(newMeetingId);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create/join meeting: " + error.message);
    }
  };

  // Function to leave meeting
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  // Check if auth token exists
  if (!authToken) {
    return <div>Error: Auth token is missing!</div>;
  }

  // Show meeting room if meetingId exists, otherwise show join screen
  return (
    <div>
      {meetingId ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: false,
            webcamEnabled: false,
            name: "User-" + Date.now(),
          }}
          token={authToken}
        >
          <MeetingView 
            meetingId={meetingId} 
            onMeetingLeave={onMeetingLeave} 
          />
        </MeetingProvider>
      ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
      )}
    </div>
  );
}

export default App;