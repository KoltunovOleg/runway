import type { Job } from "../../../types/job.types";

type JobCardProps = {
    job: Job;
};

export function JobCard({ job }: JobCardProps) {

    return (
        <dl>
            <dt>Company</dt>
            <dd>{job.company}</dd>
            <dt>Position</dt>
            <dd>{job.position}</dd>
            <dt>Status</dt>
            <dd>{job.status}</dd>
            <dt>Applied Date</dt>
            <dd>{job.appliedDate}</dd>
        </dl>
        );
}