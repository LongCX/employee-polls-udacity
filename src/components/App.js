import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from "react-router-dom";
import { setListUsers, setListQuestions } from '../actions';
import Login from "../page/Login";
import NavigationBar from './NavigationBar';
import Home from "../page/Home";
import Leaderboard from "../page/Leaderboard";
import PollCreation from "../page/PollCreation";
import ProtectedRoute from './ProtectedRoute';
import Poll from "../page/Poll";
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
