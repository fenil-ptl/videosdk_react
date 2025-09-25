Video Calling website made up with the Videosdk's react sdk (https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/quick-start)
<br>
<br>
<h1>Features</h1> : 
<br>
-Live Video calling
-Controling Audio/Video
-Generating Meeting ID
-Authentication with JWT given by VideoSDK
-Join & leave meeting 
<br>
<h1>Prerequisite</h1> :
<br>
<h2>1. Go to Videosdk.live - </h2>
	<h4>- sign in , it will create your developer account </h4>
	<h4>- It will use for generating JWT Token </h4>

<br>
<h2>2. Node and NPM installed in your Machine </h2>
	<h4>- Check it via </h4>
		npm -v    // use for checking npm version <br>
		node -v  // use for checking node version <br>
<br>

<h1> Getting Started  with Code </h1>

<h2>1.Configuration </h2>

   - Install React-SDK 

	$ npm install "@videosdk.live/react-sdk" 

	//For the Participants Video
	$ npm install "react-player"

<h2>2. Clone the repo</h2>

	https://github.com/fenil-ptl/videosdk_react.git 

<h2>3. Install Packages</h2>

	npm install 

<h2>4. Run the app</h2>

	npm start 


<h3>Now in browser you can see at 	https://localhost:3000 application will run </h3>

<br>
Here there are 2 main files in this code for working this functionality 
<br>
1. APP.js <br>
2. API.js


<h2>Now start with APP.js </h2>
<br>
	- Explanation of APP.js code 
<br>
<h3>1. Importing all the modules and content providers  , hook , Component</h3>

import "./App.css"; 
<br>
import React, { useEffect, useRef, useState } from "react";
<br>
import {
<br>
  MeetingProvider,
  <br>
  useMeeting,
  <br>
  useParticipant,
  <br>
} from "@videosdk.live/react-sdk";
<br>
import { authToken, createMeeting } from "./API";
<br>


<h3>2.  Check for the meeting ID and token </h3>
<br>
const getMeetingAndToken = async (id) => {
<br>
    try {
    <br>
      const newMeetingId = id || await createMeeting({ token: authToken });
      <br>
      setMeetingId(newMeetingId);
      <br>
    } catch (error) {
    <br>
      console.error("Error:", error);
      <br>
      alert("Failed to create/join meeting: " + error.message);
      <br>
    }
    <br>
  };
  <br>


- above code block will check fot the meeting id , here getMeetingAndToken  is acts as ASYNC function  which will look for the meeting id , by taking id as input 
	it it exists we use that id for the joining meeting 
	
	it not it will create the new meeting id by authenticating JWT token 
   
	if you use wrong id it will give alert message of failed to create/join meeting 

<h3>3. When user leave meeting</h3>

const onMeetingLeave = () => {
<br>
    setMeetingId(null);
    <br>
  };
  <br>

<h4>- here when user leave the ongoing meeting , after leave it will set meeting id as null (nothing)</h4>


<h3>4. Join VideoCall </h3>

// Show meeting room if meetingId exists, otherwise show join screen

  return (
  <br>
    <div>
    <br>
      {meetingId ? (
      <br>
        <MeetingProvider
        <br>
          config={{
          <br>
            meetingId,
            <br>
            micEnabled: false,
            <br>
            webcamEnabled: false,
            <br>
            name: "User-" + Date.now(),
            <br>
          }}
          <br>
          token={authToken}
          <br>
        >
        <br>
          <MeetingView 
             <br>
            meetingId={meetingId} 
            <br>
            onMeetingLeave={onMeetingLeave} 
            <br>
          />
          <br>
        </MeetingProvider>
        <br>
      ) : (
      <br>
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
        <br>
      )}
      <br>
    </div>
    <br>
  );

<h4>- this above code will check meeting id ,</h4>


   <h4>
   -if it's exits and valid it will allow user to join meet 
	-if not it will let user to join screen  section for making 
 
-  MeetingProvider component provide meeting context with the config of mic ,cam 
- here token act as entry pass 
 </h4>
 

<h3>5. Join Screen Component 	</h3>

function JoinScreen({ getMeetingAndToken }) {
<br>
  const [meetingId, setMeetingId] = useState("");
  <br>
  
  const handleJoin = () => {
  <br>
    if (meetingId.trim()) {
    <br>
      getMeetingAndToken(meetingId);
      <br>
    } else {
    <br>
      alert("Please enter a meeting ID");
      <br>
    }
    <br>
  };
  <br>
  
  const handleCreate = () => {
  <br>
    getMeetingAndToken(null);
    <br>
  };
  <br>
  return (
  <br>
    <div>
    <br>
      <p>VideoSDK Meeting</p>
      <br>
      <div>
      <br>
        <input
        <br>
          type="text"
          <br>
          placeholder="Enter Meeting ID"
          <br>
          value={meetingId}
          <br>
          onChange={(e) => setMeetingId(e.target.value)}
          <br>
        />
        <br>
        <button onClick={handleJoin}>Join Meeting</button>
        <br>
      </div>
      <div>
        <button onClick={handleCreate}>Create New Meeting</button>
        <br>
      </div>
    </div>
  );
  <br>
}
<br>


