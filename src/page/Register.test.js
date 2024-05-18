import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import { setUsers } from '../actions';
import rootReducer from '../reducers';
import Register from './Register';

const renderWithProviders = (ui) => {
    const store = configureStore({ reducer: rootReducer });
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
    );
};

describe('Register Component', () => {
    it('should have username field, fullname field, password field, and register button', () => {
        renderWithProviders(<Register />);

        expect(screen.getByTestId('username')).toBeInTheDocument();
        expect(screen.getByTestId('fullname')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('button-submit')).toBeInTheDocument();
    });

    it('should show an error message when username or fullname or password is not provided', async () => {
        renderWithProviders(<Register />);

        fireEvent.click(screen.getByTestId('button-submit'));

        const error = screen.getByTestId('error');
        expect(error.textContent).toBe(`Username or password or fullname can't empty`);
    });

    it('should show an error message when exist username', async () => {
        const store = configureStore({ reducer: rootReducer });
        const users = {
            "existuser": {
                id: 'existuser',
            }
        };
        store.dispatch(setUsers(users));
        render(
            <Provider store={store}>
                <BrowserRouter><Register /></BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'existuser' } });
        fireEvent.change(screen.getByTestId('fullname'), { target: { value: 'fullname' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByTestId('button-submit'));

        await waitFor(async () => {
            const error = screen.getByTestId('error');
            expect(error.textContent).toBe('Username already exist, try other username');
        });
    });
});
