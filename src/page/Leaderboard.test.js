import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../reducers';
import Leaderboard from './Leaderboard';
import { setUsers } from '../actions';


describe("Summary", () => {
    it("Should the leaderboard is displaying the correct user name, number of questions asked, and number of questions answered", async () => {
        const store = configureStore({ reducer: rootReducer });
        const users = {
            "sarahedo": {
                id: "sarahedo",
                name: "Sarah Edo",
                avatarURL: "/assets/images/avatar/Avatar_1.jpg",
                answers: {
                    "8xf0y6ziyjabvozdd253nd": "optionOne",
                    "6ni6ok3ym7mf1p33lnez": "optionOne",
                    "am8ehyc8byjqgar0jgpub9": "optionTwo",
                    "loxhs1bqm25b708cmbf3g": "optionTwo",
                },
                questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
            }
        };
        store.dispatch(setUsers(users));
        render(
            <Provider store={store}>
                <BrowserRouter><Leaderboard /></BrowserRouter>
            </Provider>
        );

        const username = screen.getByTestId("username");
        const answers = screen.getByTestId("answers");
        const questions = screen.getByTestId("questions");

        expect(username.textContent).toEqual(users["sarahedo"].id);
        expect(parseInt(answers.textContent)).toEqual(
            Object.keys(users["sarahedo"].answers).length
        );
        expect(parseInt(questions.textContent)).toEqual(users["sarahedo"].questions.length);
    });
});
