// // export default MaterialSharing






// "use client"

// import { useState, useEffect } from "react"
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Tab,
//   Tabs,
//   TextField,
//   Typography,
//   Link,
//   CircularProgress,
//   IconButton,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   Badge,
// } from "@mui/material"
// import { 
//   CloudUpload, 
//   Search, 
//   Close, 
//   Delete, 
//   ThumbUp, 
//   ThumbDown, 
//   Comment as CommentIcon,
//   Send,
//   Person
// } from "@mui/icons-material"

// // TabPanel component for tab content
// function TabPanel(props) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   )
// }

// const MaterialSharing = () => {
//   // State for tabs
//   const [tabValue, setTabValue] = useState(0)

//   // State for upload form
//   const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
//   const [courseCode, setCourseCode] = useState("")
//   const [year, setYear] = useState("")
//   const [semester, setSemester] = useState("")
//   const [description, setDescription] = useState("")
//   const [link, setLink] = useState("")
//   const [selectedTags, setSelectedTags] = useState([])
//   const [file, setFile] = useState(null)
//   const [isUploading, setIsUploading] = useState(false)

//   // State for search form
//   const [searchDialogOpen, setSearchDialogOpen] = useState(false)
//   const [searchCourseCode, setSearchCourseCode] = useState("")
//   const [searchYear, setSearchYear] = useState("")
//   const [searchSemester, setSearchSemester] = useState("")
//   const [searchTags, setSearchTags] = useState([])

//   // State for results
//   const [materials, setMaterials] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [searchPerformed, setSearchPerformed] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
  
//   // State for comments
//   const [commentDialogOpen, setCommentDialogOpen] = useState(false)
//   const [currentMaterialId, setCurrentMaterialId] = useState(null)
//   const [commentText, setCommentText] = useState("")
//   const [comments, setComments] = useState([])
//   const [isLoadingComments, setIsLoadingComments] = useState(false)
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  
//   // State for voting
//   const [isVoting, setIsVoting] = useState(false)

//   // Available tags
//   const availableTags = [
//     "Lecture Notes",
//     "Assignment",
//     "Solution",
//     "Exam",
//     "Quiz",
//     "Project",
//     "Book",
//     "Article",
//     "Tutorial",
//     "Reference",
//   ]

//   // Years for dropdown
//   const years = ["2020", "2021", "2022", "2023", "2024"]

//   // Semesters for dropdown
//   const semesters = ["Spring", "Summer", "Fall", "Winter"]

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue)
//   }

//   // Handle upload dialog
//   const handleOpenUploadDialog = () => {
//     setUploadDialogOpen(true)
//   }

//   const handleCloseUploadDialog = () => {
//     setUploadDialogOpen(false)
//     resetUploadForm()
//   }

//   // Handle search dialog
//   const handleOpenSearchDialog = () => {
//     setSearchDialogOpen(true)
//   }

//   const handleCloseSearchDialog = () => {
//     setSearchDialogOpen(false)
//   }
  
//   // Handle comment dialog
//   const handleOpenCommentDialog = async (materialId) => {
//     setCurrentMaterialId(materialId)
//     setCommentDialogOpen(true)
//     await fetchComments(materialId)
//   }
  
//   const handleCloseCommentDialog = () => {
//     setCommentDialogOpen(false)
//     setCommentText("")
//     setCurrentMaterialId(null)
//   }

//   // Reset upload form
//   const resetUploadForm = () => {
//     setCourseCode("")
//     setYear("")
//     setSemester("")
//     setDescription("")
//     setLink("")
//     setSelectedTags([])
//     setFile(null)
//   }

//   // Handle tag selection for upload
//   const handleTagToggle = (tag) => {
//     if (selectedTags.includes(tag)) {
//       setSelectedTags(selectedTags.filter((t) => t !== tag))
//     } else {
//       setSelectedTags([...selectedTags, tag])
//     }
//   }

//   // Handle tag selection for search
//   const handleSearchTagToggle = (tag) => {
//     if (searchTags.includes(tag)) {
//       setSearchTags(searchTags.filter((t) => t !== tag))
//     } else {
//       setSearchTags([...searchTags, tag])
//     }
//   }

