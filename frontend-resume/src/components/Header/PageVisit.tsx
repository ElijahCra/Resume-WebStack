'use client'
import useSWR from 'swr'

const fetcher = (url: Request) => fetch(url).then(r => r.json())
export default function Home() {
    const {
        data,
        isLoading,
        error,
    } = useSWR(
        "/api/v1/pagevisit",
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    if (error) {
        return <p>Failed to fetch</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <p>{data}</p>
    );
}