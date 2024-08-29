import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserList from '../pages/UserList';

beforeEach(() => {
    // Mocking the global fetch function before each test
    global.fetch = jest.fn();
});

afterEach(() => {
    // Restoring the original fetch function after each test
    jest.restoreAllMocks();
});

test('renders loading state initially', () => {
    // Setting up the fetch mock to return a pending Promise
    global.fetch.mockImplementationOnce(() => new Promise(() => {}));

    // Rendering the component
    render(<UserList />);

    // Asserting that the loading text is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders user names after successful fetch', async () => {
    // Mocking the fetch call to return a successful response with a user list
    const users = [{ id: 1, name: 'John Doe' }];
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => users,
    });

    render(<UserList />);

    // Asserting that the user name is displayed after the data is fetched
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
});

test('renders error message on fetch failure', async () => {
    // Mocking the fetch call to return a rejected promise (simulating a failure)
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<UserList />);

    // Asserting that the error message is displayed after the fetch fails
    expect(await screen.findByText('Error: Failed to fetch')).toBeInTheDocument();
});
