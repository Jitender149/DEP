"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import {
  Search as SearchIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  FileUpload as FileUploadIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"
import PageHeader from "./PageHeader"

// Mock data for demonstration
const MOCK_PLACEMENTS = [
  {
    id: 1,
    company: "Google",
    type: "Internship",
    mode: "On Campus",
    year: "2023",
    role: "Software Engineer Intern",
    referral: "No",
    people: [
      { name: "John Doe", resume: "john_resume.pdf" },
      { name: "Jane Smith", resume: "jane_resume.pdf" },
    ],
  },
  {
    id: 2,
    company: "Microsoft",
    type: "Placement",
    mode: "On Campus",
    year: "2023",
    role: "Software Developer",
    referral: "No",
    people: [{ name: "Alex Johnson", resume: "alex_resume.pdf" }],
  },
  {
    id: 3,
    company: "Amazon",
    type: "Internship",
    mode: "Off Campus",
    year: "2022",
    role: "Frontend Developer Intern",
    referral: "Yes",
    people: [
      { name: "Sarah Williams", resume: "sarah_resume.pdf" },
      { name: "Michael Brown", resume: "michael_resume.pdf" },
    ],
  },
]

const SeniorsData = () => {
  const navigate = useNavigate()
  const [placements, setPlacements] = useState(MOCK_PLACEMENTS)
  const [openDialog, setOpenDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterYear, setFilterYear] = useState("")
  const [filterType, setFilterType] = useState("")
  const [formData, setFormData] = useState({
    company: "",
    type: "Internship",
    mode: "On Campus",
    year: new Date().getFullYear().toString(),
    role: "",
    referral: "No",
    people: [{ name: "", resume: null }],
  })

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle person name change
  const handlePersonChange = (index, e) => {
    const updatedPeople = [...formData.people]
    updatedPeople[index].name = e.target.value
    setFormData({
      ...formData,
      people: updatedPeople,
    })
  }

  // Handle resume file upload
  const handleResumeUpload = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const updatedPeople = [...formData.people]
      updatedPeople[index].resume = e.target.files[0]
      setFormData({
        ...formData,
        people: updatedPeople,
      })
    }
  }

  // Add another person field
  const addPersonField = () => {
    setFormData({
      ...formData,
      people: [...formData.people, { name: "", resume: null }],
    })
  }

  // Remove person field
  const removePersonField = (index) => {
    const updatedPeople = [...formData.people]
    updatedPeople.splice(index, 1)
    setFormData({
      ...formData,
      people: updatedPeople,
    })
  }

  // Handle form submission
  const handleSubmit = () => {
    // In a real app, you would send this data to your Flask backend
    // For now, we'll just add it to our local state
    const newPlacement = {
      id: placements.length + 1,
      ...formData,
      people: formData.people.map((person) => ({
        name: person.name,
        resume: person.resume ? person.resume.name : null,
      })),
    }

    setPlacements([...placements, newPlacement])
    setOpenDialog(false)

    // Reset form
    setFormData({
      company: "",
      type: "Internship",
      mode: "On Campus",
      year: new Date().getFullYear().toString(),
      role: "",
      referral: "No",
      people: [{ name: "", resume: null }],
    })
  }

  // Filter placements based on search and filters
  const filteredPlacements = placements.filter((placement) => {
    const matchesSearch =
      placement.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = filterYear ? placement.year === filterYear : true
    const matchesType = filterType ? placement.type === filterType : true

    return matchesSearch && matchesYear && matchesType
  })

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <PageHeader title="Seniors Internship & Placement Data" />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton onClick={() => navigate("/internships-placements")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Seniors Internship & Placement Data
          </Typography>
        </Box>

        {/* Search and Filter Section */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search by Company or Role"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Filter by Year</InputLabel>
                <Select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} label="Filter by Year">
                  <MenuItem value="">All Years</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Filter by Type</InputLabel>
                <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} label="Filter by Type">
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Placement">Placement</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
                Add New
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Section */}
        <Grid container spacing={3}>
          {filteredPlacements.length > 0 ? (
            filteredPlacements.map((placement) => (
              <Grid item xs={12} key={placement.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {placement.company}
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                          <Chip
                            label={placement.type}
                            color={placement.type === "Internship" ? "primary" : "secondary"}
                            size="small"
                          />
                          <Chip label={placement.mode} size="small" />
                          <Chip label={`Year: ${placement.year}`} size="small" />
                          {placement.referral === "Yes" && <Chip label="Referral" color="success" size="small" />}
                        </Box>
                        <Typography variant="body1" gutterBottom>
                          <strong>Role:</strong> {placement.role}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>People:</strong>
                        </Typography>
                        <List dense>
                          {placement.people.map((person, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <PersonIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={person.name}
                                secondary={
                                  person.resume && (
                                    <Button
                                      size="small"
                                      startIcon={<FileUploadIcon />}
                                      onClick={() => {
                                        // In a real app, this would download the resume
                                        alert(`Downloading ${person.resume}`)
                                      }}
                                    >
                                      Resume
                                    </Button>
                                  )
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6">No results found</Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search or filters, or add new data.
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Add New Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add New Internship/Placement Data</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Role/Position"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select name="type" value={formData.type} onChange={handleInputChange} label="Type">
                    <MenuItem value="Internship">Internship</MenuItem>
                    <MenuItem value="Placement">Placement</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Mode</InputLabel>
                  <Select name="mode" value={formData.mode} onChange={handleInputChange} label="Mode">
                    <MenuItem value="On Campus">On Campus</MenuItem>
                    <MenuItem value="Off Campus">Off Campus</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Referral</InputLabel>
                  <Select name="referral" value={formData.referral} onChange={handleInputChange} label="Referral">
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              People Information
            </Typography>

            {formData.people.map((person, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={5}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={person.name}
                      onChange={(e) => handlePersonChange(index, e)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Button variant="outlined" component="label" startIcon={<FileUploadIcon />} fullWidth>
                      {person.resume ? person.resume.name : "Upload Resume (PDF)"}
                      <input type="file" accept=".pdf" hidden onChange={(e) => handleResumeUpload(index, e)} />
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    {formData.people.length > 1 && (
                      <IconButton color="error" onClick={() => removePersonField(index)} aria-label="remove person">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Button variant="outlined" startIcon={<AddIcon />} onClick={addPersonField} sx={{ mt: 1 }}>
              Add Another Person
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!formData.company || !formData.role || formData.people.some((p) => !p.name)}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

export default SeniorsData

