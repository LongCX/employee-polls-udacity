import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../reducers';
import PollCreation from './PollCreation';

const renderWithProviders = (ui) => {
  const store = configureStore({ reducer: rootReducer });
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

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
