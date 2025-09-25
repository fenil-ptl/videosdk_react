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


<h3>- above code block will check fot the meeting id , here getMeetingAndToken  is acts as ASYNC function  which will look for the meeting id , by taking id as input 
	it it exists we use that id for the joining meeting </h3>
	
	it not it will create the new meeting id by authenticating JWT token 
   
	if you use wrong id it will give alert message of failed to create/join meeting 

<h3>3. When user leave meeting</h3>

const onMeetingLeave = () => {
<br>
    setMeetingId(null);
    <br>
  };
  <br>

<h3>- here when user leave the ongoing meeting , after leave it will set meeting id as null (nothing)</h3>


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

<h2>- this above code will check meeting id ,</h2>


   <h2>
   -if it's exits and valid it will allow user to join meet 
	-if not it will let user to join screen  section for making 
 
-  MeetingProvider component provide meeting context with the config of mic ,cam 
- here token act as entry pass 
 </h2>
 

<h2>5. Join Screen Component 	</h2>

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
      <h2>VideoSDK Meeting</h2>
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
      <br>
      <div>
      <br>
        <button onClick={handleCreate}>Create New Meeting</button>
        <br>
      </div>
      <br>
    </div>
    <br>
  );
  <br>
}
<br>


<h3>
- first screen user when they join the meeting 
-join screen takes meetingid as input via props 
-  const [meetingId, setMeetingId] = useState(""); ,here use state use for the creating the state of the meeting id 
	- Meetinid= user give as input 
	- SetMeetingId= function to update 
</h3>


<h3>
handlejoin() -- it works when user click join meeting 
	- by checking the meeting id 
		- if  meeting id is not empty - it will call setMeeting and Token  
		- if It's Empty it will show message for enter meeting id 

handleCreate() - it works when user clicks crate meeting 
	- here we pass null value inside getMeetingAndToken()  to make sure we don't have any meeting id 
</h3>

<h3>
return (
	....
	....
	....
) 
- the whole code inside return statement refers to the UI part in screen 
</h3>



<h2>6.  Participantview()  Component 


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
      <h4>{displayName || participantId} {isLocal && "(You)"}</h4>
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

- useRef -> it will create the reference
	-videoRef -> it refers to the video element 
	-MicRef -> it refers to the audio element 


- NOW , useParticipant(participantID) -> it is Videosdk hook with the use of this we can trak the real time state of the user 
	- we can track Audio & Video
	- is Mic and Camera is on/off?
	- isLocal  it will return true if it's you 
	- DisplayName  - the name that you enter while joining the meeting 

-  // Handle video stream
  useEffect(() => {
    if (videoRef.current && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch(console.error);
    }
  }, [webcamStream]); 


- it will handle the video stream 
- above code triggers when someone turn on/off their camera this code block executes
- if (videoRef.current && webcamStream) {   // this will check if video player on screen and camera stream both exists 
- const mediaStream = new MediaStream(); // it will create the object or a empty container for storing the video 
- and after storing video in container it connects to video player 
- after pressing play button , video appears on screen , if something error happen it will handle by  .catch() method



 useEffect(() => {
    if (audioRef.current && micStream && !isLocal) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);
      audioRef.current.srcObject = mediaStream;
      audioRef.current.play().catch(console.error);
    }
  }, [micStream, isLocal]);


-- this one is work similar as video code 

- when someone turn on/ off their mic this code run

here we check 3 things together 
I. Audio player means speaker exists
II. Microphone means whatever you speak through  microphone , that microphone exists
III.  !isLocal- means this is not me , means don't play my voice back to me 

- here we create also one new container for storing , for taking audio and put  inside this container 

- then we plug container into speakers

- press play button and hear their voice through speakers



UI part :

return (
	...
	...
	...
)


- it will create the box to each user

- and show person's name and if their's your name it will show you 

- show the status of audio/camera

</h4>


<h2>7. Controls() component </h2>

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


- here Controls() is the react UI component 

- it use useMeeting() hook which gives meeting actions and state 

- providing control functionality 
	- such as leave meeting , turn on/off mic and camera 
	- give Boolean value of mic and camera is it currently on 
	



8. MeetingView() component 
-

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


 - it use 2 props
	1.  meeting ID  - unique id of current meeting 
	2. meeting leave  - function to call when someone leave the meet 


- useMeeting() -> it's hook which give access to meeting actions and  data 
		join() -  function to join meeting 
		participants() - collection of all the participants in the meeing 


		- it also accept the event handlers( callbacks )
			- onMeetingJoin -> it run when you successfully join the meet 
			- onMeetingLeft -> it run when you leave 
			- onError -> it runs when there's any error 


- if you don't join the meet it will show the meeting id and button 


- once you joined it will show the controls , participant's 











