"use client"

import { useState } from "react"
import { Box, Paper, Typography } from '@mui/material';

function SearchForm({ onSearch }) {
  const [searchParams, setSearchParams] = useState({
    field: "",
    geoid: "",
    page: 0,
    sortBy: "",
    jobType: "",
    expLevel: "",
    workType: "",
    filterByCompany: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchParams)
  }

  return (
    <Paper 
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 2,
        background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          mb: 3,
          color: 'text.primary',
          fontWeight: 600
        }}
      >
        Search Jobs
      </Typography>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div className="form-group">
            <label htmlFor="field" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 500
            }}>Keywords</label>
            <input
              type="text"
              id="field"
              name="field"
              value={searchParams.field}
              onChange={handleChange}
              placeholder="Job title, skills, or company"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                }
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="geoid" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 500
            }}>Location</label>
            <input
              type="text"
              id="geoid"
              name="geoid"
              value={searchParams.geoid}
              onChange={handleChange}
              placeholder="City, state, or country"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                }
              }}
            />
          </div>
        </div>

        <div className="form-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div className="form-group">
            <label htmlFor="jobType" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 500
            }}>Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={searchParams.jobType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                }
              }}
            >
              <option value="">All Job Types</option>
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="temoporary">Temporary</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="expLevel" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 500
            }}>Experience Level</label>
            <select
              id="expLevel"
              name="expLevel"
              value={searchParams.expLevel}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                }
              }}
            >
              <option value="">All Experience Levels</option>
              <option value="internship">Internship</option>
              <option value="entry_level">Entry level</option>
              <option value="associate">Associate</option>
              <option value="mid_senior_level">Mid-Senior level</option>
              <option value="director">Director</option>
            </select>
          </div>
        </div>

        <div className="form-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div className="form-group">
            <label htmlFor="workType" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 500
            }}>Work Type</label>
            <select
              id="workType"
              name="workType"
              value={searchParams.workType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                }
              }}
            >
              <option value="">All Work Types</option>
              <option value="at_work">At Work</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sortBy" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 500
            }}>Sort By</label>
            <select
              id="sortBy"
              name="sortBy"
              value={searchParams.sortBy}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                }
              }}
            >
              <option value="">All</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>

        <div className="form-row" style={{ 
          marginBottom: '20px'
        }}>
          <div className="form-group">
            <label htmlFor="filterByCompany" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: 500
            }}>Company</label>
            <input
              type="text"
              id="filterByCompany"
              name="filterByCompany"
              value={searchParams.filterByCompany}
              onChange={handleChange}
              placeholder="Filter by company"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                }
              }}
            />
          </div>
        </div>

        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '14px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }
          }}
        >
          Search Jobs
        </button>
      </form>
    </Paper>
  )
}

export default SearchForm

