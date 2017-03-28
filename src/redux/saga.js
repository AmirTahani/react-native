import { Alert } from 'react-native';
import { delay, takeEvery, takeLatest } from 'redux-saga';

import { LOAD, loadSaga as eventsLoadSaga } from './modules/event';


export default function* root(client, store) {
    yield [
        takeEvery(LOAD , eventsLoadSaga , client)
    ];
}