//   // Handle file selection
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0])
//   }

//   // Handle upload submission
//   const handleUploadSubmit = async () => {
//     if (!courseCode || (!link && !file) || selectedTags.length === 0) {
//       alert("Please fill in all required fields (Course Code, Link/File, and at least one Tag)")
//       return
//     }

//     setIsUploading(true)

//     try {
//       const token = localStorage.getItem("token")

//       const formData = new FormData()
//       formData.append("course_code", courseCode)
//       formData.append("year", year)
//       formData.append("semester", semester)
//       formData.append("description", description)

//       // Add each tag to the formData
//       selectedTags.forEach((tag) => {
//         formData.append("tags", tag)
//       })

//       // If file is provided, add it to formData
//       if (file) {
//         formData.append("file", file)
//       } else if (link) {
//         // If only link is provided
//         formData.append("link", link)
//       }

//       const response = await fetch("http://localhost:5000/uploads", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       })

//       const data = await response.json()

//       if (response.ok) {
//         alert("Material uploaded successfully!")
//         handleCloseUploadDialog()
//         fetchRecentMaterials() // Refresh the materials list
//       } else {
//         alert(`Upload failed: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("Error uploading material:", error)
//       alert("An error occurred while uploading. Please try again.")
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   // Handle delete material
//   const handleDeleteMaterial = async (materialId) => {
//     if (!confirm("Are you sure you want to delete this material?")) {
//       return
//     }

//     setIsDeleting(true)

//     try {
//       const token = localStorage.getItem("token")

//       const response = await fetch(`/http://localhost:5000/uploads/${materialId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       const data = await response.json()

//       if (response.ok) {
//         alert("Material deleted successfully!")
//         // Remove the deleted material from the state
//         setMaterials(materials.filter(material => material.id !== materialId))
//       } else {
//         alert(`Delete failed: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("Error deleting material:", error)
//       alert("An error occurred while deleting. Please try again.")
//     } finally {
//       setIsDeleting(false)
//     }
//   }
  
//   // Handle voting (upvote/downvote)
//   const handleVote = async (materialId, voteType) => {
//     setIsVoting(true)
    
//     try {
//       const token = localStorage.getItem("token")
      
//       const response = await fetch(`/http://localhost:5000/uploads/${materialId}/vote`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ type: voteType }),
//       })
      
//       const data = await response.json()
      
//       if (response.ok) {
//         // Update the material in the state with the new vote count
//         setMaterials(materials.map(material => {
//           if (material.id === materialId) {
//             if (voteType === "upvote") {
//               return { ...material, upvotes: material.upvotes + 1 }
//             } else if (voteType === "downvote") {
//               return { ...material, downvotes: material.downvotes + 1 }
//             }
//           }
//           return material
//         }))
//       } else {
//         alert(`Vote failed: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("Error voting:", error)
//       alert("An error occurred while voting. Please try again.")
//     } finally {
//       setIsVoting(false)
//     }
//   }
  
//   // Fetch comments for a material
//   const fetchComments = async (materialId) => {
//     setIsLoadingComments(true)
    
//     try {
//       const token = localStorage.getItem("token")
      
//       // This endpoint doesn't exist in your backend yet, but you should add it
//       const response = await fetch(`/http://localhost:5000/uploads/${materialId}/comments`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
      
//       if (response.ok) {
//         const data = await response.json()
//         setComments(data.comments || [])
//       } else {
//         // If the endpoint doesn't exist yet, just show an empty list
//         setComments([])
//       }
//     } catch (error) {
//       console.error("Error fetching comments:", error)
//       // If the endpoint doesn't exist yet, just show an empty list
//       setComments([])
//     } finally {
//       setIsLoadingComments(false)
//     }
//   }
  
//   // Submit a comment
//   const handleSubmitComment = async () => {
//     if (!commentText.trim()) {
//       return
//     }
    
//     setIsSubmittingComment(true)
    
