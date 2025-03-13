import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:3500");

const ChatDashboard = ({ role }) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(""); // For input validation errors
  const [toastOpen, setToastOpen] = useState(false); // Success notification

  
  useEffect(() => {
    // Fetch existing messages from the backend
    fetch("http://localhost:3500/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));

    // Listen for new messages in real-time
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receive_message"); // Cleanup on unmount
    };
  }, []);

  const handleSendMessage = () => {
    // Input validation
    if (!recipient.trim()) {
      setError("Recipient cannot be empty.");
      return;
    }
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }
    if (message.length > 200) {
      setError("Message is too long. Max 200 characters allowed.");
      return;
    }

    // Create new message object
    const newMessage = {
      recipient,
      message,
      timestamp: new Date().toLocaleTimeString(),
      sender: role, // Role is either "Student" or "Admin Committee"
    };

    // Send message to the server via socket
    socket.emit("send_message", newMessage);

    // Update local messages list
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Reset input fields and error state
    setMessage("");
    setRecipient("");
    setError("");
    setToastOpen(true); // Trigger success notification
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: "auto", textAlign: "center" }}>
      {/* Message Input Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {role === "Student" ? "Student Dashboard" : "Admin Committee Dashboard"}
        </Typography>
        <TextField
          label="Recipient"
          variant="outlined"
          fullWidth
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          sx={{ mb: 2 }}
          inputProps={{ "aria-label": "Enter recipient's name" }}
        />
        <TextField
          label="Write a message..."
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mb: 2 }}
          inputProps={{ "aria-label": "Enter your message" }}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          aria-label="Send message"
          sx={{ float: "right" }}
        >
          <SendIcon />
        </IconButton>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>

      {/* Messages Display Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Message History</Typography>
        {messages.length > 0 ? (
          <List sx={{ maxHeight: 400, overflow: "auto", border: "1px solid #ddd" }}>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === role ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === role ? "#e3f2fd" : "#f1f1f1",
                  mb: 1,
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <ListItemText
                  primary={msg.message}
                  secondary={`${msg.sender} -> ${msg.recipient} at ${msg.timestamp}`}
                  sx={{
                    textAlign: msg.sender === role ? "right" : "left",
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No messages yet.
          </Typography>
        )}
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: "100%" }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatDashboard;
