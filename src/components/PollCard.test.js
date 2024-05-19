import React from 'react';
import { screen } from '@testing-library/react';
import PollCard from './PollCard';
import { renderWithProviders } from '../utils/test-utils';

describe('PollCard', () => {
  it('Will match snapshot', () => {
    const poll = {
      author: 'user',
      timestamp: '1493579767190',
      id: 'id'
    }
    renderWithProviders(<PollCard poll={poll} />);

    expect(screen).toMatchSnapshot();
  });

});
