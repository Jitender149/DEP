import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Typography,
  Box,
  Grid,
  Pagination,
  FormControlLabel,
  Switch,
  TextField,
  Paper,
} from "@mui/material";
import VotingComponent from "./VotingComponent";
import CommentsSection from "./CommentsSection";
import UploadForm from "./UploadForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contributors, setContributors] = useState([]);
  const [filters, setFilters] = useState({
    instructor: "",
    semester: "",
    year: "",
    categories: {
      assignments: false,
      books: false,
      endterm: false,
      lectureslides: false,
      midterm: false,
      notes: false,
      programming: false,
      quizzes: false,
      tutorials: false,
      miscellaneous: false,
    },
  });

  const fetchUploads = async (page = 1) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://127.0.0.1:5000/uploads?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploads(response.data.uploads);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  };

  const fetchContributors = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://127.0.0.1:5000/top-contributors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContributors(response.data.contributors);
    } catch (error) {
      console.error("Error fetching contributors:", error);
    }
  };

  useEffect(() => {
    fetchUploads(currentPage);
    fetchContributors();
  }, [currentPage]);

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Typography variant="h4" className="dashboard-title">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            Refine Your Search
          </Typography>
          {Object.keys(filters.categories).map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Switch
                  checked={filters.categories[category]}
                  onChange={() =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      categories: {
                        ...prevFilters.categories,
                        [category]: !prevFilters.categories[category],
                      },
                    }))
                  }
                />
              }
              label={category.charAt(0).toUpperCase() + category.slice(1)}
            />
          ))}
          <TextField
            label="Instructor"
            fullWidth
            margin="normal"
            value={filters.instructor}
            onChange={(e) =>
              setFilters((prevFilters) => ({ ...prevFilters, instructor: e.target.value }))
            }
          />
          <TextField
            label="Semester"
            fullWidth
            margin="normal"
            value={filters.semester}
            onChange={(e) =>
              setFilters((prevFilters) => ({ ...prevFilters, semester: e.target.value }))
            }
          />
          <TextField
            label="Year"
            fullWidth
            margin="normal"
            value={filters.year}
            onChange={(e) =>
              setFilters((prevFilters) => ({ ...prevFilters, year: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={9}>
          <Paper className="dashboard-paper">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Author</TableCell>
                    <TableCell>Course Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell>{upload.author}</TableCell>
                      <TableCell>{upload.course_code}</TableCell>
                      <TableCell>{upload.description}</TableCell>
                      <TableCell>
                        {upload.tags.split(",").map((tag) => (
                          <Chip key={tag} label={`#${tag}`} className="tag-chip" />
                        ))}
                      </TableCell>
                      <TableCell>
                        <VotingComponent uploadId={upload.id} initialUpvotes={upload.upvotes} />
                        <CommentsSection uploadId={upload.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            className="upload-btn"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            {showUploadForm ? "Hide Upload Form" : "Upload File"}
          </Button>
          {showUploadForm && <UploadForm onUploadSuccess={() => fetchUploads(currentPage)} />}
          <Pagination count={totalPages} page={currentPage} onChange={(event, value) => setCurrentPage(value)} className="pagination" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
