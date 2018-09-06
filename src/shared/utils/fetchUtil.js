// @flow
import qs from 'qs';
import { is } from 'ramda';
import humps from 'humps';

const API_HOST: string = process.env.REACT_APP_API_HOST || '';

type GenTokenHeader = (
  token?: string
) => {
  Authorization?: string
};
const genTokenHeader: GenTokenHeader = token =>
  token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {};

type Headers = {
  [key: string]: string
};

type Body =
  | {
      [key: string]: any
    }
  | FormData;

type RemoveContentType = (headers: Headers) => Headers;
const removeContentType: RemoveContentType = headers => {
  const {
    'Content-Type': contentType, // eslint-disable-line no-unused-vars
    ...rest
  } = headers;

  return rest;
};

type GetContentTypeHeader = Body =>
  | {}
  | {
      'Content-Type': 'application/json'
    };
const getContentTypeHeader: GetContentTypeHeader = body =>
  is(FormData, body)
    ? {}
    : {
        'Content-Type': 'application/json'
      };

type OptionsBuilder = (
  method: string
) => (
  body?: Body,
  header?: Headers,
  token?: string
) => {
  method: string,
  headers: Headers,
  body?: string | FormData
};
const optionsBuilder: OptionsBuilder = method => (body, header, token) =>
  body
    ? {
        method: method.toUpperCase(),
        headers: {
          ...header,
          ...genTokenHeader(token),
          ...getContentTypeHeader(body)
        },
        body: is(FormData, body) ? body : JSON.stringify(humps.decamelizeKeys(body))
      }
    : {
        method: method.toUpperCase(),
        headers: removeContentType({
          ...header,
          ...genTokenHeader(token)
        })
      };

type Handle401 = () => void | any;
type CheckStatus = (handle401: Handle401) => (response: Response) => Promise<*> | {} | void;
const checkStatus: CheckStatus = handle401 => response => {
  if (response.status === 401) {
    handle401();
  }

  if (response.status === 204) {
    return {};
  }

  return response.json().then(json => {
    if (json.response_code === 1 || (json.response_code === undefined && response.status === 200)) {
      return Promise.resolve(json);
    }

    return Promise.reject(json);
  });
};

type WrappedFetch = (
  endpoint: string
) => (method: string, body?: Body, header?: Headers, token?: string) => Promise<any>;

const wrappedFetch: WrappedFetch = endpoint => (method, body, header, token) =>
  fetch(`${API_HOST}${endpoint}`, {
    ...optionsBuilder(method)(body, header, token)
  })
    .then(checkStatus(() => {}))
    .then(humps.camelizeKeys);

type FetchFunc = (options?: {
  body?: Body,
  headers?: Headers,
  query?: {},
  token?: string
}) => Promise<*>;

type Method = 'get' | 'post' | 'patch';
type AllowedFetch = {
  [method: Method]: FetchFunc
};

type AllowedMethod = Array<Method>;
const allowedMethod: AllowedMethod = ['get', 'post', 'patch'];

type BindQuery = (endpoint: string, query?: {}) => string;
const bindQuery: BindQuery = (endpoint, query) =>
  query ? `${endpoint}?${qs.stringify(query)}` : endpoint;

type FetchUtil = (endpoint: string) => AllowedFetch;
const fetchUtil: FetchUtil = endpoint =>
  allowedMethod.reduce(
    (pV, cV) => ({
      ...pV,
      [cV]: ({ body, headers, query, token } = {}) =>
        wrappedFetch(bindQuery(endpoint, query))(cV, body, headers, token)
    }),
    {}
  );

export default fetchUtil;
