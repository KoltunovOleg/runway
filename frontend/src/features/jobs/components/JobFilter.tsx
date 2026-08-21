import { useEffect, useState } from "react";
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

    const filtered = jobs.filter(job => {
        return (status === 'all' || job.status === status) && job.company.toLocaleLowerCase().includes(debouncedText.toLocaleLowerCase());
    });

    useEffect(() => {
        onFilteredJobsChange(filtered);
    }, [jobs, debouncedText, status]);

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