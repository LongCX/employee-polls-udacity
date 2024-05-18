import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter, Route } from 'react-router-dom';
import rootReducer from '../reducers';
import Poll from './Poll';
import { setUsers, setListQuestions, loginSuccess } from '../actions';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

describe("Poll component", () => {
    it("should the percentage of people who voted for an option is calculated correctly", async () => {
        const store = configureStore({ reducer: rootReducer });
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
        store.dispatch(setUsers(users));
        store.dispatch(loginSuccess('user1'));
        store.dispatch(setListQuestions(questions));
        render(
            <Provider store={store}>
                <BrowserRouter><Poll /></BrowserRouter>
            </Provider>
        );

        const percent = screen.getByTestId("percent");
        const calPercent = (((questions['qid123'].optionOne.votes).length + (questions['qid123'].optionTwo.votes).length) / Object.keys(users).length) * 100;

        expect(percent.textContent).toEqual(calPercent.toFixed(2) + '%');
    });
});
