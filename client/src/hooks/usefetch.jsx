
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axioInstance";

export const useFetch = (url,refresh) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(url, { withCredentials: true });
            console.log("response====", response);
            
            
           setData(response?.data?.data || response?.data);

        } catch (error) {
            console.log("Fetch error:", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url,refresh]);

    return [data, isLoading, error];
};