<h4>
- first screen user when they join the meeting 
	<br>
-join screen takes meetingid as input via props 
	<br>
-  const [meetingId, setMeetingId] = useState(""); ,here use state use for the creating the state of the meeting id 
	<br>
	- Meetinid= user give as input 
	<br>
	- SetMeetingId= function to update 
	<br>
</h4>


<h4>
handlejoin() -- it works when user click join meeting 
	<br>
	- by checking the meeting id 
	<br>
		- if  meeting id is not empty - it will call setMeeting and Token  
	<br>
		- if It's Empty it will show message for enter meeting id 
		<br>

handleCreate() - it works when user clicks crate meeting 
<br>
	- here we pass null value inside getMeetingAndToken()  to make sure we don't have any meeting id 
	<br>
</h3>

<h3>
return (
	....
	....
	....
) 
	<br>
- the whole code inside return statement refers to the UI part in screen 
</h3>

<br>

<h3>6.  Participantview()  Component </h3>
<br>
function ParticipantView({ participantId }) {
<br>
  const videoRef = useRef(null);
  <br>
  const audioRef = useRef(null);
  <br>
  
  const { 
  <br>
    webcamStream, 
    <br>
    micStream, 
    <br>
    webcamOn, 
    <br>
    micOn, 
    <br>
    isLocal, 
    <br>
    displayName 
    <br>
  } = useParticipant(participantId);
  <br>


  // Handle video stream
  useEffect(() => {
  <br>
    if (videoRef.current && webcamStream) {
    <br>
      const mediaStream = new MediaStream();
      <br>
      mediaStream.addTrack(webcamStream.track);
      <br>
      videoRef.current.srcObject = mediaStream;
      <br>
      videoRef.current.play().catch(console.error);
      <br>
    }
    <br>
  }, [webcamStream]);
  <br>

  // Handle audio stream (only for remote participants)
  <br>
  useEffect(() => {
  <br>
    if (audioRef.current && micStream && !isLocal) {
    <br>
      const mediaStream = new MediaStream();
      <br>
      mediaStream.addTrack(micStream.track);
      <br>
      audioRef.current.srcObject = mediaStream;
      <br>
      audioRef.current.play().catch(console.error);
      <br>
    }
    <br>
  }, [micStream, isLocal]);
  <br>

  return (
  <br>
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
    <br>
      <p>{displayName || participantId} {isLocal && "(You)"}</p>
      <br>
      <p>Camera: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}</p>
      <br>
      {/* Audio element (hidden) */}
      <br>
      <audio ref={audioRef} autoPlay muted={isLocal} />
      <br>
      {/* Video display */}
      <br>
      {webcamOn ? (
      <br>
        <video
        <br>
          ref={videoRef}
          <br>
          autoPlay
          <br>
          muted={isLocal}
          <br>
          width="300"
          <br>
          height="200"
          <br>
          style={{ backgroundColor: "#000" }}
          <br>
        />
        <br>
      ) : (
      <br>
        <div 
        <br>
          style={{ 
          <br>
            width: "300px", 
            <br>
            height: "200px", 
            <br>
            backgroundColor: "#333", 
            <br>
            display: "flex", 
            <br>
            alignItems: "center", 
            <br>
            justifyContent: "center",
            <br>
            color: "white"
            <br>
          }}
              <br>
        >
          <br>
          Camera Off
            <br>
        </div>
          <br>
      )}
        <br>
    </div>
      <br>
  );
    <br>
}
  <br>

  <br>

<h2>
- above code block refers to the participant's audio and video information 
</h2>

<h4>
{participantID} -> it refers to the unique id of the participant  which acts as props 
<br>

- useRef -> it will create the reference
- <br>
	-videoRef -> it refers to the video element 
	<br>
	-MicRef -> it refers to the audio element 
	<br>


- NOW , useParticipant(participantID) -> it is Videosdk hook with the use of this we can trak the real time state of the user
- <br>
	- we can track Audio & Video
	<br>
	- is Mic and Camera is on/off?
	<br>
	- isLocal  it will return true if it's you 
	<br>
	- DisplayName  - the name that you enter while joining the meeting 
	<br>

-  // Handle video stream
-  <br>
  useEffect(() => {
  <br>
    if (videoRef.current && webcamStream) {
	<br>
      const mediaStream = new MediaStream();
	  <br>
      mediaStream.addTrack(webcamStream.track);
	  <br>
      videoRef.current.srcObject = mediaStream;
	  <br>
      videoRef.current.play().catch(console.error);
	  <br>
    }
	<br>
  }, [webcamStream]); 
  <br>

