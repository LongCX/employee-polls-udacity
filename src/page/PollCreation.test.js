import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import PollCreation from './PollCreation';
import { renderWithProviders } from '../utils/test-utils';

describe('Poll Creation Component', () => {
  it('should have optionOne field, optionTwo field, and create button', () => {
    renderWithProviders(<PollCreation />);

    expect(screen.getByTestId('optionOne')).toBeInTheDocument();
    expect(screen.getByTestId('optionTwo')).toBeInTheDocument();
    expect(screen.getByTestId('button-submit')).toBeInTheDocument();
  });

  it('should show an error message when optionOne or optionTwo is not provided', async () => {
    renderWithProviders(<PollCreation />);

    fireEvent.click(screen.getByTestId('button-submit'));

    await waitFor(async () => {
      const error = screen.getByTestId('error');
      expect(error.textContent).toBe(`Option can't empty`);
    });
  });
});
