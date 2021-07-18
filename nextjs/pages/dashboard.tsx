
import { useState, useEffect } from 'react';
import { useAuth, Tokens } from '../utils/auth/auth';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const auth = useAuth();
    const { accessToken } = auth.tokens;

    const getUserData = async (accessToken: string) => {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        const json = await response.json();
        setData(json);
        console.log(json);
    }

    useEffect(() => {
        if (data === null) {
            getUserData(accessToken);
        }
    }, []);

    return <div>
        <h1>Dashboard Page</h1>
        {data !== null && JSON.stringify(data)}
    </div>;
};

export default Dashboard;