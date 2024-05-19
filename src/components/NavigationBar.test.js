import React from 'react';
import { screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';
import { renderWithProviders } from '../utils/test-utils';

describe('NavigationBar', () => {
  it('should contain correct navigation links when not authenticated', () => {
    renderWithProviders(<NavigationBar />);

    expect(screen.getByTestId('home')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('leaderboard')).toHaveAttribute('href', '/leaderboard');
    expect(screen.getByTestId('add')).toHaveAttribute('href', '/add');
  });
  it('should contain correct navigation links when authenticated', () => {
    const users = {
      "sarahedo": { avatarURL: "/assets/images/avatar/Avatar_1.jpg" }
    };
    renderWithProviders(<NavigationBar />, { preloadedState: { users: { users }, authUser: { isLoggedIn: true, username: 'sarahedo' } } });

    expect(screen.getByTestId('home')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('leaderboard')).toHaveAttribute('href', '/leaderboard');
    expect(screen.getByTestId('add')).toHaveAttribute('href', '/add');
  });
});
