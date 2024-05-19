import { useEffect, Fragment } from "react";
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { setUsers, setListQuestions } from '../actions';
import Login from "../page/Login";
import NavigationBar from './NavigationBar';
import Home from "../page/Home";
import Leaderboard from "../page/Leaderboard";
import PollCreation from "../page/PollCreation";
import ProtectedRoute from './ProtectedRoute';
import Poll from "../page/Poll";
import NotFound from "../page/NotFound";
import { getInitData } from "../utils/_DATA";
import Register from "../page/Register";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getInitData().then(({ users, questions }) => {
      dispatch(setUsers(users));
      dispatch(setListQuestions(questions));
    })
  }, [dispatch])

  return (
    <div className="App">
      <Fragment>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/add" element={<PollCreation />} />
            <Route path="/questions/:questionId" element={<Poll />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;
