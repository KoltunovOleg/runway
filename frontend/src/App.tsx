import { JobList } from './features/jobs/components/JobList'
import { JobFilter } from './features/jobs/components/JobFilter'
import { mockJobs } from './mocks/jobs.mock'
import './App.css'
import { useState } from 'react'

function App() {
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)
  return <>
          <JobFilter jobs={mockJobs} onFilteredJobsChange={setFilteredJobs} />
          <JobList jobs={filteredJobs} />
        </>
}

export default App
