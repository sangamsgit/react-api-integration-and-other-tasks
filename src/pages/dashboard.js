// src/pages/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserList from '../pages/UserList'; // Adjust path as necessary

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('userlist');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <button onClick={() => setActiveTab('UserList')}>User List</button>
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
      </nav>
      <div>
        {activeTab === 'UserList' && <UserList />}
        {activeTab === 'dashboard' && <div>Welcome to the dashboard content!</div>}
      </div>
    </div>
  );
}
