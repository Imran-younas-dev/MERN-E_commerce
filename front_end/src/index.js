import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import store from './Store';
import {positions,transitions,Provider as AlertPro} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const root = ReactDOM.createRoot(document.getElementById('root'));
const options = {
  timeout : 5000, //error show 5sec
  position : positions.BOTTOM_CENTER, //show error in bottom
  transition : transitions.SCALE,  
}
root.render(
 <Provider store={store}>
    <AlertPro template = {AlertTemplate} {...options}>
    <App />
    </AlertPro>
 </Provider>
);