import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface EventData {
    date_start: string;
    title: string;
    price_type: string;
}

const SecondPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const startDate = new Date(searchParams.get('startDate') || '');
    const endDate = new Date(searchParams.get('endDate') || '');

    const [events, setEvents] = useState<EventData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/`
                );

                if (!response.data?.records) {
                    throw new Error('No data returned from the API');
                }

                const fetchedEvents: EventData[] = response.data.records.map((record: any) => ({
                    date_start: record?.fields?.date_start || '',
                    title: record?.fields?.title || '',
                    price_type: record?.fields?.price_type || '',
                }));

                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    return (
        <div>
            <h2>Event List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date de début</th>
                        <th>Titre de l'évènement</th>
                        <th>Tarif</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.date_start}</td>
                            <td>{event.title}</td>
                            <td>{event.price_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SecondPage;