- it will handle the video stream
- <br>
- above code triggers when someone turn on/off their camera this code block executes
- <br>
- if (videoRef.current && webcamStream) {   // this will check if video player on screen and camera stream both exists
- <br>
- const mediaStream = new MediaStream(); // it will create the object or a empty container for storing the video
- <br>
- and after storing video in container it connects to video player
- <br>
- after pressing play button , video appears on screen , if something error happen it will handle by  .catch() method
- <br>



 useEffect(() => {
 <br>
    if (audioRef.current && micStream && !isLocal) {
	<br>
      const mediaStream = new MediaStream();
	  <br>
      mediaStream.addTrack(micStream.track);
	  <br>
      audioRef.current.srcObject = mediaStream;
	  <br>
      audioRef.current.play().catch(console.error);
	  <br>
    }
	<br>
  }, [micStream, isLocal]);
  <br>


-- this one is work similar as video code 
<br>

- when someone turn on/ off their mic this code run
<br>
here we check 3 things together
<br>
I. Audio player means speaker exists
<br>
II. Microphone means whatever you speak through  microphone , that microphone exists
<br>
III.  !isLocal- means this is not me , means don't play my voice back to me
<br>

- here we create also one new container for storing , for taking audio and put  inside this container
- <br>

- then we plug container into speakers
<br>
- press play button and hear their voice through speakers
<br>


UI part :
<br>
return (
<br>
	...
	<br>
	...
	<br>
	...
	<br>
)
<br>


- it will create the box to each user
- <br>
- and show person's name and if their's your name it will show you
- <br>
- show the status of audio/camera
<br>
</h4>


<h2>7. Controls() component </h2>
<br>
function Controls() {
<br>
  const { leave, toggleMic, toggleWebcam, micOn, webcamOn } = useMeeting();
  <br>
  return (
  <br>
    <div>
		<br>
      <h3>Controls</h3>
		<br>
      <button onClick={toggleMic}>
		  <br>
        {micOn ? "Mute" : "Unmute"}
		  <br>
      </button>
		<br>
      <button onClick={toggleWebcam}>
		  <br>
        {webcamOn ? "Stop Video" : "Start Video"}
		  <br>
      </button>
		<br>
      <button onClick={leave}>Leave Meeting</button>
		<br>
    </div>
	<br>
  );
}

<br>
- here Controls() is the react UI component 
<br>
- it use useMeeting() hook which gives meeting actions and state 
<br>
- providing control functionality 
<br>
	- such as leave meeting , turn on/off mic and camera 
	<br>
	- give Boolean value of mic and camera is it currently on 
	<br>
	



<h2>8. MeetingView() component </h2>
-
<br>
// Component 4: Main Meeting Room
<br>
function MeetingView({ meetingId, onMeetingLeave }) {
<br>
  const [joined, setJoined] = useState(false);
  <br>
  const { join, participants } = useMeeting({
  <br>
    onMeetingJoined: () => {
	<br>
      setJoined(true);
	  <br>
      console.log("Meeting joined successfully");
	  <br>
    },
	<br>
    onMeetingLeft: () => {
	<br>
      console.log("Meeting left");
	  <br>
      onMeetingLeave();
	  <br>
    },
	<br>
    onError: (error) => {
	<br>
      console.error("Meeting error:", error);
	  <br>
      alert("Meeting error: " + error.message);
	  <br>
    }
	
  });
<br>
  if (!joined) {
  <br>
    return (
	<br>
      <div>
	  <br>
        <h3>Meeting ID: {meetingId}</h3>
		<br>
        <button onClick={join}>Join Meeting</button>
		<br>
      </div>
	  
    );
  }
<br>
  return (
  <br>
    <div>
      <p>Meeting ID: {meetingId}</p>
	  <br>
      <Controls />
	  <br>
      <div>
        <h4>Participants ({participants.size})</h4>
		<br>
        {[...participants.keys()].map((participantId) => (
		<br>
          <ParticipantView
			  <br>
            key={participantId}
			<br>
            participantId={participantId}
			<br>
          />
        ))}
      </div>
    </div>
  );
}

<br>
 - it use 2 props
 <br>
	1.  meeting ID  - unique id of current meeting 
	<br>
	2. meeting leave  - function to call when someone leave the meet 
	<br>
- useMeeting() -> it's hook which give access to meeting actions and  data 
<br>
		join() -  function to join meeting <br>
		participants() - collection of all the participants in the meeing <br>
		- it also accept the event handlers( callbacks )<br>
			- onMeetingJoin -> it run when you successfully join the meet 
			<br>
			- onMeetingLeft -> it run when you leave <br>
			- onError -> it runs when there's any error <br>
<br>
- if you don't join the meet it will show the meeting id and button 
<br>
- once you joined it will show the controls , participant's 











