import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const VotingComponent = ({ uploadId, initialUpvotes }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isVoting, setIsVoting] = useState(false); // Prevent spamming
  const [userVote, setUserVote] = useState(null); // Track user's vote: 'upvoted', 'downvoted', or null

  const handleVote = async (type) => {
    if (isVoting || userVote === type) return; // Prevent duplicate votes or spamming
    setIsVoting(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://127.0.0.1:5000/uploads/${uploadId}/vote`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the vote state
      if (type === "upvote") {
        setUpvotes(upvotes + 1);
        setUserVote("upvoted");
      } else if (type === "downvote") {
        setUpvotes(upvotes - 1);
        setUserVote("downvoted");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while voting. Please try again.");
    } finally {
      setIsVoting(false); // Re-enable buttons
    }
  };

  return (
    <>
      <Button
        onClick={() => handleVote("upvote")}
        color={userVote === "upvoted" ? "primary" : "default"} // Highlight upvote button
        disabled={isVoting} // Disable during voting
      >
        Upvote ({upvotes})
      </Button>
      <Button
        onClick={() => handleVote("downvote")}
        color={userVote === "downvoted" ? "secondary" : "default"} // Highlight downvote button
        disabled={isVoting} // Disable during voting
      >
        Downvote
      </Button>
    </>
  );
};

export default VotingComponent;
