import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import {ModalProvider, Modal} from './components/Context/Modal';
import { store } from '../src/redux/store';
import { googleMapsApiKey } from './redux/locationsSlice';
import { LoadScript } from '@react-google-maps/api';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ModalProvider>
      <BrowserRouter>
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
        <App />
        <Modal />
      </LoadScript>
      </BrowserRouter>
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
