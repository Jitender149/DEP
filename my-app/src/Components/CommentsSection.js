import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

const CommentsSection = ({ uploadId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false); // Loading indicator

  // Fetch existing comments for this upload
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:5000/uploads/${uploadId}/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(response.data.comments); // Assuming backend returns an array of comments
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [uploadId]);

  // Add a new comment
  const addComment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://127.0.0.1:5000/uploads/${uploadId}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data.comment]); // Assuming backend returns the added comment
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    }
  };

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Comments</Typography>

      {/* Render Comments */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        comments.map((comment) => (
          <Box key={comment.id} sx={{ mb: 1 }}>
            <Typography>{comment.author}: {comment.text}</Typography>
          </Box>
        ))
      )}

      {/* Add Comment */}
      <TextField
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addComment}>
        Submit
      </Button>
    </Box>
  );
};

export default CommentsSection;
