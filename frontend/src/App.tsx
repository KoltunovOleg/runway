import { JobList } from './features/jobs/components/JobList'
import { mockJobs } from './mocks/jobs.mock'
import './App.css'

function App() {
  return <JobList jobs={mockJobs} />
}

export default App
