import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import defaultProfileImage from "./assets/default_profile_image.png";
function App() {
  const [notifications, setNotifications] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [socketError, setSocketError] = useState(null);
  const [socket, setSocket] = useState(null);

  const handleLogin = () => {
    const connectSocket = io(process.env.REACT_APP_SERVER);
    setSocket(connectSocket);
    setSocketError(null);
    setNotifications([]);
  };
  const handleLogout = () => {
    socket.disconnect();
    setUser(null);
  };
  useEffect(() => {
    if (socket) {
      socket.once("connect", () => {
        socket.emit("authenticate", {
          username,
          password,
        });
      });
      socket.on("authorized", () => {
        socket.emit("getUser");
      });
      socket.on("unauthorized", (data) => {
        setSocketError("unauthorized: ", data);
      });
      socket.on("error", (err) => {
        setSocketError(err?.message);
        console.log(err?.message);
      });
      socket.on("notifications", (data) => {
        setNotifications(data);
      });
      socket.on("messages", (data) => {
        setMessages(data);
      });
      socket.on("user", (data) => {
        setUser(data);
      });
      socket.on("disconnect", (data) => {
        console.log("disconnected");
      });
    }
    return () => {
      socket?.off();
      socket?.disconnect();
    };
  }, [password, socket, username]);

  const getNotifications = (userID) => {
    socket.emit("getNotifications", userID);
  };
  const getMessages = (userID) => {
    socket.emit("getMessages", userID);
  };
  return (
    <div className="App">
      <h1>Socketio-auth</h1>
      {user ? (
        <div className="user__container">
          <span>Welcome {user?.username}</span>
          <img
            src={user?.profileImage ? user?.profileImage : defaultProfileImage}
            alt="Profile"
          />
          {socket.connected ? (
            <span>🟢 Connected</span>
          ) : (
            <span>🔴 Disconnected</span>
          )}

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
          <button
            onClick={() => getNotifications(user.id)}
            disabled={!socket?.connected}
          >
            Get notifications
          </button>
          {notifications && notifications?.length !== 0 ? (
            <ul>
              {notifications.map((item) => (
                <li key={item._id}>
                  id: {item._id}, title: {item.title}, text: {item.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
          <button
            onClick={() => getMessages(user.id)}
            disabled={!socket?.connected}
          >
            Get Messages
          </button>
          {messages && messages?.length !== 0 ? (
            <ul>
              {messages.map((item) => (
                <li key={item._id}>
                  id: {item._id}, senderID: {item.senderID}, title: {item.title}
                  , message: {item.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>No messages</p>
          )}
        </div>
      ) : (
        <div className="login__container">
          <h1>Login</h1>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
      {socketError ? <p>{socketError}</p> : null}
    </div>
  );
}

export default App;
