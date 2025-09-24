// No dotenv import needed in CRA

// Auth token from .env
export const authToken = process.env.REACT_APP_JWT_TOKEN;

console.log("Auth Token:", authToken);

// API call to create a meeting
export const createMeeting = async ({ token }) => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: `${token || authToken}`, // Use passed token or fallback
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    const roomId = data.roomId || data.id;

    if (!roomId) throw new Error("No room ID received from API");

    return roomId;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw error;
  }
};
