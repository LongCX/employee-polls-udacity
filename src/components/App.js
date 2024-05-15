import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from "react-router-dom";
import { setListUsers, setListQuestions } from '../actions';
import Login from "./Login";
import NavigationBar from './NavigationBar';
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import PollCreation from "./PollCreation";
import ProtectedRoute from './ProtectedRoute';
import Poll from "./Poll";
import { getInitData } from "../utils/_DATA";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    getInitData().then(({ users, questions }) => {
      dispatch(setListUsers(users));
      dispatch(setListQuestions(questions));

    })
  }, [])

  return (
    <div className="App">
      <Fragment>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate replace to="/" /> : <Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/new" element={<PollCreation />} />
            <Route path="/questions/:questionId" element={<Poll />} />
          </Route>
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;
