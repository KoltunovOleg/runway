import type { Job } from "../../../types/job.types";
import { mockJobs } from "../../../mocks/jobs.mock";
import { JobCard } from "./JobCard";

type JobListProps = {
    jobs?: Job[];
}

export function JobList({ jobs = mockJobs }: JobListProps) {

    if (jobs.length === 0) return <p>No jobs yet</p>;
   
    const jobItems = jobs.map(job => {
        return <li key={job.id}><JobCard job={job} /></li>
    });

    return (
        <>
            <div>List of jobs</div>
            <ul>{jobItems}</ul>
        </>
    );
  
}