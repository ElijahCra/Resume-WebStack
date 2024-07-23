'use client'
import React, { useState, useEffect } from 'react';

export default function PageVisit() {
    const [visitCount, setVisitCount] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const hasFetched = sessionStorage.getItem('hasFetchedVisitCount'); // Check if already fetched

        if (!hasFetched) { // Only fetch if not fetched before
            const fetchVisitCount = async () => {
                try {

                    const response = await fetch('http://localhost:80/api/v1/new-visit',{ cache: 'no-store' });

                    if (!response.ok) { // Check if the response is successful
                        throw new Error('Network response was not ok.');
                    }

                    const data = await response.json();

                    // Ensure the API response has the correct property name:
                    if (data.total_visit !== undefined) {
                        setVisitCount(data.total_visit);
                    } else {
                        throw new Error(' Total_visit property not found in response');
                    }

                } catch (error) {
                    console.error('Error fetching visit count:', error);
                    // @ts-ignore
                    setError(error.message); // Update error state
                }
            }; fetchVisitCount();
            sessionStorage.setItem('hasFetchedVisitCount', 'true'); // Mark as fetched
        } else {
            // @ts-ignore
            setVisitCount(parseInt(sessionStorage.getItem('visitCount'), 10) || null); // Retrieve from storage
        }
    }, []);

    useEffect(() => {
        // Store visitCount in sessionStorage when it changes (after initial fetch)
        if (visitCount !== null) {
            sessionStorage.setItem('visitCount', visitCount);
        }
    }, [visitCount]);

    return (
        <div>
            <h2>Website Visits:</h2>
            {visitCount === null ? (
                <p>{error ? error : "Loading..."}</p> // Display error or loading message
            ) : (
                <p>{visitCount}</p>
            )}
        </div>
    );
}

