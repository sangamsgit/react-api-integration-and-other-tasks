import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserList from './UserList';  // Import UserList from the correct path

export default function Home() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleNavigate = () => {
        if (isAuthenticated) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
             {isAuthenticated ? (
                <UserList />
            ) : (
                <p>Redirecting to login...</p>
            )}
            <h1 className="text-3xl font-bold mb-4">Welcome to Our App</h1>
            <button
                onClick={handleNavigate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {isAuthenticated ? 'Go to Dashboard' : 'Login'}
            </button>
        </div>
    );
}
