import { useEffect, useMemo, useState } from "react";
import type { Job } from "../../../types/job.types";
import { useDebounce } from "../../../shared/hooks/useDebounce";


type JobFilterProps = {
    jobs: Job[];
    onFilteredJobsChange: (filtered: Job[]) => void;
};

export function JobFilter({ jobs, onFilteredJobsChange }: JobFilterProps) {
    const [text, setText] = useState('');
    const [status, setStatus] = useState<'all' | Job['status']>('all');
    const debouncedText = useDebounce(text, 500);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            return (status === 'all' || job.status === status) && job.company.toLocaleLowerCase().includes(debouncedText.toLocaleLowerCase());
        });
    }, [jobs, debouncedText, status]);

    useEffect(() => {
        onFilteredJobsChange(filteredJobs);
    }, [jobs, debouncedText, status, onFilteredJobsChange, filteredJobs]);

    return (
        <>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value as Job['status'] | 'all')}>
                <option value="all">All</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
            </select>
        </>
    );
}