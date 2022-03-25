import { useState } from "react";

const useThrottle = <T extends any[]>(callback: (...params: T) => void, duration: number) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    return (...params: T) => {
        if (!timer) {
            callback(...params);
            setTimer(() =>
                setTimeout(() => {
                    setTimer(null);
                }, duration)
            );
        }
    };
};

export default useThrottle;
