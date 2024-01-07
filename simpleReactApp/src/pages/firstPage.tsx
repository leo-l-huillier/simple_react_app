import React, { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import '../app/App.css';
import { Input, Center, Text, Button, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DateSelectionPage: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);
    const [isEndDateSet, setIsEndDateSet] = useState(false);

    const navigate = useNavigate();

    const calculateEndDateLimit = useCallback(() => {
        if (startDate) {
            const endDateLimit = new Date(startDate);
            endDateLimit.setDate(endDateLimit.getDate() + 3);
            return endDateLimit;
        }
        return null;
    }, [startDate]);

    useEffect(() => {
        const endDateLimit = calculateEndDateLimit();
        if (endDate && endDateLimit && endDate > endDateLimit) {
            setEndDate(null);
        }
    }, [startDate, endDate, calculateEndDateLimit]);

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedStartDate = new Date(event.target.value);
        setStartDate(selectedStartDate);
        setIsEndDateEnabled(true);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedEndDate = new Date(event.target.value);
        setEndDate(selectedEndDate);
        setIsEndDateSet(true);
    };

    const changePage = () => {
        console.log('startDate = ', startDate)
        console.log('endDate = ', endDate)
        if (startDate && endDate) {
            navigate(`/secondPage?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && startDate && endDate) {
            navigate(`/secondPage?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
        }
    };

    function Title() {
        return (
            <Center>
                <Text mt={20} fontSize="3xl">Liste des evenements Sur Paris</Text>
            </Center>
        );
    }

    function SubTitle() {
        return (
            <Center>
                <Text fontSize="xl">Pour quand cherchez vous un évenement ?</Text>
            </Center>
        );
    }

    function FirstDateInput() {
        return (
            <Center>
                <Input
                    mt={10}
                    w="17%"
                    type="date"
                    value={startDate ? startDate.toISOString().split('T')[0] : ''}
                    onChange={handleStartDateChange}
                />
            </Center>
        );
    }

    function SecondDateInput() {
        return (
            <Center>
                <Input
                    mt={10}
                    w="17%"
                    type="date"
                    value={endDate ? endDate.toISOString().split('T')[0] : ''}
                    min={startDate?.toISOString().split('T')[0]}
                    max={calculateEndDateLimit()?.toISOString().split('T')[0]}
                    onChange={handleEndDateChange}
                />
            </Center>
        );
    }

    function DisplayButton() {
        return (
            <Center>
                <Button onClick={() => changePage()} mt={10} colorScheme='telegram'>
                    {/* <Link color='white' href='/secondPage'> */}
                    Chercher des évenements
                    {/* </Link> */}
                </Button>
            </Center>
        );
    }

    return (
        <div className="container" tabIndex={0} >
            <Title />
            <SubTitle />
            {/* <Center>
                <input
                    // mt={10}
                    // w="17%"
                    type="date"
                    value={startDate ? startDate.toISOString().split('T')[0] : ''}
                    onChange={handleStartDateChange}
                />
            </Center> */}
            <FirstDateInput />

            {isEndDateEnabled && (
                <div>
                    <SecondDateInput />
                </div>
            )}

            {endDate !== null && (
                <div>
                    <DisplayButton />
                </div>
            )}
        </div>
    );
};


export const FirstPage = (): JSX.Element => (
    <div>
        <DateSelectionPage />
    </div>
);

// import React, { useState, useEffect, useCallback, KeyboardEvent } from 'react';
// import '../app/App.css';
// import { } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

// const DateSelectionPage: React.FC = () => {
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);
//     const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);

//     const navigate = useNavigate();

//     const calculateEndDateLimit = useCallback(() => {
//         if (startDate) {
//             const endDateLimit = new Date(startDate);
//             endDateLimit.setDate(endDateLimit.getDate() + 3);
//             return endDateLimit;
//         }
//         return null;
//     }, [startDate]);

//     useEffect(() => {
//         const endDateLimit = calculateEndDateLimit();
//         if (endDate && endDateLimit && endDate > endDateLimit) {
//             setEndDate(null);
//         }
//     }, [startDate, endDate, calculateEndDateLimit]);

//     const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedStartDate = new Date(event.target.value);
//         setStartDate(selectedStartDate);
//         setIsEndDateEnabled(true);
//     };

//     const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedEndDate = new Date(event.target.value);
//         setEndDate(selectedEndDate);
//     };

//     const handleKeyDown = (event: KeyboardEvent) => {
//         // if (event.key === 'Enter' && startDate && endDate) {
//         //     navigate(`/secondPage?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
//         // }
//     };

//     const changePage = () => {
//         console.log('startDate = ', startDate)
//         console.log('endDate = ', endDate)
//         // if (startDate && endDate) {
//         //     navigate(`/secondPage?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
//         // }
//     };

//     function Title() {
//         return (
//             <Center>
//                 <Text mt={20} fontSize="3xl">Liste des evenements Sur Paris</Text>
//             </Center>
//         );
//     }

//     function SubTitle() {
//         return (
//             <Center>
//                 <Text fontSize="xl">Pour quand cherchez vous un évenement ?</Text>
//             </Center>
//         );
//     }

//     function DisplayButton() {
//         return (
//             <Center>
//                 <Button onClick={() => changePage} mt={10} colorScheme='telegram'>
//                     <Link color='white' href='/secondPage'>
//                         Chercher des évenements
//                     </Link>
//                 </Button>
//             </Center>
//         );
//     }

//     return (
//         <div className="container" tabIndex={0} onKeyDown={handleKeyDown}>
//             <Title />
//             <SubTitle />
//             <Input
//                 type="date"
//                 value={startDate ? startDate.toISOString().split('T')[0] : ''}
//                 onChange={handleStartDateChange}
//             />

//             {isEndDateEnabled && (
//                 <div>
//                     <label>Date de fin:</label>
//                     <Input
//                         type="date"
//                         value={endDate ? endDate.toISOString().split('T')[0] : ''}
//                         min={startDate?.toISOString().split('T')[0]}
//                         max={calculateEndDateLimit()?.toISOString().split('T')[0]}
//                         onChange={handleEndDateChange}
//                     />
//                 </div>
//             )}

//             {endDate !== null && (
//                 <div>
//                     <DisplayButton />
//                 </div>
//             )}
//         </div>
//     );
// };


// export const FirstPage = (): JSX.Element => (
//     <div>
//         <DateSelectionPage />
//     </div>
// );

