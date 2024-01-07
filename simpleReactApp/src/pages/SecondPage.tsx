import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center,
    Text,
} from '@chakra-ui/react';

interface EventData {
    date_start: string;
    title: string;
    price_detail: string;
    formattedDate?: string;
    formattedPrice?: string;
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
            url: `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100`,
        }).then(res => {
            console.log('res = ', res)
            setListAction(res.data.results)
        }).catch(error => {
            console.log('error = ', error)
        })
    }, []);

    useEffect(() => {
        if (startDate !== null && endDate !== null) {
            setFilteredListAction(
                listAction
                    .filter((event: EventData) => {
                        const eventDate = new Date(event.date_start);
                        return eventDate >= startDate && eventDate <= endDate;
                    })
                    .map((event: EventData) => ({
                        ...event,
                        formattedDate: new Date(event.date_start).toLocaleString(),
                        // formattedPrice: event.price_detail.replace(/<\/?[^>]+(>|$)/g, ''),
                        formattedPrice: event.price_detail,
                    }))
            );
            // console.log('filteredListAction = ', filteredListAction)
        }
    }, [listAction]);

    function Title() {
        return (
            <Center>
                <Text fontSize="3xl">Liste des evenements Sur Paris</Text>
            </Center>
        );
    }

    function DisplayTab() {
        return (
            <Center>
                <TableContainer w="75%">
                    <Table variant="simple">
                        <TableCaption>Que faire a paris</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Evenement</Th>
                                <Th>Date de début</Th>
                                <Th>Prix</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredListAction.map((event: EventData, index: number) => (
                                <Tr key={index}>
                                    <Td>{event.title}</Td>
                                    <Td>{event.formattedDate}</Td>
                                    <Td>{event.formattedPrice}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Center>
        );
    }

    return (
        <div>
            <Title />
            <DisplayTab />
        </div>
    );
};

export default SecondPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// interface EventData {
//     date_start: string;
//     title: string;
//     price_detail: string;
// }

// const SecondPage: React.FC = () => {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);

//     const startDate = new Date(searchParams.get('startDate') || '');
//     const endDate = new Date(searchParams.get('endDate') || '');
//     console.log('_____')
//     console.log('startDate = ', startDate)
//     console.log('endDate = ', endDate)

//     const [listAction, setListAction] = useState<any>([])
//     const [filteredListAction, setFilteredListAction] = useState<any>([])

//     useEffect(() => {
//         axios({
//             method: 'get',
//             url: `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20`,
//         }).then(res => {
//             setListAction(res.data.results)
//         }).catch(error => {
//             console.log('error = ', error)
//         })
//     }, []);

//     useEffect(() => {
//         if (startDate !== null && endDate !== null) {
//             for (let i = 0; i < listAction.length; i++) {
//                 console.log('listAction[i] = ', listAction[i].date_start)
//                 console.log('listAction[i] = ', listAction[i].title)
//                 console.log('listAction[i] = ', listAction[i].price_detail)
//             }

//             setFilteredListAction(listAction.filter((event: EventData) => {
//                 const eventDate = new Date(event.date_start);
//                 return eventDate >= startDate && eventDate <= endDate;
//             }));
//         }
//     }, [listAction]);

//     return (
//         <div>
//             <h2>Event List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Date de début</th>
//                         <th>Titre de l'évènement</th>
//                         <th>Tarif</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredListAction.map((event: EventData, index: number) => (
//                         <tr key={index}>
//                             <td>{event.date_start}</td>
//                             <td>{event.title}</td>
//                             <td>{event.price_detail}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default SecondPage;
