import React from 'react';
import { screen } from '@testing-library/react';
import Poll from './Poll';
import { renderWithProviders } from '../utils/test-utils';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

describe("Poll component", () => {
    it("should the percentage of people who voted for an option is calculated correctly", async () => {
        const users = {
            "user1": {
                avatarURL: "/assets/images/avatar/Avatar_1.jpg"
            },
            "user2": {
                avatarURL: "/assets/images/avatar/Avatar_1.jpg"
            },
            "user3": {
                avatarURL: "/assets/images/avatar/Avatar_1.jpg"
            },
            "user4": {
                avatarURL: "/assets/images/avatar/Avatar_1.jpg"
            },
            "user5": {
                avatarURL: "/assets/images/avatar/Avatar_1.jpg"
            },
        };
        const questions = {
            "qid123": {
                author: 'user1',
                optionOne: {
                    votes: ['user1'],
                },
                optionTwo: {
                    votes: ['user2'],
                }
            },
        }
        require('react-router-dom').useParams.mockReturnValue({ questionId: 'qid123' });
        renderWithProviders(<Poll />, { preloadedState: { users: { users }, questions: { questions }, authUser: { isLoggedIn: true, username: 'user1' } } });

        const percent = screen.getByTestId("percent");
        const calPercent = (((questions['qid123'].optionOne.votes).length + (questions['qid123'].optionTwo.votes).length) / Object.keys(users).length) * 100;

        expect(percent.textContent).toEqual(calPercent.toFixed(2) + '%');
    });
});
