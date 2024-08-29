// src/components/UserList.js or src/pages/UserList.js
import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Failed to fetch users:', error));
  }, []);
  return (
    <div>
      <h2>User List Generated using API (Task 2)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
