import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import { setUsers } from '../actions';
import rootReducer from '../reducers';
import Login from './Login';

const renderWithProviders = (ui) => {
  const store = configureStore({ reducer: rootReducer });
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('Login Component', () => {
  it('should have username field, password field, and login button', () => {
    renderWithProviders(<Login />);

    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('button-submit')).toBeInTheDocument();
  });

  it('should show an error message when username or password is not provided', async () => {
    renderWithProviders(<Login />);

    fireEvent.click(screen.getByTestId('button-submit'));

    await waitFor(async () => {
      const error = screen.getByTestId('error');
      expect(error.textContent).toBe(`Username or password can't empty`);
    });
  });

  it('should show an error message when incorrect username or password is provided', async () => {
    const store = configureStore({ reducer: rootReducer });
    const users = {
      "sarahedo": {
        id: 'sarahedo',
        password:'$2a$10$HNCOnvvGAUpYqNLdcJOVpOtvLhQ1Kut5yST71OMI8ViSyK1p5UOiC',
      }
  };
    store.dispatch(setUsers(users));
    render(
      <Provider store={store}>
        <BrowserRouter><Login /></BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByTestId('username'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByTestId('button-submit'));

    await waitFor(async () => {
      const error = screen.getByTestId('error');
      expect(error.textContent).toBe('Invalid user name or password');
    });
  });

  it('should handle username and password field changes', () => {
    renderWithProviders(<Login />);

    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });

    expect(usernameInput.value).toBe('user');
    expect(passwordInput.value).toBe('pass');
  });
});
