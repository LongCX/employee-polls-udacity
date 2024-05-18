import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../reducers';
import { loginSuccess, setUsers } from '../actions';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  it('should contain correct navigation links when not authenticated', () => {
    const store = configureStore({ reducer: rootReducer });
    render(
      <Provider store={store}>
        <BrowserRouter><NavigationBar /></BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('home')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('leaderboard')).toHaveAttribute('href', '/leaderboard');
    expect(screen.getByTestId('add')).toHaveAttribute('href', '/add');
  });
  it('should contain correct navigation links when authenticated', () => {
    const store = configureStore({ reducer: rootReducer });
    const users = {
      "sarahedo": { avatarURL: "/assets/images/avatar/Avatar_1.jpg" }
    };
    store.dispatch(loginSuccess('sarahedo'));
    store.dispatch(setUsers(users));
    render(
      <Provider store={store}>
        <BrowserRouter><NavigationBar /></BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('home')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('leaderboard')).toHaveAttribute('href', '/leaderboard');
    expect(screen.getByTestId('add')).toHaveAttribute('href', '/add');
  });
});
