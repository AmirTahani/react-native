import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducer';
import saga from './saga';
// import devTools from 'remote-redux-devtools';

export default function create(client) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
      reducers,
      compose(
          applyMiddleware(sagaMiddleware)
      ),
      autoRehydrate()
  );

  // ,devTools({
  //  filters: {blacklist: ['EFFECT_RESOLVED', 'EFFECT_TRIGGERED']}
  // })

  persistStore(store, {
    whitelist: ['auth', 'cities', 'permissions', 'contacts', 'recommendedEvents', 'categories', 'myOrders', 'favoriteEvents', 'settings'],
    storage: AsyncStorage
  });
  // .purgeAll();

  store.rootTask = sagaMiddleware.run(saga, client, store);

  return store;
}
