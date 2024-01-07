import React, { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import '../app/App.css';
import { } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DateSelectionPage: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);

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
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && startDate && endDate) {
            navigate(`/secondPage?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
        }
    };

    return (
        <div className="container" tabIndex={0} onKeyDown={handleKeyDown}>
            <label>Date de début:</label>
            <input
                type="date"
                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                onChange={handleStartDateChange}
            />

            {isEndDateEnabled && (
                <div>
                    <label>Date de fin:</label>
                    <input
                        type="date"
                        value={endDate ? endDate.toISOString().split('T')[0] : ''}
                        min={startDate?.toISOString().split('T')[0]}
                        max={calculateEndDateLimit()?.toISOString().split('T')[0]}
                        onChange={handleEndDateChange}
                    />
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

