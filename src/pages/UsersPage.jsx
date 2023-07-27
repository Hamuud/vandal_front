import React, { useEffect, useState } from 'react';
import { usePageError } from '../hooks/usePageError.js';
import { userService } from '../services/userService.js';

export const UsersPage = () => {
  const [error, setError] = usePageError('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll()
      .then(setUsers)
      .catch(error => {
        setError(error.message)
      });
  }, [setError])

  return (
    <div className="content">
      <h1 className="title">Here you can see all users</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h2>E-mail: {user.email}</h2>
            <h3>Name: {user.name}</h3>
            <h3>Surname: {user.surname}</h3>
            <h3>Phone: {user.phone}</h3>
          </li>
        ))}
      </ul>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
