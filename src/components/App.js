import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { setUsers, setListQuestions, startLoading, stopLoading, startLoadOnceInitData } from '../actions';
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
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isLoad = useSelector((state) => state.loading.isLoadOnceInitData);

  useEffect(() => {
    // Keep load data will once time (combine with redux-persist)
    if (!isLoad) {
      dispatch(startLoading());
      getInitData().then(({ users, questions }) => {
        dispatch(setUsers(users));
        dispatch(setListQuestions(questions));
        dispatch(stopLoading());
        dispatch(startLoadOnceInitData());
      })
    }
  }, [dispatch, isLoad])

  return (
    <div className="App">
      {(isLoading && !isLoad) && (<Container fluid='true' className="overlay"><Spinner animation="border" variant="light" /></Container>)}
      <Fragment>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate replace to="/" /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate replace to="/" /> : <Register />} />
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
