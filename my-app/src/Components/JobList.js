import JobCard from "./JobCard"

function JobList({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="no-results">
        <p>No jobs found. Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="job-list">
      <h2>Search Results</h2>
      <div className="job-grid">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  )
}

export default JobList

