import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../reducers';
import PollCard from './PollCard';

const renderWithProviders = (ui) => {
  const store = configureStore({reducer: rootReducer});
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('PollCard', () => {
  it('Will match snapshot', () => {
    const poll = {
        author : 'user',
        timestamp: '1493579767190',
        id: 'id'
    }
    renderWithProviders(<PollCard poll={poll} />);

    expect(screen).toMatchSnapshot();
  });

});