//     try {
//       const token = localStorage.getItem("token")
      
//       const response = await fetch(`/http://localhost:5000/uploads/${currentMaterialId}/comments`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: commentText }),
//       })
      
//       const data = await response.json()
      
//       if (response.ok) {
//         setCommentText("")
//         // Refresh comments
//         await fetchComments(currentMaterialId)
//       } else {
//         alert(`Comment failed: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("Error submitting comment:", error)
//       alert("An error occurred while submitting your comment. Please try again.")
//     } finally {
//       setIsSubmittingComment(false)
//     }
//   }

//   // Handle search submission
//   const handleSearchSubmit = async () => {
//     if (!searchCourseCode && !searchYear && !searchSemester && searchTags.length === 0) {
//       alert("Please specify at least one search criteria")
//       return
//     }

//     setIsLoading(true)

//     try {
//       const token = localStorage.getItem("token")

//       // Build query parameters
//       const params = new URLSearchParams()
//       if (searchCourseCode) params.append("course_code", searchCourseCode)
//       if (searchYear) params.append("year", searchYear)
//       if (searchSemester) params.append("semester", searchSemester)
//       searchTags.forEach((tag) => params.append("tags", tag))

//       const response = await fetch(`/search?${params.toString()}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setMaterials(data.materials)
//         setSearchPerformed(true)
//         handleCloseSearchDialog()
//       } else {
//         alert(`Search failed: ${data.message}`)
//       }
//     } catch (error) {
//       console.error("Error searching materials:", error)
//       alert("An error occurred while searching. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Helper function to optimize Cloudinary images
//   const getOptimizedImageUrl = (url) => {
//     // Check if it's a Cloudinary URL
//     if (url && url.includes('cloudinary.com')) {
//       // Insert transformation parameters before the upload folder
//       // This example adds quality auto and format auto for optimal delivery
//       return url.replace('/upload/', '/upload/q_auto,f_auto/')
//     }
//     return url
//   }

//   // Fetch recent materials on component mount
//   const fetchRecentMaterials = async () => {
//     setIsLoading(true)

//     try {
//       const token = localStorage.getItem("token")

//       const response = await fetch("/recent-uploads", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setMaterials(data.materials)
//       } else {
//         console.error("Failed to fetch recent materials:", data.message)
//       }
//     } catch (error) {
//       console.error("Error fetching recent materials:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Fetch recent materials on component mount
//   useEffect(() => {
//     fetchRecentMaterials()
//   }, [])

//   // Render material card
//   const renderMaterialCard = (material) => {
//     const currentUser = JSON.parse(atob(localStorage.getItem("token").split('.')[1])).sub.username
//     const isOwner = material.author === currentUser

//     return (
//       <Grid item xs={12} sm={6} md={4} key={material.id}>
//         <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//           <CardContent sx={{ flexGrow: 1 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//               <Typography variant="h6" component="div" gutterBottom>
//                 {material.course_code}
//               </Typography>
//               {isOwner && (
//                 <IconButton 
//                   size="small" 
//                   color="error" 
//                   onClick={() => handleDeleteMaterial(material.id)}
//                   disabled={isDeleting}
//                 >
//                   <Delete />
//                 </IconButton>
//               )}
//             </Box>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               {material.year} {material.semester}
//             </Typography>
//             <Typography variant="body2" paragraph>
//               {material.description}
//             </Typography>
//             <Box sx={{ mb: 1 }}>
//               {material.tags.split(",").map((tag, index) => (
//                 <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
//               ))}
//             </Box>
//             <Typography variant="body2">Uploaded by: {material.author}</Typography>
//             {material.file_url && (
//               <Link href={getOptimizedImageUrl(material.file_url)} target="_blank" rel="noopener">
//                 View Material
//               </Link>
//             )}
            
