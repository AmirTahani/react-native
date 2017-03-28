import { apiPath } from '../config';
const methods = ['get', 'post', 'put', 'patch', 'delete'];

export function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return apiPath + adjustedPath;
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.json().then(json => Promise.reject(json));
}

export function parseJSON(response) {
  if (response.headers.get('Content-Type') === 'application/json') {
    return response.json();
  } else {
    return response;
  }
}

function fetchCreator(method, url, options = {}) {
  options.method = method;

  return this.request(url, options)
      .then(checkStatus)
      .then(parseJSON);
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = fetchCreator.bind(this, method);
    });
  }

  request(url, { data, ...options } = {}) {
    const fetchOptions = options;
    fetchOptions.headers = fetchOptions.headers || {};
    fetchOptions.headers.Accept = 'application/json';

    if (data) {
      if (fetchOptions.type === 'formdata') {
        fetchOptions.body = new FormData();
        for (let key in data) {
          if (typeof key === 'string' &&
              data.hasOwnProperty(key) &&
              typeof data[key] !== 'undefined') {
            fetchOptions.body.append(key, data[key]);
          }
        }
      } else {
        fetchOptions.body = JSON.stringify(data);
        fetchOptions.headers['Content-Type'] = 'application/json';
      }
    }

    if (this.jwt) {
      fetchOptions.headers['Authorization'] = this.jwt;
    }

    return fetch(formatUrl(url), fetchOptions);
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {
  }
}
