import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from "react-router-dom";
import { setListUsers } from '../actions';
import Login from "./Login";
import Home from "./Home";
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
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate replace to="/" /> : <Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
