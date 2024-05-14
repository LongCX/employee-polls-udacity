import React from 'react';
import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from "react-router-dom";
import { setListUsers } from '../actions';
import Login from "./Login";
import NavigationBar from './NavigationBar';
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import PollCreation from "./PollCreation";
import { _getUsers } from "../utils/_DATA";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    _getUsers().then((users) => {
      dispatch(setListUsers(users));
    })
  }, [])

  return (
    <div className="App">
      <Fragment>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate replace to="/" /> : <Login />} />
          <Route path="/" element={<Home />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="new-poll" element={<PollCreation />} />
        </Routes>
      </Fragment>

    </div>
  );
}

export default App;
