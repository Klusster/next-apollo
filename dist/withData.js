'use strict'

var _interopRequireWildcard3 = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

var _interopRequireWildcard2 = _interopRequireDefault(
  require('@babel/runtime/helpers/interopRequireWildcard')
)

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
)

var _react = _interopRequireWildcard3(require('react'))

var _head = _interopRequireDefault(require('next/head'))

var _reactHooks = require('@apollo/react-hooks')

var _apolloBoost = require('apollo-boost')

var _isomorphicUnfetch = _interopRequireDefault(require('isomorphic-unfetch'))

var _lodash = require('lodash')

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        ;(0, _defineProperty2['default'])(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}

var apolloClient = null

var createDefaultCache = function createDefaultCache() {
  return new _apolloBoost.InMemoryCache()
}

var _default = function _default(apolloConfig) {
  return function(PageComponent) {
    var _ref =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$ssr = _ref.ssr,
      ssr = _ref$ssr === void 0 ? true : _ref$ssr

    var WithApollo = function WithApollo(_ref2) {
      var apolloClient = _ref2.apolloClient,
        apolloState = _ref2.apolloState,
        pageProps = (0, _objectWithoutProperties2['default'])(_ref2, [
          'apolloClient',
          'apolloState'
        ])
      var client = (0, _react.useMemo)(function() {
        return apolloClient || initApolloClient(apolloConfig, apolloState)
      }, [])
      return _react['default'].createElement(
        _reactHooks.ApolloProvider,
        {
          client: client
        },
        _react['default'].createElement(PageComponent, pageProps)
      )
    } // Set the correct displayName in development

    if (process.env.NODE_ENV !== 'production') {
      var displayName =
        PageComponent.displayName || PageComponent.name || 'Component'

      if (displayName === 'App') {
        console.warn('This withApollo HOC only works with PageComponents.')
      }

      WithApollo.displayName = 'withApollo('.concat(displayName, ')')
    }

    if (ssr || PageComponent.getInitialProps) {
      WithApollo.getInitialProps =
        /*#__PURE__*/
        (function() {
          var _ref3 = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/
            _regenerator['default'].mark(function _callee(ctx) {
              var AppTree,
                apolloClient,
                pageProps,
                _ref4,
                getDataFromTree,
                apolloState

              return _regenerator['default'].wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        AppTree = ctx.AppTree // Initialize ApolloClient, add it to the ctx object so
                        // we can use it in `PageComponent.getInitialProp`.

                        apolloClient = ctx.apolloClient = initApolloClient(
                          apolloConfig,
                          null,
                          ctx
                        ) // Run wrapped getInitialProps methods

                        pageProps = {}

                        if (!PageComponent.getInitialProps) {
                          _context.next = 7
                          break
                        }

                        _context.next = 6
                        return PageComponent.getInitialProps(ctx)

                      case 6:
                        pageProps = _context.sent

                      case 7:
                        if (!(typeof window === 'undefined')) {
                          _context.next = 24
                          break
                        }

                        if (!(ctx.res && ctx.res.finished)) {
                          _context.next = 10
                          break
                        }

                        return _context.abrupt('return', pageProps)

                      case 10:
                        if (!ssr) {
                          _context.next = 24
                          break
                        }

                        _context.prev = 11
                        _context.next = 14
                        return Promise.resolve().then(function() {
                          return (0,
                          _interopRequireWildcard2[
                            'default'
                          ])(require('@apollo/react-ssr'))
                        })

                      case 14:
                        _ref4 = _context.sent
                        getDataFromTree = _ref4.getDataFromTree
                        _context.next = 18
                        return getDataFromTree(
                          _react['default'].createElement(AppTree, {
                            pageProps: _objectSpread({}, pageProps, {
                              apolloClient: apolloClient
                            })
                          })
                        )

                      case 18:
                        _context.next = 23
                        break

                      case 20:
                        _context.prev = 20
                        _context.t0 = _context['catch'](11)
                        // Prevent Apollo Client GraphQL errors from crashing SSR.
                        // Handle them in components via the data.error prop:
                        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                        console.error(
                          'Error while running `getDataFromTree`',
                          _context.t0
                        )

                      case 23:
                        // getDataFromTree does not call componentWillUnmount
                        // head side effect therefore need to be cleared manually
                        _head['default'].rewind()

                      case 24:
                        // Extract query data from the Apollo store
                        apolloState = apolloClient.cache.extract()
                        return _context.abrupt(
                          'return',
                          _objectSpread({}, pageProps, {
                            apolloState: apolloState
                          })
                        )

                      case 26:
                      case 'end':
                        return _context.stop()
                    }
                  }
                },
                _callee,
                null,
                [[11, 20]]
              )
            })
          )

          return function(_x) {
            return _ref3.apply(this, arguments)
          }
        })()
    }

    return WithApollo
  }
}
/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */

exports['default'] = _default

function initApolloClient(apolloConfig) {
  var initialState =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var ctx = arguments.length > 2 ? arguments[2] : undefined

  if ((0, _lodash.isFunction)(apolloConfig)) {
    apolloConfig = apolloConfig(ctx)
  } // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)

  if (typeof window === 'undefined') {
    return createApolloClient(apolloConfig, initialState)
  } // Reuse client on the client-side

  if (!apolloClient) {
    apolloClient = createApolloClient(apolloConfig, initialState)
  }

  return apolloClient
}
/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */

function createApolloClient(apolloConfig) {
  var initialState =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var createCache = apolloConfig.createCache || createDefaultCache

  var config = _objectSpread(
    {
      ssrMode: typeof window === 'undefined',
      // Disables forceFetch on the server (so queries are only run once)
      cache: createCache().restore(initialState || {})
    },
    apolloConfig
  )

  delete config.createCache
  return new _apolloBoost.ApolloClient(config)
}