//             {/* Voting and Comments */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pt: 2, borderTop: "1px solid #eee" }}>
//               <Box>
//                 <IconButton 
//                   size="small" 
//                   color="primary" 
//                   onClick={() => handleVote(material.id, "upvote")}
//                   disabled={isVoting}
//                 >
//                   <Badge badgeContent={material.upvotes} color="primary">
//                     <ThumbUp fontSize="small" />
//                   </Badge>
//                 </IconButton>
//                 <IconButton 
//                   size="small" 
//                   color="error" 
//                   onClick={() => handleVote(material.id, "downvote")}
//                   disabled={isVoting}
//                   sx={{ ml: 1 }}
//                 >
//                   <Badge badgeContent={material.downvotes} color="error">
//                     <ThumbDown fontSize="small" />
//                   </Badge>
//                 </IconButton>
//               </Box>
//               <IconButton 
//                 size="small" 
//                 color="primary" 
//                 onClick={() => handleOpenCommentDialog(material.id)}
//               >
//                 <CommentIcon fontSize="small" />
//               </IconButton>
//             </Box>
//           </CardContent>
//         </Card>
//       </Grid>
//     )
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           Material Sharing
//         </Typography>

//         <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
//           <Tabs value={tabValue} onChange={handleTabChange} aria-label="material sharing tabs">
//             <Tab label="Upload" />
//             <Tab label="Search" />
//           </Tabs>
//         </Box>

//         <TabPanel value={tabValue} index={0}>
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleOpenUploadDialog}
//               sx={{ minWidth: 200 }}
//             >
//               Upload Material
//             </Button>
//           </Box>

//           <Typography variant="h6" gutterBottom>
//             Recent Uploads
//           </Typography>

//           {isLoading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Grid container spacing={3}>
//               {materials.length > 0 ? (
//                 materials.map(renderMaterialCard)
//               ) : (
//                 <Grid item xs={12}>
//                   <Typography variant="body1" align="center">
//                     No materials found. Be the first to upload!
//                   </Typography>
//                 </Grid>
//               )}
//             </Grid>
//           )}
//         </TabPanel>

//         <TabPanel value={tabValue} index={1}>
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//             <Button variant="contained" startIcon={<Search />} onClick={handleOpenSearchDialog} sx={{ minWidth: 200 }}>
//               Search Materials
//             </Button>
//           </Box>

//           {searchPerformed && (
//             <>
//               <Typography variant="h6" gutterBottom>
//                 Search Results
//               </Typography>

//               {isLoading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 <Grid container spacing={3}>
//                   {materials.length > 0 ? (
//                     materials.map(renderMaterialCard)
//                   ) : (
//                     <Grid item xs={12}>
//                       <Typography variant="body1" align="center">
//                         No materials found matching your search criteria.
//                       </Typography>
//                     </Grid>
//                   )}
//                 </Grid>
//               )}
//             </>
//           )}
//         </TabPanel>
//       </Paper>

