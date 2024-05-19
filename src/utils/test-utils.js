import React from 'react'
import { configureStore } from "@reduxjs/toolkit"
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import rootReducer from "../reducers";
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState, }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}