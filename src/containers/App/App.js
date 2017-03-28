import React, { Component } from 'react';
import { Text, DeviceEventEmitter, Linking } from 'react-native';
import CodePush from "react-native-code-push";
import { Router, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import moment from 'moment-jalali';
import ApiClient from '../../helpers/ApiClient';
import createStore from '../../redux/create';

import {
    Test
} from './../index';

// Load persian lang on moment
moment.loadPersian();

const client = new ApiClient();
const store = createStore(client);
const RouterWithRedux = connect()(Router);

export default class App extends Component {

    render() {
        return (<Provider store={store}>
            <RouterWithRedux>
                <Scene key="root">
                    <Scene key="test" component={Test}/>
                </Scene>
            </RouterWithRedux>
        </Provider>);
    }
}
