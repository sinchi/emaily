import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // import class Provider
import { createStore, applyMiddleware } from "redux" ; // import functions
import reduxThunk from 'redux-thunk';
import reducers from "./reducers";
import App from "./components/App";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root"));


    console.log('Stripe key', process.env.REACT_APP_STRIPE_KEY);
    console.log(process.env.NODE_ENV);