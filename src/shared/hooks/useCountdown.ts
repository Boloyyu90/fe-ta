import { useState, useEffect, useCallback } from 'react';

interface UseCountdownOptions {
    targetDate: Date;
    onComplete?: () => void;
}

interface CountdownTime {
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    isExpired: boolean;
}

export function useCountdown({ targetDate, onComplete }: UseCountdownOptions): CountdownTime {
    const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
        calculateTimeLeft(targetDate)
    );

    const handleComplete = useCallback(() => {
        if (onComplete) {
            onComplete();
        }
    }, [onComplete]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(targetDate);
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.isExpired && !timeLeft.isExpired) {
                handleComplete();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate, timeLeft.isExpired, handleComplete]);

    return timeLeft;
}

function calculateTimeLeft(targetDate: Date): CountdownTime {
    const difference = targetDate.getTime() - Date.now();

    if (difference <= 0) {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalSeconds: 0,
            isExpired: true,
        };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        hours,
        minutes,
        seconds,
        totalSeconds,
        isExpired: false,
    };
}