import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface EventData {
    date_start: string;
    title: string;
    price_detail: string;
}

const SecondPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const startDate = new Date(searchParams.get('startDate') || '');
    const endDate = new Date(searchParams.get('endDate') || '');

    const [listAction, setListAction] = useState<any>([])
    const [filteredListAction, setFilteredListAction] = useState<any>([])

    useEffect(() => {
        axios({
            method: 'get',
            url: `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20`,
        }).then(res => {
            setListAction(res.data.results)
        }).catch(error => {
            console.log('error = ', error)
        })
    }, []);

    useEffect(() => {
        if (startDate !== null && endDate !== null) {
            for (let i = 0; i < listAction.length; i++) {
                console.log('listAction[i] = ', listAction[i].date_start)
                console.log('listAction[i] = ', listAction[i].title)
                console.log('listAction[i] = ', listAction[i].price_detail)
            }

            setFilteredListAction(listAction.filter((event: EventData) => {
                const eventDate = new Date(event.date_start);
                return eventDate >= startDate && eventDate <= endDate;
            }));
        }
    }, [listAction]);

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
                    {filteredListAction.map((event: EventData, index: number) => (
                        <tr key={index}>
                            <td>{event.date_start}</td>
                            <td>{event.title}</td>
                            <td>{event.price_detail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SecondPage;
