import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './app/globals.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import {Provider, useSelector} from 'react-redux';
import { Home } from './home.tsx'
import { Api, ApiContext} from './utils/api.js';
import store from './store/store';

const router = createHashRouter([
  {
  path: "",
  element: <App />,
  children: [
    {path: "",
      element: <Home />
    },
  ]
  }
]);


const Main = () => {
  const authToken = useSelector(state => state.application.authToken)
  const apiRef = useRef(new Api(authToken));

  useEffect(() => {
    if(apiRef.current) {
      apiRef.current.authToken = authToken;
    }
  }, [authToken])

  return (
    <ApiContext.Provider value={apiRef.current}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Main />
  </Provider>
)