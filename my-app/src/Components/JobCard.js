  
  // function JobCard({ job }) { 
  //   return (
  //     <div className="job-card">
  //       <div className="job-card-header">
  //         <img src={job.company_logo_url} alt={job.company_name} className="company-logo" />
  //         <div>
  //           <h3 className="job-title">{job.job_position || "Untitled Position"}</h3>
  //           <span className="company-name">{job.company_name || "Unknown Company"}</span>
  //         </div>
  //       </div>
  
  //       <div className="job-details">
  //         {job.job_location && (
  //           <div className="job-location">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="16"
  //               height="16"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //             >
  //               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
  //               <circle cx="12" cy="10" r="3"></circle>
  //             </svg>
  //             <span>{job.job_location}</span>
  //           </div>
  //         )}
  
  //         {job.job_posting_date && (
  //           <div className="job-date">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="16"
  //               height="16"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //             >
  //               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
  //               <line x1="16" y1="2" x2="16" y2="6"></line>
  //               <line x1="8" y1="2" x2="8" y2="6"></line>
  //               <line x1="3" y1="10" x2="21" y2="10"></line>
  //             </svg>
  //             <span>{job.job_posting_date}</span>
  //           </div>
  //         )}
  //       </div>
  
  //       <div className="job-card-footer">
  //         <a href={job.job_link || "#"} target="_blank" rel="noopener noreferrer" className="view-job-button">
  //           View Job
  //         </a>
  //       </div>
  //     </div>
  //   )
  // }
  
  // export default JobCard
  
  import { Box, Typography, Button, useTheme, Card, CardContent, CardActions, IconButton, Tooltip } from "@mui/material";
import { BookmarkBorder, Bookmark, LocationOn, Business } from "@mui/icons-material";

function JobCard({ job, onSave, isSaved }) {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        width: '100%',
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        '&:hover': {
          boxShadow: theme.shadows[4],
          transition: 'box-shadow 0.3s ease-in-out'
        }
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ 
            color: 'text.primary',
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          {job.job_position}
          <Tooltip title={isSaved ? "Remove from saved" : "Save job"}>
            <IconButton 
              onClick={() => onSave(job)}
              sx={{ 
                color: isSaved ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              {isSaved ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Tooltip>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
          <Business sx={{ mr: 1, fontSize: 20 }} />
          <Typography variant="body2">{job.company_name}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
          <LocationOn sx={{ mr: 1, fontSize: 20 }} />
          <Typography variant="body2">{job.job_location}</Typography>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {job.job_description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          color="primary"
          href={job.job_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Job
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;
  