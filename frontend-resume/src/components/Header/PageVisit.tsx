'use client'
import useSWR from 'swr'

interface PageVisit {
    id: number;
    visit_date: string;
    daily_visit: number;
    total_visit: number;
}

const fetcher = (url: Request) => fetch(url).then(r => r.json())
export default function Home() {
    const {
        data,
        isLoading,
        error,
    } = useSWR(
        "http://localhost:8080/api/v1/new-visit",
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    if (error) {
        return <p>Failed to fetch</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    let visitJson = JSON.parse(data);
    return (
        <p>{visitJson.total_visit}</p>
    );
}