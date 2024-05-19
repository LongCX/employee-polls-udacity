import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { renderWithProviders } from '../utils/test-utils';

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
        const users = {
            "existuser": {
                id: 'existuser',
            }
        };
        renderWithProviders(<Register />, { preloadedState: { users: { users } } });

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
