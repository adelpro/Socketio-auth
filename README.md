# Socket-auth

Implement User/Password Authentication in Socket.IO and ReactJS

In this project we will use ReactJS to build authentication system to secure Socket.IO access.

## In the front-end

ReactJS
Socket.IO-Client

## In the back-end

NodeJS
MongoDB
Socket.IO

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just …
All data ( usernames, passwords, notifications, messages…) will be stored in MongoDB

## Why using Socket.IO

Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server.
Performant
In most cases, the connection will be established with WebSocket, providing a low-overhead communication channel between the server and the client.
Reliable
Rest assured! In case the WebSocket connection is not possible, it will fall back to HTTP long-polling. And if the connection is lost, the client will automatically try to reconnect.
Scalable
Scale to multiple servers and send events to all connected clients with ease.

## Authentication in Socket.IO

A lot of articles exist in the internet, showing how to create a chat application using Socket.IO with no authentication at all !!!, or using query strings.
Putting credentials (username and password ) in a query string is a bad security practice, urls are not treated as sensitive information , and all servers logs urls with visible credentials.
If we call Socket.IO in our application with query strings

```
const connectSocket = io(process.env.REACT_APP_SERVER, {
      query: {
        username: "user1",
        password: "password1"
      }
    });
```

And when we open Dev tools, as you can see, query params are included as plain text in the request urls
In our tutorial, we will use a more secure approach, we will send credentials as socket.emit() message
The a connection is established between and the server and the client

![img](https://miro.medium.com/max/4800/1*eU0o4wRMa0-zStKzjNt-3w.webp)