//       {/* Upload Dialog */}
//       <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Upload Material
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseUploadDialog}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//             }}
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Course Code"
//                 fullWidth
//                 required
//                 value={courseCode}
//                 onChange={(e) => setCourseCode(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <FormControl fullWidth>
//                 <InputLabel>Year</InputLabel>
//                 <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)}>
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {years.map((year) => (
//                     <MenuItem key={year} value={year}>
//                       {year}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <FormControl fullWidth>
//                 <InputLabel>Semester</InputLabel>
//                 <Select value={semester} label="Semester" onChange={(e) => setSemester(e.target.value)}>
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {semesters.map((sem) => (
//                     <MenuItem key={sem} value={sem}>
//                       {sem}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Description"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Link (Optional if uploading a file)"
//                 fullWidth
//                 value={link}
//                 onChange={(e) => setLink(e.target.value)}
//                 helperText="Provide a URL to the material if not uploading a file"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant="outlined" component="label" sx={{ mb: 2 }}>
//                 Select File (Optional if providing a link)
//                 <input type="file" hidden onChange={handleFileChange} />
//               </Button>
//               {file && <Typography variant="body2">Selected file: {file.name}</Typography>}
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Tags (Select at least one)
//               </Typography>
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                 {availableTags.map((tag) => (
//                   <Chip
//                     key={tag}
//                     label={tag}
//                     onClick={() => handleTagToggle(tag)}
//                     color={selectedTags.includes(tag) ? "primary" : "default"}
//                     variant={selectedTags.includes(tag) ? "filled" : "outlined"}
//                   />
//                 ))}
//               </Box>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseUploadDialog}>Cancel</Button>
//           <Button onClick={handleUploadSubmit} variant="contained" disabled={isUploading}>
//             {isUploading ? <CircularProgress size={24} /> : "Upload"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Search Dialog */}
//       <Dialog open={searchDialogOpen} onClose={handleCloseSearchDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Search Materials
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseSearchDialog}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//             }}
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Course Code"
//                 fullWidth
//                 value={searchCourseCode}
//                 onChange={(e) => setSearchCourseCode(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <FormControl fullWidth>
//                 <InputLabel>Year</InputLabel>
//                 <Select value={searchYear} label="Year" onChange={(e) => setSearchYear(e.target.value)}>
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {years.map((year) => (
//                     <MenuItem key={year} value={year}>
//                       {year}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <FormControl fullWidth>
//                 <InputLabel>Semester</InputLabel>
//                 <Select value={searchSemester} label="Semester" onChange={(e) => setSearchSemester(e.target.value)}>
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {semesters.map((sem) => (
//                     <MenuItem key={sem} value={sem}>
//                       {sem}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Tags
//               </Typography>
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                 {availableTags.map((tag) => (
//                   <Chip
//                     key={tag}
//                     label={tag}
//                     onClick={() => handleSearchTagToggle(tag)}
//                     color={searchTags.includes(tag) ? "primary" : "default"}
//                     variant={searchTags.includes(tag) ? "filled" : "outlined"}
//                   />
//                 ))}
//               </Box>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseSearchDialog}>Cancel</Button>
//           <Button onClick={handleSearchSubmit} variant="contained" disabled={isLoading}>
//             {isLoading ? <CircularProgress size={24} /> : "Search"}
//           </Button>
//         </DialogActions>
//       </Dialog>
      
//       {/* Comments Dialog */}
//       <Dialog open={commentDialogOpen} onClose={handleCloseCommentDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           Comments
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseCommentDialog}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//             }}
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           {isLoadingComments ? (
//             <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <>
//               <List sx={{ mb: 2 }}>
//                 {comments.length > 0 ? (
//                   comments.map((comment) => (
//                     <ListItem key={comment.id} alignItems="flex-start">
//                       <ListItemAvatar>
//                         <Avatar>
//                           <Person />
//                         </Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={comment.author}
//                         secondary={comment.text}
//                       />
//                     </ListItem>
//                   ))
//                 ) : (
//                   <Typography variant="body2" align="center" sx={{ py: 2 }}>
//                     No comments yet. Be the first to comment!
//                   </Typography>
//                 )}
//               </List>
//               <Divider sx={{ mb: 2 }} />
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <TextField
//                   label="Add a comment"
//                   fullWidth
//                   multiline
//                   rows={2}
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   disabled={isSubmittingComment}
//                 />
//                 <IconButton 
//                   color="primary" 
//                   onClick={handleSubmitComment}
//                   disabled={!commentText.trim() || isSubmittingComment}
//                   sx={{ ml: 1 }}
//                 >
//                   {isSubmittingComment ? <CircularProgress size={24} /> : <Send />}
//                 </IconButton>
//               </Box>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Container>
//   )
// }

// export default MaterialSharing

"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Link,
  CircularProgress,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
} from "@mui/material"
import {
  CloudUpload,
  Search,
  Close,
  Delete,
  ThumbUp,
  ThumbDown,
  Comment as CommentIcon,
  Send,
  Person,
  Download,
} from "@mui/icons-material"

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const MaterialSharing = () => {
  // State for tabs
  const [tabValue, setTabValue] = useState(0)

  // State for upload form
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [courseCode, setCourseCode] = useState("")
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  // State for search form
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [searchCourseCode, setSearchCourseCode] = useState("")
  const [searchYear, setSearchYear] = useState("")
  const [searchSemester, setSearchSemester] = useState("")
  const [searchTags, setSearchTags] = useState([])

  // State for results
  const [materials, setMaterials] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // State for comments
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [currentMaterialId, setCurrentMaterialId] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  // State for voting
  const [isVoting, setIsVoting] = useState(false)

  // Available tags
  const availableTags = [
    "Lecture Notes",
    "Assignment",
    "Solution",
    "Exam",
    "Quiz",
    "Project",
    "Book",
    "Article",
    "Tutorial",
    "Reference",
  ]

  // Years for dropdown
  const years = ["2020", "2021", "2022", "2023", "2024"]

  // Semesters for dropdown
  const semesters = ["Spring", "Summer", "Fall", "Winter"]

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Handle upload dialog
  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true)
  }

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false)
    resetUploadForm()
  }

  // Handle search dialog
  const handleOpenSearchDialog = () => {
    setSearchDialogOpen(true)
  }

  const handleCloseSearchDialog = () => {
    setSearchDialogOpen(false)
  }

  // Handle comment dialog
  const handleOpenCommentDialog = async (materialId) => {
    setCurrentMaterialId(materialId)
    setCommentDialogOpen(true)
    await fetchComments(materialId)
  }

  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false)
    setCommentText("")
    setCurrentMaterialId(null)
  }

  // Reset upload form
  const resetUploadForm = () => {
    setCourseCode("")
    setYear("")
    setSemester("")
    setDescription("")
    setLink("")
    setSelectedTags([])
    setFile(null)
  }

  // Handle tag selection for upload
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Handle tag selection for search
  const handleSearchTagToggle = (tag) => {
    if (searchTags.includes(tag)) {
      setSearchTags(searchTags.filter((t) => t !== tag))
    } else {
      setSearchTags([...searchTags, tag])
    }
  }

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  // Handle upload submission
  const handleUploadSubmit = async () => {
    if (!courseCode || (!link && !file) || selectedTags.length === 0) {
      alert("Please fill in all required fields (Course Code, Link/File, and at least one Tag)")
      return
    }

    setIsUploading(true)

    try {
      const token = localStorage.getItem("token")

      const formData = new FormData()
      formData.append("course_code", courseCode)
      formData.append("year", year)
      formData.append("semester", semester)
      formData.append("description", description)

      // Add each tag to the formData
      selectedTags.forEach((tag) => {
        formData.append("tags", tag)
      })

      // If file is provided, add it to formData
      if (file) {
        formData.append("file", file)
      } else if (link) {
        // If only link is provided
        formData.append("link", link)
      }

      const response = await fetch("http://localhost:5000/uploads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        alert("Material uploaded successfully!")
        handleCloseUploadDialog()
        fetchRecentMaterials() // Refresh the materials list
      } else {
        alert(`Upload failed: ${data.message}`)
      }
    } catch (error) {
      console.error("Error uploading material:", error)
      alert("An error occurred while uploading. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  // Handle delete material
  const handleDeleteMaterial = async (materialId) => {
    if (!confirm("Are you sure you want to delete this material?")) {
      return
    }

    setIsDeleting(true)

    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:5000/uploads/${materialId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        alert("Material deleted successfully!")
        // Remove the deleted material from the state
        setMaterials(materials.filter((material) => material.id !== materialId))
      } else {
        alert(`Delete failed: ${data.message}`)
      }
    } catch (error) {
      console.error("Error deleting material:", error)
      alert("An error occurred while deleting. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle voting (upvote/downvote)
  const handleVote = async (materialId, voteType) => {
    setIsVoting(true)

    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:5000/uploads/${materialId}/vote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: voteType }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update the material in the state with the new vote count
        setMaterials(
          materials.map((material) => {
            if (material.id === materialId) {
              if (voteType === "upvote") {
                return { ...material, upvotes: material.upvotes + 1 }
              } else if (voteType === "downvote") {
                return { ...material, downvotes: material.downvotes + 1 }
              }
            }
            return material
          }),
        )
      } else {
        alert(`Vote failed: ${data.message}`)
      }
    } catch (error) {
      console.error("Error voting:", error)
      alert("An error occurred while voting. Please try again.")
    } finally {
      setIsVoting(false)
    }
  }

  // Fetch comments for a material
  const fetchComments = async (materialId) => {
    setIsLoadingComments(true)

    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:5000/uploads/${materialId}/comments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      } else {
        // If the endpoint doesn't exist yet, just show an empty list
        setComments([])
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
      // If the endpoint doesn't exist yet, just show an empty list
      setComments([])
    } finally {
      setIsLoadingComments(false)
    }
  }

  // Submit a comment
  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      return
    }

    setIsSubmittingComment(true)

    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:5000/uploads/${currentMaterialId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: commentText }),
      })

      const data = await response.json()

      if (response.ok) {
        setCommentText("")
        // Refresh comments
        await fetchComments(currentMaterialId)
      } else {
        alert(`Comment failed: ${data.message}`)
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
      alert("An error occurred while submitting your comment. Please try again.")
    } finally {
      setIsSubmittingComment(false)
    }
  }

  // Handle search submission
  const handleSearchSubmit = async () => {
    if (!searchCourseCode && !searchYear && !searchSemester && searchTags.length === 0) {
      alert("Please specify at least one search criteria")
      return
    }

    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")

      // Build query parameters
      const params = new URLSearchParams()
      if (searchCourseCode) params.append("course_code", searchCourseCode)
      if (searchYear) params.append("year", searchYear)
      if (searchSemester) params.append("semester", searchSemester)
      searchTags.forEach((tag) => params.append("tags", tag))

      const response = await fetch(`http://localhost:5000/search?${params.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setMaterials(data.materials)
        setSearchPerformed(true)
        handleCloseSearchDialog()
      } else {
        alert(`Search failed: ${data.message}`)
      }
    } catch (error) {
      console.error("Error searching materials:", error)
      alert("An error occurred while searching. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to optimize Cloudinary images
  const getOptimizedImageUrl = (url) => {
    // Check if it's a Cloudinary URL
    if (url && url.includes("cloudinary.com")) {
      // Insert transformation parameters before the upload folder
      // This example adds quality auto and format auto for optimal delivery
      return url.replace("/upload/", "/upload/q_auto,f_auto/")
    }
    return url
  }

  // Fetch recent materials on component mount
  const fetchRecentMaterials = async () => {
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:5000/recent-uploads", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setMaterials(data.materials)
      } else {
        console.error("Failed to fetch recent materials:", data.message)
      }
    } catch (error) {
      console.error("Error fetching recent materials:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch recent materials on component mount
  useEffect(() => {
    fetchRecentMaterials()
  }, [])

  // Render material card
  const renderMaterialCard = (material) => {
    // Get current user from JWT token
    const token = localStorage.getItem("token")
    let currentUser = ""

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        currentUser = payload.sub.username
      } catch (e) {
        console.error("Error parsing token:", e)
      }
    }

    const isOwner = material.author === currentUser

    return (
      <Grid item xs={12} sm={6} md={4} key={material.id}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Typography variant="h6" component="div" gutterBottom>
                {material.course_code}
              </Typography>
              {isOwner && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteMaterial(material.id)}
                  disabled={isDeleting}
                >
                  <Delete />
                </IconButton>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {material.year} {material.semester}
            </Typography>
            <Typography variant="body2" paragraph>
              {material.description}
            </Typography>
            <Box sx={{ mb: 1 }}>
              {material.tags &&
                material.tags
                  .split(",")
                  .map((tag, index) => <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />)}
            </Box>
            <Typography variant="body2">Uploaded by: {material.author || "Anonymous"}</Typography>

            {/* File Download Link */}
            {material.file_url && (
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                <IconButton
                  size="small"
                  color="primary"
                  component="a"
                  href={getOptimizedImageUrl(material.file_url)}
                  target="_blank"
                  rel="noopener"
                >
                  <Download fontSize="small" />
                </IconButton>
                <Link href={getOptimizedImageUrl(material.file_url)} target="_blank" rel="noopener" sx={{ ml: 1 }}>
                  Download Material
                </Link>
              </Box>
            )}

            {/* Voting and Comments */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pt: 2, borderTop: "1px solid #eee" }}>
              <Box>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleVote(material.id, "upvote")}
                  disabled={isVoting}
                >
                  <Badge badgeContent={material.upvotes || 0} color="primary">
                    <ThumbUp fontSize="small" />
                  </Badge>
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleVote(material.id, "downvote")}
                  disabled={isVoting}
                  sx={{ ml: 1 }}
                >
                  <Badge badgeContent={material.downvotes || 0} color="error">
                    <ThumbDown fontSize="small" />
                  </Badge>
                </IconButton>
              </Box>
              <IconButton size="small" color="primary" onClick={() => handleOpenCommentDialog(material.id)}>
                <CommentIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Material Sharing
        </Typography>

        {/* Action Buttons - Always visible */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
          <Button variant="contained" startIcon={<CloudUpload />} onClick={handleOpenUploadDialog}>
            Upload Material
          </Button>
          <Button variant="outlined" startIcon={<Search />} onClick={handleOpenSearchDialog}>
            Search Materials
          </Button>
        </Box>

        {/* Materials Display */}
        <Typography variant="h6" gutterBottom>
          {searchPerformed ? "Search Results" : "Available Materials"}
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {materials && materials.length > 0 ? (
              materials.map(renderMaterialCard)
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  No materials found. Be the first to upload!
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Paper>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Upload Material
          <IconButton
            aria-label="close"
            onClick={handleCloseUploadDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Course Code"
                fullWidth
                required
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select value={semester} label="Semester" onChange={(e) => setSemester(e.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {semesters.map((sem) => (
                    <MenuItem key={sem} value={sem}>
                      {sem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Link (Optional if uploading a file)"
                fullWidth
                value={link}
                onChange={(e) => setLink(e.target.value)}
                helperText="Provide a URL to the material if not uploading a file"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                Select File (Optional if providing a link)
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {file && <Typography variant="body2">Selected file: {file.name}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Tags (Select at least one)
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {availableTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => handleTagToggle(tag)}
                    color={selectedTags.includes(tag) ? "primary" : "default"}
                    variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog}>Cancel</Button>
          <Button onClick={handleUploadSubmit} variant="contained" disabled={isUploading}>
            {isUploading ? <CircularProgress size={24} /> : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search Dialog */}
      <Dialog open={searchDialogOpen} onClose={handleCloseSearchDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Search Materials
          <IconButton
            aria-label="close"
            onClick={handleCloseSearchDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Course Code"
                fullWidth
                value={searchCourseCode}
                onChange={(e) => setSearchCourseCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select value={searchYear} label="Year" onChange={(e) => setSearchYear(e.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select value={searchSemester} label="Semester" onChange={(e) => setSearchSemester(e.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {semesters.map((sem) => (
                    <MenuItem key={sem} value={sem}>
                      {sem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {availableTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => handleSearchTagToggle(tag)}
                    color={searchTags.includes(tag) ? "primary" : "default"}
                    variant={searchTags.includes(tag) ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSearchDialog}>Cancel</Button>
          <Button onClick={handleSearchSubmit} variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comments Dialog */}
      <Dialog open={commentDialogOpen} onClose={handleCloseCommentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Comments
          <IconButton
            aria-label="close"
            onClick={handleCloseCommentDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {isLoadingComments ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <List sx={{ mb: 2 }}>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <ListItem key={comment.id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={comment.author} secondary={comment.text} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" align="center" sx={{ py: 2 }}>
                    No comments yet. Be the first to comment!
                  </Typography>
                )}
              </List>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Add a comment"
                  fullWidth
                  multiline
                  rows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={isSubmittingComment}
                />
                <IconButton
                  color="primary"
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim() || isSubmittingComment}
                  sx={{ ml: 1 }}
                >
                  {isSubmittingComment ? <CircularProgress size={24} /> : <Send />}
                </IconButton>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default MaterialSharing

