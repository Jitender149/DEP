"use client"

import { useState } from "react"

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
    <div className="search-form-container">
      <h2>Search Jobs</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="field">Keywords</label>
            <input
              type="text"
              id="field"
              name="field"
              value={searchParams.field}
              onChange={handleChange}
              placeholder="Job title, skills, or company"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="geoid">Location</label>
            <input
              type="text"
              id="geoid"
              name="geoid"
              value={searchParams.geoid}
              onChange={handleChange}
              placeholder="City, state, or country"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={searchParams.jobType}
              onChange={handleChange}
              className="form-control"
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
            <label htmlFor="expLevel">Experience Level</label>
            <select
              id="expLevel"
              name="expLevel"
              value={searchParams.expLevel}
              onChange={handleChange}
              className="form-control"
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

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workType">Work Type</label>
            <select
              id="workType"
              name="workType"
              value={searchParams.workType}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">All Work Types</option>
              <option value="at_work">At Work</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              name="sortBy"
              value={searchParams.sortBy}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">All</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="filterByCompany">Company</label>
            <input
              type="text"
              id="filterByCompany"
              name="filterByCompany"
              value={searchParams.filterByCompany}
              onChange={handleChange}
              placeholder="Filter by company"
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="search-button">
          Search Jobs
        </button>
      </form>
    </div>
  )
}

export default SearchForm

