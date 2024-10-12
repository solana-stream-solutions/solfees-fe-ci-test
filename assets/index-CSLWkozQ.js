var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _focused, _cleanup, _setup, _a, _online, _cleanup2, _setup2, _b, _gcTimeout, _c, _initialState, _revertState, _cache, _retryer, _defaultOptions, _abortSignalConsumed, _Query_instances, dispatch_fn, _d, _queries, _e, _observers, _mutationCache, _retryer2, _Mutation_instances, dispatch_fn2, _f, _mutations, _mutationId, _g, _queryCache, _mutationCache2, _defaultOptions2, _queryDefaults, _mutationDefaults, _mountCount, _unsubscribeFocus, _unsubscribeOnline, _h;
function _mergeNamespaces(n2, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e2 = m2[i];
    if (typeof e2 !== "string" && !Array.isArray(e2)) {
      for (const k2 in e2) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d = Object.getOwnPropertyDescriptor(e2, k2);
          if (d) {
            Object.defineProperty(n2, k2, d.get ? d : {
              enumerable: true,
              get: () => e2[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$2 = Symbol.for("react.element"), n$3 = Symbol.for("react.portal"), p$4 = Symbol.for("react.fragment"), q$3 = Symbol.for("react.strict_mode"), r$3 = Symbol.for("react.profiler"), t$3 = Symbol.for("react.provider"), u$2 = Symbol.for("react.context"), v$2 = Symbol.for("react.forward_ref"), w$1 = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e2) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e2 || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e2) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e2 || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e2) {
  var d, c = {}, k2 = null, h2 = null;
  if (null != b) for (d in void 0 !== b.ref && (h2 = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e2;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$2, type: a, key: k2, ref: h2, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$2, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$2;
}
function escape$1(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape$1("" + a.key) : b.toString(36);
}
function R$1(a, b, e2, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h2 = false;
  if (null === a) h2 = true;
  else switch (k2) {
    case "string":
    case "number":
      h2 = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$2:
        case n$3:
          h2 = true;
      }
  }
  if (h2) return h2 = a, c = c(h2), a = "" === d ? "." + Q$1(h2, 0) : d, I$1(c) ? (e2 = "", null != a && (e2 = a.replace(P$1, "$&/") + "/"), R$1(c, b, e2, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e2 + (!c.key || h2 && h2.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h2 = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h2 += R$1(k2, b, e2, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h2 += R$1(k2, b, e2, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$1(a, b, e2) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e2, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e2) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e2);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$4;
react_production_min.Profiler = r$3;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$3;
react_production_min.Suspense = w$1;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e2) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h2 = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h2 = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e2;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$2, type: a.type, key: c, ref: k2, props: d, _owner: h2 };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u$2, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t$3, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$2, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e2) {
  return U$1.current.useImperativeHandle(a, b, e2);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e2) {
  return U$1.current.useReducer(a, b, e2);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e2) {
  return U$1.current.useSyncExternalStore(a, b, e2);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k$1 = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$2 = Object.prototype.hasOwnProperty, n$2 = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$3 = { key: true, ref: true, __self: true, __source: true };
function q$2(c, a, g) {
  var b, d = {}, e2 = null, h2 = null;
  void 0 !== g && (e2 = "" + g);
  void 0 !== a.key && (e2 = "" + a.key);
  void 0 !== a.ref && (h2 = a.ref);
  for (b in a) m$2.call(a, b) && !p$3.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k$1, type: c, key: e2, ref: h2, props: d, _owner: n$2.current };
}
reactJsxRuntime_production_min.Fragment = l$1;
reactJsxRuntime_production_min.jsx = q$2;
reactJsxRuntime_production_min.jsxs = q$2;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
const pushStateEvent = "pushstate";
const popStateEvent = "popstate";
const beforeUnloadEvent = "beforeunload";
const beforeUnloadListener = (event) => {
  event.preventDefault();
  return event.returnValue = "";
};
const stopBlocking = () => {
  removeEventListener(beforeUnloadEvent, beforeUnloadListener, {
    capture: true
  });
};
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  let blockers = [];
  const notify = () => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber());
  };
  const tryNavigation = async (task, navigateOpts) => {
    var _a2;
    const ignoreBlocker = (navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false;
    if (!ignoreBlocker && typeof document !== "undefined" && blockers.length) {
      for (const blocker of blockers) {
        const allowed = await blocker();
        if (!allowed) {
          (_a2 = opts.onBlocked) == null ? void 0 : _a2.call(opts, notify);
          return;
        }
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    subscribers,
    subscribe: (cb2) => {
      subscribers.add(cb2);
      return () => {
        subscribers.delete(cb2);
      };
    },
    push: (path2, state, navigateOpts) => {
      state = assignKey(state);
      tryNavigation(() => {
        opts.pushState(path2, state);
        notify();
      }, navigateOpts);
    },
    replace: (path2, state, navigateOpts) => {
      state = assignKey(state);
      tryNavigation(() => {
        opts.replaceState(path2, state);
        notify();
      }, navigateOpts);
    },
    go: (index2, navigateOpts) => {
      tryNavigation(() => {
        opts.go(index2);
        notify();
      }, navigateOpts);
    },
    back: (navigateOpts) => {
      tryNavigation(() => {
        opts.back();
        notify();
      }, navigateOpts);
    },
    forward: (navigateOpts) => {
      tryNavigation(() => {
        opts.forward();
        notify();
      }, navigateOpts);
    },
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      blockers.push(blocker);
      if (blockers.length === 1) {
        addEventListener(beforeUnloadEvent, beforeUnloadListener, {
          capture: true
        });
      }
      return () => {
        blockers = blockers.filter((b) => b !== blocker);
        if (!blockers.length) {
          stopBlocking();
        }
      };
    },
    flush: () => {
      var _a2;
      return (_a2 = opts.flush) == null ? void 0 : _a2.call(opts);
    },
    destroy: () => {
      var _a2;
      return (_a2 = opts.destroy) == null ? void 0 : _a2.call(opts);
    },
    notify
  };
}
function assignKey(state) {
  if (!state) {
    state = {};
  }
  return {
    ...state,
    key: createRandomKey()
  };
}
function createBrowserHistory(opts) {
  const win = typeof document !== "undefined" ? window : void 0;
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  const createHref = (path2) => path2;
  const parseLocation = () => parseHref(
    `${win.location.pathname}${win.location.search}${win.location.hash}`,
    win.history.state
  );
  let currentLocation = parseLocation();
  let rollbackLocation;
  const getLocation = () => currentLocation;
  let next;
  let scheduled;
  const flush = () => {
    if (!next) {
      return;
    }
    history._ignoreSubscribers = true;
    (next.isPush ? win.history.pushState : win.history.replaceState)(
      next.state,
      "",
      next.href
    );
    history._ignoreSubscribers = false;
    next = void 0;
    scheduled = void 0;
    rollbackLocation = void 0;
  };
  const queueHistoryAction = (type, destHref, state) => {
    const href = createHref(destHref);
    if (!scheduled) {
      rollbackLocation = currentLocation;
    }
    currentLocation = parseHref(destHref, state);
    next = {
      href,
      state,
      isPush: (next == null ? void 0 : next.isPush) || type === "push"
    };
    if (!scheduled) {
      scheduled = Promise.resolve().then(() => flush());
    }
  };
  const onPushPop = () => {
    currentLocation = parseLocation();
    history.notify();
  };
  const history = createHistory({
    getLocation,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: () => win.history.back(),
    forward: () => win.history.forward(),
    go: (n2) => win.history.go(n2),
    createHref: (href) => createHref(href),
    flush,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(pushStateEvent, onPushPop);
      win.removeEventListener(popStateEvent, onPushPop);
    },
    onBlocked: (onUpdate) => {
      if (rollbackLocation && currentLocation !== rollbackLocation) {
        currentLocation = rollbackLocation;
        onUpdate();
      }
    }
  });
  win.addEventListener(pushStateEvent, onPushPop);
  win.addEventListener(popStateEvent, onPushPop);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop();
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop();
    return res;
  };
  return history;
}
function createMemoryHistory(opts = {
  initialEntries: ["/"]
}) {
  const entries = opts.initialEntries;
  let index2 = opts.initialIndex ?? entries.length - 1;
  let currentState = {
    key: createRandomKey()
  };
  const getLocation = () => parseHref(entries[index2], currentState);
  return createHistory({
    getLocation,
    pushState: (path2, state) => {
      currentState = state;
      entries.splice;
      if (index2 < entries.length - 1) {
        entries.splice(index2 + 1);
      }
      entries.push(path2);
      index2 = Math.max(entries.length - 1, 0);
    },
    replaceState: (path2, state) => {
      currentState = state;
      entries[index2] = path2;
    },
    back: () => {
      currentState = assignKey(currentState);
      index2 = Math.max(index2 - 1, 0);
    },
    forward: () => {
      currentState = assignKey(currentState);
      index2 = Math.min(index2 + 1, entries.length - 1);
    },
    go: (n2) => {
      currentState = assignKey(currentState);
      index2 = Math.min(Math.max(index2 + n2, 0), entries.length - 1);
    },
    createHref: (path2) => path2
  });
}
function parseHref(href, state) {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");
  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search: searchIndex > -1 ? href.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || {}
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  {
    throw new Error(prefix);
  }
}
function warning(condition, message) {
}
const routerContext = reactExports.createContext(null);
function getRouterContext() {
  if (typeof document === "undefined") {
    return routerContext;
  }
  if (window.__TSR_ROUTER_CONTEXT__) {
    return window.__TSR_ROUTER_CONTEXT__;
  }
  window.__TSR_ROUTER_CONTEXT__ = routerContext;
  return routerContext;
}
function useRouter(opts) {
  const value = reactExports.useContext(getRouterContext());
  warning(
    !(((opts == null ? void 0 : opts.warn) ?? true) && !value)
  );
  return value;
}
var withSelector = { exports: {} };
var withSelector_production_min = {};
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e = reactExports;
function h$1(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var k = "function" === typeof Object.is ? Object.is : h$1, l = e.useState, m$1 = e.useEffect, n$1 = e.useLayoutEffect, p$2 = e.useDebugValue;
function q$1(a, b) {
  var d = b(), f2 = l({ inst: { value: d, getSnapshot: b } }), c = f2[0].inst, g = f2[1];
  n$1(function() {
    c.value = d;
    c.getSnapshot = b;
    r$2(c) && g({ inst: c });
  }, [a, d, b]);
  m$1(function() {
    r$2(c) && g({ inst: c });
    return a(function() {
      r$2(c) && g({ inst: c });
    });
  }, [a]);
  p$2(d);
  return d;
}
function r$2(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var d = b();
    return !k(a, d);
  } catch (f2) {
    return true;
  }
}
function t$2(a, b) {
  return b();
}
var u$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t$2 : q$1;
useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e.useSyncExternalStore ? e.useSyncExternalStore : u$1;
{
  shim.exports = useSyncExternalStoreShim_production_min;
}
var shimExports = shim.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h = reactExports, n = shimExports;
function p$1(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var q = "function" === typeof Object.is ? Object.is : p$1, r$1 = n.useSyncExternalStore, t$1 = h.useRef, u = h.useEffect, v$1 = h.useMemo, w = h.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector = function(a, b, e2, l2, g) {
  var c = t$1(null);
  if (null === c.current) {
    var f2 = { hasValue: false, value: null };
    c.current = f2;
  } else f2 = c.current;
  c = v$1(function() {
    function a2(a3) {
      if (!c2) {
        c2 = true;
        d2 = a3;
        a3 = l2(a3);
        if (void 0 !== g && f2.hasValue) {
          var b2 = f2.value;
          if (g(b2, a3)) return k2 = b2;
        }
        return k2 = a3;
      }
      b2 = k2;
      if (q(d2, a3)) return b2;
      var e3 = l2(a3);
      if (void 0 !== g && g(b2, e3)) return b2;
      d2 = a3;
      return k2 = e3;
    }
    var c2 = false, d2, k2, m2 = void 0 === e2 ? null : e2;
    return [function() {
      return a2(b());
    }, null === m2 ? void 0 : function() {
      return a2(m2());
    }];
  }, [b, e2, l2, g]);
  var d = r$1(a, c[0], c[1]);
  u(function() {
    f2.hasValue = true;
    f2.value = d;
  }, [d]);
  w(d);
  return d;
};
{
  withSelector.exports = withSelector_production_min;
}
var withSelectorExports = withSelector.exports;
const useSyncExternalStoreExports = /* @__PURE__ */ getDefaultExportFromCjs(withSelectorExports);
class Store {
  constructor(initialState, options) {
    this.listeners = /* @__PURE__ */ new Set();
    this._batching = false;
    this._flushing = 0;
    this.subscribe = (listener) => {
      var _a2, _b2;
      this.listeners.add(listener);
      const unsub = (_b2 = (_a2 = this.options) == null ? void 0 : _a2.onSubscribe) == null ? void 0 : _b2.call(_a2, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.setState = (updater) => {
      var _a2, _b2, _c2;
      const previous = this.state;
      this.state = ((_a2 = this.options) == null ? void 0 : _a2.updateFn) ? this.options.updateFn(previous)(updater) : updater(previous);
      (_c2 = (_b2 = this.options) == null ? void 0 : _b2.onUpdate) == null ? void 0 : _c2.call(_b2);
      this._flush();
    };
    this._flush = () => {
      if (this._batching) return;
      const flushId = ++this._flushing;
      this.listeners.forEach((listener) => {
        if (this._flushing !== flushId) return;
        listener();
      });
    };
    this.batch = (cb2) => {
      if (this._batching) return cb2();
      this._batching = true;
      cb2();
      this._batching = false;
      this._flush();
    };
    this.state = initialState;
    this.options = options;
  }
}
function useStore$1(store, selector = (d) => d) {
  const slice2 = withSelectorExports.useSyncExternalStoreWithSelector(
    store.subscribe,
    () => store.state,
    () => store.state,
    selector,
    shallow
  );
  return slice2;
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
const rootRouteId = "__root__";
function encode(obj, pfx) {
  let k2, i, tmp, str = "";
  for (k2 in obj) {
    if ((tmp = obj[k2]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i = 0; i < tmp.length; i++) {
          str && (str += "&");
          str += encodeURIComponent(k2) + "=" + encodeURIComponent(tmp[i]);
        }
      } else {
        str && (str += "&");
        str += encodeURIComponent(k2) + "=" + encodeURIComponent(tmp);
      }
    }
  }
  return "" + str;
}
function toValue(mix) {
  if (!mix) return "";
  const str = decodeURIComponent(mix);
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str, pfx) {
  let tmp, k2;
  const out = {}, arr = str.split("&");
  while (tmp = arr.shift()) {
    const equalIndex = tmp.indexOf("=");
    if (equalIndex !== -1) {
      k2 = tmp.slice(0, equalIndex);
      const value = tmp.slice(equalIndex + 1);
      if (out[k2] !== void 0) {
        out[k2] = [].concat(out[k2], toValue(value));
      } else {
        out[k2] = toValue(value);
      }
    } else {
      k2 = tmp;
      out[k2] = "";
    }
  }
  return out;
}
const defaultParseSearch = parseSearchWith(JSON.parse);
const defaultStringifySearch = stringifySearchWith(
  JSON.stringify,
  JSON.parse
);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr.substring(0, 1) === "?") {
      searchStr = searchStr.substring(1);
    }
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") {
        try {
          query[key] = parser(value);
        } catch (err) {
        }
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) {
      try {
        return stringify(val);
      } catch (err) {
      }
    } else if (typeof val === "string" && typeof parser === "function") {
      try {
        parser(val);
        return stringify(val);
      } catch (err) {
      }
    }
    return val;
  }
  return (search) => {
    search = { ...search };
    Object.keys(search).forEach((key) => {
      const val = search[key];
      if (typeof val === "undefined" || val === void 0) {
        delete search[key];
      } else {
        search[key] = stringifyValue(val);
      }
    });
    const searchStr = encode(search).toString();
    return searchStr ? `?${searchStr}` : "";
  };
}
function last(arr) {
  return arr[arr.length - 1];
}
function isFunction(d) {
  return typeof d === "function";
}
function functionalUpdate$1(updater, previous) {
  if (isFunction(updater)) {
    return updater(previous);
  }
  return updater;
}
function pick$1(parent, keys) {
  return keys.reduce((obj, key) => {
    obj[key] = parent[key];
    return obj;
  }, {});
}
function replaceEqualDeep$1(prev, _next) {
  if (prev === _next) {
    return prev;
  }
  const next = _next;
  const array = isPlainArray$1(prev) && isPlainArray$1(next);
  if (array || isPlainObject$1(prev) && isPlainObject$1(next)) {
    const prevItems = array ? prev : Object.keys(prev);
    const prevSize = prevItems.length;
    const nextItems = array ? next : Object.keys(next);
    const nextSize = nextItems.length;
    const copy2 = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < nextSize; i++) {
      const key = array ? i : nextItems[i];
      if ((!array && prevItems.includes(key) || array) && prev[key] === void 0 && next[key] === void 0) {
        copy2[key] = void 0;
        equalItems++;
      } else {
        copy2[key] = replaceEqualDeep$1(prev[key], next[key]);
        if (copy2[key] === prev[key] && prev[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return prevSize === nextSize && equalItems === prevSize ? prev : copy2;
  }
  return next;
}
function isPlainObject$1(o) {
  if (!hasObjectPrototype$1(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype$1(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype$1(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainArray$1(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function deepEqual(a, b, partial = false) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (isPlainObject$1(a) && isPlainObject$1(b)) {
    const aKeys = Object.keys(a).filter((key) => a[key] !== void 0);
    const bKeys = Object.keys(b).filter((key) => b[key] !== void 0);
    if (!partial && aKeys.length !== bKeys.length) {
      return false;
    }
    return !bKeys.some(
      (key) => !(key in a) || !deepEqual(a[key], b[key], partial)
    );
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return !a.some((item, index2) => !deepEqual(item, b[index2], partial));
  }
  return false;
}
const useLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function createControlledPromise(onResolve) {
  let resolveLoadPromise;
  let rejectLoadPromise;
  const controlledPromise = new Promise((resolve, reject) => {
    resolveLoadPromise = resolve;
    rejectLoadPromise = reject;
  });
  controlledPromise.status = "pending";
  controlledPromise.resolve = (value) => {
    controlledPromise.status = "resolved";
    controlledPromise.value = value;
    resolveLoadPromise(value);
    onResolve == null ? void 0 : onResolve(value);
  };
  controlledPromise.reject = (e2) => {
    controlledPromise.status = "rejected";
    rejectLoadPromise(e2);
  };
  return controlledPromise;
}
function usePrevious(value) {
  const ref = reactExports.useRef({
    value,
    prev: null
  });
  const current = ref.current.value;
  if (value !== current) {
    ref.current = {
      value,
      prev: current
    };
  }
  return ref.current.prev;
}
function joinPaths(paths) {
  return cleanPath(
    paths.filter((val) => {
      return val !== void 0;
    }).join("/")
  );
}
function cleanPath(path2) {
  return path2.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path2) {
  return path2 === "/" ? path2 : path2.replace(/^\/{1,}/, "");
}
function trimPathRight(path2) {
  return path2 === "/" ? path2 : path2.replace(/\/{1,}$/, "");
}
function trimPath(path2) {
  return trimPathRight(trimPathLeft(path2));
}
function resolvePath({
  basepath,
  base,
  to,
  trailingSlash = "never"
}) {
  var _a2, _b2;
  base = removeBasepath(basepath, base);
  to = removeBasepath(basepath, to);
  let baseSegments = parsePathname(base);
  const toSegments = parsePathname(to);
  if (baseSegments.length > 1 && ((_a2 = last(baseSegments)) == null ? void 0 : _a2.value) === "/") {
    baseSegments.pop();
  }
  toSegments.forEach((toSegment, index2) => {
    if (toSegment.value === "/") {
      if (!index2) {
        baseSegments = [toSegment];
      } else if (index2 === toSegments.length - 1) {
        baseSegments.push(toSegment);
      } else ;
    } else if (toSegment.value === "..") {
      baseSegments.pop();
    } else if (toSegment.value === ".") ;
    else {
      baseSegments.push(toSegment);
    }
  });
  if (baseSegments.length > 1) {
    if (((_b2 = last(baseSegments)) == null ? void 0 : _b2.value) === "/") {
      if (trailingSlash === "never") {
        baseSegments.pop();
      }
    } else if (trailingSlash === "always") {
      baseSegments.push({ type: "pathname", value: "/" });
    }
  }
  const joined = joinPaths([basepath, ...baseSegments.map((d) => d.value)]);
  return cleanPath(joined);
}
function parsePathname(pathname) {
  if (!pathname) {
    return [];
  }
  pathname = cleanPath(pathname);
  const segments = [];
  if (pathname.slice(0, 1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  if (!pathname) {
    return segments;
  }
  const split = pathname.split("/").filter(Boolean);
  segments.push(
    ...split.map((part) => {
      if (part === "$" || part === "*") {
        return {
          type: "wildcard",
          value: part
        };
      }
      if (part.charAt(0) === "$") {
        return {
          type: "param",
          value: part
        };
      }
      return {
        type: "pathname",
        value: decodeURIComponent(part)
      };
    })
  );
  if (pathname.slice(-1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  return segments;
}
function interpolatePath({
  path: path2,
  params,
  leaveWildcards,
  leaveParams
}) {
  const interpolatedPathSegments = parsePathname(path2);
  const encodedParams = {};
  for (const [key, value] of Object.entries(params)) {
    const isValueString = typeof value === "string";
    if (["*", "_splat"].includes(key)) {
      encodedParams[key] = isValueString ? encodeURI(value) : value;
    } else {
      encodedParams[key] = isValueString ? encodeURIComponent(value) : value;
    }
  }
  return joinPaths(
    interpolatedPathSegments.map((segment) => {
      if (segment.type === "wildcard") {
        const value = encodedParams._splat;
        if (leaveWildcards) return `${segment.value}${value ?? ""}`;
        return value;
      }
      if (segment.type === "param") {
        if (leaveParams) {
          const value = encodedParams[segment.value];
          return `${segment.value}${value ?? ""}`;
        }
        return encodedParams[segment.value.substring(1)] ?? "undefined";
      }
      return segment.value;
    })
  );
}
function matchPathname(basepath, currentPathname, matchLocation) {
  const pathParams = matchByPath(basepath, currentPathname, matchLocation);
  if (matchLocation.to && !pathParams) {
    return;
  }
  return pathParams ?? {};
}
function removeBasepath(basepath, pathname) {
  switch (true) {
    case basepath === "/":
      return pathname;
    case pathname === basepath:
      return "";
    case pathname.length < basepath.length:
      return pathname;
    case pathname[basepath.length] !== "/":
      return pathname;
    case pathname.startsWith(basepath):
      return pathname.slice(basepath.length);
    default:
      return pathname;
  }
}
function matchByPath(basepath, from, matchLocation) {
  from = removeBasepath(basepath, from);
  const to = removeBasepath(basepath, `${matchLocation.to ?? "$"}`);
  const baseSegments = parsePathname(from);
  const routeSegments = parsePathname(to);
  if (!from.startsWith("/")) {
    baseSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  if (!to.startsWith("/")) {
    routeSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  const params = {};
  const isMatch = (() => {
    for (let i = 0; i < Math.max(baseSegments.length, routeSegments.length); i++) {
      const baseSegment = baseSegments[i];
      const routeSegment = routeSegments[i];
      const isLastBaseSegment = i >= baseSegments.length - 1;
      const isLastRouteSegment = i >= routeSegments.length - 1;
      if (routeSegment) {
        if (routeSegment.type === "wildcard") {
          const _splat = decodeURI(
            joinPaths(baseSegments.slice(i).map((d) => d.value))
          );
          params["*"] = _splat;
          params["_splat"] = _splat;
          return true;
        }
        if (routeSegment.type === "pathname") {
          if (routeSegment.value === "/" && !(baseSegment == null ? void 0 : baseSegment.value)) {
            return true;
          }
          if (baseSegment) {
            if (matchLocation.caseSensitive) {
              if (routeSegment.value !== baseSegment.value) {
                return false;
              }
            } else if (routeSegment.value.toLowerCase() !== baseSegment.value.toLowerCase()) {
              return false;
            }
          }
        }
        if (!baseSegment) {
          return false;
        }
        if (routeSegment.type === "param") {
          if (baseSegment.value === "/") {
            return false;
          }
          if (baseSegment.value.charAt(0) !== "$") {
            params[routeSegment.value.substring(1)] = decodeURIComponent(
              baseSegment.value
            );
          }
        }
      }
      if (!isLastBaseSegment && isLastRouteSegment) {
        params["**"] = joinPaths(baseSegments.slice(i + 1).map((d) => d.value));
        return !!matchLocation.fuzzy && (routeSegment == null ? void 0 : routeSegment.value) !== "/";
      }
    }
    return true;
  })();
  return isMatch ? params : void 0;
}
function isRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect);
}
function isResolvedRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect) && obj.href;
}
function CatchBoundary(props2) {
  const errorComponent = props2.errorComponent ?? ErrorComponent;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CatchBoundaryImpl,
    {
      getResetKey: props2.getResetKey,
      onCatch: props2.onCatch,
      children: ({ error, reset }) => {
        if (error) {
          return reactExports.createElement(errorComponent, {
            error,
            reset
          });
        }
        return props2.children;
      }
    }
  );
}
class CatchBoundaryImpl extends reactExports.Component {
  constructor() {
    super(...arguments);
    this.state = { error: null };
  }
  static getDerivedStateFromProps(props2) {
    return { resetKey: props2.getResetKey() };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.error && prevState.resetKey !== this.state.resetKey) {
      this.reset();
    }
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onCatch) {
      this.props.onCatch(error, errorInfo);
    }
  }
  render() {
    return this.props.children({
      error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error,
      reset: () => {
        this.reset();
      }
    });
  }
}
function ErrorComponent({ error }) {
  const [show, setShow] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: ".5rem", maxWidth: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: {
            appearance: "none",
            fontSize: ".6em",
            border: "1px solid currentColor",
            padding: ".1rem .2rem",
            fontWeight: "bold",
            borderRadius: ".25rem"
          },
          onClick: () => setShow((d) => !d),
          children: show ? "Hide Error" : "Show Error"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: ".25rem" } }),
    show ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pre",
      {
        style: {
          fontSize: ".7em",
          border: "1px solid red",
          borderRadius: ".25rem",
          padding: ".3rem",
          color: "red",
          overflow: "auto"
        },
        children: error.message ? /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: error.message }) : null
      }
    ) }) : null
  ] });
}
function useRouterState(opts) {
  const contextRouter = useRouter({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  return useStore$1(((opts == null ? void 0 : opts.router) || contextRouter).__store, opts == null ? void 0 : opts.select);
}
function isNotFound(obj) {
  return !!(obj == null ? void 0 : obj.isNotFound);
}
function CatchNotFound(props2) {
  const resetKey = useRouterState({
    select: (s) => `not-found-${s.location.pathname}-${s.status}`
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CatchBoundary,
    {
      getResetKey: () => resetKey,
      onCatch: (error, errorInfo) => {
        var _a2;
        if (isNotFound(error)) {
          (_a2 = props2.onCatch) == null ? void 0 : _a2.call(props2, error, errorInfo);
        } else {
          throw error;
        }
      },
      errorComponent: ({ error }) => {
        var _a2;
        return (_a2 = props2.fallback) == null ? void 0 : _a2.call(props2, error);
      },
      children: props2.children
    }
  );
}
function DefaultGlobalNotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Not Found" });
}
const defaultTransformer = {
  stringify: (value) => JSON.stringify(value, function replacer(key, value2) {
    const keyVal = this[key];
    const transformer = transformers.find((t2) => t2.stringifyCondition(keyVal));
    if (transformer) {
      return transformer.stringify(keyVal);
    }
    return value2;
  }),
  parse: (value) => JSON.parse(value, function parser(key, value2) {
    const keyVal = this[key];
    const transformer = transformers.find((t2) => t2.parseCondition(keyVal));
    if (transformer) {
      return transformer.parse(keyVal);
    }
    return value2;
  })
};
const transformers = [
  {
    // Dates
    stringifyCondition: (value) => value instanceof Date,
    stringify: (value) => ({ $date: value.toISOString() }),
    parseCondition: (value) => isPlainObject$1(value) && value.$date,
    parse: (value) => new Date(value.$date)
  },
  {
    // undefined
    stringifyCondition: (value) => value === void 0,
    stringify: () => ({ $undefined: "" }),
    parseCondition: (value) => isPlainObject$1(value) && value.$undefined === "",
    parse: () => void 0
  }
];
const componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function createRouter(options) {
  return new Router(options);
}
class Router {
  /**
   * @deprecated Use the `createRouter` function instead
   */
  constructor(options) {
    this.tempLocationKey = `${Math.round(
      Math.random() * 1e7
    )}`;
    this.resetNextScroll = true;
    this.shouldViewTransition = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.startReactTransition = (fn) => fn();
    this.update = (newOptions) => {
      if (newOptions.notFoundRoute) {
        console.warn(
          "The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/guide/not-found-errors#migrating-from-notfoundroute for more info."
        );
      }
      const previousOptions = this.options;
      this.options = {
        ...this.options,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      if (!this.basepath || newOptions.basepath && newOptions.basepath !== previousOptions.basepath) {
        if (newOptions.basepath === void 0 || newOptions.basepath === "" || newOptions.basepath === "/") {
          this.basepath = "/";
        } else {
          this.basepath = `/${trimPath(newOptions.basepath)}`;
        }
      }
      if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        !this.history || this.options.history && this.options.history !== this.history
      ) {
        this.history = this.options.history ?? (this.isServer ? createMemoryHistory({
          initialEntries: [this.basepath || "/"]
        }) : createBrowserHistory());
        this.latestLocation = this.parseLocation();
      }
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        this.buildRouteTree();
      }
      if (!this.__store) {
        this.__store = new Store(getInitialRouterState(this.latestLocation), {
          onUpdate: () => {
            this.__store.state = {
              ...this.state,
              cachedMatches: this.state.cachedMatches.filter(
                (d) => !["redirected"].includes(d.status)
              )
            };
          }
        });
      }
    };
    this.buildRouteTree = () => {
      this.routesById = {};
      this.routesByPath = {};
      const notFoundRoute = this.options.notFoundRoute;
      if (notFoundRoute) {
        notFoundRoute.init({ originalIndex: 99999999999 });
        this.routesById[notFoundRoute.id] = notFoundRoute;
      }
      const recurseRoutes = (childRoutes) => {
        childRoutes.forEach((childRoute, i) => {
          childRoute.init({ originalIndex: i });
          const existingRoute = this.routesById[childRoute.id];
          invariant(
            !existingRoute,
            `Duplicate routes found with id: ${String(childRoute.id)}`
          );
          this.routesById[childRoute.id] = childRoute;
          if (!childRoute.isRoot && childRoute.path) {
            const trimmedFullPath = trimPathRight(childRoute.fullPath);
            if (!this.routesByPath[trimmedFullPath] || childRoute.fullPath.endsWith("/")) {
              this.routesByPath[trimmedFullPath] = childRoute;
            }
          }
          const children = childRoute.children;
          if (children == null ? void 0 : children.length) {
            recurseRoutes(children);
          }
        });
      };
      recurseRoutes([this.routeTree]);
      const scoredRoutes = [];
      const routes = Object.values(this.routesById);
      routes.forEach((d, i) => {
        var _a2;
        if (d.isRoot || !d.path) {
          return;
        }
        const trimmed = trimPathLeft(d.fullPath);
        const parsed = parsePathname(trimmed);
        while (parsed.length > 1 && ((_a2 = parsed[0]) == null ? void 0 : _a2.value) === "/") {
          parsed.shift();
        }
        const scores = parsed.map((segment) => {
          if (segment.value === "/") {
            return 0.75;
          }
          if (segment.type === "param") {
            return 0.5;
          }
          if (segment.type === "wildcard") {
            return 0.25;
          }
          return 1;
        });
        scoredRoutes.push({ child: d, trimmed, parsed, index: i, scores });
      });
      this.flatRoutes = scoredRoutes.sort((a, b) => {
        const minLength = Math.min(a.scores.length, b.scores.length);
        for (let i = 0; i < minLength; i++) {
          if (a.scores[i] !== b.scores[i]) {
            return b.scores[i] - a.scores[i];
          }
        }
        if (a.scores.length !== b.scores.length) {
          return b.scores.length - a.scores.length;
        }
        for (let i = 0; i < minLength; i++) {
          if (a.parsed[i].value !== b.parsed[i].value) {
            return a.parsed[i].value > b.parsed[i].value ? 1 : -1;
          }
        }
        return a.index - b.index;
      }).map((d, i) => {
        d.child.rank = i;
        return d.child;
      });
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) {
          listener.fn(routerEvent);
        }
      });
    };
    this.parseLocation = (previousLocation) => {
      const parse = ({
        pathname,
        search,
        hash,
        state
      }) => {
        const parsedSearch = this.options.parseSearch(search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        return {
          pathname,
          searchStr,
          search: replaceEqualDeep$1(previousLocation == null ? void 0 : previousLocation.search, parsedSearch),
          hash: hash.split("#").reverse()[0] ?? "",
          href: `${pathname}${searchStr}${hash}`,
          state: replaceEqualDeep$1(previousLocation == null ? void 0 : previousLocation.state, state)
        };
      };
      const location = parse(this.history.location);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path2) => {
      const resolvedPath = resolvePath({
        basepath: this.basepath,
        base: from,
        to: cleanPath(path2),
        trailingSlash: this.options.trailingSlash
      });
      return resolvedPath;
    };
    this.cancelMatch = (id2) => {
      const match = this.getMatch(id2);
      if (!match) return;
      match.abortController.abort();
      clearTimeout(match.pendingTimeout);
    };
    this.cancelMatches = () => {
      var _a2;
      (_a2 = this.state.pendingMatches) == null ? void 0 : _a2.forEach((match) => {
        this.cancelMatch(match.id);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}, matches) => {
        var _a2, _b2, _c2;
        const fromMatches = dest._fromLocation != null ? this.matchRoutes({
          ...dest._fromLocation,
          search: dest.fromSearch || dest._fromLocation.search
        }) : this.state.matches;
        const fromMatch = dest.from != null ? fromMatches.find(
          (d) => matchPathname(this.basepath, trimPathRight(d.pathname), {
            to: dest.from,
            caseSensitive: false,
            fuzzy: false
          })
        ) : void 0;
        const fromPath = (fromMatch == null ? void 0 : fromMatch.pathname) || this.latestLocation.pathname;
        invariant(
          dest.from == null || fromMatch != null,
          "Could not find match for from: " + dest.from
        );
        const fromSearch = ((_a2 = last(fromMatches)) == null ? void 0 : _a2.search) || this.latestLocation.search;
        const stayingMatches = matches == null ? void 0 : matches.filter(
          (d) => fromMatches.find((e2) => e2.routeId === d.routeId)
        );
        const fromRouteByFromPathRouteId = this.routesById[(_b2 = stayingMatches == null ? void 0 : stayingMatches.find((d) => d.pathname === fromPath)) == null ? void 0 : _b2.routeId];
        let pathname = dest.to ? this.resolvePathWithBase(fromPath, `${dest.to}`) : this.resolvePathWithBase(
          fromPath,
          (fromRouteByFromPathRouteId == null ? void 0 : fromRouteByFromPathRouteId.to) ?? fromPath
        );
        const prevParams = { ...(_c2 = last(fromMatches)) == null ? void 0 : _c2.params };
        let nextParams = (dest.params ?? true) === true ? prevParams : { ...prevParams, ...functionalUpdate$1(dest.params, prevParams) };
        if (Object.keys(nextParams).length > 0) {
          matches == null ? void 0 : matches.map((d) => {
            var _a22;
            const route = this.looseRoutesById[d.routeId];
            return ((_a22 = route == null ? void 0 : route.options.params) == null ? void 0 : _a22.stringify) ?? route.options.stringifyParams;
          }).filter(Boolean).forEach((fn) => {
            nextParams = { ...nextParams, ...fn(nextParams) };
          });
        }
        pathname = interpolatePath({
          path: pathname,
          params: nextParams ?? {},
          leaveWildcards: false,
          leaveParams: opts.leaveParams
        });
        const preSearchFilters = (stayingMatches == null ? void 0 : stayingMatches.map(
          (match) => this.looseRoutesById[match.routeId].options.preSearchFilters ?? []
        ).flat().filter(Boolean)) ?? [];
        const postSearchFilters = (stayingMatches == null ? void 0 : stayingMatches.map(
          (match) => this.looseRoutesById[match.routeId].options.postSearchFilters ?? []
        ).flat().filter(Boolean)) ?? [];
        const preFilteredSearch = preSearchFilters.length ? preSearchFilters.reduce((prev, next) => next(prev), fromSearch) : fromSearch;
        const destSearch = dest.search === true ? preFilteredSearch : dest.search ? functionalUpdate$1(dest.search, preFilteredSearch) : preSearchFilters.length ? preFilteredSearch : {};
        const postFilteredSearch = postSearchFilters.length ? postSearchFilters.reduce((prev, next) => next(prev), destSearch) : destSearch;
        const search = replaceEqualDeep$1(fromSearch, postFilteredSearch);
        const searchStr = this.options.stringifySearch(search);
        const hash = dest.hash === true ? this.latestLocation.hash : dest.hash ? functionalUpdate$1(dest.hash, this.latestLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? this.latestLocation.state : dest.state ? functionalUpdate$1(dest.state, this.latestLocation.state) : {};
        nextState = replaceEqualDeep$1(this.latestLocation.state, nextState);
        return {
          pathname,
          search,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          href: `${pathname}${searchStr}${hashStr}`,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        var _a2;
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          let params = {};
          const foundMask = (_a2 = this.options.routeMasks) == null ? void 0 : _a2.find((d) => {
            const match = matchPathname(this.basepath, next.pathname, {
              to: d.from,
              caseSensitive: false,
              fuzzy: false
            });
            if (match) {
              params = match;
              return true;
            }
            return false;
          });
          if (foundMask) {
            const { from, ...maskProps } = foundMask;
            maskedDest = {
              ...pick$1(opts, ["from"]),
              ...maskProps,
              params
            };
            maskedNext = build(maskedDest);
          }
        }
        const nextMatches = this.matchRoutes(next);
        const maskedMatches = maskedNext ? this.matchRoutes(maskedNext) : void 0;
        const maskedFinal = maskedNext ? build(maskedDest, maskedMatches) : void 0;
        const final = build(dest, nextMatches);
        if (maskedFinal) {
          final.maskedLocation = maskedFinal;
        }
        return final;
      };
      if (opts.mask) {
        return buildWithMatches(opts, {
          ...pick$1(opts, ["from"]),
          ...opts.mask
        });
      }
      return buildWithMatches(opts);
    };
    this.commitLocation = ({
      viewTransition,
      ignoreBlocker,
      ...next
    }) => {
      const isSameState = () => {
        next.state.key = this.latestLocation.state.key;
        const isEqual = deepEqual(next.state, this.latestLocation.state);
        delete next.state.key;
        return isEqual;
      };
      const isSameUrl = this.latestLocation.href === next.href;
      const previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = createControlledPromise(() => {
        previousCommitPromise == null ? void 0 : previousCommitPromise.resolve();
      });
      if (isSameUrl && isSameState()) {
        this.load();
      } else {
        let { maskedLocation, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) {
            nextHistory.state.__tempKey = this.tempLocationKey;
          }
        }
        this.shouldViewTransition = viewTransition;
        this.history[next.replace ? "replace" : "push"](
          nextHistory.href,
          nextHistory.state,
          { ignoreBlocker }
        );
      }
      this.resetNextScroll = next.resetScroll ?? true;
      if (!this.history.subscribers.size) {
        this.load();
      }
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({
      replace,
      resetScroll,
      viewTransition,
      ignoreBlocker,
      ...rest
    } = {}) => {
      const href = rest.href;
      if (href) {
        const parsed = parseHref(href, {});
        rest.to = parsed.pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash;
      }
      const location = this.buildLocation(rest);
      return this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        ignoreBlocker
      });
    };
    this.navigate = ({ to, __isRedirect, ...rest }) => {
      const toString2 = String(to);
      let isExternal;
      try {
        new URL(`${toString2}`);
        isExternal = true;
      } catch (e2) {
      }
      invariant(
        !isExternal
      );
      return this.buildAndCommitLocation({
        ...rest,
        to
        // to: toString,
      });
    };
    this.load = async () => {
      this.latestLocation = this.parseLocation(this.latestLocation);
      this.__store.setState((s) => ({
        ...s,
        loadedAt: Date.now()
      }));
      let redirect;
      let notFound;
      let loadPromise;
      loadPromise = new Promise((resolve) => {
        this.startReactTransition(async () => {
          var _a2;
          try {
            const next = this.latestLocation;
            const prevLocation = this.state.resolvedLocation;
            const pathDidChange = prevLocation.href !== next.href;
            this.cancelMatches();
            let pendingMatches;
            this.__store.batch(() => {
              pendingMatches = this.matchRoutes(next);
              this.__store.setState((s) => ({
                ...s,
                status: "pending",
                isLoading: true,
                location: next,
                pendingMatches,
                // If a cached moved to pendingMatches, remove it from cachedMatches
                cachedMatches: s.cachedMatches.filter((d) => {
                  return !pendingMatches.find((e2) => e2.id === d.id);
                })
              }));
            });
            if (!this.state.redirect) {
              this.emit({
                type: "onBeforeNavigate",
                fromLocation: prevLocation,
                toLocation: next,
                pathChanged: pathDidChange
              });
            }
            this.emit({
              type: "onBeforeLoad",
              fromLocation: prevLocation,
              toLocation: next,
              pathChanged: pathDidChange
            });
            await this.loadMatches({
              matches: pendingMatches,
              location: next,
              // eslint-disable-next-line @typescript-eslint/require-await
              onReady: async () => {
                this.startViewTransition(async () => {
                  let exitingMatches;
                  let enteringMatches;
                  let stayingMatches;
                  this.__store.batch(() => {
                    this.__store.setState((s) => {
                      const previousMatches = s.matches;
                      const newMatches = s.pendingMatches || s.matches;
                      exitingMatches = previousMatches.filter(
                        (match) => !newMatches.find((d) => d.id === match.id)
                      );
                      enteringMatches = newMatches.filter(
                        (match) => !previousMatches.find((d) => d.id === match.id)
                      );
                      stayingMatches = previousMatches.filter(
                        (match) => newMatches.find((d) => d.id === match.id)
                      );
                      return {
                        ...s,
                        isLoading: false,
                        matches: newMatches,
                        pendingMatches: void 0,
                        cachedMatches: [
                          ...s.cachedMatches,
                          ...exitingMatches.filter((d) => d.status !== "error")
                        ]
                      };
                    });
                    this.cleanCache();
                  });
                  [
                    [exitingMatches, "onLeave"],
                    [enteringMatches, "onEnter"],
                    [stayingMatches, "onStay"]
                  ].forEach(([matches, hook]) => {
                    matches.forEach((match) => {
                      var _a22, _b2;
                      (_b2 = (_a22 = this.looseRoutesById[match.routeId].options)[hook]) == null ? void 0 : _b2.call(_a22, match);
                    });
                  });
                });
              }
            });
          } catch (err) {
            if (isResolvedRedirect(err)) {
              redirect = err;
              if (!this.isServer) {
                this.navigate({ ...err, replace: true, __isRedirect: true });
              }
            } else if (isNotFound(err)) {
              notFound = err;
            }
            this.__store.setState((s) => ({
              ...s,
              statusCode: redirect ? redirect.statusCode : notFound ? 404 : s.matches.some((d) => d.status === "error") ? 500 : 200,
              redirect
            }));
          }
          if (this.latestLoadPromise === loadPromise) {
            (_a2 = this.commitLocationPromise) == null ? void 0 : _a2.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) {
        await this.latestLoadPromise;
      }
    };
    this.startViewTransition = (fn) => {
      var _a2, _b2;
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      delete this.shouldViewTransition;
      ((_b2 = (_a2 = shouldViewTransition && typeof document !== "undefined" ? document : void 0) == null ? void 0 : _a2.startViewTransition) == null ? void 0 : _b2.call(_a2, fn)) || fn();
    };
    this.updateMatch = (id2, updater) => {
      var _a2;
      let updated;
      const isPending = (_a2 = this.state.pendingMatches) == null ? void 0 : _a2.find((d) => d.id === id2);
      const isMatched = this.state.matches.find((d) => d.id === id2);
      const matchesKey = isPending ? "pendingMatches" : isMatched ? "matches" : "cachedMatches";
      this.__store.setState((s) => {
        var _a22;
        return {
          ...s,
          [matchesKey]: (_a22 = s[matchesKey]) == null ? void 0 : _a22.map(
            (d) => d.id === id2 ? updated = updater(d) : d
          )
        };
      });
      return updated;
    };
    this.getMatch = (matchId) => {
      return [
        ...this.state.cachedMatches,
        ...this.state.pendingMatches ?? [],
        ...this.state.matches
      ].find((d) => d.id === matchId);
    };
    this.loadMatches = async ({
      location,
      matches,
      preload,
      onReady,
      updateMatch = this.updateMatch
    }) => {
      let firstBadMatchIndex;
      let rendered = false;
      const triggerOnReady = async () => {
        if (!rendered) {
          rendered = true;
          await (onReady == null ? void 0 : onReady());
        }
      };
      if (!this.isServer && !this.state.matches.length) {
        triggerOnReady();
      }
      const handleRedirectAndNotFound = (match, err) => {
        var _a2, _b2, _c2;
        if (isResolvedRedirect(err)) throw err;
        if (isRedirect(err) || isNotFound(err)) {
          updateMatch(match.id, (prev) => ({
            ...prev,
            status: isRedirect(err) ? "redirected" : isNotFound(err) ? "notFound" : "error",
            isFetching: false,
            error: err,
            beforeLoadPromise: void 0,
            loaderPromise: void 0
          }));
          if (!err.routeId) {
            err.routeId = match.routeId;
          }
          (_a2 = match.beforeLoadPromise) == null ? void 0 : _a2.resolve();
          (_b2 = match.loaderPromise) == null ? void 0 : _b2.resolve();
          (_c2 = match.loadPromise) == null ? void 0 : _c2.resolve();
          if (isRedirect(err)) {
            rendered = true;
            err = this.resolveRedirect({ ...err, _fromLocation: location });
            throw err;
          } else if (isNotFound(err)) {
            this._handleNotFound(matches, err, {
              updateMatch
            });
            throw err;
          }
        }
      };
      try {
        await new Promise((resolveAll, rejectAll) => {
          ;
          (async () => {
            var _a2, _b2, _c2;
            try {
              const handleSerialError = (index2, err, routerCode) => {
                var _a22, _b22;
                const { id: matchId, routeId } = matches[index2];
                const route = this.looseRoutesById[routeId];
                if (err instanceof Promise) {
                  throw err;
                }
                err.routerCode = routerCode;
                firstBadMatchIndex = firstBadMatchIndex ?? index2;
                handleRedirectAndNotFound(this.getMatch(matchId), err);
                try {
                  (_b22 = (_a22 = route.options).onError) == null ? void 0 : _b22.call(_a22, err);
                } catch (errorHandlerErr) {
                  err = errorHandlerErr;
                  handleRedirectAndNotFound(this.getMatch(matchId), err);
                }
                updateMatch(matchId, (prev) => {
                  var _a3;
                  (_a3 = prev.beforeLoadPromise) == null ? void 0 : _a3.resolve();
                  return {
                    ...prev,
                    error: err,
                    status: "error",
                    isFetching: false,
                    updatedAt: Date.now(),
                    abortController: new AbortController(),
                    beforeLoadPromise: void 0
                  };
                });
              };
              for (const [index2, { id: matchId, routeId }] of matches.entries()) {
                const existingMatch = this.getMatch(matchId);
                const parentMatchId = (_a2 = matches[index2 - 1]) == null ? void 0 : _a2.id;
                if (
                  // If we are in the middle of a load, either of these will be present
                  // (not to be confused with `loadPromise`, which is always defined)
                  existingMatch.beforeLoadPromise || existingMatch.loaderPromise
                ) {
                  await existingMatch.beforeLoadPromise;
                } else {
                  try {
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      loadPromise: createControlledPromise(() => {
                        var _a22;
                        (_a22 = prev.loadPromise) == null ? void 0 : _a22.resolve();
                      }),
                      beforeLoadPromise: createControlledPromise()
                    }));
                    const route = this.looseRoutesById[routeId];
                    const abortController = new AbortController();
                    const pendingMs = route.options.pendingMs ?? this.options.defaultPendingMs;
                    const shouldPending = !!(onReady && !this.isServer && !preload && (route.options.loader || route.options.beforeLoad) && typeof pendingMs === "number" && pendingMs !== Infinity && (route.options.pendingComponent ?? this.options.defaultPendingComponent));
                    let pendingTimeout;
                    if (shouldPending) {
                      pendingTimeout = setTimeout(() => {
                        try {
                          triggerOnReady();
                        } catch {
                        }
                      }, pendingMs);
                    }
                    const { paramsError, searchError } = this.getMatch(matchId);
                    if (paramsError) {
                      handleSerialError(index2, paramsError, "PARSE_PARAMS");
                    }
                    if (searchError) {
                      handleSerialError(index2, searchError, "VALIDATE_SEARCH");
                    }
                    const getParentMatchContext = () => parentMatchId ? this.getMatch(parentMatchId).context : this.options.context ?? {};
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: "beforeLoad",
                      fetchCount: prev.fetchCount + 1,
                      abortController,
                      pendingTimeout,
                      context: {
                        ...getParentMatchContext(),
                        ...prev.__routeContext,
                        ...prev.__beforeLoadContext
                      }
                    }));
                    const { search, params, context, cause } = this.getMatch(matchId);
                    const beforeLoadFnContext = {
                      search,
                      abortController,
                      params,
                      preload: !!preload,
                      context,
                      location,
                      navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                      buildLocation: this.buildLocation,
                      cause: preload ? "preload" : cause
                    };
                    let beforeLoadContext = await ((_c2 = (_b2 = route.options).beforeLoad) == null ? void 0 : _c2.call(_b2, beforeLoadFnContext)) ?? {};
                    if (this.serializeLoaderData) {
                      beforeLoadContext = this.serializeLoaderData(
                        "__beforeLoadContext",
                        beforeLoadContext,
                        {
                          router: this,
                          match: this.getMatch(matchId)
                        }
                      );
                    }
                    if (isRedirect(beforeLoadContext) || isNotFound(beforeLoadContext)) {
                      handleSerialError(index2, beforeLoadContext, "BEFORE_LOAD");
                    }
                    updateMatch(matchId, (prev) => {
                      return {
                        ...prev,
                        __beforeLoadContext: beforeLoadContext,
                        context: {
                          ...getParentMatchContext(),
                          ...prev.__routeContext,
                          ...beforeLoadContext
                        },
                        abortController
                      };
                    });
                  } catch (err) {
                    handleSerialError(index2, err, "BEFORE_LOAD");
                  }
                  updateMatch(matchId, (prev) => {
                    var _a22;
                    (_a22 = prev.beforeLoadPromise) == null ? void 0 : _a22.resolve();
                    return {
                      ...prev,
                      beforeLoadPromise: void 0,
                      isFetching: false
                    };
                  });
                }
              }
              const validResolvedMatches = matches.slice(0, firstBadMatchIndex);
              const matchPromises = [];
              validResolvedMatches.forEach(({ id: matchId, routeId }, index2) => {
                matchPromises.push(
                  (async () => {
                    const { loaderPromise: prevLoaderPromise } = this.getMatch(matchId);
                    if (prevLoaderPromise) {
                      await prevLoaderPromise;
                    } else {
                      const parentMatchPromise = matchPromises[index2 - 1];
                      const route = this.looseRoutesById[routeId];
                      const getLoaderContext = () => {
                        const {
                          params,
                          loaderDeps,
                          abortController,
                          context,
                          cause
                        } = this.getMatch(matchId);
                        return {
                          params,
                          deps: loaderDeps,
                          preload: !!preload,
                          parentMatchPromise,
                          abortController,
                          context,
                          location,
                          navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                          cause: preload ? "preload" : cause,
                          route
                        };
                      };
                      const age = Date.now() - this.getMatch(matchId).updatedAt;
                      const staleAge = preload ? route.options.preloadStaleTime ?? this.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? this.options.defaultStaleTime ?? 0;
                      const shouldReloadOption = route.options.shouldReload;
                      const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext()) : shouldReloadOption;
                      updateMatch(matchId, (prev) => ({
                        ...prev,
                        loaderPromise: createControlledPromise(),
                        preload: !!preload && !this.state.matches.find((d) => d.id === matchId)
                      }));
                      const runLoader = async () => {
                        var _a22, _b22, _c22, _d2, _e2, _f2, _g2, _h2;
                        try {
                          const potentialPendingMinPromise = async () => {
                            const latestMatch = this.getMatch(matchId);
                            if (latestMatch.minPendingPromise) {
                              await latestMatch.minPendingPromise;
                            }
                          };
                          try {
                            route._lazyPromise = route._lazyPromise || (route.lazyFn ? route.lazyFn().then((lazyRoute) => {
                              Object.assign(
                                route.options,
                                lazyRoute.options
                              );
                            }) : Promise.resolve());
                            const componentsPromise = this.getMatch(matchId).componentsPromise || route._lazyPromise.then(
                              () => Promise.all(
                                componentTypes.map(async (type) => {
                                  const component = route.options[type];
                                  if (component == null ? void 0 : component.preload) {
                                    await component.preload();
                                  }
                                })
                              )
                            );
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              isFetching: "loader",
                              componentsPromise
                            }));
                            await route._lazyPromise;
                            let loaderData = await ((_b22 = (_a22 = route.options).loader) == null ? void 0 : _b22.call(_a22, getLoaderContext()));
                            if (this.serializeLoaderData) {
                              loaderData = this.serializeLoaderData(
                                "loaderData",
                                loaderData,
                                {
                                  router: this,
                                  match: this.getMatch(matchId)
                                }
                              );
                            }
                            handleRedirectAndNotFound(
                              this.getMatch(matchId),
                              loaderData
                            );
                            await potentialPendingMinPromise();
                            const meta = (_d2 = (_c22 = route.options).meta) == null ? void 0 : _d2.call(_c22, {
                              matches,
                              match: this.getMatch(matchId),
                              params: this.getMatch(matchId).params,
                              loaderData
                            });
                            const headers = (_f2 = (_e2 = route.options).headers) == null ? void 0 : _f2.call(_e2, {
                              loaderData
                            });
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error: void 0,
                              status: "success",
                              isFetching: false,
                              updatedAt: Date.now(),
                              loaderData,
                              meta,
                              headers
                            }));
                          } catch (e2) {
                            let error = e2;
                            await potentialPendingMinPromise();
                            handleRedirectAndNotFound(this.getMatch(matchId), e2);
                            try {
                              (_h2 = (_g2 = route.options).onError) == null ? void 0 : _h2.call(_g2, e2);
                            } catch (onErrorError) {
                              error = onErrorError;
                              handleRedirectAndNotFound(
                                this.getMatch(matchId),
                                onErrorError
                              );
                            }
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error,
                              status: "error",
                              isFetching: false
                            }));
                          }
                          await this.getMatch(matchId).componentsPromise;
                        } catch (err) {
                          handleRedirectAndNotFound(this.getMatch(matchId), err);
                        }
                      };
                      const { status, invalid } = this.getMatch(matchId);
                      if (preload && route.options.preload === false) {
                      } else if (status === "success" && (invalid || (shouldReload ?? age > staleAge))) {
                        ;
                        (async () => {
                          try {
                            await runLoader();
                          } catch (err) {
                          }
                        })();
                      } else if (status !== "success") {
                        await runLoader();
                      }
                      const { loaderPromise, loadPromise } = this.getMatch(matchId);
                      loaderPromise == null ? void 0 : loaderPromise.resolve();
                      loadPromise == null ? void 0 : loadPromise.resolve();
                    }
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: false,
                      loaderPromise: void 0
                    }));
                  })()
                );
              });
              await Promise.all(matchPromises);
              resolveAll();
            } catch (err) {
              rejectAll(err);
            }
          })();
        });
        await triggerOnReady();
      } catch (err) {
        if (isRedirect(err) || isNotFound(err)) {
          if (isNotFound(err) && !preload) {
            await triggerOnReady();
          }
          throw err;
        }
      }
      return matches;
    };
    this.invalidate = () => {
      const invalidate = (d) => ({
        ...d,
        invalid: true,
        ...d.status === "error" ? { status: "pending", error: void 0 } : {}
      });
      this.__store.setState((s) => {
        var _a2;
        return {
          ...s,
          matches: s.matches.map(invalidate),
          cachedMatches: s.cachedMatches.map(invalidate),
          pendingMatches: (_a2 = s.pendingMatches) == null ? void 0 : _a2.map(invalidate)
        };
      });
      return this.load();
    };
    this.resolveRedirect = (err) => {
      const redirect = err;
      if (!redirect.href) {
        redirect.href = this.buildLocation(redirect).href;
      }
      return redirect;
    };
    this.cleanCache = () => {
      this.__store.setState((s) => {
        return {
          ...s,
          cachedMatches: s.cachedMatches.filter((d) => {
            const route = this.looseRoutesById[d.routeId];
            if (!route.options.loader) {
              return false;
            }
            const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 5 * 60 * 1e3;
            return d.status !== "error" && Date.now() - d.updatedAt < gcTime;
          })
        };
      });
    };
    this.preloadRoute = async (opts) => {
      const next = this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true
      });
      const loadedMatchIds = Object.fromEntries(
        [
          ...this.state.matches,
          ...this.state.pendingMatches ?? [],
          ...this.state.cachedMatches
        ].map((d) => [d.id, true])
      );
      this.__store.batch(() => {
        matches.forEach((match) => {
          if (!loadedMatchIds[match.id]) {
            this.__store.setState((s) => ({
              ...s,
              cachedMatches: [...s.cachedMatches, match]
            }));
          }
        });
      });
      const activeMatchIds = new Set(
        [...this.state.matches, ...this.state.pendingMatches ?? []].map(
          (d) => d.id
        )
      );
      try {
        matches = await this.loadMatches({
          matches,
          location: next,
          preload: true,
          updateMatch: (id2, updater) => {
            if (activeMatchIds.has(id2)) {
              matches = matches.map((d) => d.id === id2 ? updater(d) : d);
            } else {
              this.updateMatch(id2, updater);
            }
          }
        });
        return matches;
      } catch (err) {
        if (isRedirect(err)) {
          return await this.preloadRoute({
            ...err,
            _fromLocation: next
          });
        }
        console.error(err);
        return void 0;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(location.from || "", location.to) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if ((opts == null ? void 0 : opts.pending) && this.state.status !== "pending") {
        return false;
      }
      const pending = (opts == null ? void 0 : opts.pending) === void 0 ? !this.state.isLoading : opts.pending;
      const baseLocation = pending ? this.latestLocation : this.state.resolvedLocation;
      const match = matchPathname(this.basepath, baseLocation.pathname, {
        ...opts,
        to: next.pathname
      });
      if (!match) {
        return false;
      }
      if (location.params) {
        if (!deepEqual(match, location.params, true)) {
          return false;
        }
      }
      if (match && ((opts == null ? void 0 : opts.includeSearch) ?? true)) {
        return deepEqual(baseLocation.search, next.search, true) ? match : false;
      }
      return match;
    };
    this.dehydrate = () => {
      var _a2;
      const pickError = ((_a2 = this.options.errorSerializer) == null ? void 0 : _a2.serialize) ?? defaultSerializeError;
      return {
        state: {
          dehydratedMatches: this.state.matches.map((d) => {
            return {
              ...pick$1(d, ["id", "status", "updatedAt"]),
              // If an error occurs server-side during SSRing,
              // send a small subset of the error to the client
              error: d.error ? {
                data: pickError(d.error),
                __isServerError: true
              } : void 0
              // NOTE: We don't send the loader data here, because
              // there is a potential that it needs to be streamed.
              // Instead, we render it next to the route match in the HTML
              // which gives us the potential to stream it via suspense.
            };
          })
        },
        manifest: this.manifest
      };
    };
    this.hydrate = () => {
      var _a2, _b2, _c2;
      let ctx;
      if (typeof document !== "undefined") {
        ctx = this.options.transformer.parse((_a2 = window.__TSR__) == null ? void 0 : _a2.dehydrated);
      }
      invariant(
        ctx
      );
      this.dehydratedData = ctx.payload;
      (_c2 = (_b2 = this.options).hydrate) == null ? void 0 : _c2.call(_b2, ctx.payload);
      const dehydratedState = ctx.router.state;
      const matches = this.matchRoutes(this.state.location).map((match) => {
        const dehydratedMatch = dehydratedState.dehydratedMatches.find(
          (d) => d.id === match.id
        );
        invariant(
          dehydratedMatch,
          `Could not find a client-side match for dehydrated match with id: ${match.id}!`
        );
        return {
          ...match,
          ...dehydratedMatch
        };
      });
      this.__store.setState((s) => {
        return {
          ...s,
          matches
        };
      });
      this.manifest = ctx.router.manifest;
    };
    this.injectedHtml = [];
    this.injectHtml = (html) => {
      const cb2 = () => {
        this.injectedHtml = this.injectedHtml.filter((d) => d !== cb2);
        return html;
      };
      this.injectedHtml.push(cb2);
    };
    this.streamedKeys = /* @__PURE__ */ new Set();
    this.getStreamedValue = (key) => {
      var _a2;
      if (this.isServer) {
        return void 0;
      }
      const streamedValue = (_a2 = window.__TSR__) == null ? void 0 : _a2.streamedValues[key];
      if (!streamedValue) {
        return;
      }
      if (!streamedValue.parsed) {
        streamedValue.parsed = this.options.transformer.parse(streamedValue.value);
      }
      return streamedValue.parsed;
    };
    this.streamValue = (key, value) => {
      var _a2;
      warning(
        !this.streamedKeys.has(key)
      );
      this.streamedKeys.add(key);
      const children = `__TSR__.streamedValues['${key}'] = { value: ${(_a2 = this.serializer) == null ? void 0 : _a2.call(this, this.options.transformer.stringify(value))}}`;
      this.injectHtml(
        `<script class='tsr-once'>${children}${""}; __TSR__.cleanScripts()<\/script>`
      );
    };
    this._handleNotFound = (matches, err, {
      updateMatch = this.updateMatch
    } = {}) => {
      const matchesByRouteId = Object.fromEntries(
        matches.map((match2) => [match2.routeId, match2])
      );
      let routeCursor = (err.global ? this.looseRoutesById[rootRouteId] : this.looseRoutesById[err.routeId]) || this.looseRoutesById[rootRouteId];
      while (!routeCursor.options.notFoundComponent && !this.options.defaultNotFoundComponent && routeCursor.id !== rootRouteId) {
        routeCursor = routeCursor.parentRoute;
        invariant(
          routeCursor
        );
      }
      const match = matchesByRouteId[routeCursor.id];
      invariant(match, "Could not find match for route: " + routeCursor.id);
      updateMatch(match.id, (prev) => ({
        ...prev,
        status: "notFound",
        error: err,
        isFetching: false
      }));
      if (err.routerCode === "BEFORE_LOAD" && routeCursor.parentRoute) {
        err.routeId = routeCursor.parentRoute.id;
        this._handleNotFound(matches, err, {
          updateMatch
        });
      }
    };
    this.hasNotFoundMatch = () => {
      return this.__store.state.matches.some(
        (d) => d.status === "notFound" || d.globalNotFound
      );
    };
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      transformer: options.transformer ?? defaultTransformer
    });
    if (typeof document !== "undefined") {
      window.__TSR__ROUTER__ = this;
    }
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  matchRoutes(pathnameOrNext, locationSearchOrOpts, opts) {
    if (typeof pathnameOrNext === "string") {
      return this.matchRoutesInternal(
        {
          pathname: pathnameOrNext,
          search: locationSearchOrOpts
        },
        opts
      );
    } else {
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    }
  }
  matchRoutesInternal(next, opts) {
    let routeParams = {};
    const foundRoute = this.flatRoutes.find((route) => {
      const matchedParams = matchPathname(
        this.basepath,
        trimPathRight(next.pathname),
        {
          to: route.fullPath,
          caseSensitive: route.options.caseSensitive ?? this.options.caseSensitive,
          fuzzy: true
        }
      );
      if (matchedParams) {
        routeParams = matchedParams;
        return true;
      }
      return false;
    });
    let routeCursor = foundRoute || this.routesById[rootRouteId];
    const matchedRoutes = [routeCursor];
    let isGlobalNotFound = false;
    if (
      // If we found a route, and it's not an index route and we have left over path
      foundRoute ? foundRoute.path !== "/" && routeParams["**"] : (
        // Or if we didn't find a route and we have left over path
        trimPathRight(next.pathname)
      )
    ) {
      if (this.options.notFoundRoute) {
        matchedRoutes.push(this.options.notFoundRoute);
      } else {
        isGlobalNotFound = true;
      }
    }
    while (routeCursor.parentRoute) {
      routeCursor = routeCursor.parentRoute;
      matchedRoutes.unshift(routeCursor);
    }
    const globalNotFoundRouteId = (() => {
      if (!isGlobalNotFound) {
        return void 0;
      }
      if (this.options.notFoundMode !== "root") {
        for (let i = matchedRoutes.length - 1; i >= 0; i--) {
          const route = matchedRoutes[i];
          if (route.children) {
            return route.id;
          }
        }
      }
      return rootRouteId;
    })();
    const parseErrors = matchedRoutes.map((route) => {
      var _a2;
      let parsedParamsError;
      const parseParams = ((_a2 = route.options.params) == null ? void 0 : _a2.parse) ?? route.options.parseParams;
      if (parseParams) {
        try {
          const parsedParams = parseParams(routeParams);
          Object.assign(routeParams, parsedParams);
        } catch (err) {
          parsedParamsError = new PathParamError(err.message, {
            cause: err
          });
          if (opts == null ? void 0 : opts.throwOnError) {
            throw parsedParamsError;
          }
          return parsedParamsError;
        }
      }
      return;
    });
    const matches = [];
    matchedRoutes.forEach((route, index2) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i, _j, _k, _l;
      const parentMatch = matches[index2 - 1];
      const [preMatchSearch, searchError] = (() => {
        const parentSearch = (parentMatch == null ? void 0 : parentMatch.search) ?? next.search;
        try {
          const validator = typeof route.options.validateSearch === "object" ? route.options.validateSearch.parse : route.options.validateSearch;
          const search = (validator == null ? void 0 : validator(parentSearch)) ?? {};
          return [
            {
              ...parentSearch,
              ...search
            },
            void 0
          ];
        } catch (err) {
          const searchParamError = new SearchParamError(err.message, {
            cause: err
          });
          if (opts == null ? void 0 : opts.throwOnError) {
            throw searchParamError;
          }
          return [parentSearch, searchParamError];
        }
      })();
      const loaderDeps = ((_b2 = (_a2 = route.options).loaderDeps) == null ? void 0 : _b2.call(_a2, {
        search: preMatchSearch
      })) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const interpolatedPath = interpolatePath({
        path: route.fullPath,
        params: routeParams
      });
      const matchId = interpolatePath({
        path: route.id,
        params: routeParams,
        leaveWildcards: true
      }) + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const cause = this.state.matches.find((d) => d.id === matchId) ? "stay" : "enter";
      let match;
      if (existingMatch) {
        match = {
          ...existingMatch,
          cause,
          params: routeParams
        };
      } else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn ? "pending" : "success";
        match = {
          id: matchId,
          index: index2,
          routeId: route.id,
          params: routeParams,
          pathname: joinPaths([this.basepath, interpolatedPath]),
          updatedAt: Date.now(),
          search: {},
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError: parseErrors[index2],
          __routeContext: {},
          __beforeLoadContext: {},
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps,
          invalid: false,
          preload: false,
          links: (_d2 = (_c2 = route.options).links) == null ? void 0 : _d2.call(_c2),
          scripts: (_f2 = (_e2 = route.options).scripts) == null ? void 0 : _f2.call(_e2),
          staticData: route.options.staticData || {},
          loadPromise: createControlledPromise(),
          fullPath: route.fullPath
        };
      }
      if (match.status === "success") {
        match.meta = (_h2 = (_g2 = route.options).meta) == null ? void 0 : _h2.call(_g2, {
          matches,
          match,
          params: match.params,
          loaderData: match.loaderData
        });
        match.headers = (_j = (_i = route.options).headers) == null ? void 0 : _j.call(_i, {
          loaderData: match.loaderData
        });
      }
      if (!(opts == null ? void 0 : opts.preload)) {
        match.globalNotFound = globalNotFoundRouteId === route.id;
      }
      match.search = replaceEqualDeep$1(match.search, preMatchSearch);
      match.searchError = searchError;
      const parentMatchId = parentMatch == null ? void 0 : parentMatch.id;
      const parentContext = !parentMatchId ? this.options.context ?? {} : parentMatch.context ?? this.options.context ?? {};
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      const contextFnContext = {
        search: match.search,
        params: match.params,
        context: match.context,
        location: next,
        navigate: (opts2) => this.navigate({ ...opts2, _fromLocation: next }),
        buildLocation: this.buildLocation,
        cause: match.cause,
        abortController: match.abortController,
        preload: !!match.preload
      };
      match.__routeContext = ((_l = (_k = route.options).context) == null ? void 0 : _l.call(_k, contextFnContext)) ?? {};
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      matches.push(match);
    });
    return matches;
  }
}
class SearchParamError extends Error {
}
class PathParamError extends Error {
}
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: { ...location },
    location,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200
  };
}
function defaultSerializeError(err) {
  if (err instanceof Error) {
    const obj = {
      name: err.name,
      message: err.message
    };
    return obj;
  }
  return {
    data: err
  };
}
function isServerSideError(error) {
  if (!(typeof error === "object" && error && "data" in error)) return false;
  if (!("__isServerError" in error && error.__isServerError)) return false;
  if (!(typeof error.data === "object" && error.data)) return false;
  return error.__isServerError === true;
}
function defaultDeserializeError(serializedData) {
  if ("name" in serializedData && "message" in serializedData) {
    const error = new Error(serializedData.message);
    error.name = serializedData.name;
    return error;
  }
  return serializedData.data;
}
const matchContext = reactExports.createContext(void 0);
function useMatch(opts) {
  const nearestMatchId = reactExports.useContext(matchContext);
  const matchSelection = useRouterState({
    select: (state) => {
      const match = state.matches.find(
        (d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId
      );
      invariant(
        !((opts.shouldThrow ?? true) && !match),
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      if (match === void 0) {
        return void 0;
      }
      return opts.select ? opts.select(match) : match;
    }
  });
  return matchSelection;
}
function useLoaderDeps(opts) {
  return useMatch({
    ...opts,
    select: (s) => {
      return typeof opts.select === "function" ? opts.select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
function useLoaderData(opts) {
  return useMatch({
    ...opts,
    select: (s) => {
      return typeof opts.select === "function" ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
function useParams(opts) {
  return useMatch({
    ...opts,
    select: (match) => {
      return opts.select ? opts.select(match.params) : match.params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    ...opts,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const { navigate } = useRouter();
  return reactExports.useCallback(
    (options) => {
      return navigate({
        ...options
      });
    },
    [navigate]
  );
}
let Route$3 = class Route {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    this.init = (opts) => {
      var _a2, _b2;
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !(options2 == null ? void 0 : options2.path) && !(options2 == null ? void 0 : options2.id);
      this.parentRoute = (_b2 = (_a2 = this.options).getParentRoute) == null ? void 0 : _b2.call(_a2);
      if (isRoot) {
        this.path = rootRouteId;
      } else {
        invariant(
          this.parentRoute
        );
      }
      let path2 = isRoot ? rootRouteId : options2.path;
      if (path2 && path2 !== "/") {
        path2 = trimPathLeft(path2);
      }
      const customId = (options2 == null ? void 0 : options2.id) || path2;
      let id2 = isRoot ? rootRouteId : joinPaths([
        this.parentRoute.id === rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path2 === rootRouteId) {
        path2 = "/";
      }
      if (id2 !== rootRouteId) {
        id2 = joinPaths(["/", id2]);
      }
      const fullPath = id2 === rootRouteId ? "/" : joinPaths([this.parentRoute.fullPath, path2]);
      this.path = path2;
      this.id = id2;
      this.fullPath = fullPath;
      this.to = fullPath;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.useMatch = (opts) => {
      return useMatch({ ...opts, from: this.id });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({ ...opts, from: this.id });
    };
    this.useParams = (opts) => {
      return useParams({ ...opts, from: this.id });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.id });
    };
    this.options = options || {};
    this.isRoot = !(options == null ? void 0 : options.getParentRoute);
    invariant(
      !((options == null ? void 0 : options.id) && (options == null ? void 0 : options.path))
    );
    this.$$typeof = Symbol.for("react.memo");
  }
  addChildren(children) {
    this.children = Array.isArray(children) ? children : Object.values(children);
    return this;
  }
};
function createRoute(options) {
  return new Route$3(options);
}
class RootRoute extends Route$3 {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
  }
  addChildren(children) {
    return super.addChildren(children);
  }
}
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path2) {
  return new FileRoute(path2, {
    silent: true
  }).createRoute;
}
class FileRoute {
  constructor(path2, _opts) {
    this.path = path2;
    this.createRoute = (options) => {
      warning(
        this.silent
      );
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts == null ? void 0 : _opts.silent;
  }
}
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e2 = a[d];
      if (0 < g(e2, b)) a[d] = b, a[c] = e2, c = d;
      else break a;
    }
  }
  function h2(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e2 = a.length, w2 = e2 >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e2 && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e2 && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h2(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h2(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h2(r2)) A2 = true, I2(J2);
    else {
      var b = h2(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h2(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h2(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c + e2;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e2, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h2(r2) && a === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e2, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e2, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e2;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e2 = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e2 ? 0 !== e2.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e2, d) && (c = null), d || null === e2 ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e2.mustUseProperty ? a[e2.propertyName] = null === c ? 3 === e2.type ? false : "" : c : (b = e2.attributeName, d = e2.attributeNamespace, null === c ? a.removeAttribute(b) : (e2 = e2.type, c = 3 === e2 || 4 === e2 && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e2.length - 1, h2 = f2.length - 1; 1 <= g && 0 <= h2 && e2[g] !== f2[h2]; ) h2--;
      for (; 1 <= g && 0 <= h2; g--, h2--) if (e2[g] !== f2[h2]) {
        if (1 !== g || 1 !== h2) {
          do
            if (g--, h2--, 0 > h2 || e2[g] !== f2[h2]) {
              var k2 = "\n" + e2[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h2);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e2 = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e2 = 0; e2 < c.length; e2++) b["$" + c[e2]] = true;
    for (c = 0; c < a.length; c++) e2 = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e2 && (a[c].selected = e2), e2 && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e2 = 0; e2 < a.length; e2++) {
      if (a[e2].value === c) {
        a[e2].selected = true;
        d && (a[e2].defaultSelected = true);
        return;
      }
      null !== b || a[e2].disabled || (b = a[e2]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e2);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e2 = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e2) : a[c] = e2;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e2, f2, g, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e2, f2, g, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e2, f2, g, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e2 = c.return;
    if (null === e2) break;
    var f2 = e2.alternate;
    if (null === f2) {
      d = e2.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c) return Xb(e2), a;
        if (f2 === d) return Xb(e2), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e2, d = f2;
    else {
      for (var g = false, h2 = e2.child; h2; ) {
        if (h2 === c) {
          g = true;
          c = e2;
          d = f2;
          break;
        }
        if (h2 === d) {
          g = true;
          d = e2;
          c = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c) {
            g = true;
            c = f2;
            d = e2;
            break;
          }
          if (h2 === d) {
            g = true;
            d = f2;
            c = e2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e2 = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h2 = g & ~e2;
    0 !== h2 ? d = tc(h2) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e2, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e2) && (e2 = d & -d, f2 = b & -b, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e2 = 1 << c, d |= a[c], b &= ~e2;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e2 = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h2 = 1 << g, k2 = e2[g];
    if (-1 === k2) {
      if (0 === (h2 & c) || 0 !== (h2 & d)) e2[g] = vc(h2, b);
    } else k2 <= b && (a.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e2 = 31 - oc(c), f2 = 1 << e2;
    b[e2] = 0;
    d[e2] = -1;
    a[e2] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e2 = 1 << d;
    e2 & b | a[d] & b && (a[d] |= b);
    c &= ~e2;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e2, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e2] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e2 && -1 === b.indexOf(e2) && b.push(e2);
  return a;
}
function Uc(a, b, c, d, e2) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e2), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e2), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e2)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e2 = Yc(a, b, c, d);
    if (null === e2) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e2, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e2; ) {
        var f2 = Cb(e2);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e2) break;
        e2 = f2;
      }
      null !== e2 && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
  for (a = 0; a < c && b[a] === e2[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e2[f2 - d]; d++) ;
  return md = e2.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e2, f2, g) {
    this._reactName = b2;
    this._targetInst = e2;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e2 = c[d];
    if (!ja.call(b, e2) || !He(a[e2], b[e2])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e2 = c.textContent.length, f2 = Math.min(d.start, e2);
        d = void 0 === d.end ? f2 : Math.min(d.end, e2);
        !a.extend && f2 > d && (e2 = d, d = f2, f2 = e2);
        e2 = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e2 && g && (1 !== a.rangeCount || a.anchorNode !== e2.node || a.anchorOffset !== e2.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e2.node, e2.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e2 = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h2 = d[g], k2 = h2.instance, l2 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h2, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h2 = d[g];
        k2 = h2.instance;
        l2 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h2, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e2 = ed;
      break;
    case 4:
      e2 = gd;
      break;
    default:
      e2 = fd;
  }
  c = e2.bind(null, b, c, a);
  e2 = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e2 = true);
  d ? void 0 !== e2 ? a.addEventListener(b, c, { capture: true, passive: e2 }) : a.addEventListener(b, c, true) : void 0 !== e2 ? a.addEventListener(b, c, { passive: e2 }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e2) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h2 = d.stateNode.containerInfo;
      if (h2 === e2 || 8 === h2.nodeType && h2.parentNode === e2) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2) return;
        }
        g = g.return;
      }
      for (; null !== h2; ) {
        g = Wc(h2);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h2 = h2.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e3 = xb(c), g2 = [];
    a: {
      var h3 = df.get(a);
      if (void 0 !== h3) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h3 ? h3 + "Capture" : null : h3;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h3 = new k3(h3, n2, null, c, e3), g2.push({ event: h3, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h3 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h3 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h3) {
          h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h3 : ue(k3);
            u2 = null == n2 ? h3 : ue(n2);
            h3 = new t2(F2, w2 + "leave", k3, c, e3);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e3) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h3, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h3 = d2 ? ue(d2) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h3.type) var na = ve;
        else if (me(h3)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e3);
          break a;
        }
        xa && xa(a, h3, d2);
        "focusout" === a && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e3);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e3);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e3), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c, e3), g2.push({ event: e3, listeners: d2 }), e3.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e2 = a, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e2)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e2)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e2) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h2 = c, k2 = h2.alternate, l2 = h2.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h2.tag && null !== l2 && (h2 = l2, e2 ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h2))) : e2 || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h2))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e2 = c.nextSibling;
    a.removeChild(c);
    if (e2 && 8 === e2.nodeType) if (c = e2.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e2);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e2;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c) e2[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e2 in d) if (!(e2 in b)) throw Error(p(108, Ra(a) || "Unknown", e2));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e2;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e2 = 32 - oc(d) - 1;
  d &= ~(1 << e2);
  c += 1;
  var f2 = 32 - oc(b) + e2;
  if (30 < f2) {
    var g = e2 - e2 % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e2 -= g;
    rg = 1 << 32 - oc(b) + e2 | c << e2 | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e2 | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e2 = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e2.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e2(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h2(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e2(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e2(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e2(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e2(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e3 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e3 ? null : h2(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e3 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e3 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e3 = c2._init, r2(
            a2,
            b2,
            e3(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e3 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e3) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h2(b2, a2, "" + d2, e3);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e3);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e3);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e3);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e3, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e3, g2, h3, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h3[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e3, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length) return c(e3, u2), I && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h3.length; w2++) u2 = q2(e3, h3[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e3, w2);
      return l3;
    }
    for (u2 = d(e3, u2); w2 < h3.length; w2++) x2 = y2(u2, e3, w2, h3[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e3, a2);
    });
    I && tg(e3, w2);
    return l3;
  }
  function t2(e3, g2, h3, k3) {
    var l3 = Ka(h3);
    if ("function" !== typeof l3) throw Error(p(150));
    h3 = l3.call(h3);
    if (null == h3) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e3, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e3, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e3,
      m3
    ), I && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h3.next()) n3 = q2(e3, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e3, w2);
      return l3;
    }
    for (m3 = d(e3, m3); !n3.done; w2++, n3 = h3.next()) n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e3, a2);
    });
    I && tg(e3, w2);
    return l3;
  }
  function J2(a2, d2, f3, h3) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e2(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e2(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h3, f3.key), d2.return = a2, a2 = d2) : (h3 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h3), h3.ref = Lg(a2, d2, f3), h3.return = a2, a2 = h3);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e2(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h3);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h3);
      }
      if (eb(f3)) return n2(a2, d2, f3, h3);
      if (Ka(f3)) return t2(a2, d2, f3, h3);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e2(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h3), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e2 = b.interleaved;
  null === e2 ? (c.next = c, gh(b)) : (c.next = e2.next, e2.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e2 = d.pending;
    null === e2 ? b.next = b : (b.next = e2.next, e2.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e2 = d.interleaved;
  null === e2 ? (b.next = b, gh(d)) : (b.next = e2.next, e2.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e2 = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e2 = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e2 = f2 = b : f2 = f2.next = b;
    } else e2 = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e2 = a.updateQueue;
  jh = false;
  var f2 = e2.firstBaseUpdate, g = e2.lastBaseUpdate, h2 = e2.shared.pending;
  if (null !== h2) {
    e2.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var r2 = h2.lane, y2 = h2.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h2;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h2.callback && 0 !== h2.lane && (a.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h2] : r2.push(h2));
      } else y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h2 = h2.next;
      if (null === h2) if (h2 = e2.shared.pending, null === h2) break;
      else r2 = h2, h2 = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b = e2.shared.interleaved;
    if (null !== b) {
      e2 = b;
      do
        g |= e2.lane, e2 = e2.next;
      while (e2 !== b);
    } else null === f2 && (e2.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e2 = d.callback;
    if (null !== e2) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e2) throw Error(p(191, e2));
      e2.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e2, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e2 = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g = e2.next;
      e2.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e2 = f2;
    c.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d = d.baseState;
    var h2 = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h2 = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h2;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e2 = a;
    do
      f2 = e2.lane, M.lanes |= f2, rh |= f2, e2 = e2.next;
    while (e2 !== a);
  } else null === e2 && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e2 = c.pending, f2 = b.memoizedState;
  if (null !== e2) {
    c.pending = null;
    var g = e2 = e2.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e2);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e2 = b(), f2 = !He(d.memoizedState, e2);
  f2 && (d.memoizedState = e2, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e2, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e2);
  }
  return e2;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e2 = Th();
  M.flags |= a;
  e2.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e2 = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e2.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e2.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e2 = R();
    gi(c, a, d, e2);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e2 = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e2);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h2 = f2(g, c);
      e2.hasEagerState = true;
      e2.eagerState = h2;
      if (He(h2, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e2.next = e2, gh(b)) : (e2.next = k2.next, k2.next = e2);
        b.interleaved = e2;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e2, d);
    null !== c && (e2 = R(), gi(c, a, d, e2), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e2 = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e2.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e2.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e2 = yi(a), f2 = mh(d, e2);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e2);
  null !== b && (gi(b, a, e2, d), oh(b, a, e2));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e2 = yi(a), f2 = mh(d, e2);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e2);
  null !== b && (gi(b, a, e2, d), oh(b, a, e2));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e2 = mh(c, d);
  e2.tag = 2;
  void 0 !== b && null !== b && (e2.callback = b);
  b = nh(a, e2, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e2, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e2, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e2 = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e2) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e2, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e2 = a.stateNode;
  e2.props = c;
  e2.state = a.memoizedState;
  e2.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e2.context = Yf(a, f2));
  e2.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e2.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a, c, e2, d), e2.state = a.memoizedState);
  "function" === typeof e2.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e2 = c;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e2, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e2 = b.value;
    c.payload = function() {
      return d(e2);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e2 = /* @__PURE__ */ new Set();
    d.set(b, e2);
  } else e2 = d.get(b), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d.set(b, e2));
  e2.has(c) || (e2.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e2) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e2;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e2) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e2);
  d = Nh(a, b, c, d, f2, e2);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e2, Zi(a, b, e2);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e2);
  return b.child;
}
function $i(a, b, c, d, e2) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e2);
    a = Rg(c.type, null, d, b, b.mode, e2);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e2)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e2);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e2) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e2)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e2);
  }
  return cj(a, b, c, d, e2);
}
function dj(a, b, c) {
  var d = b.pendingProps, e2 = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e2, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e2) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e2);
  c = Nh(a, b, c, d, f2, e2);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e2, Zi(a, b, e2);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e2);
  return b.child;
}
function hj(a, b, c, d, e2) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e2);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e2), d = true;
  else if (null === a) {
    var g = b.stateNode, h2 = b.memoizedProps;
    g.props = h2;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h2 !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e2);
    k2 = b.memoizedState;
    h2 !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h2 = jh || Fi(b, c, h2, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h2) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h2 = b.memoizedProps;
    l2 = b.type === b.elementType ? h2 : Ci(b.type, h2);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e2);
    var n2 = b.memoizedState;
    h2 !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e2);
}
function jj(a, b, c, d, e2, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e2 && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h2 = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h2, f2)) : Xi(a, b, h2, f2);
  b.memoizedState = d.state;
  e2 && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e2) {
  Ig();
  Jg(e2);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e2 = L.current, f2 = false, g = 0 !== (b.flags & 128), h2;
  (h2 = g) || (h2 = null !== a && null === a.memoizedState ? false : 0 !== (e2 & 2));
  if (h2) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e2 |= 1;
  G(L, e2 & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e2 = a.memoizedState;
  if (null !== e2 && (h2 = e2.dehydrated, null !== h2)) return rj(a, b, g, d, h2, e2, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e2 = a.child;
    h2 = e2.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e2 ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e2, k2), d.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e2, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e2 = b.mode;
    d = pj({ mode: "visible", children: d.children }, e2, 0, null);
    f2 = Tg(f2, e2, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e2.data) {
    d = e2.nextSibling && e2.nextSibling.dataset;
    if (d) var h2 = d.dgst;
    d = h2;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h2 = 0 !== (g & a.childLanes);
  if (dh || h2) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d.suspendedLanes | g)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a, e2), gi(d, a, e2, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e2.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e2._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e2) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e2 } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e2);
}
function xj(a, b, c) {
  var d = b.pendingProps, e2 = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e2) {
    case "forwards":
      c = b.child;
      for (e2 = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e2 = c), c = c.sibling;
      c = e2;
      null === c ? (e2 = b.child, b.child = null) : (e2 = c.sibling, c.sibling = null);
      wj(b, false, e2, c, f2);
      break;
    case "backwards":
      c = null;
      e2 = b.child;
      for (b.child = null; null !== e2; ) {
        a = e2.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e2;
          break;
        }
        a = e2.sibling;
        e2.sibling = c;
        c = e2;
        e2 = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e2 = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e2;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e2 = b.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e2 = a.memoizedProps;
  if (e2 !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e2 = Ya(a, e2);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e2 = A({}, e2, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb(a, e2);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e2) if (!d.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2]) if ("style" === l2) {
      var h2 = e2[l2];
      for (g in h2) h2.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h2 = null != e2 ? e2[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2)) if ("style" === l2) if (h2) {
        for (g in h2) !h2.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h2[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e2 = a.child; null !== e2; ) c |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags & 14680064, d |= e2.flags & 14680064, e2.return = a, e2 = e2.sibling;
  else for (e2 = a.child; null !== e2; ) c |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags, d |= e2.flags, e2.return = a, e2 = e2.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e2 = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e2), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e2 = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h2 = f2[g];
            "children" === g ? "string" === typeof h2 ? d.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d.textContent, h2, a), e2 = ["children", h2]) : "number" === typeof h2 && d.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h2,
              a
            ), e2 = ["children", "" + h2]) : ea.hasOwnProperty(g) && null != h2 && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e2;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e2 = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e2 = d;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], a);
                e2 = d;
                break;
              case "source":
                D("error", a);
                e2 = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e2 = d;
                break;
              case "details":
                D("toggle", a);
                e2 = d;
                break;
              case "input":
                Za(a, d);
                e2 = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e2 = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e2 = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e2 = gb(a, d);
                D("invalid", a);
                break;
              default:
                e2 = d;
            }
            ub(c, e2);
            h2 = e2;
            for (f2 in h2) if (h2.hasOwnProperty(f2)) {
              var k2 = h2[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e2 = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e2 && 3 !== q2.nodeType || (h2 = g + e2);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e2 && (h2 = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e2 = d = d.next;
    do {
      if ((e2.tag & a) === a) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e2 = e2.next;
    } while (e2 !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h2) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e2 = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e2;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e2 = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e2 = d = d.next;
        do {
          var f2 = e2, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e2 = e2.next;
        } while (e2 !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h2) {
        W(c, b, h2);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e2 = c[d];
    try {
      var f2 = a, g = b, h2 = g;
      a: for (; null !== h2; ) {
        switch (h2.tag) {
          case 5:
            X = h2.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h2.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h2.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h2 = h2.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e2);
      X = null;
      Xj = false;
      var k2 = e2.alternate;
      null !== k2 && (k2.return = null);
      e2.return = null;
    } catch (l2) {
      W(e2, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e2 = a.stateNode;
        try {
          ob(e2, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e2 = a.stateNode, null != e2)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h2 = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h2 && "radio" === f2.type && null != f2.name && ab(e2, f2);
          vb(h2, g);
          var l2 = vb(h2, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
          }
          switch (h2) {
            case "input":
              bb(e2, f2);
              break;
            case "textarea":
              ib(e2, f2);
              break;
            case "select":
              var r2 = e2._wrapperState.wasMultiple;
              e2._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e2,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e2[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e2 = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e2 = a.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e2 = d.stateNode;
          d.flags & 32 && (ob(e2, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e2);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h2 = Uj(a);
          Vj(a, h2, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e2 = V, f2 = e2.child;
    if (22 === e2.tag && d) {
      var g = null !== e2.memoizedState || Jj;
      if (!g) {
        var h2 = e2.alternate, k2 = null !== h2 && null !== h2.memoizedState || U;
        h2 = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e2; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g, V = k2) : jk(e2);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e2;
        Jj = h2;
        U = l2;
      }
      kk(a);
    } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e2 = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e2, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h2 = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h2;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e2 = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e2, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h2 = b.sibling;
    if (null !== h2) {
      h2.return = b.return;
      V = h2;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e2 = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h2) {
        Mk(a, h2);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e2;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e2 = xc(a), 0 !== e2 && (d = e2, b = Nk(a, e2)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e2 = a.current.alternate;
      if (0 === (d & 30) && !Ok(e2) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e2;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e2 = a.suspendedLanes;
            if ((e2 & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e2;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e2 = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e2 && (e2 = g);
            d &= ~f2;
          }
          d = e2;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e2 = c[d], f2 = e2.getSnapshot;
        e2 = e2.value;
        try {
          if (!He(f2(), e2)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e2 = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e2;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e2 = d.queue;
          null !== e2 && (e2.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h2 = c, k2 = b;
        b = Z;
        h2.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h2, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h2, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h2.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h2, f2, b);
            Jg(Ji(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h2);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h2, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e2) {
      Mk(a, e2);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e2 = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e2, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e2 = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h2 = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h2;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e2);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e2 = b[c], d(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e2 = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h2 = f2.deletions;
            if (null !== h2) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h2 = V;
            if (0 !== (h2.flags & 2048)) try {
              switch (h2.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h2);
              }
            } catch (na) {
              W(h2, h2.return, na);
            }
            if (h2 === g) {
              V = null;
              break b;
            }
            var F2 = h2.sibling;
            if (null !== F2) {
              F2.return = h2.return;
              V = F2;
              break b;
            }
            V = h2.return;
          }
        }
        K = e2;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e2 = a.memoizedState;
      null !== e2 && (c = e2.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e2 = Yf(b, H.current);
      ch(b, c);
      e2 = Nh(null, b, d, a, e2, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b), e2.updater = Ei, b.stateNode = e2, e2._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e2, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e2 = d._init;
        d = e2(d._payload);
        b.type = d;
        e2 = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e2) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), cj(a, b, d, e2, c);
    case 1:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), hj(a, b, d, e2, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e2 = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e2 = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e2);
          break a;
        } else if (d !== e2) {
          e2 = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e2);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e2) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e2 = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e2.children, Ef(d, e2) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), Yi(a, b, d, e2, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e2 = b.pendingProps;
        f2 = b.memoizedProps;
        g = e2.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e2.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h2 = f2.dependencies;
          if (null !== h2) {
            g = f2.child;
            for (var k2 = h2.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h2.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h2 = g.alternate;
            null !== h2 && (h2.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e2.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e2 = b.type, d = b.pendingProps.children, ch(b, c), e2 = eh(e2), d = d(e2), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e2 = Ci(d, b.pendingProps), e2 = Ci(d.type, e2), $i(a, b, d, e2, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e2), Ii(b, d, e2, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e2, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e2, f2, b);
    case za:
      g = 8;
      e2 |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e2 | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e2), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e2), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e2, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e2);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e2) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e2, f2, g, h2, k2) {
  a = new al(a, b, c, h2, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e2, f2, g, h2, k2) {
  a = bl(c, d, true, a, e2, f2, g, h2, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e2 = yi(c);
  f2 = mh(d, e2);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e2);
  a.current.lanes = e2;
  Ac(a, e2, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e2 = b.current, f2 = R(), g = yi(e2);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e2, b, g);
  null !== a && (gi(a, e2, g, f2), oh(a, e2, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e2) {
  if (e2) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e2 = a.lastChild; ) a.removeChild(e2);
  if ("function" === typeof d) {
    var h2 = d;
    d = function() {
      var a2 = gl(k2);
      h2.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e2) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e2) {
      var h2 = e2;
      e2 = function() {
        var a2 = gl(g);
        h2.call(a2);
      };
    }
    fl(b, g, a, e2);
  } else g = ql(c, b, a, e2, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e2 = Db(d);
            if (!e2) throw Error(p(90));
            Wa(d);
            bb(d, e2);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e2 = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e2 = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e2);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e2 = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e2 = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e2, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e2 = c._getVersion, e2 = e2(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e2] : b.mutableSourceEagerHydrationData.push(
    c,
    e2
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
function Transitioner() {
  const router2 = useRouter();
  const mountLoadForRouter = reactExports.useRef({ router: router2, mounted: false });
  const routerState = useRouterState({
    select: (s) => pick$1(s, ["isLoading", "location", "resolvedLocation", "isTransitioning"])
  });
  const [isTransitioning, startReactTransition_] = reactExports.useTransition();
  const hasPendingMatches = useRouterState({
    select: (s) => s.matches.some((d) => d.status === "pending")
  });
  const previousIsLoading = usePrevious(routerState.isLoading);
  const isAnyPending = routerState.isLoading || isTransitioning || hasPendingMatches;
  const previousIsAnyPending = usePrevious(isAnyPending);
  if (!router2.isServer) {
    router2.startReactTransition = startReactTransition_;
  }
  reactExports.useEffect(() => {
    const unsub = router2.history.subscribe(router2.load);
    const nextLocation = router2.buildLocation({
      to: router2.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true
    });
    if (trimPathRight(router2.latestLocation.href) !== trimPathRight(nextLocation.href)) {
      router2.commitLocation({ ...nextLocation, replace: true });
    }
    return () => {
      unsub();
    };
  }, [router2, router2.history]);
  useLayoutEffect(() => {
    var _a2;
    if (typeof window !== "undefined" && ((_a2 = window.__TSR__) == null ? void 0 : _a2.dehydrated) || mountLoadForRouter.current.router === router2 && mountLoadForRouter.current.mounted) {
      return;
    }
    mountLoadForRouter.current = { router: router2, mounted: true };
    const tryLoad = async () => {
      try {
        await router2.load();
      } catch (err) {
        console.error(err);
      }
    };
    tryLoad();
  }, [router2]);
  useLayoutEffect(() => {
    if (previousIsLoading && !routerState.isLoading) {
      const toLocation = router2.state.location;
      const fromLocation = router2.state.resolvedLocation;
      const pathChanged = fromLocation.href !== toLocation.href;
      router2.emit({
        type: "onLoad",
        // When the new URL has committed, when the new matches have been loaded into state.matches
        fromLocation,
        toLocation,
        pathChanged
      });
    }
  }, [previousIsLoading, router2, routerState.isLoading]);
  useLayoutEffect(() => {
    if (previousIsAnyPending && !isAnyPending) {
      const toLocation = router2.state.location;
      const fromLocation = router2.state.resolvedLocation;
      const pathChanged = fromLocation.href !== toLocation.href;
      router2.emit({
        type: "onResolved",
        fromLocation,
        toLocation,
        pathChanged
      });
      router2.__store.setState((s) => ({
        ...s,
        status: "idle",
        resolvedLocation: s.location
      }));
      if (typeof document !== "undefined" && document.querySelector) {
        if (router2.state.location.hash !== "") {
          const el2 = document.getElementById(router2.state.location.hash);
          if (el2) {
            el2.scrollIntoView();
          }
        }
      }
    }
  }, [isAnyPending, previousIsAnyPending, router2]);
  return null;
}
function SafeFragment(props2) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props2.children });
}
function renderRouteNotFound(router2, route, data) {
  if (!route.options.notFoundComponent) {
    if (router2.options.defaultNotFoundComponent) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(router2.options.defaultNotFoundComponent, { data });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultGlobalNotFound, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(route.options.notFoundComponent, { data });
}
const Match = reactExports.memo(function MatchImpl({
  matchId
}) {
  var _a2, _b2;
  const router2 = useRouter();
  const routeId = useRouterState({
    select: (s) => {
      var _a22;
      return (_a22 = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a22.routeId;
    }
  });
  invariant(
    routeId
  );
  const route = router2.routesById[routeId];
  const PendingComponent = route.options.pendingComponent ?? router2.options.defaultPendingComponent;
  const pendingElement = PendingComponent ? /* @__PURE__ */ jsxRuntimeExports.jsx(PendingComponent, {}) : null;
  const routeErrorComponent = route.options.errorComponent ?? router2.options.defaultErrorComponent;
  const routeOnCatch = route.options.onCatch ?? router2.options.defaultOnCatch;
  const routeNotFoundComponent = route.isRoot ? (
    // If it's the root route, use the globalNotFound option, with fallback to the notFoundRoute's component
    route.options.notFoundComponent ?? ((_a2 = router2.options.notFoundRoute) == null ? void 0 : _a2.options.component)
  ) : route.options.notFoundComponent;
  const ResolvedSuspenseBoundary = (
    // If we're on the root route, allow forcefully wrapping in suspense
    (!route.isRoot || route.options.wrapInSuspense) && (route.options.wrapInSuspense ?? PendingComponent ?? ((_b2 = route.options.errorComponent) == null ? void 0 : _b2.preload)) ? reactExports.Suspense : SafeFragment
  );
  const ResolvedCatchBoundary = routeErrorComponent ? CatchBoundary : SafeFragment;
  const ResolvedNotFoundBoundary = routeNotFoundComponent ? CatchNotFound : SafeFragment;
  const resetKey = useRouterState({
    select: (s) => s.loadedAt
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(matchContext.Provider, { value: matchId, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResolvedSuspenseBoundary, { fallback: pendingElement, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ResolvedCatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: routeErrorComponent || ErrorComponent,
      onCatch: (error, errorInfo) => {
        if (isNotFound(error)) throw error;
        routeOnCatch == null ? void 0 : routeOnCatch(error, errorInfo);
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResolvedNotFoundBoundary,
        {
          fallback: (error) => {
            if (!routeNotFoundComponent || error.routeId && error.routeId !== routeId || !error.routeId && !route.isRoot)
              throw error;
            return reactExports.createElement(routeNotFoundComponent, error);
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchInner, { matchId })
        }
      )
    }
  ) }) });
});
const MatchInner = reactExports.memo(function MatchInnerImpl({
  matchId
}) {
  var _a2, _b2, _c2;
  const router2 = useRouter();
  const { match, matchIndex, routeId } = useRouterState({
    select: (s) => {
      const matchIndex2 = s.matches.findIndex((d) => d.id === matchId);
      const match2 = s.matches[matchIndex2];
      const routeId2 = match2.routeId;
      return {
        routeId: routeId2,
        matchIndex: matchIndex2,
        match: pick$1(match2, ["id", "status", "error", "loadPromise"])
      };
    }
  });
  const route = router2.routesById[routeId];
  const out = reactExports.useMemo(() => {
    const Comp = route.options.component ?? router2.options.defaultComponent;
    return Comp ? /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, {}, routeId) : /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }, [routeId, route.options.component, router2.options.defaultComponent]);
  const RouteErrorComponent = (route.options.errorComponent ?? router2.options.defaultErrorComponent) || ErrorComponent;
  if (match.status === "notFound") {
    let error;
    if (isServerSideError(match.error)) {
      const deserializeError = ((_a2 = router2.options.errorSerializer) == null ? void 0 : _a2.deserialize) ?? defaultDeserializeError;
      error = deserializeError(match.error.data);
    } else {
      error = match.error;
    }
    invariant(isNotFound(error));
    return renderRouteNotFound(router2, route, error);
  }
  if (match.status === "redirected") {
    invariant(isRedirect(match.error));
    throw match.loadPromise;
  }
  if (match.status === "error") {
    if (router2.isServer) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        RouteErrorComponent,
        {
          error: match.error,
          info: {
            componentStack: ""
          }
        }
      );
    }
    if (isServerSideError(match.error)) {
      const deserializeError = ((_b2 = router2.options.errorSerializer) == null ? void 0 : _b2.deserialize) ?? defaultDeserializeError;
      throw deserializeError(match.error.data);
    } else {
      throw match.error;
    }
  }
  if (match.status === "pending") {
    const pendingMinMs = route.options.pendingMinMs ?? router2.options.defaultPendingMinMs;
    if (pendingMinMs && !((_c2 = router2.getMatch(match.id)) == null ? void 0 : _c2.minPendingPromise)) {
      if (!router2.isServer) {
        const minPendingPromise = createControlledPromise();
        Promise.resolve().then(() => {
          router2.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise
          }));
        });
        setTimeout(() => {
          minPendingPromise.resolve();
          router2.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise: void 0
          }));
        }, pendingMinMs);
      }
    }
    throw match.loadPromise;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    out,
    router2.AfterEachMatch ? /* @__PURE__ */ jsxRuntimeExports.jsx(router2.AfterEachMatch, { match, matchIndex }) : null
  ] });
});
const Outlet = reactExports.memo(function OutletImpl() {
  const router2 = useRouter();
  const matchId = reactExports.useContext(matchContext);
  const routeId = useRouterState({
    select: (s) => {
      var _a2;
      return (_a2 = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a2.routeId;
    }
  });
  const route = router2.routesById[routeId];
  const { parentGlobalNotFound } = useRouterState({
    select: (s) => {
      const matches = s.matches;
      const parentMatch = matches.find((d) => d.id === matchId);
      invariant(
        parentMatch
      );
      return {
        parentGlobalNotFound: parentMatch.globalNotFound
      };
    }
  });
  const childMatchId = useRouterState({
    select: (s) => {
      var _a2;
      const matches = s.matches;
      const index2 = matches.findIndex((d) => d.id === matchId);
      return (_a2 = matches[index2 + 1]) == null ? void 0 : _a2.id;
    }
  });
  if (parentGlobalNotFound) {
    return renderRouteNotFound(router2, route, void 0);
  }
  if (!childMatchId) {
    return null;
  }
  const nextMatch = /* @__PURE__ */ jsxRuntimeExports.jsx(Match, { matchId: childMatchId });
  const pendingElement = router2.options.defaultPendingComponent ? /* @__PURE__ */ jsxRuntimeExports.jsx(router2.options.defaultPendingComponent, {}) : null;
  if (matchId === rootRouteId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: pendingElement, children: nextMatch });
  }
  return nextMatch;
});
function Matches() {
  const router2 = useRouter();
  const pendingElement = router2.options.defaultPendingComponent ? /* @__PURE__ */ jsxRuntimeExports.jsx(router2.options.defaultPendingComponent, {}) : null;
  const ResolvedSuspense = router2.isServer || typeof document !== "undefined" && window.__TSR__ ? SafeFragment : reactExports.Suspense;
  const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs(ResolvedSuspense, { fallback: pendingElement, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Transitioner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MatchesInner, {})
  ] });
  return router2.options.InnerWrap ? /* @__PURE__ */ jsxRuntimeExports.jsx(router2.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
  const matchId = useRouterState({
    select: (s) => {
      var _a2;
      return (_a2 = s.matches[0]) == null ? void 0 : _a2.id;
    }
  });
  const resetKey = useRouterState({
    select: (s) => s.loadedAt
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(matchContext.Provider, { value: matchId, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: ErrorComponent,
      onCatch: (error) => {
        warning(false, error.message || error.toString());
      },
      children: matchId ? /* @__PURE__ */ jsxRuntimeExports.jsx(Match, { matchId }) : null
    }
  ) });
}
function RouterContextProvider({
  router: router2,
  children,
  ...rest
}) {
  router2.update({
    ...router2.options,
    ...rest,
    context: {
      ...router2.options.context,
      ...rest.context
    }
  });
  const routerContext2 = getRouterContext();
  const provider = /* @__PURE__ */ jsxRuntimeExports.jsx(routerContext2.Provider, { value: router2, children });
  if (router2.options.Wrap) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(router2.options.Wrap, { children: provider });
  }
  return provider;
}
function RouterProvider({ router: router2, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RouterContextProvider, { router: router2, ...rest, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Matches, {}) });
}
var client = {};
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop$3() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialMatchKey(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy2 = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if ((!array && aItems.includes(key) || array) && a[key] === void 0 && b[key] === void 0) {
        copy2[key] = void 0;
        equalItems++;
      } else {
        copy2[key] = replaceEqualDeep(a[key], b[key]);
        if (copy2[key] === a[key] && a[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy2;
  }
  return b;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (!options.queryFn && (fetchOptions == null ? void 0 : fetchOptions.initialPromise)) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}
var FocusManager = (_a = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _focused);
    __privateAdd(this, _cleanup);
    __privateAdd(this, _setup);
    __privateSet(this, _setup, (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup)) {
      this.setEventListener(__privateGet(this, _setup));
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _cleanup)) == null ? void 0 : _a2.call(this);
      __privateSet(this, _cleanup, void 0);
    }
  }
  setEventListener(setup) {
    var _a2;
    __privateSet(this, _setup, setup);
    (_a2 = __privateGet(this, _cleanup)) == null ? void 0 : _a2.call(this);
    __privateSet(this, _cleanup, setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    }));
  }
  setFocused(focused) {
    const changed = __privateGet(this, _focused) !== focused;
    if (changed) {
      __privateSet(this, _focused, focused);
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    var _a2;
    if (typeof __privateGet(this, _focused) === "boolean") {
      return __privateGet(this, _focused);
    }
    return ((_a2 = globalThis.document) == null ? void 0 : _a2.visibilityState) !== "hidden";
  }
}, _focused = new WeakMap(), _cleanup = new WeakMap(), _setup = new WeakMap(), _a);
var focusManager = new FocusManager();
var OnlineManager = (_b = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _online, true);
    __privateAdd(this, _cleanup2);
    __privateAdd(this, _setup2);
    __privateSet(this, _setup2, (onOnline) => {
      if (!isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup2)) {
      this.setEventListener(__privateGet(this, _setup2));
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _cleanup2)) == null ? void 0 : _a2.call(this);
      __privateSet(this, _cleanup2, void 0);
    }
  }
  setEventListener(setup) {
    var _a2;
    __privateSet(this, _setup2, setup);
    (_a2 = __privateGet(this, _cleanup2)) == null ? void 0 : _a2.call(this);
    __privateSet(this, _cleanup2, setup(this.setOnline.bind(this)));
  }
  setOnline(online) {
    const changed = __privateGet(this, _online) !== online;
    if (changed) {
      __privateSet(this, _online, online);
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return __privateGet(this, _online);
  }
}, _online = new WeakMap(), _cleanup2 = new WeakMap(), _setup2 = new WeakMap(), _b);
var onlineManager = new OnlineManager();
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options == null ? void 0 : options.revert;
    this.silent = options == null ? void 0 : options.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config2) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((outerResolve, outerReject) => {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });
  const cancel = (cancelOptions) => {
    var _a2;
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      (_a2 = config2.abort) == null ? void 0 : _a2.call(config2);
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config2.networkMode === "always" || onlineManager.isOnline()) && config2.canRun();
  const canStart = () => canFetch(config2.networkMode) && config2.canRun();
  const resolve = (value) => {
    var _a2;
    if (!isResolved) {
      isResolved = true;
      (_a2 = config2.onSuccess) == null ? void 0 : _a2.call(config2, value);
      continueFn == null ? void 0 : continueFn();
      promiseResolve(value);
    }
  };
  const reject = (value) => {
    var _a2;
    if (!isResolved) {
      isResolved = true;
      (_a2 = config2.onError) == null ? void 0 : _a2.call(config2, value);
      continueFn == null ? void 0 : continueFn();
      promiseReject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      var _a2;
      continueFn = (value) => {
        if (isResolved || canContinue()) {
          continueResolve(value);
        }
      };
      (_a2 = config2.onPause) == null ? void 0 : _a2.call(config2);
    }).then(() => {
      var _a2;
      continueFn = void 0;
      if (!isResolved) {
        (_a2 = config2.onContinue) == null ? void 0 : _a2.call(config2);
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config2.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config2.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      var _a2;
      if (isResolved) {
        return;
      }
      const retry = config2.retry ?? (isServer ? 0 : 3);
      const retryDelay = config2.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      (_a2 = config2.onFail) == null ? void 0 : _a2.call(config2, failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise,
    cancel,
    continue: () => {
      continueFn == null ? void 0 : continueFn();
      return promise;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return promise;
    }
  };
}
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = (cb2) => setTimeout(cb2, 0);
  const setScheduler = (fn) => {
    scheduleFn = fn;
  };
  const batch = (callback) => {
    let result;
    transactions++;
    try {
      result = callback();
    } finally {
      transactions--;
      if (!transactions) {
        flush();
      }
    }
    return result;
  };
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const batchCalls = (callback) => {
    return (...args) => {
      schedule(() => {
        callback(...args);
      });
    };
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  const setNotifyFunction = (fn) => {
    notifyFn = fn;
  };
  const setBatchNotifyFunction = (fn) => {
    batchNotifyFn = fn;
  };
  return {
    batch,
    batchCalls,
    schedule,
    setNotifyFunction,
    setBatchNotifyFunction,
    setScheduler
  };
}
var notifyManager = createNotifyManager();
var Removable = (_c = class {
  constructor() {
    __privateAdd(this, _gcTimeout);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      __privateSet(this, _gcTimeout, setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime));
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (__privateGet(this, _gcTimeout)) {
      clearTimeout(__privateGet(this, _gcTimeout));
      __privateSet(this, _gcTimeout, void 0);
    }
  }
}, _gcTimeout = new WeakMap(), _c);
var Query = (_d = class extends Removable {
  constructor(config2) {
    super();
    __privateAdd(this, _Query_instances);
    __privateAdd(this, _initialState);
    __privateAdd(this, _revertState);
    __privateAdd(this, _cache);
    __privateAdd(this, _retryer);
    __privateAdd(this, _defaultOptions);
    __privateAdd(this, _abortSignalConsumed);
    __privateSet(this, _abortSignalConsumed, false);
    __privateSet(this, _defaultOptions, config2.defaultOptions);
    this.setOptions(config2.options);
    this.observers = [];
    __privateSet(this, _cache, config2.cache);
    this.queryKey = config2.queryKey;
    this.queryHash = config2.queryHash;
    __privateSet(this, _initialState, getDefaultState$1(this.options));
    this.state = config2.state ?? __privateGet(this, _initialState);
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    var _a2;
    return (_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.promise;
  }
  setOptions(options) {
    this.options = { ...__privateGet(this, _defaultOptions), ...options };
    this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      __privateGet(this, _cache).remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
      data,
      type: "success",
      dataUpdatedAt: options == null ? void 0 : options.updatedAt,
      manual: options == null ? void 0 : options.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "setState", state, setStateOptions });
  }
  cancel(options) {
    var _a2, _b2;
    const promise = (_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.promise;
    (_b2 = __privateGet(this, _retryer)) == null ? void 0 : _b2.cancel(options);
    return promise ? promise.then(noop$3).catch(noop$3) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(__privateGet(this, _initialState));
  }
  isActive() {
    return this.observers.some(
      (observer) => resolveEnabled(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    if (this.state.isInvalidated) {
      return true;
    }
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0;
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || this.state.data === void 0 || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    var _a2;
    const observer = this.observers.find((x2) => x2.shouldFetchOnWindowFocus());
    observer == null ? void 0 : observer.refetch({ cancelRefetch: false });
    (_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.continue();
  }
  onOnline() {
    var _a2;
    const observer = this.observers.find((x2) => x2.shouldFetchOnReconnect());
    observer == null ? void 0 : observer.refetch({ cancelRefetch: false });
    (_a2 = __privateGet(this, _retryer)) == null ? void 0 : _a2.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      __privateGet(this, _cache).notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x2) => x2 !== observer);
      if (!this.observers.length) {
        if (__privateGet(this, _retryer)) {
          if (__privateGet(this, _abortSignalConsumed)) {
            __privateGet(this, _retryer).cancel({ revert: true });
          } else {
            __privateGet(this, _retryer).cancelRetry();
          }
        }
        this.scheduleGc();
      }
      __privateGet(this, _cache).notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    var _a2, _b2, _c2;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && (fetchOptions == null ? void 0 : fetchOptions.cancelRefetch)) {
        this.cancel({ silent: true });
      } else if (__privateGet(this, _retryer)) {
        __privateGet(this, _retryer).continueRetry();
        return __privateGet(this, _retryer).promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x2) => x2.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          __privateSet(this, _abortSignalConsumed, true);
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const queryFnContext = {
        queryKey: this.queryKey,
        meta: this.meta
      };
      addSignalProperty(queryFnContext);
      __privateSet(this, _abortSignalConsumed, false);
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    (_a2 = this.options.behavior) == null ? void 0 : _a2.onFetch(
      context,
      this
    );
    __privateSet(this, _revertState, this.state);
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_b2 = context.fetchOptions) == null ? void 0 : _b2.meta)) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "fetch", meta: (_c2 = context.fetchOptions) == null ? void 0 : _c2.meta });
    }
    const onError = (error) => {
      var _a3, _b3, _c3, _d2;
      if (!(isCancelledError(error) && error.silent)) {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
          type: "error",
          error
        });
      }
      if (!isCancelledError(error)) {
        (_b3 = (_a3 = __privateGet(this, _cache).config).onError) == null ? void 0 : _b3.call(
          _a3,
          error,
          this
        );
        (_d2 = (_c3 = __privateGet(this, _cache).config).onSettled) == null ? void 0 : _d2.call(
          _c3,
          this.state.data,
          error,
          this
        );
      }
      if (!this.isFetchingOptimistic) {
        this.scheduleGc();
      }
      this.isFetchingOptimistic = false;
    };
    __privateSet(this, _retryer, createRetryer({
      initialPromise: fetchOptions == null ? void 0 : fetchOptions.initialPromise,
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        var _a3, _b3, _c3, _d2;
        if (data === void 0) {
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(data);
        } catch (error) {
          onError(error);
          return;
        }
        (_b3 = (_a3 = __privateGet(this, _cache).config).onSuccess) == null ? void 0 : _b3.call(_a3, data, this);
        (_d2 = (_c3 = __privateGet(this, _cache).config).onSettled) == null ? void 0 : _d2.call(
          _c3,
          data,
          this.state.error,
          this
        );
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      },
      onError,
      onFail: (failureCount, error) => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "pause" });
      },
      onContinue: () => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    }));
    return __privateGet(this, _retryer).start();
  }
}, _initialState = new WeakMap(), _revertState = new WeakMap(), _cache = new WeakMap(), _retryer = new WeakMap(), _defaultOptions = new WeakMap(), _abortSignalConsumed = new WeakMap(), _Query_instances = new WeakSet(), dispatch_fn = function(action) {
  const reducer = (state) => {
    switch (action.type) {
      case "failed":
        return {
          ...state,
          fetchFailureCount: action.failureCount,
          fetchFailureReason: action.error
        };
      case "pause":
        return {
          ...state,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...state,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...state,
          ...fetchState(state.data, this.options),
          fetchMeta: action.meta ?? null
        };
      case "success":
        return {
          ...state,
          data: action.data,
          dataUpdateCount: state.dataUpdateCount + 1,
          dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: false,
          status: "success",
          ...!action.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const error = action.error;
        if (isCancelledError(error) && error.revert && __privateGet(this, _revertState)) {
          return { ...__privateGet(this, _revertState), fetchStatus: "idle" };
        }
        return {
          ...state,
          error,
          errorUpdateCount: state.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: state.fetchFailureCount + 1,
          fetchFailureReason: error,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...state,
          isInvalidated: true
        };
      case "setState":
        return {
          ...state,
          ...action.state
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    this.observers.forEach((observer) => {
      observer.onQueryUpdate();
    });
    __privateGet(this, _cache).notify({ query: this, type: "updated", action });
  });
}, _d);
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function getDefaultState$1(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var QueryCache = (_e = class extends Subscribable {
  constructor(config2 = {}) {
    super();
    __privateAdd(this, _queries);
    this.config = config2;
    __privateSet(this, _queries, /* @__PURE__ */ new Map());
  }
  build(client2, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        cache: this,
        queryKey,
        queryHash,
        options: client2.defaultQueryOptions(options),
        state,
        defaultOptions: client2.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!__privateGet(this, _queries).has(query.queryHash)) {
      __privateGet(this, _queries).set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = __privateGet(this, _queries).get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        __privateGet(this, _queries).delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return __privateGet(this, _queries).get(queryHash);
  }
  getAll() {
    return [...__privateGet(this, _queries).values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => matchQuery(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
}, _queries = new WeakMap(), _e);
var Mutation = (_f = class extends Removable {
  constructor(config2) {
    super();
    __privateAdd(this, _Mutation_instances);
    __privateAdd(this, _observers);
    __privateAdd(this, _mutationCache);
    __privateAdd(this, _retryer2);
    this.mutationId = config2.mutationId;
    __privateSet(this, _mutationCache, config2.mutationCache);
    __privateSet(this, _observers, []);
    this.state = config2.state || getDefaultState();
    this.setOptions(config2.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!__privateGet(this, _observers).includes(observer)) {
      __privateGet(this, _observers).push(observer);
      this.clearGcTimeout();
      __privateGet(this, _mutationCache).notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    __privateSet(this, _observers, __privateGet(this, _observers).filter((x2) => x2 !== observer));
    this.scheduleGc();
    __privateGet(this, _mutationCache).notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!__privateGet(this, _observers).length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        __privateGet(this, _mutationCache).remove(this);
      }
    }
  }
  continue() {
    var _a2;
    return ((_a2 = __privateGet(this, _retryer2)) == null ? void 0 : _a2.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
    __privateSet(this, _retryer2, createRetryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables);
      },
      onFail: (failureCount, error) => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pause" });
      },
      onContinue: () => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "continue" });
      },
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => __privateGet(this, _mutationCache).canRun(this)
    }));
    const restored = this.state.status === "pending";
    const isPaused = !__privateGet(this, _retryer2).canStart();
    try {
      if (!restored) {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pending", variables, isPaused });
        await ((_b2 = (_a2 = __privateGet(this, _mutationCache).config).onMutate) == null ? void 0 : _b2.call(
          _a2,
          variables,
          this
        ));
        const context = await ((_d2 = (_c2 = this.options).onMutate) == null ? void 0 : _d2.call(_c2, variables));
        if (context !== this.state.context) {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, {
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await __privateGet(this, _retryer2).start();
      await ((_f2 = (_e2 = __privateGet(this, _mutationCache).config).onSuccess) == null ? void 0 : _f2.call(
        _e2,
        data,
        variables,
        this.state.context,
        this
      ));
      await ((_h2 = (_g2 = this.options).onSuccess) == null ? void 0 : _h2.call(_g2, data, variables, this.state.context));
      await ((_j = (_i = __privateGet(this, _mutationCache).config).onSettled) == null ? void 0 : _j.call(
        _i,
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      ));
      await ((_l = (_k = this.options).onSettled) == null ? void 0 : _l.call(_k, data, null, variables, this.state.context));
      __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "success", data });
      return data;
    } catch (error) {
      try {
        await ((_n = (_m = __privateGet(this, _mutationCache).config).onError) == null ? void 0 : _n.call(
          _m,
          error,
          variables,
          this.state.context,
          this
        ));
        await ((_p = (_o = this.options).onError) == null ? void 0 : _p.call(
          _o,
          error,
          variables,
          this.state.context
        ));
        await ((_r = (_q = __privateGet(this, _mutationCache).config).onSettled) == null ? void 0 : _r.call(
          _q,
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        ));
        await ((_t = (_s = this.options).onSettled) == null ? void 0 : _t.call(
          _s,
          void 0,
          error,
          variables,
          this.state.context
        ));
        throw error;
      } finally {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "error", error });
      }
    } finally {
      __privateGet(this, _mutationCache).runNext(this);
    }
  }
}, _observers = new WeakMap(), _mutationCache = new WeakMap(), _retryer2 = new WeakMap(), _Mutation_instances = new WeakSet(), dispatch_fn2 = function(action) {
  const reducer = (state) => {
    switch (action.type) {
      case "failed":
        return {
          ...state,
          failureCount: action.failureCount,
          failureReason: action.error
        };
      case "pause":
        return {
          ...state,
          isPaused: true
        };
      case "continue":
        return {
          ...state,
          isPaused: false
        };
      case "pending":
        return {
          ...state,
          context: action.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: action.isPaused,
          status: "pending",
          variables: action.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...state,
          data: action.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: false
        };
      case "error":
        return {
          ...state,
          data: void 0,
          error: action.error,
          failureCount: state.failureCount + 1,
          failureReason: action.error,
          isPaused: false,
          status: "error"
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    __privateGet(this, _observers).forEach((observer) => {
      observer.onMutationUpdate(action);
    });
    __privateGet(this, _mutationCache).notify({
      mutation: this,
      type: "updated",
      action
    });
  });
}, _f);
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var MutationCache = (_g = class extends Subscribable {
  constructor(config2 = {}) {
    super();
    __privateAdd(this, _mutations);
    __privateAdd(this, _mutationId);
    this.config = config2;
    __privateSet(this, _mutations, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationId, Date.now());
  }
  build(client2, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      mutationId: ++__privateWrapper(this, _mutationId)._,
      options: client2.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    const scope = scopeFor(mutation);
    const mutations = __privateGet(this, _mutations).get(scope) ?? [];
    mutations.push(mutation);
    __privateGet(this, _mutations).set(scope, mutations);
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    var _a2;
    const scope = scopeFor(mutation);
    if (__privateGet(this, _mutations).has(scope)) {
      const mutations = (_a2 = __privateGet(this, _mutations).get(scope)) == null ? void 0 : _a2.filter((x2) => x2 !== mutation);
      if (mutations) {
        if (mutations.length === 0) {
          __privateGet(this, _mutations).delete(scope);
        } else {
          __privateGet(this, _mutations).set(scope, mutations);
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    var _a2;
    const firstPendingMutation = (_a2 = __privateGet(this, _mutations).get(scopeFor(mutation))) == null ? void 0 : _a2.find((m2) => m2.state.status === "pending");
    return !firstPendingMutation || firstPendingMutation === mutation;
  }
  runNext(mutation) {
    var _a2;
    const foundMutation = (_a2 = __privateGet(this, _mutations).get(scopeFor(mutation))) == null ? void 0 : _a2.find((m2) => m2 !== mutation && m2.state.isPaused);
    return (foundMutation == null ? void 0 : foundMutation.continue()) ?? Promise.resolve();
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return [...__privateGet(this, _mutations).values()].flat();
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => matchMutation(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x2) => x2.state.isPaused);
    return notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(noop$3))
      )
    );
  }
}, _mutations = new WeakMap(), _mutationId = new WeakMap(), _g);
function scopeFor(mutation) {
  var _a2;
  return ((_a2 = mutation.options.scope) == null ? void 0 : _a2.id) ?? String(mutation.mutationId);
}
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const fetchFn = async () => {
        var _a2, _b2, _c2, _d2, _e2;
        const options = context.options;
        const direction = (_c2 = (_b2 = (_a2 = context.fetchOptions) == null ? void 0 : _a2.meta) == null ? void 0 : _b2.fetchMore) == null ? void 0 : _c2.direction;
        const oldPages = ((_d2 = context.state.data) == null ? void 0 : _d2.pages) || [];
        const oldPageParams = ((_e2 = context.state.data) == null ? void 0 : _e2.pageParams) || [];
        const empty = { pages: [], pageParams: [] };
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = ensureQueryFn(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const queryFnContext = {
            queryKey: context.queryKey,
            pageParam: param,
            direction: previous ? "backward" : "forward",
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const page = await queryFn(
            queryFnContext
          );
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        let result;
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          result = await fetchPage(
            empty,
            oldPageParams[0] ?? options.initialPageParam
          );
          const remainingPages = pages ?? oldPages.length;
          for (let i = 1; i < remainingPages; i++) {
            const param = getNextPageParam(options, result);
            if (param == null) {
              break;
            }
            result = await fetchPage(result, param);
          }
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          var _a2, _b2;
          return (_b2 = (_a2 = context.options).persister) == null ? void 0 : _b2.call(
            _a2,
            fetchFn,
            {
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  var _a2;
  return pages.length > 0 ? (_a2 = options.getPreviousPageParam) == null ? void 0 : _a2.call(options, pages[0], pages, pageParams[0], pageParams) : void 0;
}
var QueryClient = (_h = class {
  constructor(config2 = {}) {
    __privateAdd(this, _queryCache);
    __privateAdd(this, _mutationCache2);
    __privateAdd(this, _defaultOptions2);
    __privateAdd(this, _queryDefaults);
    __privateAdd(this, _mutationDefaults);
    __privateAdd(this, _mountCount);
    __privateAdd(this, _unsubscribeFocus);
    __privateAdd(this, _unsubscribeOnline);
    __privateSet(this, _queryCache, config2.queryCache || new QueryCache());
    __privateSet(this, _mutationCache2, config2.mutationCache || new MutationCache());
    __privateSet(this, _defaultOptions2, config2.defaultOptions || {});
    __privateSet(this, _queryDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mountCount, 0);
  }
  mount() {
    __privateWrapper(this, _mountCount)._++;
    if (__privateGet(this, _mountCount) !== 1)
      return;
    __privateSet(this, _unsubscribeFocus, focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        __privateGet(this, _queryCache).onFocus();
      }
    }));
    __privateSet(this, _unsubscribeOnline, onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        __privateGet(this, _queryCache).onOnline();
      }
    }));
  }
  unmount() {
    var _a2, _b2;
    __privateWrapper(this, _mountCount)._--;
    if (__privateGet(this, _mountCount) !== 0)
      return;
    (_a2 = __privateGet(this, _unsubscribeFocus)) == null ? void 0 : _a2.call(this);
    __privateSet(this, _unsubscribeFocus, void 0);
    (_b2 = __privateGet(this, _unsubscribeOnline)) == null ? void 0 : _b2.call(this);
    __privateSet(this, _unsubscribeOnline, void 0);
  }
  isFetching(filters) {
    return __privateGet(this, _queryCache).findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return __privateGet(this, _mutationCache2).findAll({ ...filters, status: "pending" }).length;
  }
  getQueryData(queryKey) {
    var _a2;
    const options = this.defaultQueryOptions({ queryKey });
    return (_a2 = __privateGet(this, _queryCache).get(options.queryHash)) == null ? void 0 : _a2.state.data;
  }
  ensureQueryData(options) {
    const cachedData = this.getQueryData(options.queryKey);
    if (cachedData === void 0)
      return this.fetchQuery(options);
    else {
      const defaultedOptions = this.defaultQueryOptions(options);
      const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
      if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
        void this.prefetchQuery(defaultedOptions);
      }
      return Promise.resolve(cachedData);
    }
  }
  getQueriesData(filters) {
    return __privateGet(this, _queryCache).findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = __privateGet(this, _queryCache).get(
      defaultedOptions.queryHash
    );
    const prevData = query == null ? void 0 : query.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return __privateGet(this, _queryCache).build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    var _a2;
    const options = this.defaultQueryOptions({ queryKey });
    return (_a2 = __privateGet(this, _queryCache).get(options.queryHash)) == null ? void 0 : _a2.state;
  }
  removeQueries(filters) {
    const queryCache = __privateGet(this, _queryCache);
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = __privateGet(this, _queryCache);
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(filters = {}, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(noop$3).catch(noop$3);
  }
  invalidateQueries(filters = {}, options = {}) {
    return notifyManager.batch(() => {
      __privateGet(this, _queryCache).findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: filters.refetchType ?? filters.type ?? "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(filters = {}, options) {
    const fetchOptions = {
      ...options,
      cancelRefetch: (options == null ? void 0 : options.cancelRefetch) ?? true
    };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(noop$3);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(noop$3);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
    return query.isStaleByTime(
      resolveStaleTime(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop$3).catch(noop$3);
  }
  fetchInfiniteQuery(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop$3).catch(noop$3);
  }
  resumePausedMutations() {
    if (onlineManager.isOnline()) {
      return __privateGet(this, _mutationCache2).resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return __privateGet(this, _queryCache);
  }
  getMutationCache() {
    return __privateGet(this, _mutationCache2);
  }
  getDefaultOptions() {
    return __privateGet(this, _defaultOptions2);
  }
  setDefaultOptions(options) {
    __privateSet(this, _defaultOptions2, options);
  }
  setQueryDefaults(queryKey, options) {
    __privateGet(this, _queryDefaults).set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults2 = [...__privateGet(this, _queryDefaults).values()];
    let result = {};
    defaults2.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    __privateGet(this, _mutationDefaults).set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults2 = [...__privateGet(this, _mutationDefaults).values()];
    let result = {};
    defaults2.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...__privateGet(this, _defaultOptions2).queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.enabled !== true && defaultedOptions.queryFn === skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options == null ? void 0 : options._defaulted) {
      return options;
    }
    return {
      ...__privateGet(this, _defaultOptions2).mutations,
      ...(options == null ? void 0 : options.mutationKey) && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    __privateGet(this, _queryCache).clear();
    __privateGet(this, _mutationCache2).clear();
  }
}, _queryCache = new WeakMap(), _mutationCache2 = new WeakMap(), _defaultOptions2 = new WeakMap(), _queryDefaults = new WeakMap(), _mutationDefaults = new WeakMap(), _mountCount = new WeakMap(), _unsubscribeFocus = new WeakMap(), _unsubscribeOnline = new WeakMap(), _h);
var QueryClientContext = reactExports.createContext(
  void 0
);
var QueryClientProvider = ({
  client: client2,
  children
}) => {
  reactExports.useEffect(() => {
    client2.mount();
    return () => {
      client2.unmount();
    };
  }, [client2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientContext.Provider, { value: client2, children });
};
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function toPrimitive(t2, r2) {
  if ("object" != _typeof$3(t2) || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2 || "default");
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function toPropertyKey(t2) {
  var i = toPrimitive(t2, "string");
  return "symbol" == _typeof$3(i) ? i : i + "";
}
function _defineProperty$2(e2, r2, t2) {
  return (r2 = toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, {
    value: t2,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e2[r2] = t2, e2;
}
function _arrayWithHoles(r2) {
  if (Array.isArray(r2)) return r2;
}
function _iterableToArrayLimit(r2, l2) {
  var t2 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t2) {
    var e2, n2, i, u2, a = [], f2 = true, o = false;
    try {
      if (i = (t2 = t2.call(r2)).next, 0 === l2) {
        if (Object(t2) !== t2) return;
        f2 = false;
      } else for (; !(f2 = (e2 = i.call(t2)).done) && (a.push(e2.value), a.length !== l2); f2 = true) ;
    } catch (r3) {
      o = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t2["return"] && (u2 = t2["return"](), Object(u2) !== u2)) return;
      } finally {
        if (o) throw n2;
      }
    }
    return a;
  }
}
function _arrayLikeToArray$4(r2, a) {
  (null == a || a > r2.length) && (a = r2.length);
  for (var e2 = 0, n2 = Array(a); e2 < a; e2++) n2[e2] = r2[e2];
  return n2;
}
function _unsupportedIterableToArray$4(r2, a) {
  if (r2) {
    if ("string" == typeof r2) return _arrayLikeToArray$4(r2, a);
    var t2 = {}.toString.call(r2).slice(8, -1);
    return "Object" === t2 && r2.constructor && (t2 = r2.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r2) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray$4(r2, a) : void 0;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r2, e2) {
  return _arrayWithHoles(r2) || _iterableToArrayLimit(r2, e2) || _unsupportedIterableToArray$4(r2, e2) || _nonIterableRest();
}
function _objectWithoutPropertiesLoose(r2, e2) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (e2.includes(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function _objectWithoutProperties(e2, t2) {
  if (null == e2) return {};
  var o, r2, i = _objectWithoutPropertiesLoose(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < s.length; r2++) o = s[r2], t2.includes(o) || {}.propertyIsEnumerable.call(e2, o) && (i[o] = e2[o]);
  }
  return i;
}
var classname = { exports: {} };
var classname_production_min = {};
function r(r2) {
  function t2(t3, i, a, o) {
    var f2 = i ? e2 + t3 + r2.e + i : e2 + t3, v2 = f2;
    if (a) {
      var s = " " + v2 + r2.m;
      for (var u2 in a) if (a.hasOwnProperty(u2)) {
        var p2 = a[u2];
        true === p2 ? v2 += s + u2 : p2 && (v2 += s + u2 + n2 + p2);
      }
    }
    if (void 0 !== o) for (var y2 = 0, c = (o = Array.isArray(o) ? o : [o]).length; y2 < c; y2++) {
      var l2 = o[y2];
      if (l2 && "string" == typeof l2.valueOf()) for (var g = l2.valueOf().split(" "), d = 0; d < g.length; d++) {
        var h2 = g[d];
        h2 !== f2 && (v2 += " " + h2);
      }
    }
    return v2;
  }
  var e2 = r2.n || "", n2 = r2.v || r2.m;
  return function(r3, e3) {
    return function(n3, i, a) {
      return "string" == typeof n3 ? "string" == typeof i || Array.isArray(i) ? t2(r3, n3, void 0, i) : t2(r3, n3, i, a) : t2(r3, e3, n3, i);
    };
  };
}
Object.defineProperty(classname_production_min, "__esModule", { value: true });
var t = r({ e: "-", m: "_" });
classname_production_min.cn = t, classname_production_min.withNaming = r;
{
  classname.exports = classname_production_min;
}
var classnameExports = classname.exports;
function ownKeys$m(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$m(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$m(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$m(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var reactBemNaming$2 = { e: "-", m: "_", v: "_" };
var cn$2 = classnameExports.withNaming(reactBemNaming$2);
var withPrefix$2 = function(a) {
  return classnameExports.withNaming(_objectSpread$m({ n: "".concat(a, "--") }, reactBemNaming$2));
};
withPrefix$2("canary");
var cnDeprecated = withPrefix$2("deprecated");
var presetGpnDefault = { color: { primary: "gpnDefault", accent: "gpnDark", invert: "gpnDark" }, control: "gpnDefault", font: "gpnDefault", size: "gpnDefault", space: "gpnDefault", shadow: "gpnDefault" };
var _excluded$t = ["className", "children", "preset"];
function ownKeys$l(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$l(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$l(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$l(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var cnTheme = cn$2("Theme");
var generateThemeClassNames = function(a) {
  return { color: { primary: cnTheme({ color: a.color.primary }), accent: cnTheme({ color: a.color.accent }), invert: cnTheme({ color: a.color.invert }) }, control: cnTheme({ control: a.control }), font: cnTheme({ font: a.font }), size: cnTheme({ size: a.size }), space: cnTheme({ space: a.space }), shadow: cnTheme({ shadow: a.shadow }) };
};
var generateDeps = function(a) {
  var b = "";
  return Object.keys(a).map(function(c) {
    b += "color" === c ? a.color.accent + a.color.invert + a.color.primary : a[c];
  }), b;
};
var defaultContextValue$1 = { theme: presetGpnDefault, themeClassNames: generateThemeClassNames(presetGpnDefault) };
var ThemeContext = reactExports.createContext(defaultContextValue$1);
var Theme = React.forwardRef(function(a, b) {
  var c = a.className, d = a.children, e2 = a.preset, f2 = _objectWithoutProperties(a, _excluded$t), g = reactExports.useMemo(function() {
    return [{ theme: e2, themeClassNames: generateThemeClassNames(e2) }, _objectSpread$l(_objectSpread$l({}, e2), {}, { color: e2.color.primary })];
  }, [generateDeps(e2)]), h2 = _slicedToArray(g, 2), i = h2[0], j = h2[1];
  return React.createElement(ThemeContext.Provider, { value: i }, React.createElement("div", Object.assign({}, f2, { ref: b, className: cnTheme(j, [c]) }), d));
});
function useTheme() {
  return reactExports.useContext(ThemeContext);
}
const queryClient = new QueryClient();
const App = ({ router: router2 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Theme, { preset: presetGpnDefault, children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RouterProvider, { router: router2 }) }) });
};
const Route$2 = createRootRoute();
const __vite_import_meta_env__$1 = { "BASE_URL": "/solfees-fe-ci-test/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false, "VITE_APP_ENVIRONMENT": "development" };
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const __vite_import_meta_env__ = { "BASE_URL": "/solfees-fe-ci-test/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false, "VITE_APP_ENVIRONMENT": "development" };
const { useDebugValue } = React;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
let didWarnAboutEqualityFn = false;
const identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice2 = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice2);
  return slice2;
}
const createImpl = (createState) => {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const useWebSocketStore = create((set2) => ({
  socket: null,
  isConnected: false,
  slots: [],
  readonlyKeys: [],
  readwriteKeys: [],
  percents: [5e3, 9500],
  updatePercents: (percents) => {
    set2({ percents });
  },
  updateReadonlyKeys: (readonlyKeys) => {
    if (JSON.stringify(readonlyKeys) === JSON.stringify([""])) return;
    set2({ readonlyKeys });
  },
  updateReadwriteKeys: (readwriteKeys) => {
    if (JSON.stringify(readwriteKeys) === JSON.stringify([""])) return;
    set2({ readwriteKeys });
  },
  updateSubscription: () => {
    set2((state) => {
      if (state.socket) {
        const data = {
          "id": 0,
          "method": "SlotsSubscribe",
          "params": {
            "readWrite": state.readwriteKeys,
            "readOnly": state.readonlyKeys,
            "levels": state.percents
          }
        };
        state.socket.send(JSON.stringify(data));
      }
      return state;
    });
  },
  connect: () => {
    set2((state) => {
      const queue = [];
      let lastProcessedTime = Date.now();
      if (state.socket) return state;
      const url = "wss://api.solfees.io/api/solfees/ws";
      const socket = new WebSocket(url);
      socket.onopen = () => {
        set2({ socket });
        state.updateSubscription();
      };
      socket.onclose = () => {
        set2({
          socket: null,
          isConnected: false
        });
      };
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      const handleMessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.result.slot) {
          const update = data.result.slot;
          set2((state2) => {
            const slots = [...state2.slots.slice(-149), update];
            return {
              ...state2,
              slots
            };
          });
          return;
        }
        if (data.result.status) {
          const update = data.result.status;
          set2((state2) => {
            const slots = state2.slots.map((elt) => {
              if (elt.slot === update.slot) return { ...elt, ...update };
              return elt;
            });
            return {
              ...state2,
              slots
            };
          });
          return;
        }
        console.log("unrecognized", data);
      };
      socket.onmessage = (event) => {
        queue.push(event);
      };
      fetch("https://api.solfees.io/api/solfees", {
        method: "POST",
        body: JSON.stringify({
          method: "getRecentPrioritizationFees",
          jsonrpc: "2.0",
          params: [
            {
              "readWrite": state.readwriteKeys,
              "readOnly": state.readonlyKeys,
              "levels": state.percents
            }
          ],
          id: "1"
        })
      }).then((response) => response.json()).then((serverData) => {
        set2({
          isConnected: true,
          slots: serverData.result.map((elt) => elt.slot)
        });
        socket.onmessage = function(e2) {
          queue.push(e2);
          if (Date.now() - lastProcessedTime > 125) {
            queue.length > 1 && console.log("queued from WS:", queue.length);
            queue.forEach(handleMessage);
            queue.length = 0;
            lastProcessedTime = Date.now();
          }
        };
        queue.forEach(handleMessage);
        queue.length = 0;
      }).catch((error) => console.error("Error:", error));
      return state;
    });
  },
  disconnect: () => {
    set2((state) => {
      var _a2;
      (_a2 = state.socket) == null ? void 0 : _a2.close();
      return {
        socket: null,
        isConnected: false
      };
    });
  }
}));
function _arrayWithoutHoles(r2) {
  if (Array.isArray(r2)) return _arrayLikeToArray$4(r2);
}
function _iterableToArray(r2) {
  if ("undefined" != typeof Symbol && null != r2[Symbol.iterator] || null != r2["@@iterator"]) return Array.from(r2);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(r2) {
  return _arrayWithoutHoles(r2) || _iterableToArray(r2) || _unsupportedIterableToArray$4(r2) || _nonIterableSpread();
}
function forwardRefWithAs(a) {
  return React.forwardRef(a);
}
function ownKeys$k(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$k(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$k(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$k(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
const reactBemNaming$1 = { n: "icons--", e: "-", m: "_", v: "_" };
const cn$1 = classnameExports.withNaming(reactBemNaming$1);
const withPrefix$1 = (a) => classnameExports.withNaming(_objectSpread$k(_objectSpread$k({}, reactBemNaming$1), {}, { n: a + reactBemNaming$1.n }));
withPrefix$1("canary");
withPrefix$1("deprecated");
const iconPropSize = ["m", "s", "xs", "l"];
const iconPropSizeDefault = iconPropSize[0];
const cnIcon = cn$1("Icon");
const renderTypeDefault = { l: "default", m: "default", s: "default", xs: "default" };
const _excluded$s = ["size", "className", "view", "as", "children", "color", "name"];
const Icon = forwardRefWithAs((a, b) => {
  const { size: g = "m", className: c, view: d, as: h2 = "span", children: e2, color: i = "mono", name: f2 } = a, j = _objectWithoutProperties(a, _excluded$s);
  return React.createElement(h2, Object.assign({}, j, { className: cnIcon({ size: g, view: d, color: i }, [f2, c]), ref: b }), e2);
});
const createIconInner = (a, b) => {
  return forwardRefWithAs((c, d) => React.createElement(Icon, Object.assign({}, c, { color: a.color, name: a.name, ref: d }), React.createElement(b, { className: cnIcon("Svg"), size: c.size })));
};
const IconSortDownSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" }));
const IconSortDownSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M2 3h12v2H2V3zm0 4h8v2H2V7zm4 4H2v2h4v-2z" }));
const IconSortDownSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M11 3v1H1V3h10zM8 6v1H1V6h7zm-3 4V9H1v1h4z" }));
const props$i = { l: IconSortDownSizeM, m: IconSortDownSizeM, s: IconSortDownSizeS, xs: IconSortDownSizeXs, name: "IconSortDown", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
reactExports.memo(({ element: a, name: b }) => a ? React.createElement("svg", { key: cnIcons(b) }, React.createElement("symbol", { id: `${cnIcons(b)}` }, a.props.children)) : null, ({ name: a }, { name: b }) => a === b);
const defaultContextValue = { addIcon: void 0, removeIcon: void 0 };
const cnIcons = cn$1("Icons");
const IconsContext = reactExports.createContext(defaultContextValue);
const _excluded$r = ["size", "className"], _excluded2$2 = ["children"];
const createSvg = (a) => (b) => {
  var c;
  const { name: d, renderType: e2 = renderTypeDefault } = a, { size: g = "m", className: f2 } = b, h2 = _objectWithoutProperties(b, _excluded$r), i = a[g], { addIcon: j, removeIcon: k2 } = reactExports.useContext(IconsContext), l2 = reactExports.useMemo(() => "use" === e2[g] ? i({ className: f2 }) : null, [i]), m2 = null !== (c = null === l2 || void 0 === l2 ? void 0 : l2.props) && void 0 !== c ? c : {}, o = _objectWithoutProperties(m2, _excluded2$2);
  return reactExports.useEffect(() => {
    "use" === e2[g] && (null === j || void 0 === j ? void 0 : j(d, g, l2));
  }, [l2, e2, g]), reactExports.useEffect(() => () => {
    "use" === e2[g] && (null === k2 || void 0 === k2 ? void 0 : k2(d, g));
  }, [i, e2, g]), j && "use" === e2[g] ? React.createElement("svg", Object.assign({}, h2, o), React.createElement("use", { x: "0", y: "0", xlinkHref: `#${cnIcons(`${d}_${g}`)}` })) : React.createElement(i, { className: f2 });
};
const svg$i = createSvg(props$i);
const IconSortDown = createIconInner(props$i, svg$i);
const IconSortUpSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M3 8h6V6H3v2zm0 8v2h18v-2H3zm0-3h12v-2H3v2z" }));
const IconSortUpSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M6 5H2V3h4v2zM2 7v2h8V7H2zm0 6h12v-2H2v2z" }));
const IconSortUpSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M5 3v1H1V3h4zm3 4V6H1v1h7zm3 3V9H1v1h10z" }));
const props$h = { l: IconSortUpSizeM, m: IconSortUpSizeM, s: IconSortUpSizeS, xs: IconSortUpSizeXs, name: "IconSortUp", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$h = createSvg(props$h);
const IconSortUp = createIconInner(props$h, svg$h);
const IconUnsortSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M3 13h6v-2H3v2zm0-7v2h18V6H3zm0 12h12v-2H3v2z" }));
const IconUnsortSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M2 3h12v2H2V3zm0 8h8v2H2v-2zm4-4H2v2h4V7z" }));
const IconUnsortSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M11 3v1H1V3h10zM8 9v1H1V9h7zM5 7V6H1v1h4z" }));
const props$g = { l: IconUnsortSizeM, m: IconUnsortSizeM, s: IconUnsortSizeS, xs: IconUnsortSizeXs, name: "IconUnsort", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$g = createSvg(props$g);
const IconUnsort = createIconInner(props$g, svg$g);
var cnScrollBar = cn$2("MixScrollBar");
var mixScrollBarPropSize = ["m", "xs", "s"];
var mixScrollBarPropSizeDefault = mixScrollBarPropSize[0];
var cnMixScrollBar = function(a) {
  var b = {}, c = b.size, d = void 0 === c ? mixScrollBarPropSizeDefault : c, e2 = b.invisible;
  return cnScrollBar({ size: d, invisible: e2 });
};
function _createForOfIteratorHelper$3(a, b) {
  var c = "undefined" != typeof Symbol && a[Symbol.iterator] || a["@@iterator"];
  if (!c) {
    if (Array.isArray(a) || (c = _unsupportedIterableToArray$3(a)) || b) {
      c && (a = c);
      var d = 0, e2 = function() {
      };
      return { s: e2, n: function n2() {
        return d >= a.length ? { done: true } : { done: false, value: a[d++] };
      }, e: function e3(a2) {
        throw a2;
      }, f: e2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var g = true, h2 = false;
  return { s: function s() {
    c = c.call(a);
  }, n: function n2() {
    var a2 = c.next();
    return g = a2.done, a2;
  }, e: function e3(a2) {
    h2 = true;
  }, f: function f2() {
    try {
      g || null == c["return"] || c["return"]();
    } finally {
      if (h2) throw f2;
    }
  } };
}
function _unsupportedIterableToArray$3(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray$3(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return "Object" === c && a.constructor && (c = a.constructor.name), "Map" === c || "Set" === c ? Array.from(a) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _arrayLikeToArray$3(a, b) : void 0;
  }
}
function _arrayLikeToArray$3(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
var useResizeObserved = function(a, b) {
  var c = React.useState(function() {
    return a.map(function(a2) {
      return b(a2.current);
    });
  }), d = _slicedToArray(c, 2), e2 = d[0], f2 = d[1], g = React.useRef(b);
  return reactExports.useLayoutEffect(function() {
    g.current = b;
  }, [b]), reactExports.useLayoutEffect(function() {
    var b2, c2 = new ResizeObserver(function() {
      f2(a.map(function(a2) {
        return g.current(a2.current);
      }));
    }), d2 = _createForOfIteratorHelper$3(a);
    try {
      for (d2.s(); !(b2 = d2.n()).done; ) {
        var e3 = b2.value;
        e3.current && c2.observe(e3.current);
      }
    } catch (a2) {
      d2.e(a2);
    } finally {
      d2.f();
    }
    return function() {
      c2.disconnect();
    };
  }, [a]), e2;
};
var defaultSize = { width: 0, height: 0 };
var getElementSize = function(a) {
  if (!a) return defaultSize;
  var b = a.getBoundingClientRect(), c = b.width, d = b.height;
  return { width: c, height: d };
};
function useComponentSize(a) {
  var b = reactExports.useMemo(function() {
    return [a];
  }, [a.current]);
  return useResizeObserved(b, getElementSize)[0];
}
function setRef(a, b) {
  "function" == typeof a ? a(b) : a && (a.current = b);
}
function _createForOfIteratorHelper$2(a, b) {
  var c = "undefined" != typeof Symbol && a[Symbol.iterator] || a["@@iterator"];
  if (!c) {
    if (Array.isArray(a) || (c = _unsupportedIterableToArray$2(a)) || b) {
      c && (a = c);
      var d = 0, e2 = function() {
      };
      return { s: e2, n: function n2() {
        return d >= a.length ? { done: true } : { done: false, value: a[d++] };
      }, e: function e3(a2) {
        throw a2;
      }, f: e2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var g = true, h2 = false;
  return { s: function s() {
    c = c.call(a);
  }, n: function n2() {
    var a2 = c.next();
    return g = a2.done, a2;
  }, e: function e3(a2) {
    h2 = true;
  }, f: function f2() {
    try {
      g || null == c["return"] || c["return"]();
    } finally {
      if (h2) throw f2;
    }
  } };
}
function _unsupportedIterableToArray$2(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray$2(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return "Object" === c && a.constructor && (c = a.constructor.name), "Map" === c || "Set" === c ? Array.from(a) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _arrayLikeToArray$2(a, b) : void 0;
  }
}
function _arrayLikeToArray$2(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
var forkRef = function(a) {
  return a.length ? function(b) {
    var c, d = _createForOfIteratorHelper$2(a);
    try {
      for (d.s(); !(c = d.n()).done; ) {
        var e2 = c.value;
        setRef(e2, b);
      }
    } catch (a2) {
      d.e(a2);
    } finally {
      d.f();
    }
  } : null;
};
var useForkRef = function(a) {
  return reactExports.useMemo(function() {
    return forkRef(a);
  }, [a]);
};
var sortBy = function(a, c) {
  var d = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : "asc", e2 = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : function(c2, a2) {
    return c2 < a2 ? -1 : 1;
  };
  return _toConsumableArray(a).sort(function compareFn(f2, a2) {
    return ("desc" === d ? -1 : 1) * e2(f2[c], a2[c]);
  });
};
var updateAt = function(a, b, c) {
  var d = !!(3 < arguments.length && arguments[3] !== void 0) && arguments[3], e2 = 0 > b ? 0 : b;
  return e2 >= a.length ? d ? [].concat(_toConsumableArray(a), [c]) : a : [].concat(_toConsumableArray(a.slice(0, e2)), [c], _toConsumableArray(a.slice(e2 + (d ? 0 : 1), a.length)));
};
var isDefined = function(a) {
  return a !== void 0;
};
var isNotNil = function(a) {
  return a !== void 0 && null !== a;
};
var isNumber$1 = function(a) {
  return "number" == typeof a;
};
var isString$1 = function(a) {
  return "string" == typeof a;
};
var cnMixFocus = cn$2("MixFocus");
function getByMap(a, b, c) {
  return c ? c : a[b];
}
var useFlag = function() {
  var a = !!(0 < arguments.length && arguments[0] !== void 0) && arguments[0], b = reactExports.useState(a), c = _slicedToArray(b, 2), d = c[0], e2 = c[1];
  return [d, reactExports.useMemo(function() {
    return { on: function on() {
      return e2(true);
    }, off: function off() {
      return e2(false);
    }, toggle: function toggle() {
      return e2(function(a2) {
        return !a2;
      });
    }, set: e2 };
  }, [])];
};
var EventInterceptorContext = React.createContext(void 0);
var usePropsHandler = function(a, b, c) {
  var d = React.useContext(EventInterceptorContext);
  if (!d) return b;
  var e2 = d.eventHandler, f2 = d.map, g = f2[a];
  return g ? g(b, e2, c) : b;
};
var _excluded$q = ["className", "size"];
var loaderPropSize = ["m", "s", "xs"];
var loaderPropSizeDefault = loaderPropSize[0];
var cnLoader = cnDeprecated("Loader");
var Loader = React.forwardRef(function(a, b) {
  var c = a.className, d = a.size, e2 = void 0 === d ? loaderPropSizeDefault : d, f2 = _objectWithoutProperties(a, _excluded$q);
  return React.createElement("div", Object.assign({}, f2, { ref: b, className: cnLoader({ size: e2 }, [c]) }), React.createElement("div", { className: cnLoader("Dot") }));
});
var _excluded$p = ["size", "view", "width", "form", "iconLeft", "iconRight", "label", "className", "onClick", "disabled", "loading", "type", "tabIndex", "as", "onlyIcon", "iconSize", "formId"];
var buttonPropSize = ["m", "xs", "s", "l"];
var buttonPropSizeDefault = buttonPropSize[0];
var buttonPropView = ["primary", "clear", "ghost", "secondary"];
var buttonPropViewDefault = buttonPropView[0];
var buttonPropWidth = ["default", "full"];
var buttonPropWidthDefault = buttonPropWidth[0];
var buttonPropForm = ["default", "brick", "round", "brickRound", "roundBrick", "brickDefault", "defaultBrick"];
var mapStableForm = { default: "default", defaultClear: "defaultBrick", defaultBrick: "defaultBrick", brick: "brick", brickDefault: "brickDefault", brickClear: "brick", brickRound: "brickRound", round: "round", roundClear: "roundBrick", roundBrick: "roundBrick", clearRound: "brickRound", clearDefault: "brickDefault", clearBrick: "brick", clearClear: "brick" };
var buttonPropFormDefault = buttonPropForm[0];
var COMPONENT_NAME$3 = "Button";
var cnButton = cn$2("Button");
var sizeMap$3 = { xs: "xs", s: "xs", m: "s", l: "m" }, sizeMapOnlyIcon = { xs: "xs", s: "s", m: "m", l: "m" };
var Button = forwardRefWithAs(function(a, b) {
  var c = reactExports.useRef(null), d = usePropsHandler(COMPONENT_NAME$3, a, c), e2 = d.size, f2 = void 0 === e2 ? buttonPropSizeDefault : e2, g = d.view, h2 = void 0 === g ? buttonPropViewDefault : g, i = d.width, j = void 0 === i ? buttonPropWidthDefault : i, k2 = d.form, l2 = void 0 === k2 ? buttonPropFormDefault : k2, m2 = d.iconLeft, n2 = d.iconRight, o = d.label, p2 = d.className, q2 = d.onClick, r2 = d.disabled, s = d.loading, t2 = d.type, u2 = void 0 === t2 ? "button" : t2, v2 = d.tabIndex, w2 = d.as, x2 = void 0 === w2 ? "button" : w2, y2 = d.onlyIcon, z2 = d.iconSize, A2 = d.formId, B2 = _objectWithoutProperties(d, _excluded$p), C2 = (!o || y2) && (m2 || n2), D2 = m2, E2 = n2, F2 = a.title || !!C2 && o || void 0, G2 = C2 ? getByMap(sizeMapOnlyIcon, f2, z2) : getByMap(sizeMap$3, f2, z2);
  return React.createElement(x2, Object.assign({}, B2, { onClick: q2 ? function handleClick(a2) {
    r2 || s || !q2 || q2(a2);
  } : void 0, form: A2, type: u2, className: cnButton({ size: f2, view: h2, width: j, form: mapStableForm[l2], loading: s, disabled: r2, withIcon: !!m2 || !!n2, onlyIcon: !!C2 }, [r2 || s ? void 0 : cnMixFocus(), p2]), disabled: r2, tabIndex: v2, title: F2, ref: useForkRef([b, c]) }), C2 && React.createElement(C2, { className: cnButton("Icon"), size: G2 }), !C2 && ((D2 || E2) && o ? React.createElement(React.Fragment, null, D2 && React.createElement(D2, { className: cnButton("Icon", { position: "left" }), size: G2 }), React.createElement("span", { className: cnButton("Label") }, o), E2 && React.createElement(E2, { className: cnButton("Icon", { position: "right" }), size: G2 })) : o), s && React.createElement(Loader, { className: cnButton("Loader"), size: "s" }));
});
var _excluded$o = ["as", "align", "cursor", "decoration", "display", "font", "lineHeight", "size", "spacing", "fontStyle", "transform", "view", "weight", "width", "className", "children", "truncate"];
var cnText = cn$2("Text");
var Text = forwardRefWithAs(function(a, b) {
  var c = a.as, d = void 0 === c ? "div" : c, e2 = a.align, f2 = a.cursor, g = a.decoration, h2 = a.display, i = a.font, j = a.lineHeight, k2 = a.size, l2 = a.spacing, m2 = a.fontStyle, n2 = a.transform, o = a.view, p2 = a.weight, q2 = a.width, r2 = a.className, s = a.children, t2 = a.truncate, u2 = _objectWithoutProperties(a, _excluded$o);
  return React.createElement(d, Object.assign({}, u2, { className: cnText({ align: e2, cursor: f2, decoration: g, display: h2, font: i, lineHeight: j, size: k2, spacing: l2, fontStyle: m2, transform: n2, view: o, weight: p2, width: q2, truncate: t2 }, [r2]), ref: b }), s);
});
var cnTableCell$1 = cn$2("TableCell");
var getCellClasses = function(a) {
  var b = a.column, c = a.showVerticalShadow, d = a.className;
  return cnTableCell$1({ showVerticalShadow: c, isSticky: b.isSticky, isResized: "header" === a.type ? a.isResized : b.isResized, isSortable: b.sortable, isHeader: "header" === a.type, isResizer: "resizer" === a.type, stickyOnTop: "header" === a.type && a.isSticky || "resizer" === a.type, stickyOnLeft: b.isSticky, isFilterable: b.filterable, isControl: !!b.control, withoutBorder: "resizer" === a.type, isClickable: "isClickable" in a && a.isClickable, isBorderTop: "isBorderTop" in a && a.isBorderTop, isBorderLeft: "isBorderLeft" in a && a.isBorderLeft }, [d]);
}, getWrapperClasses = function(a) {
  var b = a.column, c = a.wrapperClassName;
  return cnTableCell$1("Wrapper", { withoutPadding: b.withoutPadding || "resizer" === a.type, verticalAlign: a.verticalAlign, horizontalAlign: b.align, isHeader: "header" === a.type, wrap: a.wrap }, [c]);
};
var TableCell = React.forwardRef(function(a, b) {
  var c = a.style, d = a.onClick, e2 = a.onContextMenu, f2 = a.children, g = d ? { role: "button", onClick: d } : { role: "cell" };
  return React.createElement("div", Object.assign({}, g, { onContextMenu: e2, ref: b, className: getCellClasses(a), style: c }), React.createElement("div", { className: getWrapperClasses(a) }, f2));
});
function _createForOfIteratorHelper$1(a, b) {
  var c = "undefined" != typeof Symbol && a[Symbol.iterator] || a["@@iterator"];
  if (!c) {
    if (Array.isArray(a) || (c = _unsupportedIterableToArray$1(a)) || b) {
      c && (a = c);
      var d = 0, e2 = function() {
      };
      return { s: e2, n: function n2() {
        return d >= a.length ? { done: true } : { done: false, value: a[d++] };
      }, e: function e3(a2) {
        throw a2;
      }, f: e2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var g = true, h2 = false;
  return { s: function s() {
    c = c.call(a);
  }, n: function n2() {
    var a2 = c.next();
    return g = a2.done, a2;
  }, e: function e3(a2) {
    h2 = true;
  }, f: function f2() {
    try {
      g || null == c["return"] || c["return"]();
    } finally {
      if (h2) throw f2;
    }
  } };
}
function _unsupportedIterableToArray$1(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray$1(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return "Object" === c && a.constructor && (c = a.constructor.name), "Map" === c || "Set" === c ? Array.from(a) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _arrayLikeToArray$1(a, b) : void 0;
  }
}
function _arrayLikeToArray$1(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function ownKeys$j(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$j(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$j(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$j(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var getOptionsForFilters = function(a, b) {
  return a.filter(function(a2) {
    var c = a2.field;
    return c === b;
  }).map(function(a2) {
    var b2 = a2.id, c = a2.name;
    return { value: b2, label: c };
  });
};
var getSelectedFiltersInitialState = function(a) {
  return a ? a.reduce(function(a2, b) {
    return a2[b.field] ? a2 : _objectSpread$j(_objectSpread$j({}, a2), {}, _defineProperty$2({}, b.field, { selected: [] }));
  }, {}) : {};
};
var fieldFiltersPresent = function(a, b) {
  return a.some(function(a2) {
    var c = a2.field;
    return c === b;
  });
};
var isSelectedFiltersPresent = function(a) {
  return Object.values(a).some(function(a2) {
    return 0 < (null === a2 || void 0 === a2 ? void 0 : a2.selected.length);
  });
};
var getSelectedFiltersList = function(a) {
  var b = a.filters, c = a.selectedFilters, d = a.columns;
  return d.reduce(function(a2, d2) {
    var e2 = c[d2.accessor] || [], f2 = [];
    return e2.selected && 0 < e2.selected.length && (f2 = e2.selected.map(function(a3) {
      var c2 = b.find(function(b2) {
        var c3 = b2.id;
        return c3 === a3;
      });
      return c2 ? { id: c2.id, name: c2.name, value: e2.value } : void 0;
    }).filter(isDefined)), 0 < f2.length ? [].concat(_toConsumableArray(a2), _toConsumableArray(f2)) : a2;
  }, []);
};
var filterTableData = function(a) {
  var b, c = a.data, d = a.filters, e2 = a.selectedFilters, f2 = [], g = _createForOfIteratorHelper$1(c);
  try {
    for (g.s(); !(b = g.n()).done; ) {
      var h2, i = b.value, j = _objectSpread$j({}, i);
      null !== (h2 = j.rows) && void 0 !== h2 && h2.length && (j.rows = filterTableData({ data: j.rows, filters: d, selectedFilters: e2 }));
      for (var k2 = Object.keys(j), l2 = true, m2 = 0, n2 = k2; m2 < n2.length; m2++) {
        var o = n2[m2], p2 = e2[o];
        if (p2 && p2.selected.length) {
          var q2 = false, r2 = j[o];
          if (p2.value) (function() {
            var a2 = _slicedToArray(p2.selected, 1), b2 = a2[0], c2 = d.find(function(a3) {
              var c3 = a3.id;
              return c3 === b2;
            });
            c2.filterer(r2, p2.value) && (q2 = true);
          })();
          else {
            var s, t2 = _createForOfIteratorHelper$1(p2.selected);
            try {
              var u2 = function() {
                var a2 = s.value, b2 = d.find(function(b3) {
                  var c2 = b3.id;
                  return c2 === a2;
                });
                return null === p2.value ? (q2 = true, "break") : b2 && b2.filterer(r2) ? (q2 = true, "break") : void 0;
              };
              for (t2.s(); !(s = t2.n()).done; ) {
                var v2 = u2();
                if ("break" === v2) break;
              }
            } catch (a2) {
              t2.e(a2);
            } finally {
              t2.f();
            }
          }
          q2 || (l2 = false);
        }
        if (!l2) break;
      }
      l2 && f2.push(j);
    }
  } catch (a2) {
    g.e(a2);
  } finally {
    g.f();
  }
  return f2;
};
var useSelectedFilters = function(a, b) {
  var c = React.useState(getSelectedFiltersInitialState(a)), d = _slicedToArray(c, 2), e2 = d[0], f2 = d[1], g = function(a2, c2, d2) {
    var g2 = _objectSpread$j(_objectSpread$j({}, e2), {}, _defineProperty$2({}, a2, { selected: _toConsumableArray(c2), value: d2 }));
    f2(g2), b && b(g2);
  };
  return { selectedFilters: e2, updateSelectedFilters: g, removeOneSelectedFilter: function removeOneSelectedFilter(a2, b2) {
    var c2 = a2.find(function(a3) {
      var c3 = a3.id;
      return c3 === b2;
    });
    if (c2) {
      var d2;
      g(c2.field, null === (d2 = (e2[c2.field] || {}).selected) || void 0 === d2 ? void 0 : d2.filter(function(a3) {
        return a3 !== b2;
      }));
    }
  }, removeAllSelectedFilters: function removeAllSelectedFilters(a2) {
    var c2 = getSelectedFiltersInitialState(a2);
    f2(c2), b && b(c2);
  } };
};
const IconFunnelSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M22 2H2v2.24a2 2 0 0 0 .505 1.328l6.99 7.864A2 2 0 0 1 10 14.76V23l4-2v-6.24a2 2 0 0 1 .505-1.328l6.99-7.864A2 2 0 0 0 22 4.24V2z" }));
const IconFunnelSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M14 2H2v1.276a2 2 0 0 0 .464 1.28l4.072 4.888A2 2 0 0 1 7 10.724V15l2-1v-3.276a2 2 0 0 1 .464-1.28l4.072-4.888A2 2 0 0 0 14 3.276V2z" }));
const IconFunnelSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M11 2H1v.586a1 1 0 0 0 .293.707l3.414 3.414A1 1 0 0 1 5 7.414V11l2-1V7.414a1 1 0 0 1 .293-.707l3.414-3.414A1 1 0 0 0 11 2.586V2z" }));
const props$f = { l: IconFunnelSizeM, m: IconFunnelSizeM, s: IconFunnelSizeS, xs: IconFunnelSizeXs, name: "IconFunnel", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$f = createSvg(props$f);
const IconFunnel = createIconInner(props$f, svg$f);
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t2 = arguments[e2];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends.apply(null, arguments);
}
function _setPrototypeOf(t2, e2) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
    return t3.__proto__ = e3, t3;
  }, _setPrototypeOf(t2, e2);
}
function _inheritsLoose(t2, o) {
  t2.prototype = Object.create(o.prototype), t2.prototype.constructor = t2, _setPrototypeOf(t2, o);
}
const config = {
  disabled: false
};
const TransitionGroupContext = React.createContext(null);
var forceReflow = function forceReflow2(node) {
  return node.scrollTop;
};
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props2, context) {
    var _this;
    _this = _React$Component.call(this, props2, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props2.enter : props2.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props2.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props2.unmountOnExit || props2.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout2 = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout2;
    if (timeout2 != null && typeof timeout2 !== "number") {
      exit = timeout2.exit;
      enter = timeout2.enter;
      appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
          if (node) forceReflow(node);
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : ReactDOM.findDOMNode(this);
    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout2 != null) {
      setTimeout(this.nextCallback, timeout2);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children;
    _this$props.in;
    _this$props.mountOnEnter;
    _this$props.unmountOnExit;
    _this$props.appear;
    _this$props.enter;
    _this$props.exit;
    _this$props.timeout;
    _this$props.addEndListener;
    _this$props.onEnter;
    _this$props.onEntering;
    _this$props.onEntered;
    _this$props.onExit;
    _this$props.onExiting;
    _this$props.onExited;
    _this$props.nodeRef;
    var childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === "function" ? children(status, childProps) : React.cloneElement(React.Children.only(children), childProps))
    );
  };
  return Transition2;
}(React.Component);
Transition.contextType = TransitionGroupContext;
Transition.propTypes = {};
function noop$2() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop$2,
  onEntering: noop$2,
  onEntered: noop$2,
  onExit: noop$2,
  onExiting: noop$2,
  onExited: noop$2
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
function _assertThisInitialized(e2) {
  if (void 0 === e2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e2;
}
function cnFunctionHelper(a, b, c, d) {
  return a(_defineProperty$2({}, b, c));
}
function cnForCssTransition(a, b) {
  var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : "animate";
  return { appear: cnFunctionHelper(a, c, "appear"), appearActive: cnFunctionHelper(a, c, "appearActive"), appearDone: cnFunctionHelper(a, c, "appearDone"), enter: cnFunctionHelper(a, c, "enter"), enterActive: cnFunctionHelper(a, c, "enterActive"), enterDone: cnFunctionHelper(a, c, "enterDone"), exit: cnFunctionHelper(a, c, "exit"), exitActive: cnFunctionHelper(a, c, "exitActive"), exitDone: cnFunctionHelper(a, c, "exitDone") };
}
var cnFn = cn$2("MixPopoverAnimate");
var cnMixPopoverAnimate = cnFn;
cnForCssTransition(cnFn);
var animateTimeout = 200;
var Context = reactExports.createContext({ refs: [], zIndex: void 0 });
function usePortalContext() {
  return reactExports.useContext(Context);
}
var PortalWithThemeProvider = function(a) {
  var b = reactExports.useState([]), c = _slicedToArray(b, 2), d = c[0], e2 = c[1], f2 = usePortalContext(), g = f2.addRefs;
  return reactExports.useEffect(function() {
    g && g(d);
  }, [d]), reactExports.useEffect(function() {
    return function() {
      return e2([]);
    };
  }, []), React.createElement(Context.Provider, { value: { refs: d, addRefs: function addRefs(a2) {
    if (0 < a2.length) {
      var b2 = [].concat(_toConsumableArray(d.filter(function(a3) {
        return a3.current;
      })), _toConsumableArray(a2.filter(function(a3) {
        return !!a3.current && !d.find(function(b3) {
          return b3.current === a3.current;
        });
      })));
      e2(b2);
    }
  }, zIndex: a.zIndex } }, a.children);
};
var _excluded$n = ["children", "container", "style"];
function ownKeys$i(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$i(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$i(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$i(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var getZIndex = function(a, b) {
  return "number" == typeof b ? b : a ? a + 1 : void 0;
};
var PortalWithTheme = React.forwardRef(function(a, b) {
  var c = a.children, d = a.container, e2 = void 0 === d ? window.document.body : d, f2 = a.style, g = _objectWithoutProperties(a, _excluded$n), h2 = usePortalContext(), i = h2.addRefs, j = h2.zIndex, k2 = reactExports.useRef(null), l2 = getZIndex(j, null === f2 || void 0 === f2 ? void 0 : f2.zIndex), m2 = _objectSpread$i(_objectSpread$i({}, f2), {}, { zIndex: l2 });
  return reactExports.useEffect(function() {
    i && i([k2]);
  }, [k2]), ReactDOM.createPortal(React.createElement(PortalWithThemeProvider, { zIndex: l2 }, React.createElement(Theme, Object.assign({}, g, { ref: useForkRef([k2, b]), style: m2 }), c)), e2);
});
var useMutableRef = function(a) {
  var b = reactExports.useRef(a);
  return b.current = a, b;
};
function useClickOutside(a) {
  var b = a.isActive, c = a.ignoreClicksInsideRefs, d = a.handler, e2 = useMutableRef(d), f2 = useMutableRef(c), g = useMutableRef(b);
  reactExports.useEffect(function() {
    var a2 = function(a3) {
      var b2, c2;
      if (g.current) {
        var d2 = a3.target, h2 = null === (b2 = f2.current) || void 0 === b2 ? void 0 : b2.every(function(a4) {
          var b3;
          return !(null !== (b3 = a4.current) && void 0 !== b3 && b3.contains(d2));
        });
        h2 && (null === (c2 = e2.current) || void 0 === c2 ? void 0 : c2.call(e2, a3));
      }
    };
    return document.addEventListener("mousedown", a2), function() {
      document.removeEventListener("mousedown", a2);
    };
  }, []);
}
var isRenderProp = function(a) {
  return "function" == typeof a;
};
var getPosition = function(a, b) {
  return { x: Math.round(a), y: Math.round(b) };
};
var getPointPossition = function(a, b, c) {
  if (b) {
    if (!c) return b;
    var d = a.getBoundingClientRect(), e2 = getPosition(b.x - d.left, b.y - d.top);
    return e2;
  }
};
var getRenderPosition = function(a, b, c, d, e2) {
  if (d && e2) {
    if (!c) return getPosition(((null === b || void 0 === b ? void 0 : b.x) || 0) + window.scrollX, ((null === b || void 0 === b ? void 0 : b.y) || 0) + window.scrollY);
    var f2 = a.getBoundingClientRect();
    return !b || 0 > b.x || 0 > b.y || b.x + d > a.clientWidth || b.y + e2 > a.clientHeight ? void 0 : getPosition(((null === b || void 0 === b ? void 0 : b.x) || 0) + window.scrollX + f2.left, ((null === b || void 0 === b ? void 0 : b.y) || 0) + window.scrollY + f2.top);
  }
};
var getPositionsByDirection = function(a) {
  var b = a.contentSize, c = a.anchorSize, d = a.position, e2 = d.x, f2 = d.y, g = a.arrowOffset, h2 = void 0 === g ? 0 : g, i = a.offset, j = void 0 === i ? 0 : i, k2 = b.width, l2 = b.height, m2 = c.width, n2 = c.height, o = { x: e2 + m2 / 2, y: f2 + n2 / 2 }, p2 = e2 + m2 + j, q2 = e2 - k2 - j, r2 = { right: o.x - h2, center: o.x - k2 / 2, left: o.x - k2 + h2 }, s = f2 + n2 + j, t2 = f2 - l2 - j, u2 = { up: o.y - l2 + h2, center: o.y - l2 / 2, down: o.y - h2 }, v2 = e2, w2 = e2 - k2 + m2, x2 = f2, y2 = f2 - l2 + n2;
  return { upLeft: getPosition(r2.left, t2), upCenter: getPosition(r2.center, t2), upRight: getPosition(r2.right, t2), downLeft: getPosition(r2.left, s), downCenter: getPosition(r2.center, s), downRight: getPosition(r2.right, s), rightUp: getPosition(p2, u2.up), rightCenter: getPosition(p2, u2.center), rightDown: getPosition(p2, u2.down), leftUp: getPosition(q2, u2.up), leftCenter: getPosition(q2, u2.center), leftDown: getPosition(q2, u2.down), downStartLeft: getPosition(v2, s), downStartRight: getPosition(w2, s), upStartLeft: getPosition(v2, t2), upStartRight: getPosition(w2, t2), leftStartUp: getPosition(q2, x2), leftStartDown: getPosition(q2, y2), rightStartUp: getPosition(p2, x2), rightStartDown: getPosition(p2, y2) };
};
var getComputedPositionAndDirection = function(a) {
  var b = a.position, c = a.contentSize, d = a.viewportSize, e2 = a.anchorSize, f2 = void 0 === e2 ? { width: 0, height: 0 } : e2, g = a.arrowOffset, h2 = a.direction, i = a.possibleDirections, j = a.bannedDirections, k2 = a.spareDirection, l2 = a.offset, m2 = void 0 === l2 ? 0 : l2;
  if (!b) return { position: b, direction: h2 };
  var n2 = getPositionsByDirection({ contentSize: c, anchorSize: f2, position: b, arrowOffset: g, offset: m2 }), o = [h2].concat(_toConsumableArray(i)).filter(function(a2) {
    return !j.includes(a2);
  }).find(function(a2) {
    var b2 = n2[a2], e3 = c.width, f3 = c.height, g2 = b2.y + f3 <= d.height, h3 = 0 <= b2.y, i2 = 0 <= b2.x, j2 = b2.x + e3 <= d.width;
    return h3 && g2 && i2 && j2;
  }) || k2;
  return { direction: o, position: n2[o] };
};
var getAllParents = function(a) {
  for (var b = [], c = a; c; ) c !== a && b.push(c), c = c.parentNode;
  return b;
};
var usePopoverReposition = function(a) {
  var c = a.scrollAnchorRef, d = a.onRequestReposition, e2 = useMutableRef(d);
  reactExports.useEffect(function() {
    var a2 = function() {
      return e2.current();
    };
    {
      window.addEventListener("resize", a2);
      var d2 = null !== c && void 0 !== c && c.current ? getAllParents(c.current) : [];
      return d2.forEach(function(b) {
        return b.addEventListener("scroll", a2);
      }), function() {
        window.removeEventListener("resize", a2), d2.forEach(function(b) {
          return b.removeEventListener("scroll", a2);
        });
      };
    }
  }, [c]);
};
var _excluded$m = ["children", "direction", "offset", "arrowOffset", "possibleDirections", "isInteractive", "onClickOutside", "spareDirection", "style", "className", "position", "anchorRef", "equalAnchorWidth", "onSetDirection", "viewportRef"];
function ownKeys$h(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$h(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$h(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$h(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var directionsStartCenter = ["downCenter", "upCenter", "downRight", "downLeft", "upRight", "upLeft", "leftUp", "leftCenter", "leftDown", "rightUp", "rightCenter", "rightDown"];
var directionsStartEdge = ["downStartLeft", "upStartLeft", "downStartRight", "upStartRight", "leftStartUp", "leftStartDown", "rightStartUp", "rightStartDown"];
var directions = [].concat(directionsStartCenter, directionsStartEdge);
var getOffset = function(a, b) {
  if (isNumber$1(b)) return b;
  if (isString$1(b) && a.current) {
    var g = getComputedStyle(a.current).getPropertyValue("--space-".concat(b));
    if (g && /px$/.test(g)) return +g.slice(0, g.length - 2);
    if (g && /rem$/.test(g)) {
      var c = parseFloat(getComputedStyle(document.documentElement).fontSize), d = +g.slice(0, g.length - 3);
      return c * d;
    }
    if (g && /em$/.test(g)) {
      var e2 = parseFloat(getComputedStyle(a.current).fontSize), f2 = +g.slice(0, g.length - 2);
      return e2 * f2;
    }
    return 0;
  }
  return 0;
}, ContextConsumer$1 = function(a) {
  var b = a.onClickOutside, c = a.children, d = a.ignoreClicksInsideRefs, e2 = usePortalContext(), f2 = e2.refs;
  return useClickOutside({ isActive: !!b, ignoreClicksInsideRefs: [].concat(_toConsumableArray(d || []), _toConsumableArray(f2 || [])), handler: b }), c;
}, cnPopover = cn$2("Popover");
var Popover = reactExports.forwardRef(function(a, b) {
  var c, d = a.children, e2 = a.direction, f2 = void 0 === e2 ? "upCenter" : e2, g = a.offset, h2 = void 0 === g ? 0 : g, i = a.arrowOffset, j = a.possibleDirections, k2 = void 0 === j ? directions : j, l2 = a.isInteractive, m2 = a.onClickOutside, n2 = a.spareDirection, o = void 0 === n2 ? "downStartLeft" : n2, p2 = a.style, q2 = a.className, r2 = a.position, s = a.anchorRef, t2 = a.equalAnchorWidth, u2 = a.onSetDirection, v2 = a.viewportRef, w2 = _objectWithoutProperties(a, _excluded$m), x2 = (null === v2 || void 0 === v2 ? void 0 : v2.current) || document.documentElement, y2 = React.useRef(null), z2 = useTheme(), A2 = z2.theme, B2 = React.useState(), C2 = _slicedToArray(B2, 2), D2 = C2[0], E2 = C2[1], F2 = useComponentSize(y2), G2 = F2.width, H2 = F2.height, I2 = useComponentSize(s || { current: null }), J2 = React.useRef(null), K2 = React.useState([]), L2 = _slicedToArray(K2, 2), M2 = L2[0], N2 = L2[1], O2 = function() {
    N2(function(a2) {
      return a2.length ? [] : a2;
    }), J2.current = null;
  }, P2 = function() {
    var a2;
    return E2(null === s || void 0 === s || null === (a2 = s.current) || void 0 === a2 ? void 0 : a2.getBoundingClientRect());
  }, Q2 = reactExports.useMemo(function() {
    return getOffset(y2, h2);
  }, [h2, !!y2.current]), R2 = getComputedPositionAndDirection({ contentSize: { width: G2, height: H2 }, viewportSize: { width: x2.clientWidth, height: x2.clientHeight }, arrowOffset: i, offset: Q2, direction: f2, possibleDirections: k2, bannedDirections: M2, position: getPointPossition(x2, D2 ? { x: D2.left, y: D2.top } : r2, !!(null !== v2 && void 0 !== v2 && v2.current)), anchorSize: I2, spareDirection: o }), S2 = R2.position, T2 = R2.direction;
  reactExports.useEffect(function() {
    return null === u2 || void 0 === u2 ? void 0 : u2(T2);
  }, [T2]), reactExports.useEffect(P2, [I2]), usePopoverReposition({ isActive: true, scrollAnchorRef: s || { current: null }, onRequestReposition: function onRequestReposition() {
    O2(), P2();
  } }), reactExports.useLayoutEffect(function() {
    J2.current !== T2 && (J2.current && !M2.includes(J2.current) && !M2.includes(T2) && T2 !== o && N2(function(a2) {
      return J2.current ? [].concat(_toConsumableArray(a2), [J2.current]) : a2;
    }), J2.current = T2);
  }, [T2]), reactExports.useLayoutEffect(O2, [a]);
  var U2 = getRenderPosition(x2, S2, !!(null !== v2 && void 0 !== v2 && v2.current), G2, H2), V2 = !U2 || !H2 || !G2;
  return React.createElement(PortalWithTheme, Object.assign({}, w2, { preset: A2, className: cnPopover({ direction: T2, notVisible: V2 }, [q2]), container: window.document.body, ref: useForkRef([y2, b]), style: _objectSpread$h(_objectSpread$h({}, p2), V2 ? {} : (c = {}, _defineProperty$2(c, "--popover-left", "".concat(U2.x, "px")), _defineProperty$2(c, "--popover-top", "".concat(U2.y, "px")), _defineProperty$2(c, "--popover-width", t2 ? "".concat(I2.width, "px") : void 0), _defineProperty$2(c, "--popover-pointer-events", !(void 0 !== l2) || l2 ? void 0 : "none"), _defineProperty$2(c, "--popover-visibility", S2 ? void 0 : "hidden"), c)) }), React.createElement(ContextConsumer$1, { onClickOutside: m2, ignoreClicksInsideRefs: [y2, s || { current: null }] }, isRenderProp(d) ? d(T2) : d));
});
var cnTableFilterTooltip = cn$2("TableFilterTooltip");
var TableFilterTooltip = function(a) {
  var b = a.field, c = a.isOpened, d = a.options, e2 = a.values, f2 = a.className, g = a.children, h2 = a.onChange, i = a.onToggle, j = reactExports.useState("downRight"), k2 = _slicedToArray(j, 2), l2 = k2[0], m2 = k2[1], n2 = reactExports.useRef(null), o = reactExports.useRef(null);
  return React.createElement(React.Fragment, null, React.createElement(Button, { type: "button", ref: n2, size: "xs", iconSize: "s", view: "clear", onlyIcon: true, onClick: i, className: cnTableFilterTooltip("Button", { isOpened: c }, [f2]), iconLeft: IconFunnel }), React.createElement(Transition, { in: c, unmountOnExit: true, nodeRef: o, timeout: animateTimeout }, function(a2) {
    return React.createElement(Popover, { anchorRef: n2, possibleDirections: ["downRight", "downLeft"], direction: "downRight", offset: 4, arrowOffset: 12, ref: o, onSetDirection: m2, onClickOutside: i, className: cnTableFilterTooltip("Popover", [cnMixPopoverAnimate({ animate: a2, direction: l2 })]) }, g || React.createElement("div", { className: cnTableFilterTooltip("Content") }, React.createElement(Text, { as: "div", size: "xs", view: "primary", lineHeight: "m", className: cnTableFilterTooltip("Title") }, "Фильтровать по условию"), React.createElement("select", { className: cnTableFilterTooltip("Select"), value: _toConsumableArray(e2), multiple: true, onChange: function onChange(a3) {
      h2(b, Array.from(a3.target.selectedOptions).map(function(a4) {
        return a4.value;
      }));
    } }, d.map(function(a3) {
      return React.createElement("option", { key: a3.value, className: cnTableFilterTooltip("Option"), value: a3.value, title: a3.label }, a3.label);
    }))));
  }));
};
function ownKeys$g(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$g(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$g(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$g(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var cnTableHeader$1 = cn$2("TableHeader");
var TableHeader$1 = function(a) {
  var b = a.isStickyHeader, c = a.headersWithMetaData, d = a.headerRowsHeights, f2 = a.headerRowsRefs, g = a.getStickyLeftOffset, h2 = a.stickyColumnsGrid, i = a.showVerticalCellShadow, j = a.headerVerticalAlign, k2 = a.getSortIcon, l2 = a.handleSortClick, m2 = a.handleFilterTogglerClick, n2 = a.handleCellClick, o = a.handleTooltipSave, p2 = a.filters, q2 = a.visibleFilter, r2 = a.selectedFilters, s = a.showHorizontalCellShadow, t2 = a.borderBetweenColumns, u2 = d.reduce(function(c2, a2) {
    return c2 + a2;
  }, 0), v2 = { "--table-header-height": "".concat(u2, "px") }, w2 = function(a2) {
    var b2;
    return 1 <= +a2.position.colSpan ? "high" : null !== (b2 = a2.position) && void 0 !== b2 && b2.smallTextSize ? "low" : "default";
  }, x2 = function(a2) {
    var b2 = [], d2 = function(a3) {
      a3.columns ? a3.columns.forEach(function(a4) {
        return d2(c.find(function(b3) {
          return b3.title === a4.title;
        }));
      }) : b2.push(a3);
    };
    return d2(a2), b2.some(function(a3) {
      return a3.isResized;
    });
  }, y2 = function(a2) {
    var b2, c2, d2, e2;
    if (!p2 || !a2.accessor) return null;
    var f3 = p2.find(function(b3) {
      var c3 = b3.field;
      return c3 === a2.accessor;
    }), g2 = null === f3 || void 0 === f3 || null === (b2 = f3.component) || void 0 === b2 ? void 0 : b2.name, h3 = null !== (c2 = null === f3 || void 0 === f3 || null === (d2 = f3.component) || void 0 === d2 ? void 0 : d2.props) && void 0 !== c2 ? c2 : {}, i2 = m2(a2.accessor), j2 = null === f3 || void 0 === f3 ? void 0 : f3.id;
    return a2.filterable ? React.createElement(TableFilterTooltip, { field: a2.accessor, isOpened: q2 === a2.accessor, options: getOptionsForFilters(p2, a2.accessor), values: r2[a2.accessor].selected || [], onChange: o, onToggle: m2(a2.accessor), className: cnTableHeader$1("Icon", { type: "filter" }) }, g2 && React.createElement(g2, Object.assign({}, h3, { onConfirm: function handleFilterSave(b3) {
      j2 && o(a2.accessor, [j2], b3), i2();
    }, filterValue: null === (e2 = r2[a2.accessor]) || void 0 === e2 ? void 0 : e2.value, onCancel: m2(a2.accessor) }))) : null;
  }, z2 = function(a2) {
    return a2.control ? React.createElement("div", { className: cnTableHeader$1("Сontrol") }, a2.control({ column: a2 })) : null;
  };
  return React.createElement(React.Fragment, null, React.createElement("div", { className: cnTableHeader$1("Row", { withVerticalBorder: t2 }) }, c.map(function(a2, m3) {
    var o2, p3, q3, r3, s2 = {};
    return a2.position.colSpan && (s2.gridColumnEnd = "span ".concat(a2.position.colSpan)), a2.position.rowSpan && (s2.gridRowEnd = "span ".concat(a2.position.rowSpan)), b && (s2.top = d.slice(0, a2.position.level).reduce(function(c2, a3) {
      return c2 + a3;
    }, 0)), React.createElement(TableCell, { type: "header", key: m3, ref: function ref(a3) {
      f2.current[m3] = a3;
    }, style: _objectSpread$g(_objectSpread$g({}, s2), {}, { left: g(a2.position.gridIndex, a2.position.topHeaderGridIndex) }), isSticky: b, isResized: x2(a2), column: a2, verticalAlign: j, onContextMenu: function onContextMenu(a3) {
      return n2({ e: a3, type: "contextMenu", columnIdx: m3, ref: { current: f2.current[m3] } });
    }, onClick: function onClick(a3) {
      return n2({ e: a3, type: "click", columnIdx: m3, ref: { current: f2.current[m3] } });
    }, className: cnTableHeader$1("Cell", { isFirstColumn: null === (o2 = a2.position) || void 0 === o2 ? void 0 : o2.isFirst, isFirstRow: 0 === a2.position.level, isLastInColumn: (null === (p3 = a2.position) || void 0 === p3 ? void 0 : p3.topHeaderGridIndex) !== (null === (q3 = c[m3 + 1]) || void 0 === q3 || null === (r3 = q3.position) || void 0 === r3 ? void 0 : r3.topHeaderGridIndex), level: w2(a2) }), showVerticalShadow: i && a2.position.gridIndex + ((null === a2 || void 0 === a2 ? void 0 : a2.position.colSpan) || 1) === h2 }, a2.title, React.createElement("div", { className: cnTableHeader$1("Buttons", { isSortingActive: a2.isSortingActive, isFilterActive: a2.isFilterActive, verticalAlign: j }) }, a2.sortable && React.createElement(Button, { type: "button", size: "xs", iconSize: "s", view: "clear", onlyIcon: true, onClick: function onClick() {
      return l2(a2);
    }, iconLeft: k2(a2), className: cnTableHeader$1("Icon", { type: "sort" }) }), y2(a2), z2(a2)));
  })), React.createElement("div", { className: cnTableHeader$1("ShadowWrapper"), style: v2 }, React.createElement("div", { className: cnTableHeader$1("Shadow", { show: s && b }) })));
};
function ownKeys$f(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$f(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$f(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$f(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var Order = { ASC: "ASC", asc: "asc", DESC: "DESC", desc: "desc" };
var getColumnsSize = function(a) {
  return a.map(function(a2) {
    return isNumber$1(a2) ? "".concat(a2, "px") : "auto";
  }).join(" ");
};
var getColumnLeftOffset = function(a) {
  var b = a.columnIndex, c = a.resizedColumnWidths, d = a.initialColumnWidths, e2 = d.slice(0, b).map(function(a2, b2) {
    return c[b2] || a2;
  });
  return e2.reduce(function(a2, b2) {
    return a2 + b2;
  }, 0);
};
var createSortingState = function(a, b, c) {
  return isString$1(b) ? { by: a, order: b.toLowerCase(), sortFn: c } : null;
};
var getNewSorting = function(a, b, c) {
  return a && a.by === b ? "asc" === a.order ? { by: b, order: "desc", sortFn: c } : null : { by: b, order: "asc", sortFn: c };
};
var getMaxLevel$1 = function(a) {
  var b = 0, c = function(a2) {
    var d = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
    d > b && (b = d), a2.forEach(function(a3) {
      a3.columns && c(a3.columns, d + 1);
    });
  };
  return c(a), b;
};
var getLastChildrenCount$1 = function(a) {
  var b = 0, c = function(a2) {
    a2.forEach(function(a3) {
      a3.columns ? c(a3.columns) : b++;
    });
  };
  return c(a), b;
};
var transformColumns$1 = function(a, b) {
  for (var c = [{ columns: a, index: 0 }], d = [], e2 = 0; c.length; ) {
    var f2 = c.length - 1, g = c[f2], h2 = g.columns[g.index];
    h2 ? function(a2) {
      d[f2] || (d[f2] = []);
      var i = c[0].index, j = d[f2][d[f2].length - 1], k2 = j ? j.position.gridIndex + (j.position.colSpan || 1) : 0, l2 = 0 === f2 ? e2++ : null !== (a2 = h2.colId) && void 0 !== a2 ? a2 : 0, m2 = _objectSpread$f(_objectSpread$f({}, h2), {}, { position: { topHeaderGridIndex: i, gridIndex: k2, level: f2 } });
      0 === f2 && (m2.colId = l2), m2.columns ? (m2.position.colSpan = getLastChildrenCount$1(m2.columns), d[f2].push(m2), c.push({ columns: m2.columns.map(function(a3) {
        return _objectSpread$f(_objectSpread$f({}, a3), {}, { colId: e2++, parentId: l2 });
      }), index: 0 })) : (m2.position.rowSpan = b - f2, d[f2].push(m2), g.index++);
    }() : (c.pop(), c[c.length - 1] && c[c.length - 1].index++);
  }
  return d;
};
var getIsFirst$1 = function(a, b) {
  var c, d, e2 = b.colId, f2 = b.parentId, g = b.position, h2 = b.accessor;
  if (0 === g.level) return 0 === e2;
  var i = a.find(function(a2) {
    return a2.colId === f2;
  });
  return !!((null === i || void 0 === i || null === (c = i.columns) || void 0 === c || null === (d = c[0]) || void 0 === d ? void 0 : d.accessor) === h2 && !!i && getIsFirst$1(a, i));
};
var useHeaderData$1 = function(a) {
  var b = React.useRef({}), c = transformColumns$1(a, getMaxLevel$1(a)), d = Object.values(b.current).filter(isNotNil).map(function(a2) {
    return a2.getBoundingClientRect().height;
  }), e2 = c.flat().filter(function(a2) {
    return !a2.hidden;
  }).map(function(a2, b2, e3) {
    return _objectSpread$f(_objectSpread$f({}, a2), {}, { position: _objectSpread$f(_objectSpread$f({}, a2.position), {}, { isFirst: getIsFirst$1(e3, a2), smallTextSize: 1 < c.length && a2.position.level === c.length - 1, height: d[b2] || 0 }) });
  }), f2 = c.map(function(a2, b2) {
    return Math.min.apply(null, e2.filter(function(a3) {
      return a3.position.level === b2;
    }).map(function(a3) {
      return a3.position.height;
    }));
  }), g = e2.filter(function(a2) {
    var b2 = a2.position.colSpan;
    return !b2;
  }).sort(function(c2, a2) {
    return c2.position.topHeaderGridIndex === a2.position.topHeaderGridIndex ? c2.position.gridIndex > a2.position.gridIndex ? 1 : -1 : c2.position.topHeaderGridIndex > a2.position.topHeaderGridIndex ? 1 : -1;
  }), h2 = g.map(function(a2, b2) {
    var c2, d2, e3 = f2.reduce(function(c3, a3) {
      return c3 + a3;
    }, 0);
    return (a2.position.rowSpan || 0) >= ((null === (c2 = g[b2 + 1]) || void 0 === c2 ? void 0 : c2.position.rowSpan) || 0) ? e3 - (a2.position.height || 0) : e3 - (null === (d2 = g[b2 + 1]) || void 0 === d2 ? void 0 : d2.position.height) || 0;
  });
  return { headers: c, flattenedHeaders: e2, lowHeaders: g, headerRowsRefs: b, headerRowsHeights: f2, headerColumnsHeights: d, resizerTopOffsets: h2 };
};
var useLazyLoadData = function(a, b, c) {
  var d = React.useState(0), e2 = _slicedToArray(d, 2), f2 = e2[0], g = e2[1], h2 = React.useRef(null), i = React.useRef(null), j = Math.floor(a / 3);
  React.useEffect(function() {
    if (c) {
      var a2 = 0;
      b && "offsetHeight" in b ? a2 = b.offsetHeight : b && "outerHeight" in b && (a2 = b.outerHeight);
      var d2 = function() {
        i.current && a2 / 2 > i.current.getBoundingClientRect().top ? g(function(a3) {
          return a3 + j;
        }) : h2.current && h2.current.getBoundingClientRect().top > a2 / 2 && g(function(a3) {
          return 0 > a3 - j ? 0 : a3 - j;
        });
      };
      return null === b || void 0 === b ? void 0 : b.addEventListener("scroll", d2), function() {
        return null === b || void 0 === b ? void 0 : b.removeEventListener("scroll", d2);
      };
    }
  }, [f2, b]);
  return { getSlicedRows: function getSlicedRows(b2) {
    return !c || b2.length < a ? b2 : b2.slice(f2, f2 + a);
  }, setBoundaryRef: function setBoundaryRef(b2, d2) {
    return c && 0 === b2 && d2 === j && 0 < f2 ? h2 : c && 0 === b2 && d2 === a - j ? i : void 0;
  } };
};
var transformRows = function(a, b, c) {
  for (var d = [{ rows: a, index: 0 }], e2 = []; d.length; ) {
    var f2 = d.length - 1, g = d[f2], h2 = g.rows[g.index];
    if (h2) {
      var i = _objectSpread$f(_objectSpread$f({}, h2), {}, { options: { level: f2 }, rows: h2.rows && _toConsumableArray(h2.rows) }), j = !!i.rows && (c || b.includes(i.id));
      j ? d.push({ rows: i.rows, index: 0 }) : g.index++, e2.push(i);
    } else d.pop(), d[d.length - 1] && d[d.length - 1].index++;
  }
  return e2;
};
function getMergedArray(a, b) {
  for (var c = Math.max(a.length, b.length), d = [], e2 = 0; e2 < c; e2++) {
    var f2;
    d.push(null !== (f2 = b[e2]) && void 0 !== f2 ? f2 : a[e2]);
  }
  return d;
}
function calulateColSpans(a, b) {
  var c = [], d = 0, e2 = a.length, f2 = function(a2, b2) {
    return b2 + a2 > e2 ? e2 - b2 - a2 : a2;
  };
  return a.forEach(function(a2) {
    var e3 = a2.colSpan, g = 1 < c.length ? c.reduce(function(c2, a3) {
      return c2 + a3;
    }) : 0;
    if ("number" == typeof e3 || "function" == typeof e3) {
      var h2 = "number" == typeof e3 ? e3 : e3(b);
      0 === d ? c.push(f2(h2, g)) : c.push(f2(h2 - d || 0, g)), d = 0 < h2 - d ? h2 - 1 : d - h2;
    } else 0 === d ? c.push(f2(1, g)) : (c.push(0), d--);
  }), c;
}
function _classCallCheck$1(a, n2) {
  if (!(a instanceof n2)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(e2, r2) {
  for (var t2 = 0; t2 < r2.length; t2++) {
    var o = r2[t2];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e2, toPropertyKey(o.key), o);
  }
}
function _createClass$1(e2, r2, t2) {
  return r2 && _defineProperties$1(e2.prototype, r2), Object.defineProperty(e2, "prototype", {
    writable: false
  }), e2;
}
function _inherits(t2, e2) {
  if ("function" != typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function");
  t2.prototype = Object.create(e2 && e2.prototype, {
    constructor: {
      value: t2,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t2, "prototype", {
    writable: false
  }), e2 && _setPrototypeOf(t2, e2);
}
function _possibleConstructorReturn(t2, e2) {
  if (e2 && ("object" == _typeof$3(e2) || "function" == typeof e2)) return e2;
  if (void 0 !== e2) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t2);
}
function _getPrototypeOf(t2) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
    return t3.__proto__ || Object.getPrototypeOf(t3);
  }, _getPrototypeOf(t2);
}
function _createSuper(a) {
  var b = _isNativeReflectConstruct();
  return function() {
    var c, d = _getPrototypeOf(a);
    if (b) {
      var e2 = _getPrototypeOf(this).constructor;
      c = Reflect.construct(d, arguments, e2);
    } else c = d.apply(this, arguments);
    return _possibleConstructorReturn(this, c);
  };
}
function _isNativeReflectConstruct() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ("function" == typeof Proxy) return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (a) {
    return false;
  }
}
var cnTableResizer = cn$2("TableResizer");
var TableResizer = function(a) {
  function b() {
    var a2;
    _classCallCheck$1(this, b);
    for (var d = arguments.length, e2 = Array(d), f2 = 0; f2 < d; f2++) e2[f2] = arguments[f2];
    return a2 = c.call.apply(c, [this].concat(e2)), _defineProperty$2(_assertThisInitialized(a2), "state", { isDragging: false }), _defineProperty$2(_assertThisInitialized(a2), "onMouseDown", function() {
      a2.setState({ isDragging: true }), document.addEventListener("mousemove", a2.onMouseMove), document.addEventListener("mouseup", a2.onMouseUp);
    }), _defineProperty$2(_assertThisInitialized(a2), "onMouseMove", function(b2) {
      b2.movementX && a2.props.onResize(b2.movementX);
    }), _defineProperty$2(_assertThisInitialized(a2), "onMouseUp", function() {
      a2.setState({ isDragging: false }), a2.removeListeners();
    }), _defineProperty$2(_assertThisInitialized(a2), "removeListeners", function() {
      document.removeEventListener("mousemove", a2.onMouseMove), document.removeEventListener("mouseup", a2.onMouseUp);
    }), a2;
  }
  _inherits(b, a);
  var c = _createSuper(b);
  return _createClass$1(b, [{ key: "componentWillUnmount", value: function componentWillUnmount() {
    this.removeListeners();
  } }, { key: "render", value: function render() {
    return React.createElement("div", { className: cnTableResizer({ isDragging: this.state.isDragging, isVisible: this.props.isVisible }), "aria-hidden": true, style: { height: this.props.height, top: this.props.top }, onMouseDown: this.onMouseDown, onDoubleClick: this.props.onDoubleClick });
  } }]), b;
}(React.Component);
const IconArrowDownSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41Z" }));
const IconArrowDownSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 9.593 3.703 5.296 2.289 6.71 8 12.421l5.711-5.711-1.414-1.414L8 9.593Z" }));
const IconArrowDownSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.005 8.341 2.03 4.366l.707-.707 3.268 3.268 3.268-3.268.707.707-3.975 3.975Z" }));
const props$e = { l: IconArrowDownSizeM, m: IconArrowDownSizeM, s: IconArrowDownSizeS, xs: IconArrowDownSizeXs, name: "IconArrowDown", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$e = createSvg(props$e);
const IconArrowDown = createIconInner(props$e, svg$e);
const IconArrowUpSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6Z" }));
const IconArrowUpSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "m8 6.406-4.297 4.297-1.414-1.414L8 3.577l5.711 5.712-1.414 1.414L8 6.406Z" }));
const IconArrowUpSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.005 3.66 9.98 7.633l-.707.707-3.268-3.268-3.268 3.268-.707-.707 3.975-3.975Z" }));
const props$d = { l: IconArrowUpSizeM, m: IconArrowUpSizeM, s: IconArrowUpSizeS, xs: IconArrowUpSizeXs, name: "IconArrowUp", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$d = createSvg(props$d);
const IconArrowUp = createIconInner(props$d, svg$d);
var cnTableRowsCollapse = cn$2("TableRowsCollapse");
var TableRowsCollapse = function(a) {
  var b = a.level, c = a.children, d = a.isExpanded, e2 = a.toggleCollapse, f2 = a.withCollapseButton, g = a.isExpandedByDefault;
  return React.createElement("div", { style: { "--nesting-level": b }, className: cnTableRowsCollapse() }, !g && f2 && React.createElement("div", { className: cnTableRowsCollapse("buttonContainer") }, React.createElement(Button, { type: "button", "aria-expanded": d, iconLeft: d ? IconArrowUp : IconArrowDown, iconSize: "s", onClick: e2, size: "xs", onlyIcon: true, view: "clear" })), React.createElement("div", { className: cnTableRowsCollapse("cellContainer", { withExpanderPadding: !g }) }, c));
};
const IconCloseSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "m12 13.414 7.778 7.778 1.414-1.414L13.414 12l7.778-7.778-1.414-1.414L12 10.586 4.222 2.808 2.808 4.222 10.586 12l-7.778 7.778 1.414 1.414L12 13.414z" }));
const IconCloseSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M3.757 2.343 2.343 3.757 6.586 8l-4.243 4.243 1.414 1.414L8 9.414l4.243 4.243 1.414-1.414L9.414 8l4.243-4.243-1.414-1.414L8 6.586 3.757 2.343z", fillRule: "evenodd", clipRule: "evenodd" }));
const IconCloseSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "m2.164 9.156.686.694L6 6.7l3.15 3.15.7-.7L6.7 6l3.15-3.15-.707-.707L6 5.3 2.85 2.15l-.701.699 3.152 3.152-3.138 3.154z" }));
const props$c = { l: IconCloseSizeM, m: IconCloseSizeM, s: IconCloseSizeS, xs: IconCloseSizeXs, name: "IconClose", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$c = createSvg(props$c);
const IconClose = createIconInner(props$c, svg$c);
var _excluded$l = ["size", "as", "label", "className", "group", "view", "onCancel", "icon", "iconSize", "withAction"];
var tagBasePropSize = ["m", "xs", "s", "l"];
var tagBasePropSizeDefault = tagBasePropSize[0];
var tagBasePropView = ["stroked", "filled"];
var tagBasePropViewDefault = tagBasePropView[0];
var cnTagBase = cn$2("TagBase");
var sizeMap$2 = { xs: "xs", s: "xs", m: "s", l: "s" };
var TagBase = forwardRefWithAs(function(a, b) {
  var c = a.size, d = void 0 === c ? tagBasePropSizeDefault : c, e2 = a.as, f2 = void 0 === e2 ? "div" : e2, g = a.label, h2 = a.className, i = a.group, j = a.view, k2 = void 0 === j ? tagBasePropViewDefault : j, l2 = a.onCancel, m2 = a.icon, n2 = a.iconSize, o = a.withAction, p2 = _objectWithoutProperties(a, _excluded$l), q2 = "function" == typeof l2, r2 = getByMap(sizeMap$2, d), s = getByMap(sizeMap$2, d, n2);
  return React.createElement(f2, Object.assign({}, p2, { className: cnTagBase({ size: d, view: k2, withCancel: q2, withIcon: !!m2, group: i, withAction: o }, [h2]), ref: b }), q2 || m2 ? React.createElement(React.Fragment, null, m2 && React.createElement("span", { className: cnTagBase("IconWrapper") }, React.createElement(m2, { size: s, className: cnTagBase("Icon") })), React.createElement("span", { className: cnTagBase("Label") }, g), q2 && React.createElement("button", { className: cnTagBase("CancelButton"), type: "button", onClick: l2 }, React.createElement(IconClose, { className: cnTagBase("CancelIcon"), size: r2 }))) : g);
});
var _excluded$k = ["mode", "onChange", "checked", "onCancel", "onClick"];
var tagPropMode = ["button", "check", "cancel", "link", "info"];
var tagPropModeDefault = tagPropMode[0];
function getParams(a, b, c, d, e2) {
  return "button" === a ? { view: "filled", onClick: c, as: "button", withAction: true } : "link" === a ? { view: "filled", onClick: c, as: "a", withAction: true } : "check" === a ? { view: b ? "filled" : "stroked", onClick: "function" == typeof d ? function(a2) {
    return d(!b, { e: a2, checked: !b });
  } : void 0, as: "button", withAction: true } : "cancel" === a ? { view: "filled", onCancel: e2, as: "span" } : "info" === a ? { view: "filled", as: "span" } : void 0;
}
var COMPONENT_NAME$2 = "Tag";
var TagRenter = function(a, b) {
  var c = reactExports.useRef(null), d = usePropsHandler(COMPONENT_NAME$2, a, c), e2 = d.mode, f2 = void 0 === e2 ? tagPropModeDefault : e2, g = d.onChange, h2 = d.checked, i = d.onCancel, j = d.onClick, k2 = _objectWithoutProperties(d, _excluded$k), l2 = getParams(f2, h2, j, g, i);
  return React.createElement(TagBase, Object.assign({}, k2, l2, { ref: useForkRef([b, c]) }));
};
var Tag = reactExports.forwardRef(TagRenter);
var cnTableSelectedOptionsList = cn$2("TableSelectedOptionsList"), getTagLabelDefault = function(a, b, c) {
  var d = isNumber$1(c) ? { name: c + "" } : c;
  if (!isNotNil(d)) return b;
  var e2 = "";
  return Array.isArray(d) && (e2 = d.map(function(a2) {
    var b2 = a2.name;
    return b2;
  }).join(", ")), d.min && d.max ? e2 = "от ".concat(d.min, " до ").concat(d.max) : d.min ? e2 = "от ".concat(d.min) : d.max && (e2 = "до ".concat(d.max)), d.name && (e2 = "".concat(d.name)), b + e2;
};
var TableSelectedOptionsList = function(a) {
  var b = a.values, c = a.onRemove, d = a.onReset, e2 = a.getTagLabel, f2 = void 0 === e2 ? getTagLabelDefault : e2;
  return React.createElement("div", { className: cnTableSelectedOptionsList() }, React.createElement("div", { className: cnTableSelectedOptionsList("Options") }, b.map(function(a2) {
    return React.createElement(Tag, { className: cnTableSelectedOptionsList("Option"), key: a2.id, label: f2(a2.id, a2.name, a2.value), size: "xs", mode: "cancel", onCancel: function onCancel() {
      return c(a2.id);
    } });
  })), React.createElement(Button, { type: "button", onClick: d, title: "Сбросить все фильтры", size: "xs", view: "clear", onlyIcon: true, iconLeft: IconClose, className: cnTableSelectedOptionsList("Button") }));
};
const IconSearchStrokedSizeL = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 28 28", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17.998 20.128a9.997 9.997 0 0 1-5.956 1.956C6.496 22.084 2 17.588 2 12.042 2 6.496 6.496 2 12.042 2c5.546 0 10.042 4.496 10.042 10.042 0 2.23-.726 4.29-1.956 5.956L26 23.87 23.87 26l-5.872-5.872Zm1.073-8.086a7.03 7.03 0 1 1-14.058 0 7.03 7.03 0 0 1 14.059 0Z" }));
const IconSearchStrokedSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M14.05 15.463a7.5 7.5 0 1 1 1.414-1.414l6.542 6.542-1.415 1.415-6.542-6.543ZM15 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" }));
const IconSearchStrokedSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.618 11.032a5.5 5.5 0 1 1 1.414-1.414l3.97 3.969L13.586 15l-3.97-3.97ZM10 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" }));
const IconSearchStrokedSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.453 8.16a4 4 0 1 1 .707-.707l2.844 2.844-.707.707L7.453 8.16ZM8 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }));
const props$b = { l: IconSearchStrokedSizeL, m: IconSearchStrokedSizeM, s: IconSearchStrokedSizeS, xs: IconSearchStrokedSizeXs, name: "IconSearchStroked", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$b = createSvg(props$b);
createIconInner(props$b, svg$b);
function _createForOfIteratorHelper(a, b) {
  var c = "undefined" != typeof Symbol && a[Symbol.iterator] || a["@@iterator"];
  if (!c) {
    if (Array.isArray(a) || (c = _unsupportedIterableToArray(a)) || b) {
      c && (a = c);
      var d = 0, e2 = function() {
      };
      return { s: e2, n: function n2() {
        return d >= a.length ? { done: true } : { done: false, value: a[d++] };
      }, e: function(a2) {
        function b2() {
          return a2.apply(this, arguments);
        }
        return b2.toString = function() {
          return a2.toString();
        }, b2;
      }(function(a2) {
        throw a2;
      }), f: e2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var g = true, h2 = false;
  return { s: function s() {
    c = c.call(a);
  }, n: function n2() {
    var a2 = c.next();
    return g = a2.done, a2;
  }, e: function(a2) {
    function b2() {
      return a2.apply(this, arguments);
    }
    return b2.toString = function() {
      return a2.toString();
    }, b2;
  }(function(a2) {
    h2 = true;
  }), f: function f2() {
    try {
      g || null == c["return"] || c["return"]();
    } finally {
      if (h2) throw f2;
    }
  } };
}
function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return "Object" === c && a.constructor && (c = a.constructor.name), "Map" === c || "Set" === c ? Array.from(a) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _arrayLikeToArray(a, b) : void 0;
  }
}
function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function isMultiple(a) {
  return a.multiple;
}
function isNotMultiple(a) {
  return !a.multiple;
}
function formatValue(a, b, c) {
  var d = {};
  if (!isNotNil(a) && !Array.isArray(a)) return d;
  var e2 = c ? a : [a];
  if (e2 && 0 < e2.length) {
    var f2, g = _createForOfIteratorHelper(e2);
    try {
      for (g.s(); !(f2 = g.n()).done; ) {
        var h2 = f2.value;
        d[b(h2)] = h2;
      }
    } catch (a2) {
      g.e(a2);
    } finally {
      g.f();
    }
  }
  return d;
}
function useChoiceGroup(a) {
  var b = formatValue(a.value, a.getKey, a.multiple), c = function(c2) {
    return Object.prototype.hasOwnProperty.call(b, a.getKey(c2));
  };
  return { getOnChange: function getOnChange(b2) {
    return function(d) {
      if (isMultiple(a)) {
        var e2, f2;
        if (c(b2)) {
          var h2 = a.value || [];
          f2 = h2.filter(function(c2) {
            return a.getKey(c2) !== a.getKey(b2);
          }), 0 === f2.length && (f2 = null);
        } else f2 = a.value ? _toConsumableArray(a.value) : [], f2.push(b2);
        null === (e2 = a.callBack) || void 0 === e2 ? void 0 : e2.call(a, f2, { e: d });
      }
      if (isNotMultiple(a)) {
        var g;
        null === (g = a.callBack) || void 0 === g ? void 0 : g.call(a, b2, { e: d });
      }
    };
  }, getChecked: c };
}
var _excluded$j = ["checked", "name", "size", "view", "align", "disabled", "intermediate", "className", "label", "onChange", "onFocus", "onBlur", "readOnly", "required", "step", "tabIndex", "inputId", "inputRef"];
var checkboxPropSize = ["m", "xs", "s", "l"];
var checkboxPropSizeDefault = checkboxPropSize[0];
var checkboxPropView = ["primary", "ghost"];
var checkboxPropViewDefault = checkboxPropView[0];
var checkboxPropAlign = ["center", "top"];
var checkboxPropAlignDefault = checkboxPropAlign[0];
var checkboxPropOnChangeDefault = function() {
};
var COMPONENT_NAME$1 = "Checkbox";
var cnCheckbox = cn$2("Checkbox");
var Checkbox = React.forwardRef(function(a, b) {
  var c = React.useRef(null), d = usePropsHandler(COMPONENT_NAME$1, a, c), e2 = d.checked, f2 = d.name, g = d.size, h2 = void 0 === g ? checkboxPropSizeDefault : g, i = d.view, j = void 0 === i ? checkboxPropViewDefault : i, k2 = d.align, l2 = void 0 === k2 ? checkboxPropAlignDefault : k2, m2 = d.disabled, n2 = d.intermediate, o = d.className, p2 = d.label, q2 = d.onChange, r2 = void 0 === q2 ? checkboxPropOnChangeDefault : q2, s = d.onFocus, t2 = d.onBlur, u2 = d.readOnly, v2 = d.required, w2 = d.step, x2 = d.tabIndex, y2 = d.inputId, z2 = d.inputRef, A2 = _objectWithoutProperties(d, _excluded$j);
  return React.createElement("label", Object.assign({}, A2, { className: cnCheckbox({ size: h2, view: j, disabled: m2, intermediate: void 0 !== n2 && n2, align: l2 }, [o]), ref: useForkRef([b, c]) }), React.createElement("input", { type: "checkbox", name: f2, className: cnCheckbox("Input", [cnMixFocus()]), checked: void 0 !== e2 && e2, id: y2, disabled: m2, onChange: r2, onFocus: s, onBlur: t2, readOnly: u2, required: v2, step: w2, tabIndex: x2, ref: z2 }), p2 && React.createElement("span", { className: cnCheckbox("Label") }, p2));
});
function ownKeys$e(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$e(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$e(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$e(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var defaultGetItemKey = function(a) {
  return a.key;
}, defaultGetItemLabel$2 = function(a) {
  return a.label;
}, defaultGetItemDisabled$2 = function(a) {
  return a.disabled;
}, defaultGetItemAttributes$2 = function(a) {
  return a.attributes;
}, defaultGetItemRef$2 = function(a) {
  return a.ref;
};
var withDefaultGetters$2 = function(a) {
  return _objectSpread$e(_objectSpread$e({}, a), {}, { getItemKey: a.getItemKey || defaultGetItemKey, getItemLabel: a.getItemLabel || defaultGetItemLabel$2, getItemDisabled: a.getItemDisabled || defaultGetItemDisabled$2, getItemAttributes: a.getItemAttributes || defaultGetItemAttributes$2, getItemRef: a.getItemRef || defaultGetItemRef$2 });
};
var checkboxGroupPropDirections = ["column", "row"];
var checkboxGroupDefaultDirection = checkboxGroupPropDirections[0];
var checkboxGroupPropSizes = ["m", "xs", "s", "l"];
var checkboxGroupDefaultSize = checkboxGroupPropSizes[0];
var checkboxGroupPropViews = ["primary", "ghost"];
var checkboxGroupDefaultView = checkboxGroupPropViews[0];
var checkboxGroupPropAlign = ["center", "top"];
var checkboxGroupDefaultAlign = checkboxGroupPropAlign[0];
var _excluded$i = ["value", "items", "getItemKey", "getItemLabel", "getItemDisabled", "getItemAttributes", "onChange", "name", "align", "direction", "size", "view", "disabled", "className", "getItemRef"], _excluded2$1 = ["className"];
var cnCheckboxGroup = cn$2("CheckboxGroup");
var CheckboxGroupRender = function(a, b) {
  var c = withDefaultGetters$2(a), d = c.value, e2 = void 0 === d ? null : d, f2 = c.items, g = c.getItemKey, h2 = c.getItemLabel, i = c.getItemDisabled, j = c.getItemAttributes, k2 = c.onChange, l2 = c.name, m2 = c.align, n2 = void 0 === m2 ? checkboxGroupDefaultAlign : m2, o = c.direction, p2 = void 0 === o ? checkboxGroupDefaultDirection : o, q2 = c.size, r2 = void 0 === q2 ? checkboxGroupDefaultSize : q2, s = c.view, t2 = void 0 === s ? checkboxGroupDefaultView : s, u2 = c.disabled, v2 = c.className, w2 = c.getItemRef, x2 = _objectWithoutProperties(c, _excluded$i), y2 = useChoiceGroup({ value: e2, getKey: function getKey(a2) {
    var b2;
    return null !== (b2 = g(a2)) && void 0 !== b2 ? b2 : h2(a2);
  }, callBack: k2, multiple: true }), z2 = y2.getOnChange, A2 = y2.getChecked;
  return React.createElement("div", Object.assign({}, x2, { ref: b, className: cnCheckboxGroup({ direction: p2, size: r2, view: t2 }, [v2]) }), f2.map(function(a2) {
    var b2, c2, d2 = null !== (b2 = j(a2)) && void 0 !== b2 ? b2 : {}, e3 = d2.className, f3 = _objectWithoutProperties(d2, _excluded2$1);
    return React.createElement(Checkbox, Object.assign({}, f3, { key: null !== (c2 = g(a2)) && void 0 !== c2 ? c2 : h2(a2), align: n2, label: h2(a2), size: r2, view: t2, name: l2, ref: w2(a2), disabled: void 0 !== u2 && u2 || (null === i || void 0 === i ? void 0 : i(a2)), checked: A2(a2), onChange: z2(a2), className: cnCheckboxGroup("Item", [e3]) }));
  }));
};
reactExports.forwardRef(CheckboxGroupRender);
const IconClearSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM7.297 7.297a1 1 0 0 0 0 1.414L10.586 12l-3.294 3.294a1 1 0 1 0 1.414 1.414L12 13.414l3.293 3.293a1 1 0 0 0 1.415-1.414L13.414 12l3.29-3.289a1 1 0 0 0-1.415-1.414L12 10.586l-3.289-3.29a1 1 0 0 0-1.414 0Z" }));
const IconClearSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm0-8.273 2.466-2.467a.9.9 0 0 1 1.273 1.273L9.271 8.001l2.466 2.469a.9.9 0 1 1-1.272 1.273L8 9.275l-2.464 2.468a.9.9 0 1 1-1.273-1.273l2.465-2.469-2.465-2.468A.9.9 0 0 1 5.536 4.26L8 6.727Z" }));
const IconClearSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10ZM3.177 8.819c.237.236.62.236.857 0l1.964-1.964 1.968 1.968a.606.606 0 0 0 .857-.856L6.854 5.999l1.967-1.966a.605.605 0 1 0-.857-.856L5.998 5.143 4.034 3.179a.606.606 0 0 0-.857.856L5.142 6 3.177 7.963a.605.605 0 0 0 0 .856Z" }));
const props$a = { l: IconClearSizeM, m: IconClearSizeM, s: IconClearSizeS, xs: IconClearSizeXs, name: "IconClear", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$a = createSvg(props$a);
const IconClear = createIconInner(props$a, svg$a);
const IconEyeSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" }));
const IconEyeSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M8 3C4.364 3 1.258 5.28 0 8.5 1.258 11.72 4.364 14 8 14s6.742-2.28 8-5.5C14.742 5.28 11.636 3 8 3zm0 9.167c-2.007 0-3.636-1.643-3.636-3.667S5.993 4.833 8 4.833s3.636 1.643 3.636 3.667S10.007 12.167 8 12.167zM8 6.3a2.188 2.188 0 0 0-2.182 2.2c0 1.217.975 2.2 2.182 2.2a2.188 2.188 0 0 0 2.182-2.2c0-1.217-.975-2.2-2.182-2.2z" }));
const IconEyeSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M6 2C3.273 2 .944 3.659 0 6c.944 2.341 3.273 4 6 4s5.056-1.659 6-4c-.944-2.341-3.273-4-6-4zm0 6.667C4.495 8.667 3.273 7.472 3.273 6c0-1.472 1.222-2.667 2.727-2.667S8.727 4.528 8.727 6c0 1.472-1.222 2.667-2.727 2.667zM6 4.4c-.905 0-1.636.715-1.636 1.6 0 .885.73 1.6 1.636 1.6.905 0 1.636-.715 1.636-1.6 0-.885-.73-1.6-1.636-1.6z" }));
const props$9 = { l: IconEyeSizeM, m: IconEyeSizeM, s: IconEyeSizeS, xs: IconEyeSizeXs, name: "IconEye", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$9 = createSvg(props$9);
const IconEye = createIconInner(props$9, svg$9);
const IconEyeCloseSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { clipRule: "evenodd", d: "M1 12c1.73-4.39 6-7.5 11-7.5 2.389 0 4.611.71 6.47 1.93l-2.514 2.513A4.993 4.993 0 0 0 12 7c-2.76 0-5 2.24-5 5a4.99 4.99 0 0 0 1.943 3.956L6.67 18.23A11.886 11.886 0 0 1 1 12zm7.697 7.031c1.048.305 2.156.469 3.303.469 5 0 9.27-3.11 11-7.5a11.877 11.877 0 0 0-2.947-4.325l-3.184 3.184a5.002 5.002 0 0 1-6.01 6.01l-2.162 2.162zM9 12c0-1.66 1.34-3 3-3 .716 0 1.373.25 1.888.666l-4.214 4.232A2.99 2.99 0 0 1 9 12z" }), reactExports.createElement("path", { d: "m4.901 19.998-1.414-1.414L19.043 3.028l1.414 1.414z" }));
const IconEyeCloseSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { clipRule: "evenodd", d: "M1.086 13.196 2.5 14.61l1.57-1.57.002.002 1.67-1.669-.003-.002 5.127-5.127.002.002L12.7 4.413V4.41l1.82-1.82-1.414-1.415-2.299 2.299A8.503 8.503 0 0 0 8 3C4.364 3 1.258 5.28 0 8.5a8.712 8.712 0 0 0 2.388 3.394l-1.302 1.302zm3.482-3.482 4.664-4.665A3.6 3.6 0 0 0 8 4.833c-2.007 0-3.636 1.643-3.636 3.667 0 .425.072.834.204 1.214zM8 14a8.5 8.5 0 0 1-2.948-.524l1.579-1.579c.423.174.885.27 1.369.27 2.007 0 3.636-1.643 3.636-3.667 0-.478-.09-.934-.255-1.352l2.129-2.13A8.712 8.712 0 0 1 16 8.5c-1.258 3.22-4.364 5.5-8 5.5z" }));
const IconEyeCloseSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { clipRule: "evenodd", d: "m1 9.485.707.707 8.485-8.485L9.485 1 8.132 2.353A6.557 6.557 0 0 0 6 2C3.273 2 .944 3.659 0 6a6.348 6.348 0 0 0 1.915 2.57L1 9.485zM3.475 7.01l3.5-3.5A2.773 2.773 0 0 0 6 3.332C4.495 3.333 3.273 4.528 3.273 6c0 .357.072.698.202 1.01zm4.987-2.158 1.51-1.51A6.353 6.353 0 0 1 12 6c-.944 2.341-3.273 4-6 4a6.55 6.55 0 0 1-2.28-.406l1.161-1.162c.342.15.72.235 1.119.235 1.505 0 2.727-1.195 2.727-2.667 0-.411-.095-.8-.265-1.148z" }));
const props$8 = { l: IconEyeCloseSizeM, m: IconEyeCloseSizeM, s: IconEyeCloseSizeS, xs: IconEyeCloseSizeXs, name: "IconEyeClose", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$8 = createSvg(props$8);
const IconEyeClose = createIconInner(props$8, svg$8);
const IconSelectSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "m6.5 9 5.5 6 5.5-6h-11z" }));
const IconSelectSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M3.5 5 8 10l4.5-5h-9z" }));
const IconSelectSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M6 8.5 10 4H2l4 4.5z" }));
const props$7 = { l: IconSelectSizeM, m: IconSelectSizeM, s: IconSelectSizeS, xs: IconSelectSizeXs, name: "IconSelect", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$7 = createSvg(props$7);
const IconSelect = createIconInner(props$7, svg$7);
var index$1 = reactExports.useLayoutEffect;
var useLatest = function useLatest2(value) {
  var ref = reactExports.useRef(value);
  index$1(function() {
    ref.current = value;
  });
  return ref;
};
var updateRef = function updateRef2(ref, value) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  ref.current = value;
};
var useComposedRef = function useComposedRef2(libRef, userRef) {
  var prevUserRef = reactExports.useRef();
  return reactExports.useCallback(function(instance2) {
    libRef.current = instance2;
    if (prevUserRef.current) {
      updateRef(prevUserRef.current, null);
    }
    prevUserRef.current = userRef;
    if (!userRef) {
      return;
    }
    updateRef(userRef, instance2);
  }, [userRef]);
};
var HIDDEN_TEXTAREA_STYLE = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
var forceHiddenStyles = function forceHiddenStyles2(node) {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function(key) {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
  });
};
var forceHiddenStyles$1 = forceHiddenStyles;
var hiddenTextarea = null;
var getHeight = function getHeight2(node, sizingData) {
  var height = node.scrollHeight;
  if (sizingData.sizingStyle.boxSizing === "border-box") {
    return height + sizingData.borderSize;
  }
  return height - sizingData.paddingSize;
};
function calculateNodeHeight(sizingData, value, minRows, maxRows) {
  if (minRows === void 0) {
    minRows = 1;
  }
  if (maxRows === void 0) {
    maxRows = Infinity;
  }
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tabindex", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    forceHiddenStyles$1(hiddenTextarea);
  }
  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }
  var paddingSize = sizingData.paddingSize, borderSize = sizingData.borderSize, sizingStyle = sizingData.sizingStyle;
  var boxSizing = sizingStyle.boxSizing;
  Object.keys(sizingStyle).forEach(function(_key) {
    var key = _key;
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  forceHiddenStyles$1(hiddenTextarea);
  hiddenTextarea.value = value;
  var height = getHeight(hiddenTextarea, sizingData);
  hiddenTextarea.value = value;
  height = getHeight(hiddenTextarea, sizingData);
  hiddenTextarea.value = "x";
  var rowHeight = hiddenTextarea.scrollHeight - paddingSize;
  var minHeight = rowHeight * minRows;
  if (boxSizing === "border-box") {
    minHeight = minHeight + paddingSize + borderSize;
  }
  height = Math.max(minHeight, height);
  var maxHeight = rowHeight * maxRows;
  if (boxSizing === "border-box") {
    maxHeight = maxHeight + paddingSize + borderSize;
  }
  height = Math.min(maxHeight, height);
  return [height, rowHeight];
}
var noop$1 = function noop() {
};
var pick = function pick2(props2, obj) {
  return props2.reduce(function(acc, prop) {
    acc[prop] = obj[prop];
    return acc;
  }, {});
};
var SIZING_STYLE = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  // non-standard
  "tabSize",
  "textIndent",
  // non-standard
  "textRendering",
  "textTransform",
  "width",
  "wordBreak"
];
var isIE = !!document.documentElement.currentStyle;
var getSizingData = function getSizingData2(node) {
  var style = window.getComputedStyle(node);
  if (style === null) {
    return null;
  }
  var sizingStyle = pick(SIZING_STYLE, style);
  var boxSizing = sizingStyle.boxSizing;
  if (boxSizing === "") {
    return null;
  }
  if (isIE && boxSizing === "border-box") {
    sizingStyle.width = parseFloat(sizingStyle.width) + parseFloat(sizingStyle.borderRightWidth) + parseFloat(sizingStyle.borderLeftWidth) + parseFloat(sizingStyle.paddingRight) + parseFloat(sizingStyle.paddingLeft) + "px";
  }
  var paddingSize = parseFloat(sizingStyle.paddingBottom) + parseFloat(sizingStyle.paddingTop);
  var borderSize = parseFloat(sizingStyle.borderBottomWidth) + parseFloat(sizingStyle.borderTopWidth);
  return {
    sizingStyle,
    paddingSize,
    borderSize
  };
};
var getSizingData$1 = getSizingData;
function useListener(target, type, listener) {
  var latestListener = useLatest(listener);
  reactExports.useLayoutEffect(function() {
    var handler = function handler2(ev) {
      return latestListener.current(ev);
    };
    if (!target) {
      return;
    }
    target.addEventListener(type, handler);
    return function() {
      return target.removeEventListener(type, handler);
    };
  }, []);
}
var useWindowResizeListener = function useWindowResizeListener2(listener) {
  useListener(window, "resize", listener);
};
var useFontsLoadedListener = function useFontsLoadedListener2(listener) {
  useListener(document.fonts, "loadingdone", listener);
};
var _excluded$h = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"];
var TextareaAutosize = function TextareaAutosize2(_ref, userRef) {
  var cacheMeasurements = _ref.cacheMeasurements, maxRows = _ref.maxRows, minRows = _ref.minRows, _ref$onChange = _ref.onChange, onChange = _ref$onChange === void 0 ? noop$1 : _ref$onChange, _ref$onHeightChange = _ref.onHeightChange, onHeightChange = _ref$onHeightChange === void 0 ? noop$1 : _ref$onHeightChange, props2 = _objectWithoutPropertiesLoose(_ref, _excluded$h);
  var isControlled = props2.value !== void 0;
  var libRef = reactExports.useRef(null);
  var ref = useComposedRef(libRef, userRef);
  var heightRef = reactExports.useRef(0);
  var measurementsCacheRef = reactExports.useRef();
  var resizeTextarea = function resizeTextarea2() {
    var node = libRef.current;
    var nodeSizingData = cacheMeasurements && measurementsCacheRef.current ? measurementsCacheRef.current : getSizingData$1(node);
    if (!nodeSizingData) {
      return;
    }
    measurementsCacheRef.current = nodeSizingData;
    var _calculateNodeHeight = calculateNodeHeight(nodeSizingData, node.value || node.placeholder || "x", minRows, maxRows), height = _calculateNodeHeight[0], rowHeight = _calculateNodeHeight[1];
    if (heightRef.current !== height) {
      heightRef.current = height;
      node.style.setProperty("height", height + "px", "important");
      onHeightChange(height, {
        rowHeight
      });
    }
  };
  var handleChange = function handleChange2(event) {
    if (!isControlled) {
      resizeTextarea();
    }
    onChange(event);
  };
  {
    reactExports.useLayoutEffect(resizeTextarea);
    useWindowResizeListener(resizeTextarea);
    useFontsLoadedListener(resizeTextarea);
    return /* @__PURE__ */ reactExports.createElement("textarea", _extends({}, props2, {
      onChange: handleChange,
      ref
    }));
  }
};
var index = /* @__PURE__ */ reactExports.forwardRef(TextareaAutosize);
var _excluded$g = ["status", "children", "className"];
var cnFieldCaption = cn$2("FieldCaption");
var FieldCaption = forwardRefWithAs(function(a, b) {
  var c = a.status, d = a.children, e2 = a.className, f2 = _objectWithoutProperties(a, _excluded$g);
  return React.createElement(Text, Object.assign({}, f2, { view: c || "secondary", className: cnFieldCaption(null, [e2]), ref: b, size: "xs", lineHeight: "2xs" }), d);
});
var cnSpace = cn$2("MixSpace");
var cnMixSpace = function(a) {
  var b = a.p, c = a.m, d = a.pV, e2 = a.pH, f2 = a.mV, g = a.mH, h2 = a.mT, i = a.mL, j = a.mR, k2 = a.mB, l2 = a.pT, m2 = a.pL, n2 = a.pR, o = a.pB;
  return cnSpace({ pT: l2 || d || b, pL: m2 || e2 || b, pR: n2 || e2 || b, pB: o || d || b, mT: h2 || f2 || c, mL: i || g || c, mR: j || g || c, mB: k2 || f2 || c });
};
var _excluded$f = ["className", "required", "children", "icon", "size"];
var cnFieldLabel = cn$2("FieldLabel"), iconSizeMap$1 = { xs: "xs", s: "s", m: "s", l: "s" }, iconSpaceMap = { xs: "2xs", s: "2xs", m: "2xs", l: "xs" };
var FieldLabel = forwardRefWithAs(function(a, b) {
  var c = a.className, d = a.required, e2 = a.children, f2 = a.icon, g = a.size, h2 = void 0 === g ? "m" : g, i = _objectWithoutProperties(a, _excluded$f);
  return React.createElement(Text, Object.assign({}, i, { size: h2, view: "secondary", lineHeight: "m", className: cnFieldLabel(null, [c]), ref: b }), e2, d && React.createElement("span", { className: cnFieldLabel("Star") }, "*"), f2 && React.createElement(f2, { className: cnFieldLabel("Icon", [cnMixSpace({ mL: iconSpaceMap[h2] })]), size: iconSizeMap$1[h2], view: "secondary" }));
});
var useKeys = function(a) {
  var b = useMutableRef(a);
  return reactExports.useCallback(function(a2) {
    var c = b.current, d = c.isActive, e2 = c.keys, f2 = c.onEvent;
    if (d) {
      var g;
      null === (g = e2[a2.code] || e2[a2.key]) || void 0 === g ? void 0 : g(a2);
    }
    null === f2 || void 0 === f2 ? void 0 : f2(a2);
  }, []);
};
var getIsValidValue = function(a, b, c) {
  return !("number" == typeof b && a < b || "number" == typeof c && a > c);
};
var useSortSteps = function(a) {
  var b = a.step, c = a.min, d = a.max, e2 = reactExports.useMemo(function() {
    if (Array.isArray(b)) {
      var a2 = _toConsumableArray(b);
      "number" == typeof c && a2.push(c), "number" == typeof d && a2.push(d);
      var e3 = a2.sort(function(c2, a3) {
        return c2 - a3;
      }).filter(function(a3) {
        return getIsValidValue(a3, c, d);
      });
      return Array.from(new Set(e3));
    }
    return +b;
  }, [b, c, d]);
  return e2;
};
var sizeMap$1 = { xs: "xs", s: "s", m: "s", l: "m" };
var getValueByStepArray = function(a, b, c, d, e2) {
  var f2 = +(null !== b && void 0 !== b ? b : c);
  if ("string" != typeof b) return "undefined" == typeof c ? 0 : +c;
  if (f2 < a[0]) return a[0];
  if (f2 > a[a.length - 1]) return a[a.length - 1];
  if (!e2 && f2 === a[0] || e2 && f2 === a[a.length - 1]) return f2;
  for (var g = 0; g < a.length; g++) if (f2 === a[g] || a[g] < f2 && a[g + 1] > f2) return a[g + (e2 ? 1 : -1)];
  return 0;
};
var getValueByStepNumber = function(a, b, c, d, e2) {
  var f2, g = +c, h2 = +d, i = ("string" == typeof b ? +b : 0) + +a * (e2 ? 1 : -1);
  return !Number.isNaN(g) && i <= g ? g : !Number.isNaN(h2) && i >= h2 ? h2 : +i.toFixed(+(null === (f2 = (+a).toString().split(".")[1]) || void 0 === f2 ? void 0 : f2.length) || 0);
};
var getTypeForRender = function(a, b) {
  return "password" === a ? b ? "text" : "password" : a;
};
var getValueByStep = function(a, b, c, d, e2) {
  return (Array.isArray(a) ? getValueByStepArray(a, b, d, e2, c) : getValueByStepNumber(a, b, d, e2, c)).toString();
};
var inputValue = function(a) {
  return null === a ? "" : a;
};
var stepIsActive = function(a, b) {
  var c = !!(2 < arguments.length && arguments[2] !== void 0) && arguments[2];
  return !("number" !== b || c) && ("number" == typeof a && 0 < a || "string" == typeof a && 0 < +a || Array.isArray(a) && !!a.length);
};
var textFieldPropSize = ["m", "xs", "s", "l"];
var textFieldPropSizeDefault = textFieldPropSize[0];
var textFieldPropView = ["default", "clear"];
var textFieldPropViewDefault = textFieldPropView[0];
var textFieldPropForm = ["default", "defaultClear", "defaultBrick", "brick", "brickDefault", "brickClear", "brickRound", "round", "roundClear", "roundBrick", "clearRound", "clearDefault", "clearBrick", "clearClear"];
var textFieldPropFormDefault = textFieldPropForm[0];
var _excluded$e = ["className", "type", "value", "defaultValue", "onChange", "id", "name", "rows", "cols", "minRows", "maxRows", "inputRef", "maxLength", "disabled", "size", "view", "form", "state", "status", "onBlur", "onFocus", "autoFocus", "placeholder", "leftSide", "rightSide", "autoComplete", "withClearButton", "incrementButtons", "max", "min", "readOnly", "required", "step", "tabIndex", "ariaLabel", "label", "labelIcon", "inputContainerRef", "labelPosition", "caption", "iconSize", "focused", "onClick", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onClear"];
var COMPONENT_NAME = "TextField";
var cnTextField = cn$2("TextField");
var TextFieldRender = function(a, b) {
  var c, d, e2 = React.useRef(null), f2 = React.useRef(null), g = usePropsHandler(COMPONENT_NAME, a, e2), h2 = g.className, i = g.type, j = void 0 === i ? "text" : i, k2 = g.value, l2 = g.defaultValue, m2 = g.onChange, n2 = g.id, o = g.name, p2 = g.rows, q2 = g.cols, r2 = g.minRows, s = g.maxRows, t2 = g.inputRef, u2 = g.maxLength, v2 = g.disabled, w2 = g.size, x2 = void 0 === w2 ? textFieldPropSizeDefault : w2, y2 = g.view, z2 = void 0 === y2 ? textFieldPropViewDefault : y2, A2 = g.form, B2 = void 0 === A2 ? textFieldPropFormDefault : A2, C2 = g.state, D2 = g.status, E2 = g.onBlur, F2 = g.onFocus, G2 = g.autoFocus, H2 = void 0 !== G2 && G2, I2 = g.placeholder, J2 = g.leftSide, K2 = g.rightSide, L2 = g.autoComplete, M2 = g.withClearButton, N2 = g.incrementButtons, O2 = g.max, P2 = g.min, Q2 = g.readOnly, R2 = g.required, S2 = g.step, T2 = void 0 === S2 ? 1 : S2, U2 = g.tabIndex, V2 = g.ariaLabel, W2 = g.label, X2 = g.labelIcon, Y2 = g.inputContainerRef, Z2 = g.labelPosition, $ = void 0 === Z2 ? "top" : Z2, _ = g.caption, aa2 = g.iconSize, ba = g.focused, ca2 = g.onClick, da2 = g.onKeyDown, ea2 = g.onKeyDownCapture, fa2 = g.onKeyPress, ga = g.onKeyPressCapture, ha2 = g.onKeyUp, ia2 = g.onKeyUpCapture, ja2 = g.onClear, ka2 = _objectWithoutProperties(g, _excluded$e), la2 = "number" === j && (void 0 === N2 || N2), ma2 = useFlag(H2), na = _slicedToArray(ma2, 2), oa2 = na[0], pa2 = na[1], qa2 = useFlag(), ra2 = _slicedToArray(qa2, 2), sa2 = ra2[0], ta2 = ra2[1], ua2 = useFlag(), va2 = _slicedToArray(ua2, 2), wa2 = va2[0], xa = va2[1], ya2 = useMutableRef(ca2), za2 = useMutableRef(m2), Aa2 = reactExports.useCallback(function(a2) {
    var b2;
    a2.stopPropagation(), ta2.toggle(), null === (b2 = f2.current) || void 0 === b2 ? void 0 : b2.focus();
  }, []), Ba2 = J2, Ca2 = K2, Da2 = isString$1(J2), Ea2 = isString$1(K2), Fa2 = getByMap(sizeMap$1, x2, aa2), Ga2 = useSortSteps({ step: T2, min: +P2, max: +O2 }), Ha2 = reactExports.useCallback(function(a2) {
    var b2;
    v2 || (null === (b2 = za2.current) || void 0 === b2 ? void 0 : b2.call(za2, a2.target.value || null, { e: a2, id: n2, name: o })), a2.target.value ? xa.on() : xa.off();
  }, [n2, o, v2]), Ia2 = function(a2) {
    pa2.on(), null === F2 || void 0 === F2 ? void 0 : F2(a2);
  }, Ja2 = { className: cnTextField("Input"), value: inputValue(k2), defaultValue: inputValue(l2), onChange: Ha2, maxLength: u2, disabled: v2, onBlur: function handleBlur(a2) {
    pa2.off(), null === E2 || void 0 === E2 ? void 0 : E2(a2);
  }, onFocus: Ia2, autoFocus: H2, placeholder: I2, autoComplete: L2, readOnly: Q2, tabIndex: U2, name: o, onKeyDownCapture: ea2, onKeyPress: fa2, onKeyPressCapture: ga, onKeyUp: ha2, onKeyUpCapture: ia2, id: n2 ? n2.toString() : void 0, "aria-label": V2 }, Ka2 = sa2 ? IconEyeClose : IconEye, La2 = useKeys({ isActive: true, keys: { ArrowUp: function ArrowUp(a2) {
    if (a2.preventDefault(), stepIsActive(T2, j, v2)) {
      var b2, c2, d2 = getValueByStep(Ga2, null === (b2 = f2.current) || void 0 === b2 ? void 0 : b2.value, true, P2, O2);
      null === (c2 = za2.current) || void 0 === c2 ? void 0 : c2.call(za2, d2, { e: a2, id: n2, name: o }), f2.current && (f2.current.value = d2, xa.on());
    }
  }, ArrowDown: function ArrowDown(a2) {
    if (a2.preventDefault(), stepIsActive(T2, j, v2)) {
      var b2, c2, d2 = getValueByStep(Ga2, null === (b2 = f2.current) || void 0 === b2 ? void 0 : b2.value, false, P2, O2);
      null === (c2 = za2.current) || void 0 === c2 ? void 0 : c2.call(za2, d2, { e: a2, id: n2, name: o }), f2.current && (f2.current.value = d2, xa.on());
    }
  } }, onEvent: da2 }), Ma2 = { rows: p2, cols: q2, minRows: r2 || p2, maxRows: s || p2, ref: useForkRef([f2, t2]) }, Na2 = { type: getTypeForRender(j, sa2), max: O2, min: P2, step: Array.isArray(Ga2) ? 0 : Ga2, onKeyDown: La2, ref: useForkRef([f2, t2]) }, Oa2 = reactExports.useCallback(function(a2) {
    var b2;
    null === (b2 = za2.current) || void 0 === b2 ? void 0 : b2.call(za2, null, { e: a2, id: n2, name: o }), f2.current && (f2.current.value = "", xa.off());
  }, []), Pa2 = function(a2) {
    var b2, c2, d2 = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1], e3 = getValueByStep(Ga2, null === (b2 = f2.current) || void 0 === b2 ? void 0 : b2.value, d2, P2, O2);
    null === (c2 = za2.current) || void 0 === c2 ? void 0 : c2.call(za2, e3, { e: a2, id: n2, name: o }), f2.current && (f2.current.value = e3, xa.on());
  }, Qa2 = { onClick: reactExports.useCallback(function(a2) {
    var b2, c2;
    null === (b2 = f2.current) || void 0 === b2 ? void 0 : b2.focus(), null === (c2 = ya2.current) || void 0 === c2 ? void 0 : c2.call(ya2, a2);
  }, []) };
  return reactExports.useEffect(function() {
    var a2;
    xa[null !== (a2 = f2.current) && void 0 !== a2 && a2.value ? "on" : "off"]();
  }, [null === (c = f2.current) || void 0 === c ? void 0 : c.value]), React.createElement("div", Object.assign({ className: cnTextField({ labelPosition: $, size: x2, view: z2 }, [h2]), ref: useForkRef([b, e2]) }, Qa2, ka2), W2 && React.createElement(FieldLabel, { as: "label", htmlFor: null === n2 || void 0 === n2 ? void 0 : n2.toString(), icon: X2, required: R2, className: cnTextField("Label", { labelPosition: $ }), size: x2 }, W2), React.createElement("div", { className: cnTextField("Body") }, React.createElement("div", { ref: Y2, className: cnTextField("InputContainer", { view: z2, form: B2, status: D2 || C2, disabled: v2, type: j, focus: oa2 || ba, withValue: wa2, incrementButtons: "number" === j && la2 }) }, Ba2 && React.createElement("div", { className: cnTextField("Side", { position: "left", type: Da2 ? "string" : "icon" }), title: "string" == typeof J2 ? J2 : void 0 }, Da2 ? J2 : React.createElement(Ba2, { className: cnTextField("Icon"), size: Fa2 })), "textarea" === j ? React.createElement(index, Object.assign({}, Ja2, Ma2)) : React.createElement("input", Object.assign({}, Ja2, Na2)), la2 && stepIsActive(T2, j, v2) && React.createElement("div", { className: cnTextField("Counter") }, React.createElement("button", { className: cnTextField("CounterButton", { fn: "increment" }), onFocus: Ia2, onClick: function(a2) {
    return Pa2(a2, true);
  }, type: "button" }, React.createElement(IconSelect, { size: "xs" })), React.createElement("button", { className: cnTextField("CounterButton"), onFocus: Ia2, onClick: function(a2) {
    return Pa2(a2, false);
  }, type: "button" }, React.createElement(IconSelect, { size: "xs" }))), !la2 && wa2 && M2 && !v2 && React.createElement("button", { type: "button", disabled: v2, tabIndex: -1, onClick: ja2 || Oa2, className: cnTextField("ClearButton") }, React.createElement(IconClear, { size: sizeMap$1[x2], className: cnTextField("ClearButtonIcon") })), "password" === j && (null === (d = f2.current) || void 0 === d ? void 0 : d.value) && React.createElement("button", { className: cnTextField("ClearButton"), type: "button", onClick: Aa2 }, React.createElement(Ka2, { className: cnTextField("Icon"), size: Fa2 })), Ca2 && !la2 && "password" !== j && React.createElement("div", { className: cnTextField("Side", { position: "right", type: Ea2 ? "string" : "icon" }), title: "string" == typeof K2 ? K2 : void 0 }, Ea2 ? K2 : React.createElement(Ca2, { className: cnTextField("Icon"), size: Fa2 }))), _ && React.createElement(FieldCaption, { className: cnTextField("Caption"), status: D2 || C2 }, _)));
};
var TextField = reactExports.forwardRef(TextFieldRender);
cn$2("TableFilterContainer");
cn$2("TableTextFilter");
cn$2("TableNumberFilter");
function ownKeys$d(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$d(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$d(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$d(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var defaultGetItemLabel$1 = function(a) {
  return a.label;
}, defaultGetItemIcon = function(a) {
  return a.icon;
}, defaultGetItemDisabled$1 = function(a) {
  return a.disabled;
}, defaultGetItemAttributes$1 = function(a) {
  return a.attributes;
}, defaultGetItemRef$1 = function(a) {
  return a.ref;
};
var withDefaultGetters$1 = function(a) {
  return _objectSpread$d(_objectSpread$d({}, a), {}, { getItemLabel: a.getItemLabel || defaultGetItemLabel$1, getItemIcon: a.getItemIcon || defaultGetItemIcon, getItemDisabled: a.getItemDisabled || defaultGetItemDisabled$1, getItemAttributes: a.getItemAttributes || defaultGetItemAttributes$1, getItemRef: a.getItemRef || defaultGetItemRef$1 });
};
var _excluded$d = ["label", "onChange", "checked", "multiple", "icon", "onlyIcon", "name", "iconSize", "disabled", "className"];
var ChoiceGroupItem = reactExports.forwardRef(function(a, b) {
  var c = a.label, d = a.onChange, e2 = a.checked, f2 = a.multiple, g = a.icon, h2 = a.onlyIcon, i = a.name, j = a.iconSize, k2 = a.disabled, l2 = void 0 !== k2 && k2, m2 = a.className, n2 = _objectWithoutProperties(a, _excluded$d), o = useFlag(), p2 = _slicedToArray(o, 2), q2 = p2[0], r2 = p2[1];
  return React.createElement("label", Object.assign({}, n2, { className: cnChoiceGroup("Label", { focus: q2, checked: e2, disabled: l2 }, [cnMixFocus(), m2]), ref: b }), React.createElement("input", { type: f2 ? "checkbox" : "radio", className: cnChoiceGroup("Input"), checked: e2, onFocus: r2.on, onBlur: r2.off, value: "".concat(i, "-").concat(c), onChange: d, name: i, disabled: l2 }), g && React.createElement(g, { className: cnChoiceGroup("Icon"), size: j }), !h2 && React.createElement("span", { className: cnChoiceGroup("Text") }, c));
});
var choiceGroupDefaultForm = "default";
var choiceGroupDefaultSize = "m";
var choiceGroupDefaultView = "primary";
var choiceGroupWidth = ["default", "full"];
var choiceGroupWidthDefault = choiceGroupWidth[0];
var _excluded$c = ["size", "form", "view", "width", "onlyIcon", "iconSize", "value", "multiple", "items", "getItemLabel", "onChange", "getItemIcon", "getItemAttributes", "getItemRef", "getItemDisabled", "name", "className", "disabled", "truncate"];
var sizeMap = { xs: "xs", s: "xs", m: "s", l: "m" };
var cnChoiceGroup = cn$2("ChoiceGroup");
var ChoiceGroupRender = function(a, b) {
  var c = withDefaultGetters$1(a), d = c.size, e2 = void 0 === d ? choiceGroupDefaultSize : d, f2 = c.form, g = void 0 === f2 ? choiceGroupDefaultForm : f2, h2 = c.view, i = void 0 === h2 ? choiceGroupDefaultView : h2, j = c.width, k2 = void 0 === j ? choiceGroupWidthDefault : j, l2 = c.onlyIcon, m2 = c.iconSize, n2 = c.value, o = void 0 === n2 ? null : n2, p2 = c.multiple, q2 = void 0 !== p2 && p2, r2 = c.items, s = c.getItemLabel, t2 = c.onChange, u2 = c.getItemIcon, v2 = c.getItemAttributes, w2 = c.getItemRef, x2 = c.getItemDisabled, y2 = c.name, z2 = c.className, A2 = c.disabled, B2 = void 0 !== A2 && A2, C2 = c.truncate, D2 = _objectWithoutProperties(c, _excluded$c), E2 = useChoiceGroup({ value: o, getKey: s, callBack: t2, multiple: q2 }), F2 = E2.getOnChange, G2 = E2.getChecked, H2 = getByMap(sizeMap, e2, m2);
  return React.createElement("div", Object.assign({}, D2, { ref: b, className: cnChoiceGroup({ size: e2, form: g, view: i, width: k2, onlyIcon: l2, disabled: B2, truncate: C2 }, [z2]) }), r2.map(function(a2, b2) {
    var c2, d2 = G2(a2), e3 = null === x2 || void 0 === x2 ? void 0 : x2(a2), f3 = null !== (c2 = v2(a2)) && void 0 !== c2 ? c2 : {}, g2 = s(a2).toString();
    return React.createElement(React.Fragment, { key: g2 }, 0 < b2 && React.createElement("div", { className: cnChoiceGroup("Divider", { checked: d2, disabled: e3 }) }), React.createElement(ChoiceGroupItem, Object.assign({ onChange: e3 ? void 0 : F2(a2), checked: d2, label: g2, icon: u2 && u2(a2), iconSize: H2, multiple: q2, onlyIcon: l2, ref: w2(a2), name: y2, disabled: B2 || e3, title: l2 || C2 ? g2 : void 0 }, f3)));
  }));
};
reactExports.forwardRef(ChoiceGroupRender);
var _excluded$b = ["columns", "rows", "size", "filters", "isResizable", "stickyHeader", "stickyColumns", "minColumnWidth", "activeRow", "verticalAlign", "headerVerticalAlign", "zebraStriped", "borderBetweenRows", "borderBetweenColumns", "emptyRowsPlaceholder", "defaultExpandAll", "className", "onRowHover", "onRowClick", "onRowCreate", "onCellClick", "getAdditionalClassName", "rowCreateText", "lazyLoad", "onSortBy", "onFiltersUpdated", "getTagLabel", "getCellWrap", "isExpandedRowsByDefault"];
function ownKeys$c(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$c(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$c(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$c(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var cnTable = cn$2("Table");
var createButtonSizeMap = { s: "xs", m: "s", l: "m" }, getColumnSortByField = function(a) {
  return a.sortable && a.sortByField || a.accessor;
}, sortingData = function(a, b, c) {
  if (c) return a;
  if (!b) return a;
  var d = sortBy(a, b.by, b.order, b.sortFn);
  return d.some(function(a2) {
    var b2;
    return null === (b2 = a2.rows) || void 0 === b2 ? void 0 : b2.length;
  }) ? d.map(function(a2) {
    return a2.rows ? _objectSpread$c(_objectSpread$c({}, a2), {}, { rows: sortingData(a2.rows, b, c) }) : a2;
  }) : d;
}, defaultEmptyRowsPlaceholder = React.createElement(Text, { as: "span", view: "primary", size: "s", lineHeight: "s" }, "Нет данных"), InternalTable = function(a, b) {
  var c, d, e2, f2, g = a.columns, h2 = a.rows, i = a.size, j = void 0 === i ? "l" : i, k2 = a.filters, l2 = a.isResizable, m2 = void 0 !== l2 && l2, n2 = a.stickyHeader, o = a.stickyColumns, p2 = void 0 === o ? 0 : o, q2 = a.minColumnWidth, r2 = void 0 === q2 ? 150 : q2, s = a.activeRow, t2 = a.verticalAlign, u2 = void 0 === t2 ? "top" : t2, v2 = a.headerVerticalAlign, w2 = void 0 === v2 ? "center" : v2, x2 = a.zebraStriped, y2 = a.borderBetweenRows, z2 = a.borderBetweenColumns, A2 = void 0 !== z2 && z2, B2 = a.emptyRowsPlaceholder, C2 = void 0 === B2 ? defaultEmptyRowsPlaceholder : B2, D2 = a.defaultExpandAll, E2 = a.className, F2 = a.onRowHover, G2 = a.onRowClick, H2 = a.onRowCreate, I2 = a.onCellClick, J2 = a.getAdditionalClassName, K2 = a.rowCreateText, L2 = void 0 === K2 ? "+ Добавить строку" : K2, M2 = a.lazyLoad, N2 = a.onSortBy, O2 = a.onFiltersUpdated, P2 = a.getTagLabel, Q2 = a.getCellWrap, R2 = a.isExpandedRowsByDefault, S2 = void 0 !== R2 && R2, T2 = _objectWithoutProperties(a, _excluded$b), U2 = useHeaderData$1(g), V2 = U2.headers, W2 = U2.flattenedHeaders, X2 = U2.lowHeaders, Y2 = U2.headerRowsRefs, Z2 = U2.headerRowsHeights, $ = U2.resizerTopOffsets, _ = (null === (c = V2[0][p2 - 1]) || void 0 === c ? void 0 : c.position.gridIndex) + ((null === (d = V2[0][p2 - 1]) || void 0 === d ? void 0 : d.position.colSpan) || 1), aa2 = function() {
    return X2.map(function(a2) {
      return a2.width;
    });
  }, ba = React.useState(aa2()), ca2 = _slicedToArray(ba, 2), da2 = ca2[0], ea2 = ca2[1], fa2 = React.useMemo(function() {
    return k2 && k2.filter(function(a2) {
      return a2.id && a2.field;
    });
  }, [k2]);
  React.useEffect(function() {
    ea2(aa2());
  }, [X2.length]);
  var ga = React.useState([]), ha2 = _slicedToArray(ga, 2), ia2 = ha2[0], ja2 = ha2[1], ka2 = React.useState(null), la2 = _slicedToArray(ka2, 2), ma2 = la2[0], na = la2[1], oa2 = React.useState(null), pa2 = _slicedToArray(oa2, 2), qa2 = pa2[0], ra2 = pa2[1], sa2 = React.useState({ top: 0, left: 0 }), ta2 = _slicedToArray(sa2, 2), ua2 = ta2[0], va2 = ta2[1], wa2 = React.useRef(null), xa = React.useRef({}), ya2 = React.useRef({}), za2 = useSelectedFilters(fa2, O2), Aa2 = za2.selectedFilters, Ba2 = za2.updateSelectedFilters, Ca2 = za2.removeOneSelectedFilter, Da2 = za2.removeAllSelectedFilters, Ea2 = React.useState([]), Fa2 = _slicedToArray(Ea2, 2), Ga2 = Fa2[0], Ha2 = Fa2[1];
  React.useEffect(function() {
    var a2 = g.find(function(a3) {
      return isString$1(a3.order) && Object.prototype.hasOwnProperty.call(Order, a3.order);
    });
    if (a2) {
      var b2 = createSortingState(getColumnSortByField(a2), a2.order, a2.sortFn);
      na(b2);
    }
  }, [g]), useComponentSize(wa2);
  var Ia2 = (null === (e2 = wa2.current) || void 0 === e2 ? void 0 : e2.clientHeight) || 0, Ja2 = (null === (f2 = wa2.current) || void 0 === f2 ? void 0 : f2.clientWidth) || 0, Ka2 = 0 < ua2.left, La2 = 0 < ua2.top, Ma2 = s && s.onChange, Na2 = function(a2, b2) {
    ea2(updateAt(da2, a2, b2));
  }, Oa2 = reactExports.useMemo(function() {
    var a2 = Object.values(xa.current).filter(isNotNil), b2 = a2.map(function(a3) {
      return a3.getBoundingClientRect().width;
    }), c2 = getMergedArray(b2, da2);
    return c2.reduce(function(c3, a3) {
      return (null !== c3 && void 0 !== c3 ? c3 : 0) + (null !== a3 && void 0 !== a3 ? a3 : 0);
    });
  }, [da2, m2]);
  React.useLayoutEffect(function() {
    var a2 = Object.values(xa.current).filter(isNotNil);
    if (0 !== a2.length) {
      var b2 = a2.map(function(a3) {
        return a3.getBoundingClientRect().width;
      });
      if (ja2(b2), a2[0].getBoundingClientRect().left !== a2[a2.length - 1].getBoundingClientRect().left) {
        var h3 = getMergedArray(b2, da2);
        if ((null !== Oa2 && void 0 !== Oa2 ? Oa2 : Ja2) < Ja2) {
          for (var c2, d2 = false, e3 = g.length - 1; 0 < e3; e3--) if (c2 = g[e3].width, !(c2 && 0 < c2)) return h3[e3] = void 0, void (d2 = true);
          if (!d2 && Oa2) {
            var f3;
            h3[h3.length - 1] = (null !== (f3 = h3[h3.length - 1]) && void 0 !== f3 ? f3 : 0) + Ja2 - Oa2;
          }
        }
        return ea2(h3);
      }
      return 0 < Ja2 && !m2 ? ea2(aa2()) : void 0;
    }
  }, [Ja2, Oa2]);
  var Pa2 = function(a2) {
    return getColumnSortByField(a2) === (null === ma2 || void 0 === ma2 ? void 0 : ma2.by);
  }, Qa2 = function(a2, b2) {
    return b2 >= p2 ? void 0 : getColumnLeftOffset({ columnIndex: a2, resizedColumnWidths: da2, initialColumnWidths: ia2 });
  }, Ra2 = function(a2) {
    var b2 = a2.id, c2 = a2.e;
    s && s.onChange && s.onChange({ id: s.id === b2 ? void 0 : b2, e: c2 });
  }, Sa2 = function(a2) {
    return function(b2) {
      return F2 && F2({ id: a2, e: b2 });
    };
  }, Ta2 = function(a2, b2) {
    return function(c2) {
      return H2 && H2({ e: c2, id: b2, index: a2 });
    };
  }, Ua2 = function(a2, b2) {
    var c2 = Math.min(r2, ia2[a2]), d2 = da2[a2] || ia2[a2], e3 = Math.max(c2, d2 + b2);
    Na2(a2, e3);
    var f3 = wa2.current;
    a2 === da2.length - 1 && 0 < b2 && f3 && f3.scrollBy(b2, 0);
  }, Va2 = getColumnLeftOffset({ columnIndex: p2, resizedColumnWidths: da2, initialColumnWidths: ia2 }), Wa2 = function(a2) {
    return a2.map(function(a3) {
      var b2, c2 = a3.position.gridIndex, d2 = da2[c2], e3 = ia2[c2], f3 = d2 || e3, g2 = getColumnLeftOffset({ columnIndex: c2, resizedColumnWidths: da2, initialColumnWidths: ia2 }), h3 = p2 > a3.position.topHeaderGridIndex, i2 = p2 > c2 || Va2 + ua2.left < g2 + f3, j2 = 0 < ((null === (b2 = Aa2[a3.accessor]) || void 0 === b2 ? void 0 : b2.selected) || []).length;
      return _objectSpread$c(_objectSpread$c({}, a3), {}, { filterable: !!(fa2 && fieldFiltersPresent(fa2, a3.accessor)), isSortingActive: Pa2(a3), isFilterActive: j2, isResized: !!f3 && f3 !== e3, isSticky: h3, showResizer: i2, columnWidth: f3, columnLeftOffset: g2 });
    });
  }, Xa2 = Wa2(W2), Ya2 = React.useMemo(function() {
    return h2.some(function(a2) {
      var b2;
      return !(!(null !== (b2 = a2.rows) && void 0 !== b2) || !b2.length);
    });
  }, [h2]), Za2 = sortingData(h2, ma2, N2), $a = fa2 && isSelectedFiltersPresent(Aa2) ? filterTableData({ data: Za2, filters: fa2 || [], selectedFilters: Aa2 }) : Za2, _a2 = M2 || {}, ab2 = _a2.maxVisibleRows, bb2 = void 0 === ab2 ? 210 : ab2, cb2 = _a2.scrollableEl, db2 = void 0 === cb2 ? wa2.current : cb2, eb2 = useLazyLoadData(bb2, db2, !!M2), fb2 = eb2.getSlicedRows, gb2 = eb2.setBoundaryRef, hb2 = transformRows($a, Ga2, S2), ib2 = fb2(hb2), jb2 = { "--table-grid-template-columns": getColumnsSize(da2), "--table-width": "".concat(Ja2, "px") }, kb2 = Wa2(X2).some(function(a2) {
    return a2.mergeCells;
  }), lb2 = function(a2) {
    return function() {
      return Ga2.includes(a2) ? void Ha2(function(b2) {
        return b2.filter(function(b3) {
          return b3 !== a2;
        });
      }) : void Ha2(function(b2) {
        return [].concat(_toConsumableArray(b2), [a2]);
      });
    };
  }, mb2 = function(a2, b2) {
    var c2, d2 = !(!(null !== (c2 = a2.rows) && void 0 !== c2) || !c2.length) && 0 === b2, e3 = { level: a2.options.level, isExpandedByDefault: S2 };
    if (!d2 || S2) return e3;
    var f3 = Ga2.includes(a2.id), g2 = lb2(a2.id);
    return _objectSpread$c(_objectSpread$c({}, e3), {}, { withCollapseButton: d2, isExpanded: f3, toggleCollapse: g2 });
  }, nb2 = function(a2, b2, c2) {
    var d2 = [];
    return a2.forEach(function(a3) {
      var e3, f3;
      if ((a3.defaultExpand || 0 < (null !== (e3 = null === (f3 = a3.rows) || void 0 === f3 ? void 0 : f3.length) && void 0 !== e3 ? e3 : 0) && c2) && d2.push(a3.id), a3.rows) {
        var g2 = nb2(a3.rows, b2 + 1, c2);
        d2 = [].concat(_toConsumableArray(d2), _toConsumableArray(g2)), 0 < g2.length && -1 === d2.indexOf(a3.id) && d2.push(a3.id);
      }
    }), [].concat(_toConsumableArray(0 === b2 ? Ga2 : []), _toConsumableArray(d2.filter(function(a3) {
      return -1 === Ga2.indexOf(a3);
    })));
  };
  reactExports.useEffect(function() {
    h2 && Ha2(nb2(h2, 0, D2));
  }, [h2, D2]);
  var ob2 = function(a2, b2, c2) {
    var d2 = a2.renderCell ? a2.renderCell(b2) : b2[a2.accessor];
    if (!Ya2 || 0 !== c2) return d2;
    var e3 = mb2(b2, c2);
    return React.createElement(TableRowsCollapse, e3, d2);
  }, pb2 = reactExports.useMemo(function() {
    var a2, b2 = ib2.length, c2 = null !== (a2 = ib2.slice(-1).pop()) && void 0 !== a2 ? a2 : {}, d2 = c2.id;
    return H2 ? React.createElement("div", { className: cnTable(b2 ? "CreatRowCell" : "RowWithoutCells") }, React.createElement(Button, { size: createButtonSizeMap[j], form: "brick", label: L2, view: "clear", className: cnTable("CreateRowButton"), onClick: Ta2(b2, d2), width: "full" })) : null;
  }, [L2, ib2.length, H2]), qb2 = function(a2, b2, c2, d2) {
    var e3, f3 = c2.mergeCells, g2 = c2.accessor, h3 = c2.position, j2 = c2.getComparisonValue, k3 = void 0 === j2 ? function(a3) {
      return a3;
    } : j2, l3 = ib2[b2 - 1] && k3(ib2[b2 - 1][g2]), m3 = k3(a2[g2]), n3 = { rowSpan: 1, show: false, style: { left: Qa2(d2, h3.topHeaderGridIndex) } };
    if (f3 && (ib2[b2 - 1] && l3 !== m3 || 0 === b2 || l3 === m3 && null !== (e3 = ib2[b2 - 1]) && void 0 !== e3 && e3.rows)) {
      if (!a2.rows) for (var o2, p3 = b2; p3 < ib2.length && ib2[p3 + 1] && (o2 = k3(ib2[p3 + 1][g2]), m3 === o2 && !ib2[p3].rows); p3++) n3.rowSpan++;
      1 < n3.rowSpan && (n3.style["--row-span"] = "span ".concat(n3.rowSpan)), n3.show = true;
    }
    return f3 || (n3.show = true), n3;
  }, rb2 = function(a2) {
    null === I2 || void 0 === I2 ? void 0 : I2(a2);
  };
  return React.createElement("div", Object.assign({}, T2, { ref: useForkRef([wa2, b]), className: cnTable({ size: j, isResizable: m2, zebraStriped: x2, withBorderBottom: !$a.length }, [E2, cnMixScrollBar()]), style: jb2, onScroll: function handleScroll(a2) {
    a2.target instanceof HTMLElement && a2.target === wa2.current && va2({ top: a2.target.scrollTop, left: a2.target.scrollLeft });
  } }), Wa2(X2).map(function(a2, b2) {
    return React.createElement(TableCell, { type: "resizer", key: b2, ref: function(a3) {
      xa.current[b2] = a3;
    }, style: { left: Qa2(b2, b2) }, onContextMenu: function onContextMenu(a3) {
      return rb2({ e: a3, type: "contextMenu", columnIdx: b2, ref: { current: xa.current[b2] } });
    }, onClick: function onClick(a3) {
      return rb2({ e: a3, type: "click", columnIdx: b2, ref: { current: xa.current[b2] } });
    }, column: a2, showVerticalShadow: Ka2 }, m2 && React.createElement(TableResizer, { height: Ia2 - $[b2], top: $[b2], isVisible: a2.showResizer, onResize: function onResize(a3) {
      return Ua2(b2, a3);
    }, onDoubleClick: function onDoubleClick() {
      return Na2(b2, ia2[b2]);
    } }));
  }), React.createElement(TableHeader$1, { isStickyHeader: void 0 !== n2 && n2, headersWithMetaData: Xa2, headerRowsHeights: Z2, headerRowsRefs: Y2, getStickyLeftOffset: Qa2, stickyColumnsGrid: _, showVerticalCellShadow: Ka2, headerVerticalAlign: w2, getSortIcon: function getSortIcon(a2) {
    return Pa2(a2) && ("desc" === (null === ma2 || void 0 === ma2 ? void 0 : ma2.order) ? IconSortDown : IconSortUp) || IconUnsort;
  }, handleSortClick: function handleSortClick(a2) {
    var b2 = getNewSorting(ma2, getColumnSortByField(a2), a2.sortable && (null === a2 || void 0 === a2 ? void 0 : a2.sortFn) || void 0), c2 = b2 ? { sortingBy: b2.by, sortOrder: b2.order } : null;
    N2 && N2(c2), na(b2);
  }, handleFilterTogglerClick: function handleFilterTogglerClick(a2) {
    return function() {
      ra2(qa2 === a2 ? null : a2);
    };
  }, handleCellClick: rb2, handleTooltipSave: function handleTooltipSave(a2, b2, c2) {
    Ba2(a2, b2, c2);
  }, filters: fa2, visibleFilter: qa2, selectedFilters: Aa2, showHorizontalCellShadow: La2, borderBetweenColumns: A2 }), fa2 && isSelectedFiltersPresent(Aa2) && React.createElement("div", { className: cnTable("RowWithoutCells") }, React.createElement(TableSelectedOptionsList, { values: getSelectedFiltersList({ filters: fa2, selectedFilters: Aa2, columns: X2 }), getTagLabel: P2, onRemove: /* @__PURE__ */ function removeSelectedFilter(a2) {
    return function(b2) {
      Ca2(a2, b2);
    };
  }(fa2), onReset: function resetSelectedFilters() {
    fa2 && fa2.length && Da2(fa2);
  } })), 0 < ib2.length ? ib2.map(function(a2, b2) {
    var c2 = 0 == (b2 + 1) % 2 ? "even" : "odd", d2 = Wa2(X2), e3 = calulateColSpans(d2, a2);
    return React.createElement("div", { key: a2.id, role: "presentation", className: cnTable("CellsRow", { nth: c2, withMergedCells: kb2 }), onMouseEnter: Sa2(a2.id), onMouseLeave: Sa2(void 0), onClick: function onClick(b3) {
      return G2 && G2({ id: a2.id, e: b3 });
    } }, d2.map(function(c3, d3) {
      var f3 = qb2(a2, b2, c3, d3), g2 = f3.show, h3 = f3.style, i2 = f3.rowSpan, j2 = e3[d3], k3 = 0 < d3 ? e3.slice(0, d3).reduce(function(c4, a3) {
        return c4 + a3;
      }) + 1 : 1;
      if (g2 && 0 < j2) {
        var l3;
        return React.createElement(TableCell, { type: "content", key: c3.accessor, ref: function(c4) {
          ya2.current["".concat(d3, "-").concat(a2.id)] = c4, setRef(gb2(d3, b2), c4);
        }, style: _objectSpread$c(_objectSpread$c({}, h3), {}, (l3 = {}, _defineProperty$2(l3, "--table-cell-col-start", k3), _defineProperty$2(l3, "--table-cell-col-end", k3 + j2), l3)), wrapperClassName: cnTable("ContentCell", { isActive: !!s && s.id === a2.id, isDarkned: !!s && s.id !== void 0 && s.id !== a2.id, isMerged: c3.mergeCells && 1 < i2 }), className: null === J2 || void 0 === J2 ? void 0 : J2({ column: c3, row: a2, isActive: !!s && s.id === a2.id }), wrap: null === Q2 || void 0 === Q2 ? void 0 : Q2(a2), onContextMenu: function onContextMenu(b3) {
          return rb2({ e: b3, type: "contextMenu", columnIdx: d3, rowId: a2.id, ref: { current: ya2.current["".concat(d3, "-").concat(a2.id)] } });
        }, onClick: function onClick(b3) {
          Ra2({ id: a2.id, e: b3 }), rb2({ e: b3, type: "click", columnIdx: d3, rowId: a2.id, ref: { current: ya2.current["".concat(d3, "-").concat(a2.id)] } });
        }, column: c3, verticalAlign: u2, isClickable: !!Ma2, showVerticalShadow: Ka2 && (null === c3 || void 0 === c3 ? void 0 : c3.position.gridIndex) + ((null === c3 || void 0 === c3 ? void 0 : c3.position.colSpan) || 1) === _, isBorderTop: 0 < b2 && void 0 !== y2 && y2, isBorderLeft: 0 < d3 && A2 }, ob2(c3, a2, d3));
      }
      return null;
    }));
  }) : React.createElement("div", { className: cnTable("RowWithoutCells") }, React.createElement("div", { className: cnTable("EmptyCell") }, function renderEmptyRowsPlaceholder(a2) {
    return "string" == typeof a2 ? React.createElement(Text, { size: "s", view: "primary", lineHeight: "m" }, a2) : a2;
  }(C2))), pb2);
};
var Table$1 = React.forwardRef(InternalTable);
const IconInfoCircleSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm1.828-15.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM9.479 11h1.644l-1.018 5.093a2.448 2.448 0 0 0 3.932 2.364l.042-.033c.473-.377.795-.913.907-1.508l.255-1.363h-2.034l-.187.994a.525.525 0 0 1-.189.314l-.041.033a.447.447 0 0 1-.719-.432l1.24-6.277A1 1 0 0 0 12.328 9H9.979l-.5 2Z" }));
const IconInfoCircleSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM9.292 4.072a1.072 1.072 0 1 1-2.144 0 1.072 1.072 0 0 1 2.144 0Zm-1.98 8.676a1.9 1.9 0 0 0 2.129-.164l.03-.023c.366-.293.615-.707.701-1.168l.183-.974a.15.15 0 0 0-.147-.177H8.753a.15.15 0 0 0-.147.122l-.133.71a.225.225 0 0 1-.081.135l-.03.024a.17.17 0 0 1-.273-.163l.858-4.153v-.003a.865.865 0 0 0-.85-1.024H6.418a.15.15 0 0 0-.145.113l-.357 1.43a.15.15 0 0 0 .145.186h.99l-.66 3.127-.001.003a1.9 1.9 0 0 0 .923 2Z" }));
const IconInfoCircleSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Zm1.203-8.27a.86.86 0 1 1-1.72 0 .86.86 0 0 1 1.72 0ZM4.802 4.284a.1.1 0 0 1 .097-.076h1.346a.673.673 0 0 1 .662.798v.001L6.218 8.34a.157.157 0 0 0 .251.15l.024-.019a.201.201 0 0 0 .072-.12l.107-.57a.1.1 0 0 1 .098-.081h1.167a.1.1 0 0 1 .098.118l-.147.781a1.548 1.548 0 0 1-.555.924l-.024.02a1.503 1.503 0 0 1-2.415-1.453v-.002l.536-2.532h-.819a.1.1 0 0 1-.097-.125l.287-1.146Z" }));
const props$6 = { l: IconInfoCircleSizeM, m: IconInfoCircleSizeM, s: IconInfoCircleSizeS, xs: IconInfoCircleSizeXs, name: "IconInfoCircle", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$6 = createSvg(props$6);
const IconInfoCircle = createIconInner(props$6, svg$6);
const IconEditSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" }));
const IconEditSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "m14 5-3-3-1.414 1.414 3 3L14 5zm-2.121 2.121-3-3L2 11v3h3l6.879-6.879z" }));
const IconEditSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M8.786 5.214 10 4 8 2 6.786 3.214l2 2zm-.572.572-2-2L2 8v2h2l4.214-4.214z" }));
const props$5 = { l: IconEditSizeM, m: IconEditSizeM, s: IconEditSizeS, xs: IconEditSizeXs, name: "IconEdit", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$5 = createSvg(props$5);
const IconEdit = createIconInner(props$5, svg$5);
const IconAddSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M13 2h-2v9H2v2h9v9h2v-9h9v-2h-9V2z" }));
const IconAddSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M9 2H7v5H2v2h5v5h2V9h5V7H9V2z" }));
const IconAddSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M6.5 2.5h-1v3h-3v1h3v3h1v-3h3v-1h-3v-3z" }));
const props$4 = { l: IconAddSizeM, m: IconAddSizeM, s: IconAddSizeS, xs: IconAddSizeXs, name: "IconAdd", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$4 = createSvg(props$4);
const IconAdd = createIconInner(props$4, svg$4);
var cnMixPopoverArrow = cn$2("MixPopoverArrow");
var tooltipPropSizes = ["m", "s", "l"];
var tooltipPropSizesDefault = tooltipPropSizes[0];
var _excluded$a = ["isOpen", "size", "status", "onSetDirection", "offset", "style", "className", "children", "viewportRef"];
function ownKeys$b(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$b(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$b(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$b(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var cnTooltip = cn$2("Tooltip"), ARROW_SIZE = 6, ARROW_OFFSET = 8;
var Tooltip = reactExports.forwardRef(function(a, b) {
  var c = a.isOpen, d = a.size, e2 = void 0 === d ? tooltipPropSizesDefault : d, f2 = a.status, g = a.onSetDirection, h2 = a.offset, i = void 0 === h2 ? 0 : h2, j = a.style, k2 = a.className, l2 = a.children, m2 = a.viewportRef, n2 = _objectWithoutProperties(a, _excluded$a), o = reactExports.useRef(null), p2 = useForkRef([o, b]), q2 = useTheme(), r2 = q2.theme, s = reactExports.useState(), t2 = _slicedToArray(s, 2), u2 = t2[0], v2 = t2[1], w2 = function(a2) {
    null === g || void 0 === g ? void 0 : g(a2), v2(a2);
  }, x2 = reactExports.useMemo(function() {
    var a2 = _objectSpread$b(_objectSpread$b({}, r2), {}, { color: { primary: f2 ? r2.color.accent : r2.color.invert, accent: r2.color.accent, invert: r2.color.primary } });
    return { theme: a2, themeClassNames: generateThemeClassNames(a2) };
  }, [generateDeps(r2), f2]);
  return React.createElement(Transition, { in: c, unmountOnExit: true, timeout: animateTimeout, nodeRef: o }, function(a2) {
    var b2;
    return React.createElement(ThemeContext.Provider, { value: x2 }, React.createElement(Popover, Object.assign({}, n2, { arrowOffset: ARROW_OFFSET + ARROW_SIZE, offset: ARROW_SIZE + ARROW_OFFSET / 2 + i, onSetDirection: w2, ref: p2, viewportRef: m2, className: cnTooltip({ status: f2 }, [k2, cnMixPopoverAnimate({ animate: a2 })]), style: _objectSpread$b((b2 = {}, _defineProperty$2(b2, "--popover-arrow-size", "".concat(ARROW_SIZE, "px")), _defineProperty$2(b2, "--popover-arrow-offset", "".concat(ARROW_OFFSET, "px")), b2), j) }), React.createElement("div", { className: cnTooltip("Background") }), React.createElement("div", { className: cnTooltip("Arrow", [cnMixPopoverArrow({ direction: u2 })]) }), React.createElement("div", { className: cnTooltip("Content", { size: e2 }) }, "string" == typeof l2 || "number" == typeof l2 ? React.createElement(Text, { view: "primary", size: "m", lineHeight: "m" }, l2) : l2)));
  });
});
var useDebounce = function(a, b) {
  var c = reactExports.useRef(null), d = useMutableRef(a);
  return reactExports.useEffect(function() {
    return function() {
      c.current && clearTimeout(c.current);
    };
  }, [b]), reactExports.useCallback(function() {
    for (var a2 = arguments.length, e2 = Array(a2), f2 = 0; f2 < a2; f2++) e2[f2] = arguments[f2];
    c.current && clearTimeout(c.current), c.current = setTimeout(function() {
      c.current = null, "function" == typeof d.current && d.current.apply(d, e2);
    }, b);
  }, [b]);
};
var _excluded$9 = ["tooltipProps"], _excluded2 = ["mode", "tooltipContent", "content", "closeOnClickOutside", "appearTimeout", "exitTimeout"];
function ownKeys$a(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$a(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$a(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$a(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var appearTimeoutDefault = 400;
var exitTimeoutDefault = 200;
function withTooltip(a) {
  return function(b) {
    return React.forwardRef(function(c, d) {
      var e2 = c.tooltipProps, f2 = void 0 === e2 ? {} : e2, g = _objectWithoutProperties(c, _excluded$9), h2 = _objectSpread$a(_objectSpread$a({}, a), f2), i = h2.mode, j = void 0 === i ? "mouseover" : i, k2 = h2.tooltipContent, l2 = h2.content, m2 = h2.closeOnClickOutside, n2 = !(void 0 !== m2) || m2, o = h2.appearTimeout, p2 = void 0 === o ? appearTimeoutDefault : o, q2 = h2.exitTimeout, r2 = void 0 === q2 ? exitTimeoutDefault : q2, s = _objectWithoutProperties(h2, _excluded2), t2 = null !== k2 && void 0 !== k2 ? k2 : l2, u2 = useFlag(), v2 = _slicedToArray(u2, 2), w2 = v2[0], x2 = v2[1], y2 = reactExports.useRef(null), z2 = reactExports.useRef({ tooltip: false, anchor: false }), A2 = useMutableRef([g.onMouseEnter, g.onMouseLeave, s.onMouseEnter, s.onMouseLeave, g.onClick, j, n2]), B2 = useDebounce(reactExports.useCallback(function() {
        "mouseover" === A2.current[5] && (z2.current.anchor || z2.current.tooltip) && x2.on();
      }, []), p2), C2 = useDebounce(reactExports.useCallback(function() {
        "mouseover" !== A2.current[5] || z2.current.anchor || z2.current.tooltip || x2.off();
      }, []), r2), D2 = reactExports.useCallback(function(a2) {
        var b2, c2;
        z2.current.anchor = true, B2(), null === (b2 = (c2 = A2.current)[0]) || void 0 === b2 ? void 0 : b2.call(c2, a2);
      }, []), E2 = reactExports.useCallback(function(a2) {
        var b2, c2;
        z2.current.anchor = false, C2(), null === (b2 = (c2 = A2.current)[1]) || void 0 === b2 ? void 0 : b2.call(c2, a2);
      }, []), F2 = reactExports.useCallback(function(a2) {
        var b2, c2;
        z2.current.tooltip = true, B2(), null === (b2 = (c2 = A2.current)[2]) || void 0 === b2 ? void 0 : b2.call(c2, a2);
      }, []), G2 = reactExports.useCallback(function(a2) {
        var b2, c2;
        z2.current.tooltip = false, C2(), null === (b2 = (c2 = A2.current)[3]) || void 0 === b2 ? void 0 : b2.call(c2, a2);
      }, []), H2 = reactExports.useCallback(function() {
        "click" === A2.current[5] && A2.current[6] && x2.off();
      }, [j, n2]), I2 = reactExports.useCallback(function(a2) {
        var b2, c2;
        "click" === A2.current[5] && x2.toggle(), null === (b2 = (c2 = A2.current)[4]) || void 0 === b2 ? void 0 : b2.call(c2, a2);
      }, []);
      return React.createElement(React.Fragment, null, React.createElement(b, Object.assign({}, g, { onClick: I2, onMouseEnter: D2, onMouseLeave: E2, ref: useForkRef([y2, d]) })), React.createElement(Tooltip, Object.assign({}, s, { isOpen: w2 && !!t2, className: s.className, anchorRef: y2, onClickOutside: H2, onMouseEnter: F2, onMouseLeave: G2 }), t2));
    });
  };
}
var isNotNumber = function(a) {
  return "number" != typeof a;
};
var useRefs = function(a) {
  var b = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : [];
  return reactExports.useMemo(function() {
    if (isNotNumber(a)) {
      for (var b2 = {}, c = 0; c < a.length; c++) b2[a[c]] = reactExports.createRef();
      return b2;
    }
    return Array(a).fill(null).map(function() {
      return reactExports.createRef();
    });
  }, ["number" == typeof a ? a : a.join("-")].concat(_toConsumableArray(b)));
};
const cnMixAnimateIcon = cn$1("MixAnimateIcon");
const _excluded$8 = ["className", "activeIndex", "icons", "directions", "transition", "as", "size", "view", "style"];
function ownKeys$9(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$9(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$9(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$9(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
const cnAnimateIconBase = cn$1("AnimateIconBase");
const AnimateIconBase = forwardRefWithAs((a, b) => {
  const { className: c, activeIndex: h2 = 0, icons: d, directions: e2, transition: i = 200, as: j = "span", size: k2 = iconPropSizeDefault, view: f2, style: g } = a, l2 = _objectWithoutProperties(a, _excluded$8), m2 = useRefs(d.length), n2 = d[0], o = 1 === d.length ? React.createElement(n2, { size: k2, view: f2 }) : d.map((a2, b2) => React.createElement(Transition, { in: h2 === b2, key: cnAnimateIconBase({ key: b2 }), unmountOnExit: true, timeout: i, nodeRef: m2[b2] }, (c2) => React.createElement(a2, { ref: m2[b2], className: cnMixAnimateIcon({ animate: c2 }), size: k2, view: f2 })));
  return React.createElement(j, Object.assign({}, l2, { className: cnIcon({ size: k2 }, [cnAnimateIconBase(), c]), ref: b, style: _objectSpread$9(_objectSpread$9({}, g), {}, { "--animate-icon-transition": `${i}ms` }, "number" == typeof (null === e2 || void 0 === e2 ? void 0 : e2[h2]) && { "--animate-icon-direction": `rotate(${e2[h2]}deg)` }) }), o);
});
const IconRouteSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M9.625 7.268 11.347 9l1.987-7-6.957 2L8.22 5.853l-4.192 4.482a3.819 3.819 0 0 0 .08 5.294 3.762 3.762 0 0 0 5.467-.13l5.796-6.416a2.084 2.084 0 0 1 3.03-.072 2.116 2.116 0 0 1 0 2.978l-4.404 4.432a3.482 3.482 0 0 1 1.405 1.414l4.404-4.431a4.124 4.124 0 0 0 0-5.808 4.064 4.064 0 0 0-5.905.142l-5.796 6.415a1.783 1.783 0 0 1-2.592.062 1.81 1.81 0 0 1-.038-2.51l4.151-4.437Z" }), reactExports.createElement("path", { d: "M14.654 18.587a2.494 2.494 0 0 0-1.177-1.31 2.474 2.474 0 0 0-2.893.455c-.97.977-.97 2.56 0 3.536s2.543.976 3.513 0c.72-.725.906-1.784.557-2.681Z" }));
const IconRouteSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M5.873 4.957 6.932 6l1.523-5-5.078 1.5 1.06 1.043-1.498 1.474a3.124 3.124 0 0 0 0 4.466 3.243 3.243 0 0 0 4.536 0l2.92-2.875a.932.932 0 0 1 1.304 0c.36.355.36.93 0 1.284l-2.438 2.4a3.036 3.036 0 0 1 1.436 1.415l2.438-2.4a2.876 2.876 0 0 0 0-4.113 2.986 2.986 0 0 0-4.176 0l-2.92 2.875a1.189 1.189 0 0 1-1.663 0 1.145 1.145 0 0 1 0-1.638l1.497-1.474Z" }), reactExports.createElement("path", { d: "M9.91 12.482A2.02 2.02 0 0 0 7.947 11c-1.121 0-2.03.895-2.03 2s.909 2 2.03 2c1.122 0 2.032-.895 2.032-2 0-.18-.024-.353-.07-.518Z" }));
const IconRouteSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "m6.144 4.188-.71-.708L3.3 5.605a1 1 0 0 0 0 1.417c.393.392 1.03.392 1.422 0l2.845-2.834a2.016 2.016 0 0 1 2.844 0 1.999 1.999 0 0 1 0 2.834L9.183 8.246a2.521 2.521 0 0 0-.68-.74L9.7 6.314a1 1 0 0 0 0-1.417 1.008 1.008 0 0 0-1.422 0L5.433 7.73a2.016 2.016 0 0 1-2.844 0 1.999 1.999 0 0 1 0-2.834L4.722 2.77l-.71-.708L7.211 1 6.143 4.188Z" }), reactExports.createElement("path", { d: "M8.499 9.497c0-.83-.676-1.503-1.509-1.503-.833 0-1.508.673-1.508 1.503 0 .83.675 1.503 1.508 1.503S8.5 10.327 8.5 9.497Z" }));
const props$3 = { l: IconRouteSizeM, m: IconRouteSizeM, s: IconRouteSizeS, xs: IconRouteSizeXs, name: "IconRoute", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$3 = createSvg(props$3);
const IconRoute = createIconInner(props$3, svg$3);
const IconCheckSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.181 16.255 3.287 10.47 2 12.004l8.427 7.07 11.57-13.789L20.465 4 10.18 16.255z" }));
const IconCheckSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.799 10.417 3.124 7.08 1.779 8.56l5.215 4.737 7.739-9.223-1.532-1.286-6.402 7.63z" }));
const IconCheckSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.606 8.794 1.46 5.93l-.674.74 3.916 3.564 6.12-7.293-.767-.643-5.45 6.496z" }));
const props$2 = { l: IconCheckSizeM, m: IconCheckSizeM, s: IconCheckSizeS, xs: IconCheckSizeXs, name: "IconCheck", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$2 = createSvg(props$2);
const IconCheck = createIconInner(props$2, svg$2);
const IconAllDoneSizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "m8.037 11.094-1.38 1.38 5.657 6.156L22.92 7.525l-1.414-1.414-9.192 9.689-4.277-4.706zM1 12.475l1.414-1.414.042.041 5.611 6.051-1.41 1.477L1 12.475z" }), reactExports.createElement("path", { d: "m12.215 12.81 5.049-5.285-1.415-1.414-5.109 5.109 1.475 1.59z" }));
const IconAllDoneSizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M1.414 6.5 0 7.914l4.243 4.746 1.404-1.499L1.414 6.5zm10.324-1.838-3.35 3.574-1.453-1.6 3.389-3.389 1.414 1.415z" }), reactExports.createElement("path", { d: "m4.243 7.914 1.312-1.312 2.93 3.228L14.6 3.281l1.38 1.38-7.495 7.999-4.242-4.746z" }));
const IconAllDoneSizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("g", { clipPath: "url(#SvgIconAllDone_size_xs__a)" }, reactExports.createElement("path", { d: "m3.434 4.955-.606.606L6.364 9.6l5.657-6.16-.707-.708-4.95 5.448-2.93-3.225zM.673 4.888 0 5.56 3.535 9.6l.714-.772-3.576-3.94z" }), reactExports.createElement("path", { d: "m6.293 6.614 3.324-3.599-.708-.707-3.42 3.421.804.885z" })), reactExports.createElement("defs", null, reactExports.createElement("clipPath", { id: "SvgIconAllDone_size_xs__a" }, reactExports.createElement("path", { d: "M0 0h12v12H0z" }))));
const props$1 = { l: IconAllDoneSizeM, m: IconAllDoneSizeM, s: IconAllDoneSizeS, xs: IconAllDoneSizeXs, name: "IconAllDone", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg$1 = createSvg(props$1);
const IconAllDone = createIconInner(props$1, svg$1);
var useGlobalKeys = function(a) {
  var b = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : "keyup", c = reactExports.useRef({});
  reactExports.useEffect(function() {
    c.current = a;
  }, [a]), reactExports.useEffect(function() {
    var a2 = function(a3) {
      var b2 = c.current, d = b2[a3.code] || b2[a3.key];
      d && d(a3);
    };
    return document.addEventListener(b, a2), function() {
      document.removeEventListener(b, a2);
    };
  }, [b]);
};
var _excluded$7 = ["isOpen", "onClose", "onOpen", "hasOverlay", "onOverlayClick", "onClickOutside", "onEsc", "className", "width", "position", "children", "container", "refsForExcludeClickOutside", "rootClassName", "afterClose", "style"];
function ownKeys$8(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$8(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$8(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$8(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var modalPropWidth = ["auto"], modalPropWidthDefault = modalPropWidth[0], modalPropPosition = ["center", "top"], modalPropPositionDefault = modalPropPosition[0], cnModal = cn$2("Modal"), ContextConsumer = function(a) {
  var b = a.onClickOutside, c = a.children, d = a.ignoreClicksInsideRefs, e2 = usePortalContext(), f2 = e2.refs;
  return useClickOutside({ isActive: !!b, ignoreClicksInsideRefs: [].concat(_toConsumableArray(d || []), _toConsumableArray(f2 || [])), handler: b }), c;
};
var Modal = function(a) {
  var b = a.isOpen, c = a.onClose, d = a.onOpen, e2 = a.hasOverlay, f2 = void 0 === e2 || e2, g = a.onOverlayClick, h2 = a.onClickOutside, i = a.onEsc, j = a.className, k2 = a.width, l2 = void 0 === k2 ? modalPropWidthDefault : k2, m2 = a.position, n2 = void 0 === m2 ? modalPropPositionDefault : m2, o = a.children, p2 = a.container, q2 = void 0 === p2 ? window.document.body : p2, r2 = a.refsForExcludeClickOutside, s = a.rootClassName, t2 = a.afterClose, u2 = a.style, v2 = _objectWithoutProperties(a, _excluded$7), w2 = reactExports.useRef(null), x2 = reactExports.useRef(null), y2 = useTheme(), z2 = y2.theme;
  return reactExports.useEffect(function() {
    b ? null === d || void 0 === d ? void 0 : d() : null === c || void 0 === c ? void 0 : c();
  }, [b]), useGlobalKeys({ Escape: function Escape(a2) {
    return b && i && i(a2);
  } }), React.createElement(Transition, { in: b, unmountOnExit: true, nodeRef: x2, timeout: animateTimeout, onExited: t2 }, function(a2) {
    return React.createElement(PortalWithTheme, { preset: z2, container: q2, className: cnModal({ hasOverlay: f2 }, [s]), ref: x2, style: "number" == typeof (null === u2 || void 0 === u2 ? void 0 : u2.zIndex) ? { zIndex: u2.zIndex } : void 0 }, f2 && React.createElement("div", { className: cnModal("Overlay", { animate: a2 }), "aria-label": "Overlay" }), React.createElement("div", Object.assign({}, v2, { style: _objectSpread$8(_objectSpread$8({}, u2), {}, { zIndex: void 0 }), className: cnModal("Window", { width: l2, position: n2 }, [cnMixPopoverAnimate({ animate: a2 }), j, cnMixScrollBar()]), ref: w2 }), React.createElement(ContextConsumer, { onClickOutside: h2 || g, ignoreClicksInsideRefs: [].concat(_toConsumableArray(r2 || []), [w2]) }, o)));
  });
};
var classnames = { exports: {} };
var classnames_production_min = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true }), exports.classnames = function() {
    for (var e2 = [], t2 = 0; t2 < arguments.length; t2++) e2[t2] = arguments[t2];
    for (var r2 = "", n2 = /* @__PURE__ */ new Set(), s = 0, a = e2.join(" ").split(" "); s < a.length; s++) {
      var o = a[s];
      "" === o || n2.has(o) || (n2.add(o), r2.length > 0 && (r2 += " "), r2 += o);
    }
    return r2;
  };
})(classnames_production_min);
{
  classnames.exports = classnames_production_min;
}
var classnamesExports = classnames.exports;
var _excluded$6 = ["size", "view", "status", "form", "icon", "iconLeft", "iconRight", "minified", "label", "as", "title"];
function ownKeys$7(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$7(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$7(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$7(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var badgePropSizeDefault = "m";
var badgePropView = ["filled", "stroked"];
var badgePropViewDefault = badgePropView[0];
var badgePropStatus = ["normal", "success", "error", "warning", "system"];
var badgePropStatusDefault = badgePropStatus[0];
var badgePropForm = ["default", "round"];
var badgePropFormDefault = badgePropForm[0];
var cnBadge = cn$2("Badge");
var renderIcon$1 = function(a) {
  return a ? React.createElement(a, { size: "xs", className: cnBadge("Icon") }) : null;
};
var Badge = forwardRefWithAs(function(a, b) {
  var c = a.size, d = void 0 === c ? badgePropSizeDefault : c, e2 = a.view, f2 = void 0 === e2 ? badgePropViewDefault : e2, g = a.status, h2 = void 0 === g ? badgePropStatusDefault : g, i = a.form, j = void 0 === i ? badgePropFormDefault : i, k2 = a.icon, l2 = a.iconLeft, m2 = a.iconRight, n2 = a.minified, o = a.label, p2 = a.as, q2 = void 0 === p2 ? "div" : p2, r2 = a.title, s = _objectWithoutProperties(a, _excluded$6), t2 = useTheme(), u2 = t2.themeClassNames, v2 = "system" !== h2 && "filled" === f2 ? classnamesExports.classnames(a.className, u2.color.accent) : a.className, w2 = null !== l2 && void 0 !== l2 ? l2 : k2, x2 = 1 === [k2, l2, m2, o].filter(Boolean).length && 1 >= ((null === o || void 0 === o ? void 0 : o.length) || 0);
  return React.createElement(q2, Object.assign({}, s, { className: cnBadge(_objectSpread$7({ size: d, status: h2, minified: n2 }, !n2 && { view: f2, form: j, counter: x2 }), [v2]), ref: b, title: r2 || n2 && o }), !n2 && React.createElement(React.Fragment, null, renderIcon$1(w2), o, renderIcon$1(m2)));
});
var chipsPropSizeDefault = "m";
var chipsPropActiveViewDefault = "primary";
var _excluded$5 = ["as", "label", "size", "status", "activeView", "className", "interactive", "style", "active", "iconLeft", "iconRight", "onRightIconClick", "onKeyUp", "tabIndex", "disabled"];
var cnChip = cn$2("ChipsItem"), iconSizeMap = { l: "m", m: "s", s: "s", xs: "xs" };
var ChipsItem = forwardRefWithAs(function(a, b) {
  var c = a.as, d = void 0 === c ? "span" : c, e2 = a.label, f2 = a.size, g = void 0 === f2 ? chipsPropSizeDefault : f2, h2 = a.status, i = a.activeView, j = void 0 === i ? chipsPropActiveViewDefault : i, k2 = a.className, l2 = a.interactive;
  a.style;
  var n2 = a.active, o = a.iconLeft, p2 = a.iconRight, q2 = a.onRightIconClick, r2 = a.onKeyUp, s = a.tabIndex, t2 = a.disabled, u2 = void 0 !== t2 && t2, v2 = _objectWithoutProperties(a, _excluded$5), w2 = reactExports.useRef(null), x2 = reactExports.useRef(null), y2 = !u2 && l2, z2 = useKeys({ keys: { Enter: function Enter() {
    if (x2 && q2) {
      var a2;
      null === (a2 = x2.current) || void 0 === a2 ? void 0 : a2.focus();
    } else {
      var b2;
      null === (b2 = w2.current) || void 0 === b2 ? void 0 : b2.click();
    }
  }, Escape: function Escape() {
    if (x2 && q2) {
      var a2;
      null === (a2 = w2.current) || void 0 === a2 ? void 0 : a2.focus();
    }
  }, Space: function Space() {
    var a2;
    null === (a2 = w2.current) || void 0 === a2 ? void 0 : a2.click();
  } }, onEvent: r2, isActive: !!y2 });
  return React.createElement(d, Object.assign({}, v2, { disabled: u2, className: cnChip({ size: g, interactive: y2, activeView: j, active: n2, disabled: u2, status: !!h2 }, [y2 ? cnMixFocus() : void 0, k2]), ref: useForkRef([w2, b]), onKeyUp: z2, tabIndex: y2 ? s || 0 : void 0, role: y2 ? "button" : void 0 }), h2 && React.createElement(Badge, { status: h2, size: iconSizeMap[g], minified: true }), !h2 && o && React.createElement(o, { size: iconSizeMap[g] }), e2, p2 && React.createElement(p2, Object.assign({ size: iconSizeMap[g] }, q2 && !u2 ? { as: "button", role: "button", type: "button", onClick: q2, className: cnChip("IconButton", [cnMixFocus()]), ref: x2, tabIndex: -1 } : {})));
});
function ownKeys$6(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$6(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$6(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$6(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var defaultGetItemIconRight = function(a) {
  return a.iconRight;
};
var defaultGetItemActive = function(a) {
  return a.active;
};
var defaultGetItemDisabled = function(a) {
  return a.disabled;
};
var defaultGetItemIconLeft = function(a) {
  return a.iconLeft;
};
var defaultGetItemStatus = function(a) {
  return a.status;
};
var defaultGetItemLabel = function(a) {
  return a.label;
};
var defaultGetItemAs = function(a) {
  return a.as;
};
var defaultGetItemAttributes = function(a) {
  return a.attributes;
};
var defaultGetItemRef = function(a) {
  return a.ref;
};
function withDefaultGetters(a) {
  return _objectSpread$6(_objectSpread$6({}, a), {}, { getItemLabel: a.getItemLabel || defaultGetItemLabel, getItemIconRight: a.getItemIconRight || defaultGetItemIconRight, getItemIconLeft: a.getItemIconLeft || defaultGetItemIconLeft, getItemStatus: a.getItemStatus || defaultGetItemStatus, getItemRef: a.getItemRef || defaultGetItemRef, getItemAs: a.getItemAs || defaultGetItemAs, getItemAttributes: a.getItemAttributes || defaultGetItemAttributes, getItemActive: a.getItemActive || defaultGetItemActive, getItemDisabled: a.getItemDisabled || defaultGetItemDisabled });
}
var _excluded$4 = ["items", "getItemActive", "getItemDisabled", "getItemAs", "getItemAttributes", "getItemIconLeft", "getItemIconRight", "getItemLabel", "getItemRef", "getItemStatus", "className", "interactive", "onItemClick", "onItemRightIconClick", "activeView", "size", "disabled"];
var cnChips = cn$2("Chips"), ChipsRender = function(a, b) {
  var c = withDefaultGetters(a), d = c.items, e2 = c.getItemActive, f2 = c.getItemDisabled, g = c.getItemAs, h2 = c.getItemAttributes, i = c.getItemIconLeft, j = c.getItemIconRight, k2 = c.getItemLabel, l2 = c.getItemRef, m2 = c.getItemStatus, n2 = c.className, o = c.interactive, p2 = c.onItemClick, q2 = c.onItemRightIconClick, r2 = c.activeView, s = c.size, t2 = c.disabled, u2 = _objectWithoutProperties(c, _excluded$4);
  return React.createElement("div", Object.assign({}, u2, { ref: b, className: cnChips(null, [n2]) }), d.map(function(a2, b2) {
    var c2 = f2(a2) || void 0 !== t2 && t2;
    return React.createElement(ChipsItem, Object.assign({}, h2(a2), { key: b2, size: s, activeView: r2, onClick: p2 && !c2 ? function(b3) {
      return p2(a2, { e: b3 });
    } : void 0, onRightIconClick: q2 && !c2 ? function(b3) {
      return q2(a2, { e: b3 });
    } : void 0, label: k2(a2), as: g(a2), active: e2(a2), iconLeft: i(a2), iconRight: j(a2), ref: l2(a2), status: m2(a2), interactive: !c2 && o, disabled: c2 }));
  }));
};
var Chips = reactExports.forwardRef(ChipsRender);
var _excluded$3 = ["value", "onChange", "multiple", "getItemKey", "getItemLabel", "disabled"];
var getUndefined = function() {
};
var getItemKeyDefault = function(a) {
  return a.key;
};
var ChipsChoiceRender = function(a, b) {
  var c = a.value, d = a.onChange, e2 = a.multiple, f2 = a.getItemKey, g = void 0 === f2 ? getItemKeyDefault : f2, h2 = a.getItemLabel, i = void 0 === h2 ? defaultGetItemLabel : h2, j = a.disabled, k2 = void 0 !== j && j, l2 = _objectWithoutProperties(a, _excluded$3), m2 = useChoiceGroup({ getKey: function getKey(a2) {
    var b2 = g(a2);
    return typeof b2 !== void 0 && b2 ? b2 : i(a2);
  }, value: c, callBack: d, multiple: e2 }), n2 = m2.getOnChange, o = m2.getChecked;
  return React.createElement(Chips, Object.assign({}, l2, { ref: b, onItemRightIconClick: getUndefined, onItemClick: function onItemClick(a2, b2) {
    var c2 = b2.e;
    return !k2 && n2(a2)(c2);
  }, getItemIconRight: getUndefined, getItemAttributes: getUndefined, getItemActive: o, interactive: !k2, disabled: k2 }));
};
reactExports.forwardRef(ChipsChoiceRender);
const Validator = ({ leader }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 w-full h-full flex flex-col flex-nowrap justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold", children: "Validator Name:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        className: "hover:underline",
        href: `https://www.validators.app/validators/${leader}?locale=en&network=mainnet`,
        target: "_blank",
        children: leader
      }
    )
  ] });
};
const IconCopySizeM = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M8 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1.001 1.001 0 0 1-1 1h-3V7a1 1 0 0 0-1-1H8V3z" }), reactExports.createElement("path", { d: "M3 8a1 1 0 0 0-1 1v12a.996.996 0 0 0 1 1h12a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" }));
const IconCopySizeS = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M1 6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6z" }), reactExports.createElement("path", { d: "M6 1a1 1 0 0 0-1 1v1h7a1 1 0 0 1 1 1v7h1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }));
const IconCopySizeXs = (a) => reactExports.createElement("svg", Object.assign({ viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" }, a), reactExports.createElement("path", { d: "M4 2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H9V4a1 1 0 0 0-1-1H4V2z" }), reactExports.createElement("path", { d: "M2 4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" }));
const props = { l: IconCopySizeM, m: IconCopySizeM, s: IconCopySizeS, xs: IconCopySizeXs, name: "IconCopy", renderType: { l: "use", m: "use", s: "use", xs: "use" }, color: "mono" };
const svg = createSvg(props);
const IconCopy = createIconInner(props, svg);
const statuses = ["processed", "confirmed", "finalized"];
const colors = ["ghost", "primary", "success"];
const icons = [IconRoute, IconCheck, IconAllDone];
const AnimateIconBaseIcons = ({ value }) => {
  const idx = statuses.findIndex((elt) => elt === value);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AnimateIconBase,
    {
      className: "shrink-0",
      view: colors[idx] || "alert",
      icons,
      activeIndex: icons[idx] ? idx : 0
    }
  );
};
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.textContent = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
const SlotWithCopy = ({ value }) => {
  const [isTouched, setIsTouched] = reactExports.useState(false);
  const timeoutId = reactExports.useRef(0);
  const onCopyHandler = (e2) => {
    if (isTouched) return;
    copyToClipboard(`${value}`);
    setIsTouched(true);
    timeoutId.current = +setTimeout(() => setIsTouched(false), 2e3);
    e2.preventDefault();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: `https://explorer.solana.com/block/${value}`,
      target: "_blank",
      className: "hover:underline items-center flex-nowrap flex gap-1",
      onClick: onCopyHandler,
      children: [
        value.toLocaleString("en-US"),
        isTouched ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: "xs", view: "success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconCopy, { size: "xs", view: "secondary" })
      ]
    }
  );
};
const Slots = ({ items }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3", children: items.map((elt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "flex flex-nowrap justify-between gap-1 items-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimateIconBaseIcons, { value: elt.commitment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlotWithCopy, { value: elt.slot })
      ]
    },
    elt.slot
  )) });
};
const ComputeUnits = ({ items }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 min-w-0", children: items.map(({
    amount,
    percent
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex justify-end text-right gap-1 shrink-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { font: "mono", children: amount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { font: "mono", children: [
          "(",
          percent,
          "%)"
        ] })
      ]
    },
    amount
  )) });
};
const SimpleCell = ({ list }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 text-right", children: list.map((elt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { font: "mono", children: elt }, idx)) });
};
function formatDuration(seconds) {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  seconds |= 0;
  return `${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`;
}
const TextWithTooltip = withTooltip({ content: "Тултип сверху" })(Text);
const Epoch = () => {
  const {
    slots
  } = useWebSocketStore();
  const number = reactExports.useMemo(() => {
    const [lastSlot] = slots.slice(-1);
    if (lastSlot) {
      return lastSlot.slot / 432e3 | 0;
    }
    return 0;
  }, [slots]);
  const percent = reactExports.useMemo(() => {
    const [lastSlot] = slots.slice(-1);
    if (lastSlot) {
      return ((lastSlot.slot - number * 432e3) / 432e3 * 100).toFixed(3) + "%";
    }
    return "";
  }, [slots, number]);
  const humanCountdown = reactExports.useMemo(() => {
    const [lastSlot] = slots.slice(-1);
    if (lastSlot) {
      const rtf = new Intl.RelativeTimeFormat("en", {
        localeMatcher: "best fit",
        // other values: "lookup"
        numeric: "always",
        // other values: "auto"
        style: "long"
        // other values: "short" or "narrow"
      });
      const secs = (432e3 - lastSlot.slot % 432e3) * 0.4;
      if (secs < 90) return rtf.format(secs, "seconds");
      if (secs < 90 * 60) return rtf.format(secs / 60 | 0, "minutes");
      if (secs < 1.5 * 86400) return rtf.format(secs / 3600 | 0, "hours");
      return rtf.format(secs / 86400 | 0, "days");
    }
    return "...";
  }, [slots]);
  const tooltipForHumanCountdown = reactExports.useMemo(() => {
    const [lastSlot] = slots.slice(-1);
    if (lastSlot) {
      const secs = (432e3 - lastSlot.slot % 432e3) * 0.471;
      return formatDuration(secs) + ". Based on slot duration equals 400ms.";
    }
    return "...";
  }, [slots]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-col justify-start items-end gap-1 inline-flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch justify-between items-end inline-flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-end gap-1 flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[#002033] text-sm font-normal font-['Inter'] leading-[21px]", children: "Epoch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center text-[#09d288] text-xs font-normal font-['Inter'] leading-[18px]",
            children: number || "..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextWithTooltip, { tooltipProps: {
        content: tooltipForHumanCountdown,
        direction: "downCenter"
      }, children: humanCountdown }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[200px] h-[3px] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[3px] left-0 top-0 absolute bg-[#004166]/20 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: percent }, className: "h-[3px] left-0 top-0 absolute bg-[#09d288] rounded" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#002033]/60 text-[10px] font-normal font-['Inter'] leading-[15px]", children: percent })
  ] });
};
const IconFeed$1 = ({ className = "" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className,
      width: "20",
      height: "21",
      viewBox: "0 0 20 21",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("g", { clipPath: "url(#clip0_5834_12840)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M5.45455 17.7727C5.45455 18.5303 5.18939 19.1742 4.65909 19.7045C4.12879 20.2348 3.48485 20.5 2.72727 20.5C1.9697 20.5 1.32576 20.2348 0.795455 19.7045C0.265152 19.1742 0 18.5303 0 17.7727C0 17.0152 0.265152 16.3712 0.795455 15.8409C1.32576 15.3106 1.9697 15.0455 2.72727 15.0455C3.48485 15.0455 4.12879 15.3106 4.65909 15.8409C5.18939 16.3712 5.45455 17.0152 5.45455 17.7727ZM12.7273 19.5199C12.7462 19.785 12.6657 20.0123 12.4858 20.2017C12.3153 20.4006 12.0928 20.5 11.8182 20.5H9.90057C9.66383 20.5 9.46023 20.4219 9.28977 20.2656C9.11932 20.1094 9.02462 19.9129 9.00568 19.6761C8.79735 17.5076 7.92377 15.6539 6.38494 14.1151C4.84612 12.5762 2.99242 11.7027 0.823864 11.4943C0.587121 11.4754 0.390625 11.3807 0.234375 11.2102C0.078125 11.0398 0 10.8362 0 10.5994V8.68182C0 8.4072 0.0994318 8.18466 0.298295 8.0142C0.45928 7.85322 0.662879 7.77273 0.909091 7.77273H0.980114C2.49527 7.89583 3.94413 8.27699 5.3267 8.91619C6.70928 9.5554 7.93561 10.4148 9.00568 11.4943C10.0852 12.5644 10.9446 13.7907 11.5838 15.1733C12.223 16.5559 12.6042 18.0047 12.7273 19.5199ZM20 19.5483C20.0189 19.804 19.9337 20.0265 19.7443 20.2159C19.5739 20.4053 19.3561 20.5 19.0909 20.5H17.0597C16.8134 20.5 16.6027 20.4171 16.4276 20.2514C16.2524 20.0857 16.16 19.8845 16.1506 19.6477C16.0369 17.6117 15.5587 15.6776 14.7159 13.8452C13.8731 12.0128 12.777 10.4219 11.4276 9.07244C10.0781 7.72301 8.48722 6.62689 6.65483 5.78409C4.82244 4.94129 2.88826 4.45833 0.852273 4.33523C0.61553 4.32576 0.414299 4.23343 0.24858 4.05824C0.0828598 3.88305 0 3.67708 0 3.44034V1.40909C0 1.14394 0.094697 0.926136 0.284091 0.755682C0.454545 0.585227 0.662879 0.5 0.909091 0.5H0.951705C3.43277 0.623106 5.80729 1.19129 8.07528 2.20455C10.3433 3.2178 12.358 4.60985 14.1193 6.38068C15.8902 8.14205 17.2822 10.1567 18.2955 12.4247C19.3087 14.6927 19.8769 17.0672 20 19.5483Z",
            fill: "#0AD289"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "clip0_5834_12840", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "20", height: "20", fill: "white", transform: "translate(0 0.5)" }) }) })
      ]
    }
  );
};
const ButtonWithTooltip$1 = withTooltip({ content: "Тултип сверху" })(Button);
const InfoButton$1 = (props2) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ButtonWithTooltip$1,
    {
      as: "span",
      iconSize: "s",
      onlyIcon: true,
      view: "clear",
      iconRight: IconInfoCircle,
      tooltipProps: props2
    }
  );
};
withTooltip({ content: "Тултип сверху" })(Text);
function buildTransactions$1(slots) {
  const first = slots.map((elt) => elt.totalTransactions - elt.totalTransactionsVote);
  const maxFirst = `${Math.max(...first)}`.length;
  const second = slots.map((elt) => elt.totalTransactions);
  const maxSecond = `${Math.max(...second)}`.length;
  const aligned = slots.map((_, idx) => {
    const colOne = `${first[idx]}`.padStart(maxFirst, " ");
    const colSecond = `${second[idx]}`.padStart(maxSecond, " ");
    return colOne + " / " + colSecond;
  });
  return aligned;
}
const percentFromStore$1 = (num) => {
  if (num) {
    const value = num / 100;
    return value;
  }
  return 0;
};
const CustomTable$1 = ({
  onEditFee,
  onEditKeys
}) => {
  const slots = useWebSocketStore((state) => state.slots);
  const disconnect = useWebSocketStore((state) => state.disconnect);
  const connect = useWebSocketStore((state) => state.connect);
  const percents = useWebSocketStore((state) => state.percents);
  const readonlyKeys = useWebSocketStore((state) => state.readonlyKeys);
  const readwriteKeys = useWebSocketStore((state) => state.readwriteKeys);
  const memoFee0 = reactExports.useCallback(() => onEditFee(0), [onEditFee]);
  const memoFee1 = reactExports.useCallback(() => onEditFee(1), [onEditFee]);
  const rowsFromSocket = reactExports.useMemo(() => {
    var _a2, _b2, _c2;
    const groupByLeader = {};
    let slice2 = [];
    let currentLeader = ((_a2 = slots[0]) == null ? void 0 : _a2.leader) || "";
    for (let i = 0; i < slots.length; i++) {
      if (currentLeader === ((_b2 = slots[i]) == null ? void 0 : _b2.leader) && slice2.length < 4) {
        slice2.push(slots[i]);
      } else {
        groupByLeader[i] = {
          slots: slice2.reverse(),
          leader: currentLeader
        };
        slice2 = [slots[i]];
        currentLeader = ((_c2 = slots[i]) == null ? void 0 : _c2.leader) || "";
      }
    }
    if (slice2.length > 0) groupByLeader["last"] = {
      slots: slice2.reverse(),
      leader: currentLeader
    };
    return Object.entries(groupByLeader).map(([
      _,
      {
        slots: slots2,
        leader
      }
    ]) => {
      var _a3;
      return {
        id: `${leader}-${((_a3 = slots2[0]) == null ? void 0 : _a3.slot) || "empty"}`,
        leader,
        slots: slots2.map((elt) => ({
          commitment: elt.commitment,
          slot: elt.slot
        })),
        transactions: buildTransactions$1(slots2),
        computeUnits: slots2.map((elt) => ({
          amount: elt.totalUnitsConsumed.toLocaleString("en-US"),
          percent: (elt.totalUnitsConsumed / 48e6 * 100).toFixed(2)
        })),
        earnedSol: slots2.map((elt) => elt.totalFee),
        averageFee: slots2.map((elt) => elt.feeAverage.toFixed(2)),
        fee0: slots2.map((elt) => elt.feeLevels[0] || 0),
        fee1: slots2.map((elt) => elt.feeLevels[1] || 0),
        add: []
      };
    });
  }, [slots]);
  const isTransactionsApplied = reactExports.useMemo(() => {
    return !!readwriteKeys.length || !!readonlyKeys.length;
  }, [readwriteKeys.length, readonlyKeys.length]);
  const columns = [
    {
      width: "auto",
      title: "Validator",
      accessor: "leader",
      renderCell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(Validator, { leader: row.leader })
    },
    {
      width: "auto",
      align: "right",
      title: "Slots",
      accessor: "slots",
      renderCell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(Slots, { items: row.slots })
    },
    {
      title: "Transactions",
      accessor: "transactions",
      align: "right",
      control: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { style: {
        "--button-color": isTransactionsApplied ? "red" : void 0,
        "--button-color-hover": isTransactionsApplied ? "darkred" : void 0
      }, view: "clear", size: "s", onlyIcon: true, iconRight: IconFunnel, onClick: onEditKeys }),
      renderCell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.transactions.map((elt) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { font: "mono", className: "whitespace-pre", children: elt })) })
    },
    {
      title: "Compute Units",
      width: "auto",
      align: "right",
      accessor: "computeUnits",
      control: ({ column }) => /* @__PURE__ */ jsxRuntimeExports.jsx(InfoButton$1, { content: column.title, direction: "downCenter" }),
      renderCell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComputeUnits, { items: row.computeUnits })
    },
    {
      title: "Earned SOL",
      align: "right",
      accessor: "earnedSol",
      control: ({ column }) => /* @__PURE__ */ jsxRuntimeExports.jsx(InfoButton$1, { content: column.title, direction: "downCenter" }),
      renderCell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCell, { list: row.earnedSol })
    },
    {
      title: "Average Fee",
      accessor: "averageFee",
      align: "right",
      control: ({ column }) => /* @__PURE__ */ jsxRuntimeExports.jsx(InfoButton$1, { content: column.title, direction: "downCenter" }),
      renderCell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCell, { list: row.averageFee })
    },
    {
      title: "Fee p" + percentFromStore$1(percents[0]),
      accessor: "fee0",
      align: "right",
      control: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { as: "span", iconSize: "s", onlyIcon: true, view: "clear", iconRight: IconEdit, onClick: memoFee0 }),
      renderCell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCell, { list: row.fee0 })
    },
    {
      title: "Fee p" + percentFromStore$1(percents[1]),
      accessor: "fee1",
      align: "right",
      control: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { as: "span", iconSize: "s", onlyIcon: true, view: "clear", iconRight: IconEdit, onClick: memoFee1 }),
      renderCell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCell, { list: row.fee1 })
    },
    {
      title: "Add",
      accessor: "add",
      control: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { as: "span", iconSize: "s", onlyIcon: true, view: "clear", iconRight: IconAdd })
    }
  ];
  reactExports.useEffect(() => {
    console.log("effect with connect!");
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  if (!slots.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "w-full text-center text-xl font-bold",
      children: "Loading..."
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Table$1, { className: "w-full2", columns, rows: [...rowsFromSocket].reverse() });
};
const modalFeeItems$1 = [50, 60, 70, 80, 90].map((elt) => ({ label: `${elt}` }));
const ModalFee$1 = ({
  isVisible,
  onClose,
  editedFeeIdx
}) => {
  const fees = useWebSocketStore((state) => state.percents);
  const updatePercents = useWebSocketStore((state) => state.updatePercents);
  useWebSocketStore((state) => state.updateSubscription);
  const {
    disconnect,
    connect
  } = useWebSocketStore(({
    disconnect: disconnect2,
    connect: connect2
  }) => ({
    disconnect: disconnect2,
    connect: connect2
  }));
  const [feeValue, setFeeValue] = reactExports.useState("");
  reactExports.useLayoutEffect(() => {
    if (isVisible) {
      const value = percentFromStore$1(fees[editedFeeIdx] || 0);
      setFeeValue(`${value}`);
    }
  }, [editedFeeIdx, isVisible]);
  const onClickButton = () => {
    const newPercents = fees.map((elt, idx) => {
      if (idx === editedFeeIdx) return +(+feeValue * 100).toFixed(2);
      return elt;
    });
    updatePercents(newPercents);
    disconnect();
    connect();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      isOpen: isVisible,
      hasOverlay: true,
      onClickOutside: onClose,
      onEsc: onClose,
      className: "flex flex-col gap-4 p-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "h1", size: "2xl", view: "primary", children: "Fee percentile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextField,
            {
              onChange: (value) => setFeeValue(value || ""),
              value: feeValue,
              type: "number",
              placeholder: "1-100",
              incrementButtons: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chips, { interactive: true, items: modalFeeItems$1, onItemClick: (item) => setFeeValue(item.label), size: "xs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            view: "primary",
            label: "Done",
            width: "full",
            onClick: onClickButton
          }
        )
      ]
    }
  );
};
const ModalFilter$1 = ({
  isVisible,
  onClose
}) => {
  const [rwValue, setRwValue] = reactExports.useState("");
  const [roValue, setRoValue] = reactExports.useState("");
  const savedReadonlyKeys = useWebSocketStore((state) => state.readonlyKeys);
  const savedReadwriteKeys = useWebSocketStore((state) => state.readwriteKeys);
  const updateRo = useWebSocketStore((state) => state.updateReadonlyKeys);
  const updateRw = useWebSocketStore((state) => state.updateReadwriteKeys);
  useWebSocketStore((state) => state.updateSubscription);
  const {
    disconnect,
    connect
  } = useWebSocketStore(({
    disconnect: disconnect2,
    connect: connect2
  }) => ({
    disconnect: disconnect2,
    connect: connect2
  }));
  const onClickButton = () => {
    updateRo(roValue.split("\n"));
    updateRw(rwValue.split("\n"));
    disconnect();
    connect();
    onClose();
  };
  reactExports.useLayoutEffect(() => {
    if (isVisible) {
      setRoValue(savedReadonlyKeys.join("\n"));
      setRwValue(savedReadwriteKeys.join("\n"));
    }
  }, [isVisible]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      isOpen: isVisible,
      hasOverlay: true,
      onClickOutside: onClose,
      onEsc: onClose,
      className: "flex flex-col gap-4 p-6 min-w-[50%]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "h1", size: "2xl", view: "primary", children: "Filter transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            className: "min-w-80 custom-nowrap-textarea",
            label: "Read-write pubkeys",
            labelPosition: "top",
            type: "textarea",
            onChange: (value) => setRwValue(value || ""),
            value: rwValue,
            placeholder: "Pubkeys",
            minRows: 3,
            maxRows: 10
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            className: "min-w-80 custom-nowrap-textarea",
            label: "Read-only pubkeys",
            labelPosition: "top",
            type: "textarea",
            onChange: (value) => setRoValue(value || ""),
            value: roValue,
            placeholder: "Pubkeys",
            minRows: 3,
            maxRows: 10
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            view: "primary",
            label: "Done",
            width: "full",
            onClick: onClickButton
          }
        )
      ]
    }
  );
};
const HomeOld = () => {
  const [filterModalShown, filterModalControls] = useFlag(false);
  const [editedFeeIdx, setEditedFeeIdx] = reactExports.useState(-1);
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "absolute top-2 left-2 rounded bg-amber-300", onClick: () => navigate({ to: "/" }), children: [
      "click to ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "NEW" }),
      " version"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-20 py-5 bg-white w-full flex-col justify-start items-start gap-8 inline-flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch justify-between items-center inline-flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-center gap-2 flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconFeed$1, { className: "w-5 h-5 relative" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[#002033] text-2xl font-semibold font-['Inter'] leading-[31.20px]", children: "Solfees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[#002033]/60 text-sm font-normal font-['Inter'] leading-[21px]", children: "Solana Fees Tracker" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Epoch, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTable$1, { onEditFee: setEditedFeeIdx, onEditKeys: filterModalControls.on }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFee$1, { editedFeeIdx, isVisible: editedFeeIdx >= 0, onClose: () => setEditedFeeIdx(-1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFilter$1, { isVisible: filterModalShown, onClose: filterModalControls.off })
    ] })
  ] });
};
const Route$1 = createFileRoute("/homeOld")({
  component: HomeOld
});
var defaultItemsCalculationCount = 5;
var arraysIsEq = function(a, b) {
  return a.join("-") === b.join("-");
};
var useScroll = function(a, b, c) {
  reactExports.useEffect(function() {
    if (c) {
      var d;
      null === (d = a.current) || void 0 === d ? void 0 : d.addEventListener("scroll", b);
    }
    return function() {
      var c2;
      null === (c2 = a.current) || void 0 === c2 ? void 0 : c2.removeEventListener("scroll", b);
    };
  }, [a.current, b, c]);
};
var getElementHeight = function(a) {
  return getElementSize(a).height;
};
var roundPositionByGap = function(a, b) {
  return 0 >= a ? 0 : Math.ceil(a / b) * b;
};
var getVisiblePosition = function(a, b, c) {
  var d = b > c * defaultItemsCalculationCount ? 1.5 * b : c * defaultItemsCalculationCount, e2 = [Math.ceil(roundPositionByGap(a - d, b)), Math.ceil(roundPositionByGap(0 === a ? d : a + d, b))];
  return e2;
};
var calculateSavedSizes = function(a, b) {
  for (var c, d = _toConsumableArray(a), e2 = 0; e2 < b.length; e2++) c = b[e2], 0 < c && (d[e2] = c);
  return d;
};
var useCalculateVisiblePosition = function(a, b, c) {
  var d = useMutableRef(Math.max.apply(null, c));
  return reactExports.useCallback(function() {
    if (a) {
      var c2 = getVisiblePosition(a.scrollTop, getElementHeight(a), d.current);
      b(function(a2) {
        return c2[0] !== a2[0] || c2[1] !== a2[1] ? c2 : a2;
      });
    }
  }, [a, b]);
};
var addCount = function(a, b, c) {
  for (var d = c.slice(-50), e2 = d.reduce(function(c2, a2) {
    return c2 + a2;
  }, 0) / d.length, f2 = defaultItemsCalculationCount; b[1] >= a[1] + f2 * e2; ) f2 += defaultItemsCalculationCount;
  return f2;
};
var calculateBounds = function(a, b, c, d) {
  for (var e2 = [0, 0], f2 = [0, 0], g = 0; g < a.length; g++) c[0] > e2[0] && (e2[0] += a[g], f2[0] = g + 1), c[1] > e2[1] && (e2[1] += a[g], f2[1] = g + 1);
  return 0 === f2[0] && 0 === f2[1] && (f2[1] = defaultItemsCalculationCount), b.length !== a.length && (f2[1] += addCount(e2, c, a)), f2[1] > d && (f2[1] = d), [e2, f2];
};
var useVirtualScroll = function(a) {
  var b = a.length, c = a.onScrollToBottom, d = a.isActive, e2 = void 0 !== d && d, f2 = reactExports.useState([0, 0]), g = _slicedToArray(f2, 2), h2 = g[0], i = g[1], j = reactExports.useState([[0, 0], [0, e2 ? defaultItemsCalculationCount : b]]), k2 = _slicedToArray(j, 2), l2 = k2[0], m2 = k2[1], n2 = useRefs(b, h2), o = reactExports.useRef(null), p2 = useResizeObserved(n2, getElementHeight), q2 = reactExports.useRef(calculateSavedSizes([], p2)), r2 = useMutableRef(c), s = useResizeObserved(reactExports.useMemo(function() {
    return [o];
  }, [o]), getElementHeight), t2 = _slicedToArray(s, 1), u2 = t2[0], v2 = useCalculateVisiblePosition(o.current, i, p2);
  return useScroll(o, v2, e2), reactExports.useEffect(function() {
    e2 && v2();
  }, [u2, e2]), reactExports.useEffect(function() {
    e2 ? (q2.current = calculateSavedSizes(q2.current, p2), m2(calculateBounds(q2.current, p2, h2, b))) : m2([[0, 0], [0, b]]);
  }, [].concat(_toConsumableArray(h2), [p2, b, e2])), reactExports.useEffect(function() {
    e2 && r2.current && l2[1][1] + 1 >= b && r2.current(b);
  }, [l2[1][1], e2]), reactExports.useEffect(function() {
    var a2 = [0, 0], c2 = [[0, 0], [0, e2 ? defaultItemsCalculationCount : b]];
    m2(function(a3) {
      return arraysIsEq(a3[0], c2[0]) && arraysIsEq(a3[1], c2[1]) ? a3 : c2;
    }), i(function(b2) {
      return arraysIsEq(b2, a2) ? b2 : a2;
    });
  }, [e2]), { listRefs: n2, scrollElementRef: o, slice: l2[1], spaceTop: l2[0][0] };
};
var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reIsUint = /^(?:0|[1-9]\d*)$/, MAX_MEMOIZE_SIZE = 500, toString = Object.prototype.toString;
function memoize(a, b) {
  if ("function" != typeof a || null != b && "function" != typeof b) throw new TypeError("Expected a function");
  var c = function() {
    for (var d = arguments.length, e2 = Array(d), f2 = 0; f2 < d; f2++) e2[f2] = arguments[f2];
    var g = b ? b.apply(this, e2) : e2[0], h2 = c.cache;
    if (h2.has(g)) return h2.get(g);
    var i = a.apply(this, e2);
    return c.cache = h2.set(g, i) || h2, i;
  };
  return c.cache = new (memoize.Cache || Map)(), c;
}
memoize.Cache = Map;
function memoizeCapped(a) {
  var b = memoize(a, function(a2) {
    var c = b.cache;
    return c.size === MAX_MEMOIZE_SIZE && c.clear(), a2;
  });
  return b;
}
var charCodeOfDot = 46, reEscapeChar = /\\(\\)?/g, rePropName = /[^.[\]]+|\[(?:([^"'][^[]*)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, stringToPath = memoizeCapped(function(a) {
  var b = [];
  return a.charCodeAt(0) === charCodeOfDot && b.push(""), a.replace(rePropName, function(a2, c, d, e2) {
    var f2 = a2;
    d ? f2 = e2.replace(reEscapeChar, "$1") : c && (f2 = c.trim()), b.push(f2);
  }), b;
});
function getTag(a) {
  return null == a ? void 0 === a ? "[object Undefined]" : "[object Null]" : toString.call(a);
}
function isSymbol(a) {
  var b = typeof a;
  return "symbol" == b || "object" === b && null != a && "[object Symbol]" === getTag(a);
}
function isKey(a, b) {
  if (Array.isArray(a)) return false;
  var c = typeof a;
  return !!("number" == c || "boolean" === c || null == a || isSymbol(a)) || reIsPlainProp.test(a) || !reIsDeepProp.test(a) || null != b && a in Object(b);
}
function castPath(a, b) {
  return Array.isArray(a) ? a : isKey(a, b) ? [a] : stringToPath(a);
}
function toKey(a) {
  if ("string" == typeof a || isSymbol(a)) return a;
  var b = "".concat(a);
  return "0" === b && 1 / a == -INFINITY ? "-0" : b;
}
function baseGet(a, b) {
  b = castPath(b, a);
  for (var c = 0, d = b, e2 = d.length; null != a && c < e2; ) a = a[toKey(b[c++])];
  return c && c === e2 ? a : void 0;
}
var get$1 = function(a, b, c) {
  var d = null == a ? void 0 : baseGet(a, b);
  return d === void 0 ? c : d;
};
function isObject(a) {
  var b = typeof a;
  return null != a && ("object" === b || "function" === b);
}
function isIndex(a, b) {
  var c = typeof a;
  return b = null == b ? MAX_SAFE_INTEGER : b, !!b && ("number" === c || "symbol" !== c && reIsUint.test(a)) && -1 < a && 0 == a % 1 && a < b;
}
function baseAssignValue(a, b, c) {
  "__proto__" === b ? Object.defineProperty(a, b, { configurable: true, enumerable: true, value: c, writable: true }) : a[b] = c;
}
function eq(a, b) {
  return a === b || a !== a && b !== b;
}
function assignValue(a, b, c) {
  var d = a[b];
  hasOwnProperty.call(a, b) && eq(d, c) ? c === void 0 && !(b in a) && baseAssignValue(a, b, c) : (0 !== c || 1 / c == 1 / d) && baseAssignValue(a, b, c);
}
function baseSet(a, b, c, d) {
  if (!isObject(a)) return a;
  b = castPath(b, a);
  for (var e2 = b, f2 = e2.length, g = -1, h2 = a; null != h2 && ++g < f2; ) {
    var i = toKey(b[g]), j = c;
    if (g !== f2 - 1) {
      var k2 = h2[i];
      j = void 0, j === void 0 && (j = isObject(k2) ? k2 : isIndex(b[g + 1]) ? [] : {});
    }
    assignValue(h2, i, j), h2 = h2[i];
  }
  return a;
}
function set(a, b, c) {
  return null == a ? a : baseSet(a, b, c);
}
function ownKeys$5(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$5(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$5(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$5(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var columnDefaultMinWidth = 80;
var seporatorWidth = 8;
var seporatorLargeWidth = 24;
var reduceSum = function(a, b) {
  return a + b;
}, getLastChildrenCount = function(a) {
  var b = 0, c = function(a2) {
    a2.forEach(function(a3) {
      var d;
      null !== (d = a3.columns) && void 0 !== d && d.length ? c(a3.columns) : b++;
    });
  };
  return c(a), b;
}, mapColums = function(a, b) {
  for (var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : { current: false }, e2 = [0]; e2[0] <= a.length - 1 && get$1(a, e2); ) {
    var f2, g;
    if (c.current) break;
    var h2 = _toConsumableArray(e2), i = get$1(a, h2);
    if (b(i, h2), null !== (f2 = i.columns) && void 0 !== f2 && f2.length && (e2 = [].concat(_toConsumableArray(h2), ["columns", 0])), !(null !== (g = i.columns) && void 0 !== g && g.length)) {
      var l2 = [].concat(_toConsumableArray(h2.slice(0, -1)), [+h2[h2.length - 1] + 1]);
      if (get$1(a, l2)) e2 = l2;
      else {
        if (1 === h2.length) {
          e2 = [+h2[0] + 1];
          continue;
        }
        for (var m2 = 1; ; ) {
          var j = h2.slice(0, 2 * -m2), k2 = [].concat(_toConsumableArray(j.slice(0, -1)), [+j[j.length - 1] + 1]);
          if (!j.length) break;
          if (get$1(a, k2)) {
            e2 = k2;
            break;
          }
          if (k2[0] > a.length - 1) {
            e2 = k2;
            break;
          }
          m2 += 1;
        }
      }
    }
  }
}, pushByKey = function(a, b) {
  var c = true, d = { current: false };
  if (mapColums(b, function(b2) {
    a.key === b2.key && (c = false, d.current = true);
  }, d), !!c) {
    var e2 = a.key.split("-"), f2 = e2.slice(0, e2.length - 1).join("-");
    return f2 ? void mapColums(b, function(c2, d2) {
      if (f2 === c2.key) {
        var e3 = [].concat(_toConsumableArray(d2), ["columns"]);
        set(b, e3, [].concat(_toConsumableArray(get$1(b, e3)), [a]));
      }
    }) : void b.push(a);
  }
}, pushByIndex = function(a, b, c, d) {
  for (var e2 = a.length - 1; 0 <= e2; ) {
    var f2 = e2;
    e2--;
    var g = a.slice(0, a.length - f2);
    "columns" !== g[g.length - 1] && pushByKey(_objectSpread$5(_objectSpread$5({}, get$1(b, g)), {}, { columns: [], pinned: d, key: g.filter(function(a2) {
      return "columns" !== a2;
    }).join("-") }), c);
  }
}, transformPinnedColumns = function(a) {
  var b = [], c = [], d = [], e2 = [];
  return mapColums(a, function(e3, f2) {
    var g, h2, i;
    return null !== (g = e3.columns) && void 0 !== g && g.length || "left" !== e3.pinned ? null !== (h2 = e3.columns) && void 0 !== h2 && h2.length || "right" !== e3.pinned ? void ((null !== (i = e3.columns) && void 0 !== i && i.length || e3.isSeparator || e3.accessor) && pushByIndex(f2, a, d)) : void pushByIndex(f2, a, c, "right") : void pushByIndex(f2, a, b, "left");
  }), mapColums(d, function(a2) {
    var b2;
    (null !== (b2 = a2.columns) && void 0 !== b2 && b2.length || a2.isSeparator || a2.accessor) && pushByKey(a2, e2);
  }), [].concat(b, e2, c);
};
var transformColumns = function(a, b) {
  for (var c = [{ columns: a, index: 0 }], d = [], e2 = 0; c.length; ) {
    var f2 = c.length - 1, g = c[f2], h2 = g.columns[g.index];
    h2 ? function(a2, i) {
      d[f2] || (d[f2] = []);
      var j = c[0].index, k2 = d[f2][d[f2].length - 1], l2 = k2 ? k2.position.gridIndex + (k2.position.colSpan || 1) : 0, m2 = 0 === f2 ? e2++ : null !== (a2 = h2.colId) && void 0 !== a2 ? a2 : 0, n2 = _objectSpread$5(_objectSpread$5({}, h2), {}, { position: { topHeaderGridIndex: j, gridIndex: l2, level: f2 } });
      0 === f2 && (n2.colId = m2), null !== (i = n2.columns) && void 0 !== i && i.length ? (n2.position.colSpan = getLastChildrenCount(n2.columns), d[f2].push(n2), c.push({ columns: n2.columns.map(function(a3) {
        return _objectSpread$5(_objectSpread$5({}, a3), {}, { colId: e2++, parentId: m2 });
      }), index: 0 })) : (n2.position.rowSpan = b - f2, d[f2].push(n2), g.index++);
    }() : (c.pop(), c[c.length - 1] && c[c.length - 1].index++);
  }
  return d;
};
var getMaxLevel = function(a) {
  var b = 0, c = function(a2) {
    var d = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
    d > b && (b = d), a2.forEach(function(a3) {
      var b2;
      null !== (b2 = a3.columns) && void 0 !== b2 && b2.length && c(a3.columns, d + 1);
    });
  };
  return c(a), b;
};
var getIsFirst = function(a, b) {
  var c, d, e2 = b.colId, f2 = b.parentId, g = b.position, h2 = b.accessor;
  if (0 === g.level) return 0 === e2;
  var i = a.find(function(a2) {
    return a2.colId === f2;
  });
  return !!((null === i || void 0 === i || null === (c = i.columns) || void 0 === c || null === (d = c[0]) || void 0 === d ? void 0 : d.accessor) === h2 && !!i && getIsFirst(a, i));
}, getlowHeaders = function(a) {
  var b = [];
  return mapColums(a, function(a2) {
    var c;
    null !== (c = a2.columns) && void 0 !== c && c.length || b.push(a2);
  }), b;
}, getStickyTopOffsets = function(a, b) {
  for (var c, d = [], e2 = 0; e2 < a.length; e2++) c = a[e2], d.push(b.slice(0, c.position.level).reduce(reduceSum, 0));
  return d;
}, getResizerTopOffsets = function(a, b, c) {
  for (var d = [], e2 = function(e3) {
    var f3 = a.findIndex(function(a2) {
      return a2.key === b[e3].key;
    });
    d.push(c[f3]);
  }, f2 = 0; f2 < b.length; f2++) e2(f2);
  return d;
}, getFlattenedHeadersLowCellsKeys = function(a) {
  var b = a.map(function(a2) {
    var b2 = [];
    return mapColums([a2], function(a3) {
      var c;
      null !== (c = a3.columns) && void 0 !== c && c.length || b2.push(a3.key);
    }), b2;
  });
  return b;
}, getHeaderStickyLeftOffsets = function(a, b) {
  return a.map(function(a2) {
    return Math.min.apply(Math, _toConsumableArray(a2.map(function(a3) {
      return b.findIndex(function(b2) {
        return b2.key === a3;
      });
    })));
  });
}, getHeaderStickyRightOffsets = function(a, b) {
  return a.map(function(a2) {
    return Math.max.apply(Math, _toConsumableArray(a2.map(function(a3) {
      return b.findIndex(function(b2) {
        return b2.key === a3;
      });
    })));
  });
};
var useHeaderData = function(a) {
  var b = reactExports.useMemo(function() {
    return transformPinnedColumns(a);
  }, [a]), c = reactExports.useMemo(function() {
    return transformColumns(b, getMaxLevel(b));
  }, [b]), d = reactExports.useMemo(function() {
    return c.flat().map(function(a2, b2, c2) {
      return _objectSpread$5(_objectSpread$5({}, a2), {}, { position: _objectSpread$5(_objectSpread$5({}, a2.position), {}, { isFirst: getIsFirst(c2, a2), width: a2.width || "auto" }) });
    });
  }, [c]), e2 = useRefs(d.length, [a]), f2 = useResizeObserved(e2, function(a2) {
    return getElementSize(a2).height;
  }), g = reactExports.useMemo(function() {
    return c.map(function(a2, b2) {
      var c2 = d.map(function(a3, b3) {
        return _objectSpread$5(_objectSpread$5({}, a3), {}, { position: _objectSpread$5(_objectSpread$5({}, a3.position), {}, { height: f2[b3] }) });
      });
      return Math.min.apply(null, c2.filter(function(a3) {
        return a3.position.level === b2;
      }).map(function(a3) {
        return a3.position.height;
      }));
    });
  }, [c, d, f2.join("-")]), h2 = reactExports.useMemo(function() {
    return getlowHeaders(b);
  }, [b]), i = useRefs(h2.length), j = reactExports.useMemo(function() {
    return g.reduce(reduceSum);
  }, [g]), k2 = reactExports.useMemo(function() {
    return getStickyTopOffsets(d, g);
  }, [d, g, f2]), l2 = reactExports.useMemo(function() {
    return getResizerTopOffsets(d, h2, k2);
  }, [d, h2, k2]), m2 = reactExports.useMemo(function() {
    var a2 = getFlattenedHeadersLowCellsKeys(d);
    return [getHeaderStickyLeftOffsets(a2, h2), getHeaderStickyRightOffsets(a2, h2)];
  }, [d, h2]), n2 = _slicedToArray(m2, 2), o = n2[0], p2 = n2[1], q2 = reactExports.useMemo(function() {
    return d.map(function(a2, b2) {
      var c2, e3, f3 = "", g2 = { current: false };
      mapColums([a2], function(a3) {
        var b3;
        null !== (b3 = a3.columns) && void 0 !== b3 && b3.length || (f3 = a3.key, g2.current = true);
      }, g2);
      var i2 = h2.findIndex(function(a3) {
        return a3.key === f3;
      });
      return [!a2.position.isFirst && ("left" === a2.pinned || "left" !== (null === (c2 = h2[i2 - 1]) || void 0 === c2 ? void 0 : c2.pinned)), "left" === a2.pinned && "left" !== (null === (e3 = d[b2 + 1]) || void 0 === e3 ? void 0 : e3.pinned), 0 !== a2.position.level];
    });
  }, [d, h2]);
  return { headers: c, flattenedHeaders: d, lowHeaders: h2, headerRowsHeights: g, resizerTopOffsets: l2, headerHeight: j, resizersRefs: i, stickyTopOffsets: k2, stickyLeftOffsets: o, stickyRightOffsets: p2, headerCellsRefs: e2, bordersFlattenedHeaders: q2 };
};
function ownKeys$4(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$4(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$4(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$4(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var reactBemNaming = { e: "-", m: "_", v: "_" };
var withPrefix = function(a) {
  return classnameExports.withNaming(_objectSpread$4({ n: "".concat(a, "--") }, reactBemNaming));
};
var cn = withPrefix("ct");
withPrefix("ct-canary");
withPrefix("ct-deprecated");
var cnTableCell = cn("TableCell");
var cnTableResizers = cn("TableResizers");
var TableResizers = function(a) {
  var b = a.lowHeaders, c = a.resizersRefs, d = a.handlers, e2 = a.resizable, f2 = a.activeIndex;
  return React.createElement("div", { className: cnTableResizers() }, b.map(function(a2, g) {
    var h2 = a2.maxWidth, i = a2.minWidth, j = a2.pinned, k2 = a2.isSeparator;
    return React.createElement("div", { className: cnTableResizers("Cell"), ref: c[g], key: g, style: _defineProperty$2({}, "--table-resizer-top-offset", "var(--table-resizer-top-offset-".concat(g, ")")) }, e2 && (h2 === void 0 || h2 !== i) && !k2 && !j && ("inside" !== e2 || b.length !== g + 1) && React.createElement("div", Object.assign({}, d[g], { className: cnTableResizers("Resizer", { active: f2 === g }), "aria-hidden": true })));
  }));
};
var cnTableSeporatorTitles = cn("TableSeporatorTitles");
var TableSeporatorTitles = function(a) {
  var b = a.lowHeaders;
  return -1 === b.findIndex(function(a2) {
    return a2.title && a2.isSeparator;
  }) ? null : React.createElement("div", { className: cnTableSeporatorTitles() }, b.map(function(a2, b2) {
    var c = a2.title, d = a2.isSeparator;
    return React.createElement("div", { className: cnTableSeporatorTitles("Cell"), key: b2 }, d && c && React.createElement(Text, { view: "secondary", size: "xs", className: cnTableSeporatorTitles("Title") }, c));
  }));
};
var cnTableVirtualScrollSpaceTop = cn("TableVirtualScrollSpaceTop");
var TableVirtualScrollSpaceTop = function() {
  return React.createElement("div", { className: cnTableVirtualScrollSpaceTop() });
};
var range = function(a) {
  return _toConsumableArray(Array(a).keys());
};
var isNumber = function(a) {
  return "number" == typeof a;
};
var isString = function(a) {
  return "string" == typeof a;
};
var getStyleByArray = function(a, b) {
  for (var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : "px", d = {}, e2 = 0; e2 < a.length; e2++) d["".concat(b, "-").concat(e2)] = "".concat(isString(c) ? a[e2] + c : c(a[e2], e2, a));
  return d;
};
var getStyleLeftOffestsForStickyColumns = function(a) {
  return getStyleByArray(range(a.length), "--table-column-sticky-left-offset", printTableColumnStickyHorisontalOffsetValue());
};
var getStyleRightOffestsForStickyColumns = function(a) {
  return getStyleByArray(range(a.length), "--table-column-sticky-right-offset", printTableColumnStickyHorisontalOffsetValue(true));
};
var getGridTamplate = function(a) {
  return a.map(function(a2, b) {
    return "var(--table-column-size-".concat(b, ")");
  }).join(" ");
};
var printHorisontalOffsetPart = function(a, b) {
  return function(c) {
    return a ? "var(--table-column-size-".concat(b.length - 1 - c, ")") : "var(--table-column-size-".concat(c, ")");
  };
};
var printTableColumnStickyHorisontalOffsetValue = function() {
  var a = !!(0 < arguments.length && arguments[0] !== void 0) && arguments[0];
  return function(b, c, d) {
    var e2 = range(a ? d.length - 1 - b : b), f2 = e2.map(printHorisontalOffsetPart(a, d));
    return f2.length ? 1 === f2.length ? f2[0] : "calc(".concat(f2.join(" + "), ")") : "0px";
  };
};
var printSize = function(a) {
  return isNumber(a) ? "".concat(a, "px") : isString(a) ? a : "auto";
};
var trackPosition = function(a) {
  return "clientX" in a ? { x: a.clientX, y: a.clientY } : { x: a.changedTouches[0].clientX, y: a.changedTouches[0].clientY };
};
var minMax = function(a, b, c) {
  return "number" == typeof c ? b && a ? Math.min(b, Math.max(a, c)) : b ? Math.min(b, c) : a ? Math.max(a, c) : c : b === a ? b : c;
};
var sizesEq = function(a, b) {
  return a.join("-") === b.join("-");
};
var getRefsSizes = function(a) {
  var b = 0;
  return a.map(function(a2) {
    var c, d = a2.ref, e2 = a2.maxWidth, f2 = a2.minWidth, g = a2.width, h2 = minMax(f2, e2, null === (c = d.current) || void 0 === c ? void 0 : c.getBoundingClientRect().width) || ("number" == typeof g ? minMax(f2, e2, g) : g);
    if ("number" == typeof h2) {
      var i = Math.round(h2 + b);
      return b += h2 - i, i;
    }
    return h2;
  });
};
var getTargetBlockPosition = function(a, b) {
  return a.slice(0, b).map(function(a2) {
    return "number" == typeof a2 ? a2 : 0;
  }).reduce(function(b2, c) {
    return (null !== b2 && void 0 !== b2 ? b2 : 0) + (null !== c && void 0 !== c ? c : 0);
  }, 0);
}, getBlockMaxSizes = function(a) {
  return [(null === a || void 0 === a ? void 0 : a.minWidth) || 0, null === a || void 0 === a ? void 0 : a.maxWidth];
};
var addResult = function(a, b) {
  for (var c = _toConsumableArray(b), d = 0; d < a.length; d++) c[a[d][0]] = a[d][1];
  return c;
};
var isSizesCalculate = function(a) {
  return !a.find(function(a2) {
    return "string" == typeof a2 || "undefined" == typeof a2;
  });
};
var getSizesSum = function(a) {
  return a.reduce(function(c, a2) {
    return c + a2;
  });
};
var getValidValues = function(a, b, c, d, e2, f2) {
  var g = getBlockMaxSizes(c[b]), h2 = minMax(g[0], g[1], a) || 0, i = [[b, h2]], j = _toConsumableArray(e2).map(function(a2) {
    return "number" == typeof a2 ? a2 : 0;
  });
  j.splice(b, 1, h2);
  for (var k2 = getSizesSum(j), l2 = c.length - 1; j[l2] && l2 > b && "inside" === f2; ) {
    var m2 = d - k2, n2 = getBlockMaxSizes(c[l2]), o = minMax(n2[0], n2[1], j[l2] + m2) || 0;
    if (j[l2] + m2 !== o || o === i[0][1]) {
      l2 -= 1;
      continue;
    }
    if (i.push([l2, o]), k2 + m2 === d) break;
    l2 -= 1;
  }
  var p2 = getSizesSum(addResult(i, j));
  return "inside" === f2 && p2 !== d || "outside" === f2 && p2 < d ? [] : i;
};
var getCalcaulatedSizes = function(a, b, c, d, e2, f2) {
  var g, h2 = null === (g = trackPosition(a)) || void 0 === g ? void 0 : g.x;
  if (h2) {
    var i, j, k2, l2 = (null === (i = d.current) || void 0 === i ? void 0 : i.clientWidth) || 0, m2 = (null === (j = d.current) || void 0 === j ? void 0 : j.getBoundingClientRect().left) || 0, n2 = (null === (k2 = d.current) || void 0 === k2 ? void 0 : k2.scrollLeft) || 0, o = getTargetBlockPosition(e2, b), p2 = Math.round(h2 + n2 - m2 - o);
    return getValidValues(p2, b, c, l2, e2, f2);
  }
  return [];
};
var useResizeContainer = function(a, b, c) {
  return useResizeObserved(reactExports.useMemo(function() {
    return [a];
  }, [a]), useDebounce(function(a2) {
    var d = null === a2 || void 0 === a2 ? void 0 : a2.clientWidth, e2 = _toConsumableArray(b.current[4]), f2 = b.current[2];
    if (d && isSizesCalculate(e2)) {
      var g = b.current[1], h2 = getSizesSum(e2), i = d - h2;
      if ("outside" !== f2 && i || "outside" === f2 && 0 < i) for (var m2 = g.length - 1; e2[m2] && i; ) {
        var j = getBlockMaxSizes(g[m2]), k2 = e2[m2], l2 = minMax(j[0], j[1], e2[m2] + i) || 0;
        i -= l2 - k2, e2[m2] = l2, m2 -= 1;
      }
      c(e2);
    }
  }, 10));
};
var useResizableColmns = function(a) {
  var b = a.blocks, c = a.container, d = a.resizable, e2 = reactExports.useState(getRefsSizes(b)), f2 = _slicedToArray(e2, 2), g = f2[0], h2 = f2[1], i = reactExports.useCallback(function(a2) {
    h2(function(b2) {
      return sizesEq(a2, b2) ? b2 : a2;
    });
  }, []), j = reactExports.useState(null), k2 = _slicedToArray(j, 2), l2 = k2[0], m2 = k2[1], n2 = useMutableRef([c, b, d, l2, g]), o = reactExports.useCallback(function() {
    q2("remove"), m2(null);
  }, []), p2 = reactExports.useCallback(function(a2) {
    var b2 = _slicedToArray(n2.current, 4), c2 = b2[0], d2 = b2[1], e3 = b2[2], f3 = b2[3];
    "number" == typeof f3 && e3 && h2(function(b3) {
      var g2 = getCalcaulatedSizes(a2, f3, d2, c2, b3, e3), h3 = addResult(g2, b3);
      return sizesEq(h3, b3) ? b3 : h3;
    });
  }, []), q2 = reactExports.useCallback(function(a2) {
    var b2 = "add" === a2 ? "addEventListener" : "removeEventListener";
    document[b2]("mouseup", o), document[b2]("touchend", o), document[b2]("mousemove", p2), document[b2]("touchmove", p2);
  }, []), r2 = reactExports.useCallback(function(a2) {
    m2(a2), q2("add");
  }, []), s = reactExports.useMemo(function() {
    return Array.from({ length: b.length }).map(function(a2, b2) {
      return { onMouseDown: function onMouseDown() {
        return d ? r2(b2) : void 0;
      }, onTouchStart: function onTouchStart() {
        return d ? r2(b2) : void 0;
      } };
    });
  }, [b, c, d]);
  return useResizeContainer(c, n2, i), reactExports.useEffect(function() {
    i(getRefsSizes(b));
  }, [b, d]), reactExports.useEffect(function() {
    d || o();
  }, [d]), { handlers: s, sizes: g, activeIndex: l2 };
};
var _excluded$2 = ["className", "children", "spaceTop", "topOffsets", "style", "headerHeight", "lowHeaders", "resizersRefs", "header", "body", "resizable", "stickyTopOffsets", "stickyHeader", "headerZIndex"];
function ownKeys$3(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$3(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$3(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$3(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var cnTableBody = cn("TableBody");
var TableBody = reactExports.forwardRef(function(a, b) {
  var c, d, e2 = a.className;
  a.children;
  var g = a.spaceTop, h2 = a.topOffsets, i = a.style, j = void 0 === i ? {} : i, k2 = a.headerHeight, l2 = a.lowHeaders, m2 = a.resizersRefs, n2 = a.header, o = a.body, p2 = a.resizable, q2 = a.stickyTopOffsets, r2 = a.stickyHeader, s = a.headerZIndex, t2 = _objectWithoutProperties(a, _excluded$2), u2 = reactExports.useRef(null), v2 = useResizeObserved(reactExports.useMemo(function() {
    return [u2];
  }, [u2]), getElementSize), w2 = _slicedToArray(v2, 1), x2 = w2[0], y2 = reactExports.useMemo(function() {
    return l2.map(function(a2, b2) {
      var c2 = a2.isSeparator, d2 = a2.width, e3 = a2.minWidth, f2 = a2.maxWidth, g2 = a2.title, h3 = g2 ? seporatorLargeWidth : seporatorWidth;
      return c2 ? { ref: m2[b2], maxWidth: h3, minWidth: h3, width: h3 } : { ref: m2[b2], minWidth: e3 || columnDefaultMinWidth, maxWidth: f2, width: d2 };
    });
  }, [l2]), z2 = useResizableColmns({ resizable: p2, container: u2, blocks: y2 }), A2 = z2.handlers, B2 = z2.sizes, C2 = z2.activeIndex;
  return React.createElement("div", Object.assign({}, t2, { className: cnTableBody(null, [cnMixScrollBar(), e2]), style: _objectSpread$3(_objectSpread$3(_objectSpread$3(_objectSpread$3(_objectSpread$3(_objectSpread$3(_objectSpread$3({}, j), {}, (c = {}, _defineProperty$2(c, "--table-body-height", "".concat(x2.height, "px")), _defineProperty$2(c, "--table-body-width", "".concat(x2.width, "px")), _defineProperty$2(c, "--table-header-height", "".concat(k2, "px")), _defineProperty$2(c, "--table-body-space-top", "".concat(g, "px")), _defineProperty$2(c, "--table-grid-columns-lenght", "".concat(B2.length)), _defineProperty$2(c, "--table-grid-template-columns", reactExports.useMemo(function() {
    return getGridTamplate(B2);
  }, [B2.length])), c), reactExports.useMemo(function() {
    return getStyleByArray(B2, "--table-column-size", printSize);
  }, [B2])), reactExports.useMemo(function() {
    return getStyleLeftOffestsForStickyColumns(B2);
  }, [B2.length])), reactExports.useMemo(function() {
    return getStyleRightOffestsForStickyColumns(B2);
  }, [B2.length])), reactExports.useMemo(function() {
    return getStyleByArray(h2, "--table-resizer-top-offset");
  }, [h2])), reactExports.useMemo(function() {
    return getStyleByArray(q2, "--table-column-sticky-top-offset");
  }, [q2])), {}, (d = {}, _defineProperty$2(d, "--table-row-grid-column", "span ".concat(l2.length)), _defineProperty$2(d, "--table-header-z-index", s), d)), ref: useForkRef([b, u2]) }), n2, React.createElement("div", { className: cnTableBody("Seporator", { sticky: r2 }, [cnTableCell()]) }), React.createElement(TableSeporatorTitles, { lowHeaders: l2 }), React.createElement(TableResizers, { lowHeaders: l2, resizersRefs: m2, handlers: A2, resizable: p2, activeIndex: C2 }), React.createElement(TableVirtualScrollSpaceTop, null), o);
});
var cnFlex = cn$2("MixFlex");
var cnMixFlex = function(a) {
  var b = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : [];
  return cnFlex(a, b);
};
var cnDataCell = cn("DataCell"), renderContentSlot$1 = function(a) {
  return React.createElement("div", { className: cnDataCell("ContentSlot", [cnMixFlex({ flex: "flex", align: "center" })]) }, a);
}, renderIcon = function(a, b) {
  return renderContentSlot$1(React.createElement(a, { view: b, size: "s" }));
}, renderChildren$1 = function(a, b, c) {
  return isString(a) || isNumber(a) ? renderContentSlot$1(React.createElement(Text, { className: cnMixSpace({ pV: contentVerticalSpaseMap$1[c] }), view: b, size: c }, a)) : renderContentSlot$1(a);
}, contentVerticalSpaseMap$1 = { m: "s", s: "xs" };
var DataCell = reactExports.forwardRef(function(a, b) {
  var c, d = a.className, e2 = a.control, f2 = a.icon, g = a.children, h2 = a.level, i = void 0 === h2 ? 0 : h2, j = a.view, k2 = a.size, l2 = void 0 === k2 ? "m" : k2, m2 = a.indicator, n2 = 0 > i ? 0 : i, o = e2 ? _toConsumableArray(Array.isArray(e2) ? e2 : [e2]) : [], p2 = f2 ? _toConsumableArray(Array.isArray(f2) ? f2.map(function(a2) {
    return renderIcon(a2, j);
  }) : [renderIcon(f2, j)]) : [], q2 = g ? _toConsumableArray(Array.isArray(g) ? g.map(function(a2) {
    return renderChildren$1(a2, j, l2);
  }) : [renderChildren$1(g, j, l2)]) : [], r2 = [].concat(_toConsumableArray(p2), _toConsumableArray(q2));
  return React.createElement("div", { className: cnDataCell({ size: l2, indicator: !!m2, alignmentIndent: 1 <= n2 && 0 === o.length }, [cnMixFlex({ flex: "flex" }), d]), style: (c = {}, _defineProperty$2(c, "--table-data-cell-level", n2 || void 0), _defineProperty$2(c, "--table-data-cell-indicator-color", m2 ? "var(--color-bg-".concat(m2, ")") : void 0), c), ref: b }, o.length ? React.createElement("div", { className: cnMixFlex({ flex: "flex", align: "center", gap: "2xs" }) }, o.map(function(a2, b2) {
    return React.createElement("div", { className: cnDataCell("ControlSlot", [cnMixFlex({ flex: "flex", align: "center", justify: "center" })]), key: b2 }, a2);
  })) : void 0, r2.length ? React.createElement("div", { className: cnMixFlex({ flex: "flex", gap: "2xs" }) }, r2.map(function(a2, b2) {
    return React.createElement(reactExports.Fragment, { key: b2 }, a2);
  })) : void 0);
});
var _excluded$1 = ["className", "rows", "lowHeaders", "rowsRefs", "slice", "zebraStriped", "onRowMouseEnter", "onRowMouseLeave", "onRowClick"];
var cnTableData = cn("TableData");
var getCellDataByAccessor = function(a, b, c) {
  if (c) return "";
  if (!b) return "";
  var d = null === a || void 0 === a ? void 0 : a[b];
  return isString(d) || isNumber(d) ? React.createElement(DataCell, null, d.toString()) : "";
}, getRowMouseEvent = function(a, b) {
  return b ? function(c) {
    return b(a, { e: c });
  } : void 0;
}, TableDataRender = function(a, b) {
  var c = a.className, d = a.rows, e2 = a.lowHeaders, f2 = a.rowsRefs, g = a.slice, h2 = a.zebraStriped, i = a.onRowMouseEnter, j = a.onRowMouseLeave, k2 = a.onRowClick, l2 = _objectWithoutProperties(a, _excluded$1);
  return React.createElement("div", Object.assign({}, l2, { ref: b, className: cnTableData(null, [c]) }), d.slice.apply(d, _toConsumableArray(g)).map(function(a2, b2) {
    var c2 = b2 + g[0];
    return React.createElement("div", { className: cnTableData("Row"), key: c2, onMouseEnter: getRowMouseEvent(a2, i), onMouseLeave: getRowMouseEvent(a2, j), onClick: getRowMouseEvent(a2, k2), "aria-hidden": "true" }, e2.map(function(d2, g2) {
      var i2, j2, k3 = d2.isSeparator, l3 = d2.accessor, m2 = d2.pinned, n2 = d2.renderCell;
      return React.createElement("div", { key: "".concat(g2, "-").concat(c2), ref: 0 === g2 ? f2[c2] : void 0, className: cnTableData("Cell", { pinned: !!m2 }, [cnTableCell({ separator: k3, borderLeft: 0 !== g2 && ("left" === m2 || "left" !== (null === (i2 = e2[g2 - 1]) || void 0 === i2 ? void 0 : i2.pinned)), borderRight: "left" === m2 && "left" !== (null === (j2 = e2[g2 + 1]) || void 0 === j2 ? void 0 : j2.pinned), borderTop: !k3 && 0 !== b2, sticky: !!m2, zebraStriped: void 0 !== h2 && h2 && 0 != c2 % 2 })]), style: { left: "left" === m2 ? "var(--table-column-sticky-left-offset-".concat(g2, ")") : void 0, right: "right" === m2 ? "var(--table-column-sticky-right-offset-".concat(g2, ")") : void 0 } }, "function" == typeof n2 ? React.createElement(n2, { row: a2 }) : getCellDataByAccessor(a2, l3, k3));
    }));
  }));
};
var TableData = reactExports.forwardRef(TableDataRender);
var cnHeaderDataCell = cn("HeaderDataCell"), contentVerticalSpaseMap = { m: "s", s: "xs" }, renderContentSlot = function(a) {
  return React.createElement("div", { className: cnHeaderDataCell("ContentSlot", [cnMixFlex({ flex: "flex", align: "center" })]) }, a);
}, renderChildren = function(a, b) {
  return isString(a) || isNumber(a) ? renderContentSlot(React.createElement(Text, { className: cnMixSpace({ pV: contentVerticalSpaseMap[b] }), size: b }, a)) : renderContentSlot(a);
};
var HeaderDataCell = reactExports.forwardRef(function(a, b) {
  var c = a.className, d = a.size, e2 = void 0 === d ? "m" : d, f2 = a.controlRight, g = a.children, h2 = a.controlLeft, i = g ? _toConsumableArray(Array.isArray(g) ? g.map(function(a2) {
    return renderChildren(a2, e2);
  }) : [renderChildren(g, e2)]) : [], j = f2 ? _toConsumableArray(Array.isArray(f2) ? f2 : [f2]) : [], k2 = h2 ? _toConsumableArray(Array.isArray(h2) ? h2 : [h2]) : [];
  return React.createElement("div", { className: cnHeaderDataCell({ size: e2 }, [cnMixFlex({ flex: "flex", gap: "xs", justify: "space-between" }), cnMixSpace({ pH: "s" }), c]), ref: b }, React.createElement("div", { className: cnMixFlex({ flex: "flex", gap: "xs" }) }, k2.length ? React.createElement("div", { className: cnMixFlex({ flex: "flex", gap: "2xs" }) }, k2.map(function(a2, b2) {
    return React.createElement("div", { className: cnHeaderDataCell("ControlSlot", [cnMixFlex({ flex: "flex", align: "center", justify: "center" })]), key: b2 }, a2);
  })) : void 0, i.length ? React.createElement("div", { className: cnMixFlex({ flex: "flex", gap: "2xs" }) }, i.map(function(a2, b2) {
    return React.createElement(reactExports.Fragment, { key: b2 }, a2);
  })) : void 0), j.length ? React.createElement("div", { className: cnMixFlex({ flex: "flex", align: "center", gap: "2xs" }) }, j.map(function(a2, b2) {
    return React.createElement("div", { className: cnHeaderDataCell("ControlSlot", [cnMixFlex({ flex: "flex", align: "center", justify: "center" })]), key: b2 }, a2);
  })) : void 0);
});
var _excluded = ["headers", "className", "stickyLeftOffsets", "stickyRightOffsets", "stickyHeader", "headerCellsRefs", "borders"];
function ownKeys$2(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b && (d = d.filter(function(b2) {
      return Object.getOwnPropertyDescriptor(a, b2).enumerable;
    })), c.push.apply(c, d);
  }
  return c;
}
function _objectSpread$2(a) {
  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys$2(Object(b), true).forEach(function(c2) {
    _defineProperty$2(a, c2, b[c2]);
  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys$2(Object(b)).forEach(function(c2) {
    Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
  });
  return a;
}
var cnTableHeader = cn("TableHeader");
var DefaultRenderHeaderCell = function(a) {
  var b = a.title;
  return React.createElement(HeaderDataCell, null, b);
};
var TableHeader = reactExports.forwardRef(function(a, b) {
  var c = a.headers, d = a.className, e2 = a.stickyLeftOffsets, f2 = a.stickyRightOffsets, g = a.stickyHeader, h2 = a.headerCellsRefs, i = a.borders, j = _objectWithoutProperties(a, _excluded);
  return React.createElement("div", Object.assign({}, j, { className: cnTableHeader(null, [d]), ref: b }), c.map(function(a2, b2) {
    var c2 = {};
    a2.position.colSpan && (c2.gridColumnEnd = "span ".concat(a2.position.colSpan)), a2.position.rowSpan && (c2.gridRowEnd = "span ".concat(a2.position.rowSpan));
    var d2 = a2.renderHeaderCell || DefaultRenderHeaderCell;
    return React.createElement("div", { className: cnTableHeader("Cell", { pinned: !!a2.pinned }, [cnTableCell({ separator: a2.isSeparator, borderLeft: i[b2][0], borderRight: i[b2][1], borderTop: i[b2][2], sticky: !!a2.pinned || g, up: !!a2.pinned })]), style: _objectSpread$2(_objectSpread$2({}, c2), {}, { top: g ? "var(--table-column-sticky-top-offset-".concat(b2, ")") : void 0, left: "left" === a2.pinned ? "var(--table-column-sticky-left-offset-".concat(e2[b2], ")") : void 0, right: "right" === a2.pinned ? "var(--table-column-sticky-right-offset-".concat(f2[b2], ")") : void 0 }), ref: forkRef([h2[b2]]), key: cnTableHeader("Cell", { index: b2 }) }, a2.isSeparator ? null : React.createElement(d2, { title: a2.title }));
  }));
});
var MemoTableHeader = reactExports.memo(TableHeader);
var TableRender = function(a, b) {
  var c = a.columns, d = a.rows, e2 = a.stickyHeader, f2 = a.virtualScroll, g = a.style, h2 = a.className, i = a.resizable, j = a.zebraStriped, k2 = a.headerZIndex, l2 = void 0 === k2 ? 1 : k2, m2 = a.onRowMouseEnter, n2 = a.onRowMouseLeave, o = a.onRowClick, p2 = useHeaderData(c), q2 = useVirtualScroll({ length: d.length, isActive: f2 }), r2 = q2.listRefs, s = q2.scrollElementRef, t2 = q2.slice, u2 = q2.spaceTop;
  return React.createElement(TableBody, { topOffsets: p2.resizerTopOffsets, spaceTop: u2, ref: useForkRef([s, b]), style: g, headerHeight: p2.headerHeight, className: h2, lowHeaders: p2.lowHeaders, resizersRefs: p2.resizersRefs, resizable: i, stickyTopOffsets: p2.stickyTopOffsets, stickyHeader: e2, headerZIndex: l2, header: React.createElement(MemoTableHeader, { headers: p2.flattenedHeaders, headerCellsRefs: p2.headerCellsRefs, stickyHeader: e2, stickyLeftOffsets: p2.stickyLeftOffsets, stickyRightOffsets: p2.stickyRightOffsets, borders: p2.bordersFlattenedHeaders }), body: React.createElement(TableData, { lowHeaders: p2.lowHeaders, rows: d, rowsRefs: r2, slice: t2, zebraStriped: j, onRowMouseEnter: m2, onRowMouseLeave: n2, onRowClick: o }) });
};
var Table = reactExports.forwardRef(TableRender);
const Transactions = ({ items }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 text-right", children: items.map((elt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Text,
    {
      font: "mono",
      className: "whitespace-pre",
      children: elt
    },
    elt
  )) });
};
const IconFeed = ({ className = "" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className,
      width: "20",
      height: "21",
      viewBox: "0 0 20 21",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("g", { clipPath: "url(#clip0_5834_12840)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M5.45455 17.7727C5.45455 18.5303 5.18939 19.1742 4.65909 19.7045C4.12879 20.2348 3.48485 20.5 2.72727 20.5C1.9697 20.5 1.32576 20.2348 0.795455 19.7045C0.265152 19.1742 0 18.5303 0 17.7727C0 17.0152 0.265152 16.3712 0.795455 15.8409C1.32576 15.3106 1.9697 15.0455 2.72727 15.0455C3.48485 15.0455 4.12879 15.3106 4.65909 15.8409C5.18939 16.3712 5.45455 17.0152 5.45455 17.7727ZM12.7273 19.5199C12.7462 19.785 12.6657 20.0123 12.4858 20.2017C12.3153 20.4006 12.0928 20.5 11.8182 20.5H9.90057C9.66383 20.5 9.46023 20.4219 9.28977 20.2656C9.11932 20.1094 9.02462 19.9129 9.00568 19.6761C8.79735 17.5076 7.92377 15.6539 6.38494 14.1151C4.84612 12.5762 2.99242 11.7027 0.823864 11.4943C0.587121 11.4754 0.390625 11.3807 0.234375 11.2102C0.078125 11.0398 0 10.8362 0 10.5994V8.68182C0 8.4072 0.0994318 8.18466 0.298295 8.0142C0.45928 7.85322 0.662879 7.77273 0.909091 7.77273H0.980114C2.49527 7.89583 3.94413 8.27699 5.3267 8.91619C6.70928 9.5554 7.93561 10.4148 9.00568 11.4943C10.0852 12.5644 10.9446 13.7907 11.5838 15.1733C12.223 16.5559 12.6042 18.0047 12.7273 19.5199ZM20 19.5483C20.0189 19.804 19.9337 20.0265 19.7443 20.2159C19.5739 20.4053 19.3561 20.5 19.0909 20.5H17.0597C16.8134 20.5 16.6027 20.4171 16.4276 20.2514C16.2524 20.0857 16.16 19.8845 16.1506 19.6477C16.0369 17.6117 15.5587 15.6776 14.7159 13.8452C13.8731 12.0128 12.777 10.4219 11.4276 9.07244C10.0781 7.72301 8.48722 6.62689 6.65483 5.78409C4.82244 4.94129 2.88826 4.45833 0.852273 4.33523C0.61553 4.32576 0.414299 4.23343 0.24858 4.05824C0.0828598 3.88305 0 3.67708 0 3.44034V1.40909C0 1.14394 0.094697 0.926136 0.284091 0.755682C0.454545 0.585227 0.662879 0.5 0.909091 0.5H0.951705C3.43277 0.623106 5.80729 1.19129 8.07528 2.20455C10.3433 3.2178 12.358 4.60985 14.1193 6.38068C15.8902 8.14205 17.2822 10.1567 18.2955 12.4247C19.3087 14.6927 19.8769 17.0672 20 19.5483Z",
            fill: "#0AD289"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "clip0_5834_12840", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "20", height: "20", fill: "white", transform: "translate(0 0.5)" }) }) })
      ]
    }
  );
};
const ButtonWithTooltip = withTooltip({ content: "Тултип сверху" })(Button);
const InfoButton = (props2) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ButtonWithTooltip,
    {
      as: "span",
      iconSize: "s",
      onlyIcon: true,
      view: "clear",
      iconRight: IconInfoCircle,
      tooltipProps: props2
    }
  );
};
const percentFromStore = (num) => {
  if (num) {
    const value = num / 100;
    return value;
  }
  return 0;
};
function buildTransactions(slots) {
  const first = slots.map((elt) => elt.totalTransactions - elt.totalTransactionsVote);
  const maxFirst = `${Math.max(...first)}`.length;
  const second = slots.map((elt) => elt.totalTransactions);
  const maxSecond = `${Math.max(...second)}`.length;
  const aligned = slots.map((_, idx) => {
    const colOne = `${first[idx]}`.padStart(maxFirst, " ");
    const colSecond = `${second[idx]}`.padStart(maxSecond, " ");
    return colOne + " / " + colSecond;
  });
  return aligned;
}
const CustomTable = ({
  onEditFee,
  onEditKeys
}) => {
  const slots = useWebSocketStore((state) => state.slots);
  const disconnect = useWebSocketStore((state) => state.disconnect);
  const connect = useWebSocketStore((state) => state.connect);
  const percents = useWebSocketStore((state) => state.percents);
  const readonlyKeys = useWebSocketStore((state) => state.readonlyKeys);
  const readwriteKeys = useWebSocketStore((state) => state.readwriteKeys);
  const memoFee0 = reactExports.useCallback(() => onEditFee(0), [onEditFee]);
  const memoFee1 = reactExports.useCallback(() => onEditFee(1), [onEditFee]);
  const rowsFromSocket = reactExports.useMemo(() => {
    var _a2, _b2, _c2;
    const groupByLeader = {};
    let slice2 = [];
    let currentLeader = ((_a2 = slots[0]) == null ? void 0 : _a2.leader) || "";
    for (let i = 0; i < slots.length; i++) {
      if (currentLeader === ((_b2 = slots[i]) == null ? void 0 : _b2.leader) && slice2.length < 4) {
        slice2.push(slots[i]);
      } else {
        groupByLeader[i] = {
          slots: slice2.reverse(),
          leader: currentLeader
        };
        slice2 = [slots[i]];
        currentLeader = ((_c2 = slots[i]) == null ? void 0 : _c2.leader) || "";
      }
    }
    if (slice2.length > 0) groupByLeader["last"] = {
      slots: slice2.reverse(),
      leader: currentLeader
    };
    return Object.entries(groupByLeader).map(([
      _,
      {
        slots: slots2,
        leader
      }
    ]) => {
      var _a3;
      return {
        id: `${leader}-${((_a3 = slots2[0]) == null ? void 0 : _a3.slot) || "empty"}`,
        leader,
        slots: slots2.map((elt) => ({
          commitment: elt.commitment,
          slot: elt.slot
        })),
        transactions: buildTransactions(slots2),
        computeUnits: slots2.map((elt) => ({
          amount: elt.totalUnitsConsumed.toLocaleString("en-US"),
          percent: (elt.totalUnitsConsumed / 48e6 * 100).toFixed(2)
        })),
        earnedSol: slots2.map((elt) => elt.totalFee),
        averageFee: slots2.map((elt) => elt.feeAverage.toFixed(2)),
        fee0: slots2.map((elt) => elt.feeLevels[0] || 0),
        fee1: slots2.map((elt) => elt.feeLevels[1] || 0),
        add: []
      };
    });
  }, [slots]);
  const isTransactionsApplied = reactExports.useMemo(() => {
    return !!readwriteKeys.length || !!readonlyKeys.length;
  }, [readwriteKeys.length, readonlyKeys.length]);
  const columns = reactExports.useMemo(() => {
    return [
      {
        title: "Validator",
        accessor: "leader",
        minWidth: 490,
        renderCell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Validator, { leader: row.leader })
      },
      {
        width: "auto",
        minWidth: 170,
        title: "Slots",
        accessor: "slots",
        renderCell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Slots, { items: row.slots })
      },
      {
        title: "Transactions",
        accessor: "transactions",
        width: "auto",
        minWidth: 160,
        renderHeaderCell: ({ title }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeaderDataCell,
          {
            controlRight: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { style: {
                "--button-color": isTransactionsApplied ? "red" : void 0,
                "--button-color-hover": isTransactionsApplied ? "darkred" : void 0
              }, view: "clear", size: "s", onlyIcon: true, iconRight: IconFunnel, onClick: onEditKeys })
            ],
            children: title
          }
        ),
        renderCell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Transactions, { items: row.transactions })
      },
      {
        title: "Compute Units",
        width: "auto",
        minWidth: 190,
        accessor: "computeUnits",
        renderHeaderCell: ({ title }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeaderDataCell,
          {
            controlRight: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoButton, { content: title, direction: "downCenter" })
            ],
            children: title
          }
        ),
        renderCell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComputeUnits, { items: row.computeUnits })
      },
      {
        width: "auto",
        title: "Earned SOL",
        minWidth: 160,
        accessor: "earnedSol",
        renderHeaderCell: ({ title }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeaderDataCell,
          {
            controlRight: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoButton, { content: title, direction: "downCenter" })
            ],
            children: title
          }
        ),
        renderCell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCell, { list: row.earnedSol })
      },
      {
        title: "Average Fee",
        minWidth: 160,
        accessor: "averageFee",
        width: "auto",
        renderHeaderCell: ({ title }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeaderDataCell,
          {
            controlRight: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoButton, { content: title, direction: "downCenter" })
            ],
            children: title
          }
        ),
        renderCell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCell, { list: row.averageFee })
      },
      {
        width: "auto",
        minWidth: 160,
        title: "Fee p" + percentFromStore(percents[0]),
        accessor: "fee0",
        renderHeaderCell: ({ title }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeaderDataCell,
          {
            controlRight: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  as: "span",
                  iconSize: "s",
                  onlyIcon: true,
                  view: "clear",
                  iconRight: IconEdit,
                  onClick: memoFee0
                }
              )
            ],
            children: title
          }
        ),
        renderCell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCell, { list: row.fee0 })
      },
      {
        width: "auto",
        minWidth: 160,
        title: "Fee p" + percentFromStore(percents[1]),
        accessor: "fee1",
        renderHeaderCell: ({ title }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeaderDataCell,
          {
            controlRight: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  as: "span",
                  iconSize: "s",
                  onlyIcon: true,
                  view: "clear",
                  iconRight: IconEdit,
                  onClick: memoFee1
                }
              )
            ],
            children: title
          }
        ),
        renderCell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCell, { list: row.fee1 })
      },
      {
        title: "Add",
        accessor: "add",
        renderHeaderCell: ({ title }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeaderDataCell,
          {
            controlRight: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { as: "span", iconSize: "s", onlyIcon: true, view: "clear", iconRight: IconAdd })
            ],
            children: title
          }
        )
      }
    ];
  }, [isTransactionsApplied, onEditKeys, percents, memoFee0, memoFee1]);
  reactExports.useEffect(() => {
    console.log("effect with connect!");
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  if (!slots.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "w-full text-center text-xl font-bold",
      children: "Loading..."
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Table,
    {
      className: "overflow-scroll",
      columns,
      rows: [...rowsFromSocket].reverse(),
      style: { maxHeight: void 0 },
      resizable: void 0
    }
  ) });
};
const modalFeeItems = [50, 60, 70, 80, 90].map((elt) => ({ label: `${elt}` }));
const ModalFee = ({
  isVisible,
  onClose,
  editedFeeIdx
}) => {
  const fees = useWebSocketStore((state) => state.percents);
  const updatePercents = useWebSocketStore((state) => state.updatePercents);
  useWebSocketStore((state) => state.updateSubscription);
  const {
    disconnect,
    connect
  } = useWebSocketStore(({
    disconnect: disconnect2,
    connect: connect2
  }) => ({
    disconnect: disconnect2,
    connect: connect2
  }));
  const [feeValue, setFeeValue] = reactExports.useState("");
  reactExports.useLayoutEffect(() => {
    if (isVisible) {
      const value = percentFromStore(fees[editedFeeIdx] || 0);
      setFeeValue(`${value}`);
    }
  }, [editedFeeIdx, isVisible]);
  const onClickButton = () => {
    const newPercents = fees.map((elt, idx) => {
      if (idx === editedFeeIdx) return +(+feeValue * 100).toFixed(2);
      return elt;
    });
    updatePercents(newPercents);
    disconnect();
    connect();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      isOpen: isVisible,
      hasOverlay: true,
      onClickOutside: onClose,
      onEsc: onClose,
      className: "flex flex-col gap-4 p-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "h1", size: "2xl", view: "primary", children: "Fee percentile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextField,
            {
              onChange: (value) => setFeeValue(value || ""),
              value: feeValue,
              type: "number",
              placeholder: "1-100",
              incrementButtons: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chips, { interactive: true, items: modalFeeItems, onItemClick: (item) => setFeeValue(item.label), size: "xs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            view: "primary",
            label: "Done",
            width: "full",
            onClick: onClickButton
          }
        )
      ]
    }
  );
};
const ModalFilter = ({
  isVisible,
  onClose
}) => {
  const [rwValue, setRwValue] = reactExports.useState("");
  const [roValue, setRoValue] = reactExports.useState("");
  const savedReadonlyKeys = useWebSocketStore((state) => state.readonlyKeys);
  const savedReadwriteKeys = useWebSocketStore((state) => state.readwriteKeys);
  const updateRo = useWebSocketStore((state) => state.updateReadonlyKeys);
  const updateRw = useWebSocketStore((state) => state.updateReadwriteKeys);
  useWebSocketStore((state) => state.updateSubscription);
  const {
    disconnect,
    connect
  } = useWebSocketStore(({
    disconnect: disconnect2,
    connect: connect2
  }) => ({
    disconnect: disconnect2,
    connect: connect2
  }));
  const onClickButton = () => {
    updateRo(roValue.split("\n"));
    updateRw(rwValue.split("\n"));
    disconnect();
    connect();
    onClose();
  };
  reactExports.useLayoutEffect(() => {
    if (isVisible) {
      setRoValue(savedReadonlyKeys.join("\n"));
      setRwValue(savedReadwriteKeys.join("\n"));
    }
  }, [isVisible]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      isOpen: isVisible,
      hasOverlay: true,
      onClickOutside: onClose,
      onEsc: onClose,
      className: "flex flex-col gap-4 p-6 min-w-[50%]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "h1", size: "2xl", view: "primary", children: "Filter transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            className: "min-w-80 custom-nowrap-textarea",
            label: "Read-write pubkeys",
            labelPosition: "top",
            type: "textarea",
            onChange: (value) => setRwValue(value || ""),
            value: rwValue,
            placeholder: "Pubkeys",
            minRows: 3,
            maxRows: 10
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            className: "min-w-80 custom-nowrap-textarea",
            label: "Read-only pubkeys",
            labelPosition: "top",
            type: "textarea",
            onChange: (value) => setRoValue(value || ""),
            value: roValue,
            placeholder: "Pubkeys",
            minRows: 3,
            maxRows: 10
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            view: "primary",
            label: "Done",
            width: "full",
            onClick: onClickButton
          }
        )
      ]
    }
  );
};
const Home = () => {
  const [filterModalShown, filterModalControls] = useFlag(false);
  const [editedFeeIdx, setEditedFeeIdx] = reactExports.useState(-1);
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute top-2 left-2 rounded bg-amber-300", onClick: () => navigate({ to: "/homeOld" }), children: "click to old version" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-20 py-5 bg-white w-full flex-col justify-start items-start gap-8 inline-flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch justify-between items-center inline-flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-center gap-2 flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconFeed, { className: "w-5 h-5 relative" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[#002033] text-2xl font-semibold font-['Inter'] leading-[31.20px]", children: "Solfees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[#002033]/60 text-sm font-normal font-['Inter'] leading-[21px]", children: "Solana Fees Tracker" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Epoch, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-stretch justify-start items-center gap-5 inline-flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[413px] h-[300px] relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-[413px] h-[300px] left-0 top-0 absolute flex-col justify-start items-start gap-5 inline-flex",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch py-1 justify-start items-center inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow shrink basis-0 h-4 justify-start items-start gap-3 flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-center gap-1 flex", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 left-[4px] top-[4px] absolute bg-[#f38b01] rounded-full" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]", children: "Compute units" })
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-64 relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-7 h-[206px] pl-px left-0 top-0 absolute flex-col justify-center items-center inline-flex",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[27px] h-[206px] flex-col justify-between items-end inline-flex", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "3" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "2" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3.5 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "1" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" })
                        ] })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[385px] h-[206px] left-[28px] top-0 absolute", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[385px] h-[206px] left-0 top-0 absolute justify-center items-center inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[385px] h-[206px] bg-white border border-[#004166]/20" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-[385px] h-[206px] left-0 top-0 absolute flex-col justify-between items-center inline-flex"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-[385px] h-[206px] left-0 top-0 absolute justify-between items-center inline-flex"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-[385px] h-7 pb-px left-[28px] top-[206px] absolute justify-center items-center inline-flex",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[385px] h-[27px] justify-between items-start inline-flex", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                              children: "0"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "1"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "2"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "3"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "4"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                              children: "5"
                            }
                          )
                        ] })
                      ] })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[383px] h-[206px] left-[29px] top-[44px] absolute" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[413px] h-[300px] relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-[413px] h-[300px] left-0 top-0 absolute flex-col justify-start items-start gap-5 inline-flex",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch py-1 justify-start items-center inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow shrink basis-0 h-4 justify-start items-start gap-3 flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-center gap-1 flex", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 left-[4px] top-[4px] absolute bg-[#f2c94c] rounded-full" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]", children: "Earned SOL" })
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-64 relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-7 h-[206px] pl-px left-0 top-0 absolute flex-col justify-center items-center inline-flex",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[27px] h-[206px] flex-col justify-between items-end inline-flex", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "3" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "2" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3.5 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "1" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" })
                        ] })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[385px] h-[206px] left-[28px] top-0 absolute", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[385px] h-[206px] left-0 top-0 absolute justify-center items-center inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[385px] h-[206px] bg-white border border-[#004166]/20" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-[385px] h-[206px] left-0 top-0 absolute flex-col justify-between items-center inline-flex"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-[385px] h-[206px] left-0 top-0 absolute justify-between items-center inline-flex"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-[385px] h-7 pb-px left-[28px] top-[206px] absolute justify-center items-center inline-flex",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[385px] h-[27px] justify-between items-start inline-flex", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                              children: "0"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "1"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "2"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "3"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "4"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                              children: "5"
                            }
                          )
                        ] })
                      ] })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[383px] h-[206px] left-[29px] top-[44px] absolute" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[413px] h-[300px] relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-[413px] h-[300px] left-0 top-0 absolute flex-col justify-start items-start gap-5 inline-flex",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-stretch py-1 justify-start items-center inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow shrink basis-0 h-4 justify-start items-center gap-3 flex", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-center gap-1 flex", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#002033] text-[10px] font-semibold font-['Inter'] leading-[15px]", children: "Fees" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-center gap-1 flex", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 left-[4px] top-[4px] absolute bg-[#f38b00] rounded-full" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]", children: "average" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-center gap-1 flex", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 left-[4px] top-[4px] absolute bg-[#f2c94c] rounded-full" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]", children: "p50" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "justify-start items-center gap-1 flex", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 left-[4px] top-[4px] absolute bg-[#56b8f2] rounded-full" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]", children: "p90" })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-64 relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-7 h-[206px] pl-px left-0 top-0 absolute flex-col justify-center items-center inline-flex",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[27px] h-[206px] flex-col justify-between items-end inline-flex", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "3" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "2" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-3.5 justify-end items-center gap-0.5 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "1" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-3 justify-end items-center gap-0.5 inline-flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]", children: "0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" })
                        ] })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[385px] h-[206px] left-[28px] top-0 absolute", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[385px] h-[206px] left-0 top-0 absolute justify-center items-center inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[385px] h-[206px] bg-white border border-[#004166]/20" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-[385px] h-[206px] left-0 top-0 absolute flex-col justify-between items-center inline-flex"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-[385px] h-[206px] left-0 top-0 absolute justify-between items-center inline-flex"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-[385px] h-7 pb-px left-[28px] top-[206px] absolute justify-center items-center inline-flex",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[385px] h-[27px] justify-between items-start inline-flex", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                              children: "0"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "1"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "2"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "3"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                            children: "4"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-1 origin-top-left rotate-90 justify-start items-center flex", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[5px] h-[0px] border border-[#004166]/20" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]",
                              children: "5"
                            }
                          )
                        ] })
                      ] })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-96 h-[206px] left-[29px] top-[44px] absolute" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTable, { onEditFee: setEditedFeeIdx, onEditKeys: filterModalControls.on }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFee, { editedFeeIdx, isVisible: editedFeeIdx >= 0, onClose: () => setEditedFeeIdx(-1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFilter, { isVisible: filterModalShown, onClose: filterModalControls.off })
    ] })
  ] });
};
const Route2 = createFileRoute("/")({
  component: Home
});
const HomeOldRoute = Route$1.update({
  path: "/homeOld",
  getParentRoute: () => Route$2
});
const IndexRoute = Route2.update({
  path: "/",
  getParentRoute: () => Route$2
});
const routeTree = Route$2.addChildren({ IndexRoute, HomeOldRoute });
const consoleLogger = {
  type: "logger",
  log(args) {
    this.output("log", args);
  },
  warn(args) {
    this.output("warn", args);
  },
  error(args) {
    this.output("error", args);
  },
  output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};
class Logger {
  constructor(concreteLogger) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(concreteLogger, options);
  }
  init(concreteLogger) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = options.prefix || "i18next:";
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  }
  log() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.forward(args, "log", "", true);
  }
  warn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.forward(args, "warn", "", true);
  }
  error() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.forward(args, "error", "");
  }
  deprecate() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
  }
  forward(args, lvl, prefix2, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (typeof args[0] === "string") args[0] = `${prefix2}${this.prefix} ${args[0]}`;
    return this.logger[lvl](args);
  }
  create(moduleName) {
    return new Logger(this.logger, {
      ...{
        prefix: `${this.prefix}:${moduleName}:`
      },
      ...this.options
    });
  }
  clone(options) {
    options = options || this.options;
    options.prefix = options.prefix || this.prefix;
    return new Logger(this.logger, options);
  }
}
var baseLogger = new Logger();
class EventEmitter {
  constructor() {
    this.observers = {};
  }
  on(events, listener) {
    events.split(" ").forEach((event) => {
      if (!this.observers[event]) this.observers[event] = /* @__PURE__ */ new Map();
      const numListeners = this.observers[event].get(listener) || 0;
      this.observers[event].set(listener, numListeners + 1);
    });
    return this;
  }
  off(event, listener) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }
    this.observers[event].delete(listener);
  }
  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (this.observers[event]) {
      const cloned = Array.from(this.observers[event].entries());
      cloned.forEach((_ref) => {
        let [observer, numTimesAdded] = _ref;
        for (let i = 0; i < numTimesAdded; i++) {
          observer(...args);
        }
      });
    }
    if (this.observers["*"]) {
      const cloned = Array.from(this.observers["*"].entries());
      cloned.forEach((_ref2) => {
        let [observer, numTimesAdded] = _ref2;
        for (let i = 0; i < numTimesAdded; i++) {
          observer.apply(observer, [event, ...args]);
        }
      });
    }
  }
}
const defer = () => {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
};
const makeString = (object) => {
  if (object == null) return "";
  return "" + object;
};
const copy = (a, s, t2) => {
  a.forEach((m2) => {
    if (s[m2]) t2[m2] = s[m2];
  });
};
const lastOfPathSeparatorRegExp = /###/g;
const cleanKey = (key) => key && key.indexOf("###") > -1 ? key.replace(lastOfPathSeparatorRegExp, ".") : key;
const canNotTraverseDeeper = (object) => !object || typeof object === "string";
const getLastOfPath = (object, path2, Empty) => {
  const stack = typeof path2 !== "string" ? path2 : path2.split(".");
  let stackIndex = 0;
  while (stackIndex < stack.length - 1) {
    if (canNotTraverseDeeper(object)) return {};
    const key = cleanKey(stack[stackIndex]);
    if (!object[key] && Empty) object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
    ++stackIndex;
  }
  if (canNotTraverseDeeper(object)) return {};
  return {
    obj: object,
    k: cleanKey(stack[stackIndex])
  };
};
const setPath = (object, path2, newValue) => {
  const {
    obj,
    k: k2
  } = getLastOfPath(object, path2, Object);
  if (obj !== void 0 || path2.length === 1) {
    obj[k2] = newValue;
    return;
  }
  let e2 = path2[path2.length - 1];
  let p2 = path2.slice(0, path2.length - 1);
  let last2 = getLastOfPath(object, p2, Object);
  while (last2.obj === void 0 && p2.length) {
    e2 = `${p2[p2.length - 1]}.${e2}`;
    p2 = p2.slice(0, p2.length - 1);
    last2 = getLastOfPath(object, p2, Object);
    if (last2 && last2.obj && typeof last2.obj[`${last2.k}.${e2}`] !== "undefined") {
      last2.obj = void 0;
    }
  }
  last2.obj[`${last2.k}.${e2}`] = newValue;
};
const pushPath = (object, path2, newValue, concat) => {
  const {
    obj,
    k: k2
  } = getLastOfPath(object, path2, Object);
  obj[k2] = obj[k2] || [];
  obj[k2].push(newValue);
};
const getPath = (object, path2) => {
  const {
    obj,
    k: k2
  } = getLastOfPath(object, path2);
  if (!obj) return void 0;
  return obj[k2];
};
const getPathWithDefaults = (data, defaultData, key) => {
  const value = getPath(data, key);
  if (value !== void 0) {
    return value;
  }
  return getPath(defaultData, key);
};
const deepExtend = (target, source, overwrite) => {
  for (const prop in source) {
    if (prop !== "__proto__" && prop !== "constructor") {
      if (prop in target) {
        if (typeof target[prop] === "string" || target[prop] instanceof String || typeof source[prop] === "string" || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
};
const regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const escape = (data) => {
  if (typeof data === "string") {
    return data.replace(/[&<>"'\/]/g, (s) => _entityMap[s]);
  }
  return data;
};
class RegExpCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.regExpMap = /* @__PURE__ */ new Map();
    this.regExpQueue = [];
  }
  getRegExp(pattern) {
    const regExpFromCache = this.regExpMap.get(pattern);
    if (regExpFromCache !== void 0) {
      return regExpFromCache;
    }
    const regExpNew = new RegExp(pattern);
    if (this.regExpQueue.length === this.capacity) {
      this.regExpMap.delete(this.regExpQueue.shift());
    }
    this.regExpMap.set(pattern, regExpNew);
    this.regExpQueue.push(pattern);
    return regExpNew;
  }
}
const chars = [" ", ",", "?", "!", ";"];
const looksLikeObjectPathRegExpCache = new RegExpCache(20);
const looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
  nsSeparator = nsSeparator || "";
  keySeparator = keySeparator || "";
  const possibleChars = chars.filter((c) => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
  if (possibleChars.length === 0) return true;
  const r2 = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c) => c === "?" ? "\\?" : c).join("|")})`);
  let matched = !r2.test(key);
  if (!matched) {
    const ki2 = key.indexOf(keySeparator);
    if (ki2 > 0 && !r2.test(key.substring(0, ki2))) {
      matched = true;
    }
  }
  return matched;
};
const deepFind = function(obj, path2) {
  let keySeparator = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!obj) return void 0;
  if (obj[path2]) return obj[path2];
  const tokens = path2.split(keySeparator);
  let current = obj;
  for (let i = 0; i < tokens.length; ) {
    if (!current || typeof current !== "object") {
      return void 0;
    }
    let next;
    let nextPath = "";
    for (let j = i; j < tokens.length; ++j) {
      if (j !== i) {
        nextPath += keySeparator;
      }
      nextPath += tokens[j];
      next = current[nextPath];
      if (next !== void 0) {
        if (["string", "number", "boolean"].indexOf(typeof next) > -1 && j < tokens.length - 1) {
          continue;
        }
        i += j - i + 1;
        break;
      }
    }
    current = next;
  }
  return current;
};
const getCleanedCode = (code) => {
  if (code && code.indexOf("_") > 0) return code.replace("_", "-");
  return code;
};
class ResourceStore extends EventEmitter {
  constructor(data) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super();
    this.data = data || {};
    this.options = options;
    if (this.options.keySeparator === void 0) {
      this.options.keySeparator = ".";
    }
    if (this.options.ignoreJSONStructure === void 0) {
      this.options.ignoreJSONStructure = true;
    }
  }
  addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  }
  removeNamespaces(ns) {
    const index2 = this.options.ns.indexOf(ns);
    if (index2 > -1) {
      this.options.ns.splice(index2, 1);
    }
  }
  getResource(lng, ns, key) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
    const ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let path2;
    if (lng.indexOf(".") > -1) {
      path2 = lng.split(".");
    } else {
      path2 = [lng, ns];
      if (key) {
        if (Array.isArray(key)) {
          path2.push(...key);
        } else if (typeof key === "string" && keySeparator) {
          path2.push(...key.split(keySeparator));
        } else {
          path2.push(key);
        }
      }
    }
    const result = getPath(this.data, path2);
    if (!result && !ns && !key && lng.indexOf(".") > -1) {
      lng = path2[0];
      ns = path2[1];
      key = path2.slice(2).join(".");
    }
    if (result || !ignoreJSONStructure || typeof key !== "string") return result;
    return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
  }
  addResource(lng, ns, key, value) {
    let options = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: false
    };
    const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
    let path2 = [lng, ns];
    if (key) path2 = path2.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf(".") > -1) {
      path2 = lng.split(".");
      value = ns;
      ns = path2[1];
    }
    this.addNamespaces(ns);
    setPath(this.data, path2, value);
    if (!options.silent) this.emit("added", lng, ns, key, value);
  }
  addResources(lng, ns, resources) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: false
    };
    for (const m2 in resources) {
      if (typeof resources[m2] === "string" || Array.isArray(resources[m2])) this.addResource(lng, ns, m2, resources[m2], {
        silent: true
      });
    }
    if (!options.silent) this.emit("added", lng, ns, resources);
  }
  addResourceBundle(lng, ns, resources, deep, overwrite) {
    let options = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: false,
      skipCopy: false
    };
    let path2 = [lng, ns];
    if (lng.indexOf(".") > -1) {
      path2 = lng.split(".");
      deep = resources;
      resources = ns;
      ns = path2[1];
    }
    this.addNamespaces(ns);
    let pack = getPath(this.data, path2) || {};
    if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
    if (deep) {
      deepExtend(pack, resources, overwrite);
    } else {
      pack = {
        ...pack,
        ...resources
      };
    }
    setPath(this.data, path2, pack);
    if (!options.silent) this.emit("added", lng, ns, resources);
  }
  removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);
    this.emit("removed", lng, ns);
  }
  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== void 0;
  }
  getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;
    if (this.options.compatibilityAPI === "v1") return {
      ...{},
      ...this.getResource(lng, ns)
    };
    return this.getResource(lng, ns);
  }
  getDataByLanguage(lng) {
    return this.data[lng];
  }
  hasLanguageSomeTranslations(lng) {
    const data = this.getDataByLanguage(lng);
    const n2 = data && Object.keys(data) || [];
    return !!n2.find((v2) => data[v2] && Object.keys(data[v2]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var postProcessor = {
  processors: {},
  addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle(processors, value, key, options, translator) {
    processors.forEach((processor) => {
      if (this.processors[processor]) value = this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};
const checkedLoadedFor = {};
class Translator extends EventEmitter {
  constructor(services) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super();
    copy(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], services, this);
    this.options = options;
    if (this.options.keySeparator === void 0) {
      this.options.keySeparator = ".";
    }
    this.logger = baseLogger.create("translator");
  }
  changeLanguage(lng) {
    if (lng) this.language = lng;
  }
  exists(key) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (key === void 0 || key === null) {
      return false;
    }
    const resolved = this.resolve(key, options);
    return resolved && resolved.res !== void 0;
  }
  extractFromKey(key, options) {
    let nsSeparator = options.nsSeparator !== void 0 ? options.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === void 0) nsSeparator = ":";
    const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
    let namespaces = options.ns || this.options.defaultNS || [];
    const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
    const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
    if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
      const m2 = key.match(this.interpolator.nestingRegexp);
      if (m2 && m2.length > 0) {
        return {
          key,
          namespaces
        };
      }
      const parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === "string") namespaces = [namespaces];
    return {
      key,
      namespaces
    };
  }
  translate(keys, options, lastKey) {
    if (typeof options !== "object" && this.options.overloadTranslationOptionHandler) {
      options = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (typeof options === "object") options = {
      ...options
    };
    if (!options) options = {};
    if (keys === void 0 || keys === null) return "";
    if (!Array.isArray(keys)) keys = [String(keys)];
    const returnDetails = options.returnDetails !== void 0 ? options.returnDetails : this.options.returnDetails;
    const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
    const {
      key,
      namespaces
    } = this.extractFromKey(keys[keys.length - 1], options);
    const namespace = namespaces[namespaces.length - 1];
    const lng = options.lng || this.language;
    const appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === "cimode") {
      if (appendNamespaceToCIMode) {
        const nsSeparator = options.nsSeparator || this.options.nsSeparator;
        if (returnDetails) {
          return {
            res: `${namespace}${nsSeparator}${key}`,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(options)
          };
        }
        return `${namespace}${nsSeparator}${key}`;
      }
      if (returnDetails) {
        return {
          res: key,
          usedKey: key,
          exactUsedKey: key,
          usedLng: lng,
          usedNS: namespace,
          usedParams: this.getUsedParamsDetails(options)
        };
      }
      return key;
    }
    const resolved = this.resolve(keys, options);
    let res = resolved && resolved.res;
    const resUsedKey = resolved && resolved.usedKey || key;
    const resExactUsedKey = resolved && resolved.exactUsedKey || key;
    const resType = Object.prototype.toString.apply(res);
    const noObject = ["[object Number]", "[object Function]", "[object RegExp]"];
    const joinArrays = options.joinArrays !== void 0 ? options.joinArrays : this.options.joinArrays;
    const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    const handleAsObject = typeof res !== "string" && typeof res !== "boolean" && typeof res !== "number";
    if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === "string" && Array.isArray(res))) {
      if (!options.returnObjects && !this.options.returnObjects) {
        if (!this.options.returnedObjectHandler) {
          this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        }
        const r2 = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, {
          ...options,
          ns: namespaces
        }) : `key '${key} (${this.language})' returned an object instead of string.`;
        if (returnDetails) {
          resolved.res = r2;
          resolved.usedParams = this.getUsedParamsDetails(options);
          return resolved;
        }
        return r2;
      }
      if (keySeparator) {
        const resTypeIsArray = Array.isArray(res);
        const copy2 = resTypeIsArray ? [] : {};
        const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (const m2 in res) {
          if (Object.prototype.hasOwnProperty.call(res, m2)) {
            const deepKey = `${newKeyToUse}${keySeparator}${m2}`;
            copy2[m2] = this.translate(deepKey, {
              ...options,
              ...{
                joinArrays: false,
                ns: namespaces
              }
            });
            if (copy2[m2] === deepKey) copy2[m2] = res[m2];
          }
        }
        res = copy2;
      }
    } else if (handleAsObjectInI18nFormat && typeof joinArrays === "string" && Array.isArray(res)) {
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, options, lastKey);
    } else {
      let usedDefault = false;
      let usedKey = false;
      const needsPluralHandling = options.count !== void 0 && typeof options.count !== "string";
      const hasDefaultValue = Translator.hasDefaultValue(options);
      const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : "";
      const defaultValueSuffixOrdinalFallback = options.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, {
        ordinal: false
      }) : "";
      const needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && this.pluralResolver.shouldUseIntlApi();
      const defaultValue = needsZeroSuffixLookup && options[`defaultValue${this.options.pluralSeparator}zero`] || options[`defaultValue${defaultValueSuffix}`] || options[`defaultValue${defaultValueSuffixOrdinalFallback}`] || options.defaultValue;
      if (!this.isValidLookup(res) && hasDefaultValue) {
        usedDefault = true;
        res = defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }
      const missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
      const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? void 0 : res;
      const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key, updateMissing ? defaultValue : res);
        if (keySeparator) {
          const fk2 = this.resolve(key, {
            ...options,
            keySeparator: false
          });
          if (fk2 && fk2.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let lngs = [];
        const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) {
          for (let i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === "all") {
          lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
        } else {
          lngs.push(options.lng || this.language);
        }
        const send = (l2, k2, specificDefaultValue) => {
          const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(l2, namespace, k2, defaultForMissing, updateMissing, options);
          } else if (this.backendConnector && this.backendConnector.saveMissing) {
            this.backendConnector.saveMissing(l2, namespace, k2, defaultForMissing, updateMissing, options);
          }
          this.emit("missingKey", l2, namespace, k2, res);
        };
        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach((language) => {
              const suffixes = this.pluralResolver.getSuffixes(language, options);
              if (needsZeroSuffixLookup && options[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) {
                suffixes.push(`${this.options.pluralSeparator}zero`);
              }
              suffixes.forEach((suffix) => {
                send([language], key + suffix, options[`defaultValue${suffix}`] || defaultValue);
              });
            });
          } else {
            send(lngs, key, defaultValue);
          }
        }
      }
      res = this.extendTranslation(res, keys, options, resolved, lastKey);
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}:${key}`;
      if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
        if (this.options.compatibilityAPI !== "v1") {
          res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}:${key}` : key, usedDefault ? res : void 0);
        } else {
          res = this.options.parseMissingKeyHandler(res);
        }
      }
    }
    if (returnDetails) {
      resolved.res = res;
      resolved.usedParams = this.getUsedParamsDetails(options);
      return resolved;
    }
    return res;
  }
  extendTranslation(res, key, options, resolved, lastKey) {
    var _this = this;
    if (this.i18nFormat && this.i18nFormat.parse) {
      res = this.i18nFormat.parse(res, {
        ...this.options.interpolation.defaultVariables,
        ...options
      }, options.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
        resolved
      });
    } else if (!options.skipInterpolation) {
      if (options.interpolation) this.interpolator.init({
        ...options,
        ...{
          interpolation: {
            ...this.options.interpolation,
            ...options.interpolation
          }
        }
      });
      const skipOnVariables = typeof res === "string" && (options && options.interpolation && options.interpolation.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let nestBef;
      if (skipOnVariables) {
        const nb2 = res.match(this.interpolator.nestingRegexp);
        nestBef = nb2 && nb2.length;
      }
      let data = options.replace && typeof options.replace !== "string" ? options.replace : options;
      if (this.options.interpolation.defaultVariables) data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
      res = this.interpolator.interpolate(res, data, options.lng || this.language || resolved.usedLng, options);
      if (skipOnVariables) {
        const na = res.match(this.interpolator.nestingRegexp);
        const nestAft = na && na.length;
        if (nestBef < nestAft) options.nest = false;
      }
      if (!options.lng && this.options.compatibilityAPI !== "v1" && resolved && resolved.res) options.lng = this.language || resolved.usedLng;
      if (options.nest !== false) res = this.interpolator.nest(res, function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (lastKey && lastKey[0] === args[0] && !options.context) {
          _this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
          return null;
        }
        return _this.translate(...args, key);
      }, options);
      if (options.interpolation) this.interpolator.reset();
    }
    const postProcess = options.postProcess || this.options.postProcess;
    const postProcessorNames = typeof postProcess === "string" ? [postProcess] : postProcess;
    if (res !== void 0 && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
        i18nResolved: {
          ...resolved,
          usedParams: this.getUsedParamsDetails(options)
        },
        ...options
      } : options, this);
    }
    return res;
  }
  resolve(keys) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let found;
    let usedKey;
    let exactUsedKey;
    let usedLng;
    let usedNS;
    if (typeof keys === "string") keys = [keys];
    keys.forEach((k2) => {
      if (this.isValidLookup(found)) return;
      const extracted = this.extractFromKey(k2, options);
      const key = extracted.key;
      usedKey = key;
      let namespaces = extracted.namespaces;
      if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
      const needsPluralHandling = options.count !== void 0 && typeof options.count !== "string";
      const needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && this.pluralResolver.shouldUseIntlApi();
      const needsContextHandling = options.context !== void 0 && (typeof options.context === "string" || typeof options.context === "number") && options.context !== "";
      const codes = options.lngs ? options.lngs : this.languageUtils.toResolveHierarchy(options.lng || this.language, options.fallbackLng);
      namespaces.forEach((ns) => {
        if (this.isValidLookup(found)) return;
        usedNS = ns;
        if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(usedNS)) {
          checkedLoadedFor[`${codes[0]}-${ns}`] = true;
          this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
        }
        codes.forEach((code) => {
          if (this.isValidLookup(found)) return;
          usedLng = code;
          const finalKeys = [key];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys) {
            this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
          } else {
            let pluralSuffix;
            if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, options.count, options);
            const zeroSuffix = `${this.options.pluralSeparator}zero`;
            const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (needsPluralHandling) {
              finalKeys.push(key + pluralSuffix);
              if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
              }
              if (needsZeroSuffixLookup) {
                finalKeys.push(key + zeroSuffix);
              }
            }
            if (needsContextHandling) {
              const contextKey = `${key}${this.options.contextSeparator}${options.context}`;
              finalKeys.push(contextKey);
              if (needsPluralHandling) {
                finalKeys.push(contextKey + pluralSuffix);
                if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                if (needsZeroSuffixLookup) {
                  finalKeys.push(contextKey + zeroSuffix);
                }
              }
            }
          }
          let possibleKey;
          while (possibleKey = finalKeys.pop()) {
            if (!this.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = this.getResource(code, ns, possibleKey, options);
            }
          }
        });
      });
    });
    return {
      res: found,
      usedKey,
      exactUsedKey,
      usedLng,
      usedNS
    };
  }
  isValidLookup(res) {
    return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
  }
  getResource(code, ns, key) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
    return this.resourceStore.getResource(code, ns, key, options);
  }
  getUsedParamsDetails() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const optionsKeys = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"];
    const useOptionsReplaceForData = options.replace && typeof options.replace !== "string";
    let data = useOptionsReplaceForData ? options.replace : options;
    if (useOptionsReplaceForData && typeof options.count !== "undefined") {
      data.count = options.count;
    }
    if (this.options.interpolation.defaultVariables) {
      data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
    }
    if (!useOptionsReplaceForData) {
      data = {
        ...data
      };
      for (const key of optionsKeys) {
        delete data[key];
      }
    }
    return data;
  }
  static hasDefaultValue(options) {
    const prefix2 = "defaultValue";
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option) && prefix2 === option.substring(0, prefix2.length) && void 0 !== options[option]) {
        return true;
      }
    }
    return false;
  }
}
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
class LanguageUtil {
  constructor(options) {
    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create("languageUtils");
  }
  getScriptPartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf("-") < 0) return null;
    const p2 = code.split("-");
    if (p2.length === 2) return null;
    p2.pop();
    if (p2[p2.length - 1].toLowerCase() === "x") return null;
    return this.formatLanguageCode(p2.join("-"));
  }
  getLanguagePartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf("-") < 0) return code;
    const p2 = code.split("-");
    return this.formatLanguageCode(p2[0]);
  }
  formatLanguageCode(code) {
    if (typeof code === "string" && code.indexOf("-") > -1) {
      const specialCases = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let p2 = code.split("-");
      if (this.options.lowerCaseLng) {
        p2 = p2.map((part) => part.toLowerCase());
      } else if (p2.length === 2) {
        p2[0] = p2[0].toLowerCase();
        p2[1] = p2[1].toUpperCase();
        if (specialCases.indexOf(p2[1].toLowerCase()) > -1) p2[1] = capitalize(p2[1].toLowerCase());
      } else if (p2.length === 3) {
        p2[0] = p2[0].toLowerCase();
        if (p2[1].length === 2) p2[1] = p2[1].toUpperCase();
        if (p2[0] !== "sgn" && p2[2].length === 2) p2[2] = p2[2].toUpperCase();
        if (specialCases.indexOf(p2[1].toLowerCase()) > -1) p2[1] = capitalize(p2[1].toLowerCase());
        if (specialCases.indexOf(p2[2].toLowerCase()) > -1) p2[2] = capitalize(p2[2].toLowerCase());
      }
      return p2.join("-");
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  }
  isSupportedCode(code) {
    if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
  }
  getBestMatchFromCodes(codes) {
    if (!codes) return null;
    let found;
    codes.forEach((code) => {
      if (found) return;
      const cleanedLng = this.formatLanguageCode(code);
      if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
    });
    if (!found && this.options.supportedLngs) {
      codes.forEach((code) => {
        if (found) return;
        const lngOnly = this.getLanguagePartFromCode(code);
        if (this.isSupportedCode(lngOnly)) return found = lngOnly;
        found = this.options.supportedLngs.find((supportedLng) => {
          if (supportedLng === lngOnly) return supportedLng;
          if (supportedLng.indexOf("-") < 0 && lngOnly.indexOf("-") < 0) return;
          if (supportedLng.indexOf("-") > 0 && lngOnly.indexOf("-") < 0 && supportedLng.substring(0, supportedLng.indexOf("-")) === lngOnly) return supportedLng;
          if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
        });
      });
    }
    if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
    return found;
  }
  getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === "function") fallbacks = fallbacks(code);
    if (typeof fallbacks === "string") fallbacks = [fallbacks];
    if (Array.isArray(fallbacks)) return fallbacks;
    if (!code) return fallbacks.default || [];
    let found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
    if (!found) found = fallbacks.default;
    return found || [];
  }
  toResolveHierarchy(code, fallbackCode) {
    const fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
    const codes = [];
    const addCode = (c) => {
      if (!c) return;
      if (this.isSupportedCode(c)) {
        codes.push(c);
      } else {
        this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
      }
    };
    if (typeof code === "string" && (code.indexOf("-") > -1 || code.indexOf("_") > -1)) {
      if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
      if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === "string") {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCodes.forEach((fc2) => {
      if (codes.indexOf(fc2) < 0) addCode(this.formatLanguageCode(fc2));
    });
    return codes;
  }
}
let sets = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he", "iw"],
  nr: [1, 2, 20, 21],
  fc: 22
}];
let _rulesPluralsTypes = {
  1: (n2) => Number(n2 > 1),
  2: (n2) => Number(n2 != 1),
  3: (n2) => 0,
  4: (n2) => Number(n2 % 10 == 1 && n2 % 100 != 11 ? 0 : n2 % 10 >= 2 && n2 % 10 <= 4 && (n2 % 100 < 10 || n2 % 100 >= 20) ? 1 : 2),
  5: (n2) => Number(n2 == 0 ? 0 : n2 == 1 ? 1 : n2 == 2 ? 2 : n2 % 100 >= 3 && n2 % 100 <= 10 ? 3 : n2 % 100 >= 11 ? 4 : 5),
  6: (n2) => Number(n2 == 1 ? 0 : n2 >= 2 && n2 <= 4 ? 1 : 2),
  7: (n2) => Number(n2 == 1 ? 0 : n2 % 10 >= 2 && n2 % 10 <= 4 && (n2 % 100 < 10 || n2 % 100 >= 20) ? 1 : 2),
  8: (n2) => Number(n2 == 1 ? 0 : n2 == 2 ? 1 : n2 != 8 && n2 != 11 ? 2 : 3),
  9: (n2) => Number(n2 >= 2),
  10: (n2) => Number(n2 == 1 ? 0 : n2 == 2 ? 1 : n2 < 7 ? 2 : n2 < 11 ? 3 : 4),
  11: (n2) => Number(n2 == 1 || n2 == 11 ? 0 : n2 == 2 || n2 == 12 ? 1 : n2 > 2 && n2 < 20 ? 2 : 3),
  12: (n2) => Number(n2 % 10 != 1 || n2 % 100 == 11),
  13: (n2) => Number(n2 !== 0),
  14: (n2) => Number(n2 == 1 ? 0 : n2 == 2 ? 1 : n2 == 3 ? 2 : 3),
  15: (n2) => Number(n2 % 10 == 1 && n2 % 100 != 11 ? 0 : n2 % 10 >= 2 && (n2 % 100 < 10 || n2 % 100 >= 20) ? 1 : 2),
  16: (n2) => Number(n2 % 10 == 1 && n2 % 100 != 11 ? 0 : n2 !== 0 ? 1 : 2),
  17: (n2) => Number(n2 == 1 || n2 % 10 == 1 && n2 % 100 != 11 ? 0 : 1),
  18: (n2) => Number(n2 == 0 ? 0 : n2 == 1 ? 1 : 2),
  19: (n2) => Number(n2 == 1 ? 0 : n2 == 0 || n2 % 100 > 1 && n2 % 100 < 11 ? 1 : n2 % 100 > 10 && n2 % 100 < 20 ? 2 : 3),
  20: (n2) => Number(n2 == 1 ? 0 : n2 == 0 || n2 % 100 > 0 && n2 % 100 < 20 ? 1 : 2),
  21: (n2) => Number(n2 % 100 == 1 ? 1 : n2 % 100 == 2 ? 2 : n2 % 100 == 3 || n2 % 100 == 4 ? 3 : 0),
  22: (n2) => Number(n2 == 1 ? 0 : n2 == 2 ? 1 : (n2 < 0 || n2 > 10) && n2 % 10 == 0 ? 2 : 3)
};
const nonIntlVersions = ["v1", "v2", "v3"];
const intlVersions = ["v4"];
const suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
const createRules = () => {
  const rules = {};
  sets.forEach((set2) => {
    set2.lngs.forEach((l2) => {
      rules[l2] = {
        numbers: set2.nr,
        plurals: _rulesPluralsTypes[set2.fc]
      };
    });
  });
  return rules;
};
class PluralResolver {
  constructor(languageUtils) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create("pluralResolver");
    if ((!this.options.compatibilityJSON || intlVersions.includes(this.options.compatibilityJSON)) && (typeof Intl === "undefined" || !Intl.PluralRules)) {
      this.options.compatibilityJSON = "v3";
      this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.");
    }
    this.rules = createRules();
    this.pluralRulesCache = {};
  }
  addRule(lng, obj) {
    this.rules[lng] = obj;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(code) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi()) {
      try {
        const cleanedCode = getCleanedCode(code === "dev" ? "en" : code);
        const type = options.ordinal ? "ordinal" : "cardinal";
        const cacheKey = JSON.stringify({
          cleanedCode,
          type
        });
        if (cacheKey in this.pluralRulesCache) {
          return this.pluralRulesCache[cacheKey];
        }
        const rule = new Intl.PluralRules(cleanedCode, {
          type
        });
        this.pluralRulesCache[cacheKey] = rule;
        return rule;
      } catch (err) {
        return;
      }
    }
    return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  }
  needsPlural(code) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const rule = this.getRule(code, options);
    if (this.shouldUseIntlApi()) {
      return rule && rule.resolvedOptions().pluralCategories.length > 1;
    }
    return rule && rule.numbers.length > 1;
  }
  getPluralFormsOfKey(code, key) {
    let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(code, options).map((suffix) => `${key}${suffix}`);
  }
  getSuffixes(code) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const rule = this.getRule(code, options);
    if (!rule) {
      return [];
    }
    if (this.shouldUseIntlApi()) {
      return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
    }
    return rule.numbers.map((number) => this.getSuffix(code, number, options));
  }
  getSuffix(code, count) {
    let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const rule = this.getRule(code, options);
    if (rule) {
      if (this.shouldUseIntlApi()) {
        return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count)}`;
      }
      return this.getSuffixRetroCompatible(rule, count);
    }
    this.logger.warn(`no plural rule found for: ${code}`);
    return "";
  }
  getSuffixRetroCompatible(rule, count) {
    const idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
    let suffix = rule.numbers[idx];
    if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
      if (suffix === 2) {
        suffix = "plural";
      } else if (suffix === 1) {
        suffix = "";
      }
    }
    const returnSuffix = () => this.options.prepend && suffix.toString() ? this.options.prepend + suffix.toString() : suffix.toString();
    if (this.options.compatibilityJSON === "v1") {
      if (suffix === 1) return "";
      if (typeof suffix === "number") return `_plural_${suffix.toString()}`;
      return returnSuffix();
    } else if (this.options.compatibilityJSON === "v2") {
      return returnSuffix();
    } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
      return returnSuffix();
    }
    return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
  }
  shouldUseIntlApi() {
    return !nonIntlVersions.includes(this.options.compatibilityJSON);
  }
}
const deepFindWithDefaults = function(data, defaultData, key) {
  let keySeparator = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".";
  let ignoreJSONStructure = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
  let path2 = getPathWithDefaults(data, defaultData, key);
  if (!path2 && ignoreJSONStructure && typeof key === "string") {
    path2 = deepFind(data, key, keySeparator);
    if (path2 === void 0) path2 = deepFind(defaultData, key, keySeparator);
  }
  return path2;
};
const regexSafe = (val) => val.replace(/\$/g, "$$$$");
class Interpolator {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = baseLogger.create("interpolator");
    this.options = options;
    this.format = options.interpolation && options.interpolation.format || ((value) => value);
    this.init(options);
  }
  init() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!options.interpolation) options.interpolation = {
      escapeValue: true
    };
    const {
      escape: escape$12,
      escapeValue,
      useRawValueToEscape,
      prefix: prefix2,
      prefixEscaped,
      suffix,
      suffixEscaped,
      formatSeparator,
      unescapeSuffix,
      unescapePrefix,
      nestingPrefix,
      nestingPrefixEscaped,
      nestingSuffix,
      nestingSuffixEscaped,
      nestingOptionsSeparator,
      maxReplaces,
      alwaysFormat
    } = options.interpolation;
    this.escape = escape$12 !== void 0 ? escape$12 : escape;
    this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
    this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
    this.prefix = prefix2 ? regexEscape(prefix2) : prefixEscaped || "{{";
    this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
    this.formatSeparator = formatSeparator || ",";
    this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix || "-";
    this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix || "";
    this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape("$t(");
    this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(")");
    this.nestingOptionsSeparator = nestingOptionsSeparator || ",";
    this.maxReplaces = maxReplaces || 1e3;
    this.alwaysFormat = alwaysFormat !== void 0 ? alwaysFormat : false;
    this.resetRegExp();
  }
  reset() {
    if (this.options) this.init(this.options);
  }
  resetRegExp() {
    const getOrResetRegExp = (existingRegExp, pattern) => {
      if (existingRegExp && existingRegExp.source === pattern) {
        existingRegExp.lastIndex = 0;
        return existingRegExp;
      }
      return new RegExp(pattern, "g");
    };
    this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
    this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
    this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`);
  }
  interpolate(str, data, lng, options) {
    let match;
    let value;
    let replaces;
    const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    const handleFormat = (key) => {
      if (key.indexOf(this.formatSeparator) < 0) {
        const path2 = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(path2, void 0, lng, {
          ...options,
          ...data,
          interpolationkey: key
        }) : path2;
      }
      const p2 = key.split(this.formatSeparator);
      const k2 = p2.shift().trim();
      const f2 = p2.join(this.formatSeparator).trim();
      return this.format(deepFindWithDefaults(data, defaultData, k2, this.options.keySeparator, this.options.ignoreJSONStructure), f2, lng, {
        ...options,
        ...data,
        interpolationkey: k2
      });
    };
    this.resetRegExp();
    const missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
    const skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    const todos = [{
      regex: this.regexpUnescape,
      safeValue: (val) => regexSafe(val)
    }, {
      regex: this.regexp,
      safeValue: (val) => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
    }];
    todos.forEach((todo) => {
      replaces = 0;
      while (match = todo.regex.exec(str)) {
        const matchedVar = match[1].trim();
        value = handleFormat(matchedVar);
        if (value === void 0) {
          if (typeof missingInterpolationHandler === "function") {
            const temp = missingInterpolationHandler(str, match, options);
            value = typeof temp === "string" ? temp : "";
          } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
            value = "";
          } else if (skipOnVariables) {
            value = match[0];
            continue;
          } else {
            this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
            value = "";
          }
        } else if (typeof value !== "string" && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        const safeValue = todo.safeValue(value);
        str = str.replace(match[0], safeValue);
        if (skipOnVariables) {
          todo.regex.lastIndex += value.length;
          todo.regex.lastIndex -= match[0].length;
        } else {
          todo.regex.lastIndex = 0;
        }
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
    });
    return str;
  }
  nest(str, fc2) {
    let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    let match;
    let value;
    let clonedOptions;
    const handleHasOptions = (key, inheritedOptions) => {
      const sep = this.nestingOptionsSeparator;
      if (key.indexOf(sep) < 0) return key;
      const c = key.split(new RegExp(`${sep}[ ]*{`));
      let optionsString = `{${c[1]}`;
      key = c[0];
      optionsString = this.interpolate(optionsString, clonedOptions);
      const matchedSingleQuotes = optionsString.match(/'/g);
      const matchedDoubleQuotes = optionsString.match(/"/g);
      if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
        optionsString = optionsString.replace(/'/g, '"');
      }
      try {
        clonedOptions = JSON.parse(optionsString);
        if (inheritedOptions) clonedOptions = {
          ...inheritedOptions,
          ...clonedOptions
        };
      } catch (e2) {
        this.logger.warn(`failed parsing options string in nesting for key ${key}`, e2);
        return `${key}${sep}${optionsString}`;
      }
      if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1) delete clonedOptions.defaultValue;
      return key;
    };
    while (match = this.nestingRegexp.exec(str)) {
      let formatters = [];
      clonedOptions = {
        ...options
      };
      clonedOptions = clonedOptions.replace && typeof clonedOptions.replace !== "string" ? clonedOptions.replace : clonedOptions;
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      let doReduce = false;
      if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
        const r2 = match[1].split(this.formatSeparator).map((elem) => elem.trim());
        match[1] = r2.shift();
        formatters = r2;
        doReduce = true;
      }
      value = fc2(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
      if (value && match[0] === str && typeof value !== "string") return value;
      if (typeof value !== "string") value = makeString(value);
      if (!value) {
        this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
        value = "";
      }
      if (doReduce) {
        value = formatters.reduce((v2, f2) => this.format(v2, f2, options.lng, {
          ...options,
          interpolationkey: match[1].trim()
        }), value.trim());
      }
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  }
}
const parseFormatStr = (formatStr) => {
  let formatName = formatStr.toLowerCase().trim();
  const formatOptions = {};
  if (formatStr.indexOf("(") > -1) {
    const p2 = formatStr.split("(");
    formatName = p2[0].toLowerCase().trim();
    const optStr = p2[1].substring(0, p2[1].length - 1);
    if (formatName === "currency" && optStr.indexOf(":") < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === "relativetime" && optStr.indexOf(":") < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      const opts = optStr.split(";");
      opts.forEach((opt) => {
        if (opt) {
          const [key, ...rest] = opt.split(":");
          const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
          const trimmedKey = key.trim();
          if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
          if (val === "false") formatOptions[trimmedKey] = false;
          if (val === "true") formatOptions[trimmedKey] = true;
          if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
        }
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
};
const createCachedFormatter = (fn) => {
  const cache = {};
  return (val, lng, options) => {
    let optForCache = options;
    if (options && options.interpolationkey && options.formatParams && options.formatParams[options.interpolationkey] && options[options.interpolationkey]) {
      optForCache = {
        ...optForCache,
        [options.interpolationkey]: void 0
      };
    }
    const key = lng + JSON.stringify(optForCache);
    let formatter = cache[key];
    if (!formatter) {
      formatter = fn(getCleanedCode(lng), options);
      cache[key] = formatter;
    }
    return formatter(val);
  };
};
class Formatter {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = baseLogger.create("formatter");
    this.options = options;
    this.formats = {
      number: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      }),
      currency: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt,
          style: "currency"
        });
        return (val) => formatter.format(val);
      }),
      datetime: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.DateTimeFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      }),
      relativetime: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.RelativeTimeFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val, opt.range || "day");
      }),
      list: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.ListFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      })
    };
    this.init(options);
  }
  init(services) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    const iOpts = options.interpolation;
    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ",";
  }
  add(name, fc2) {
    this.formats[name.toLowerCase().trim()] = fc2;
  }
  addCached(name, fc2) {
    this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc2);
  }
  format(value, format, lng) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const formats = format.split(this.formatSeparator);
    if (formats.length > 1 && formats[0].indexOf("(") > 1 && formats[0].indexOf(")") < 0 && formats.find((f2) => f2.indexOf(")") > -1)) {
      const lastIndex = formats.findIndex((f2) => f2.indexOf(")") > -1);
      formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
    }
    const result = formats.reduce((mem, f2) => {
      const {
        formatName,
        formatOptions
      } = parseFormatStr(f2);
      if (this.formats[formatName]) {
        let formatted = mem;
        try {
          const valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
          const l2 = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
          formatted = this.formats[formatName](mem, l2, {
            ...formatOptions,
            ...options,
            ...valOptions
          });
        } catch (error) {
          this.logger.warn(error);
        }
        return formatted;
      } else {
        this.logger.warn(`there was no format function for ${formatName}`);
      }
      return mem;
    }, value);
    return result;
  }
}
const removePending = (q2, name) => {
  if (q2.pending[name] !== void 0) {
    delete q2.pending[name];
    q2.pendingCount--;
  }
};
class Connector extends EventEmitter {
  constructor(backend, store, services) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super();
    this.backend = backend;
    this.store = store;
    this.services = services;
    this.languageUtils = services.languageUtils;
    this.options = options;
    this.logger = baseLogger.create("backendConnector");
    this.waitingReads = [];
    this.maxParallelReads = options.maxParallelReads || 10;
    this.readingCalls = 0;
    this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
    this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
    this.state = {};
    this.queue = [];
    if (this.backend && this.backend.init) {
      this.backend.init(services, options.backend, options);
    }
  }
  queueLoad(languages, namespaces, options, callback) {
    const toLoad = {};
    const pending = {};
    const toLoadLanguages = {};
    const toLoadNamespaces = {};
    languages.forEach((lng) => {
      let hasAllNamespaces = true;
      namespaces.forEach((ns) => {
        const name = `${lng}|${ns}`;
        if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
          this.state[name] = 2;
        } else if (this.state[name] < 0) ;
        else if (this.state[name] === 1) {
          if (pending[name] === void 0) pending[name] = true;
        } else {
          this.state[name] = 1;
          hasAllNamespaces = false;
          if (pending[name] === void 0) pending[name] = true;
          if (toLoad[name] === void 0) toLoad[name] = true;
          if (toLoadNamespaces[ns] === void 0) toLoadNamespaces[ns] = true;
        }
      });
      if (!hasAllNamespaces) toLoadLanguages[lng] = true;
    });
    if (Object.keys(toLoad).length || Object.keys(pending).length) {
      this.queue.push({
        pending,
        pendingCount: Object.keys(pending).length,
        loaded: {},
        errors: [],
        callback
      });
    }
    return {
      toLoad: Object.keys(toLoad),
      pending: Object.keys(pending),
      toLoadLanguages: Object.keys(toLoadLanguages),
      toLoadNamespaces: Object.keys(toLoadNamespaces)
    };
  }
  loaded(name, err, data) {
    const s = name.split("|");
    const lng = s[0];
    const ns = s[1];
    if (err) this.emit("failedLoading", lng, ns, err);
    if (!err && data) {
      this.store.addResourceBundle(lng, ns, data, void 0, void 0, {
        skipCopy: true
      });
    }
    this.state[name] = err ? -1 : 2;
    if (err && data) this.state[name] = 0;
    const loaded = {};
    this.queue.forEach((q2) => {
      pushPath(q2.loaded, [lng], ns);
      removePending(q2, name);
      if (err) q2.errors.push(err);
      if (q2.pendingCount === 0 && !q2.done) {
        Object.keys(q2.loaded).forEach((l2) => {
          if (!loaded[l2]) loaded[l2] = {};
          const loadedKeys = q2.loaded[l2];
          if (loadedKeys.length) {
            loadedKeys.forEach((n2) => {
              if (loaded[l2][n2] === void 0) loaded[l2][n2] = true;
            });
          }
        });
        q2.done = true;
        if (q2.errors.length) {
          q2.callback(q2.errors);
        } else {
          q2.callback();
        }
      }
    });
    this.emit("loaded", loaded);
    this.queue = this.queue.filter((q2) => !q2.done);
  }
  read(lng, ns, fcName) {
    let tried = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    let wait = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout;
    let callback = arguments.length > 5 ? arguments[5] : void 0;
    if (!lng.length) return callback(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng,
        ns,
        fcName,
        tried,
        wait,
        callback
      });
      return;
    }
    this.readingCalls++;
    const resolver = (err, data) => {
      this.readingCalls--;
      if (this.waitingReads.length > 0) {
        const next = this.waitingReads.shift();
        this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
      }
      if (err && data && tried < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    };
    const fc2 = this.backend[fcName].bind(this.backend);
    if (fc2.length === 2) {
      try {
        const r2 = fc2(lng, ns);
        if (r2 && typeof r2.then === "function") {
          r2.then((data) => resolver(null, data)).catch(resolver);
        } else {
          resolver(null, r2);
        }
      } catch (err) {
        resolver(err);
      }
      return;
    }
    return fc2(lng, ns, resolver);
  }
  prepareLoading(languages, namespaces) {
    let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    let callback = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend) {
      this.logger.warn("No backend was added via i18next.use. Will not load resources.");
      return callback && callback();
    }
    if (typeof languages === "string") languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === "string") namespaces = [namespaces];
    const toLoad = this.queueLoad(languages, namespaces, options, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback();
      return null;
    }
    toLoad.toLoad.forEach((name) => {
      this.loadOne(name);
    });
  }
  load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  }
  reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {
      reload: true
    }, callback);
  }
  loadOne(name) {
    let prefix2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const s = name.split("|");
    const lng = s[0];
    const ns = s[1];
    this.read(lng, ns, "read", void 0, void 0, (err, data) => {
      if (err) this.logger.warn(`${prefix2}loading namespace ${ns} for language ${lng} failed`, err);
      if (!err && data) this.logger.log(`${prefix2}loaded namespace ${ns} for language ${lng}`, data);
      this.loaded(name, err, data);
    });
  }
  saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
    let options = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
    let clb = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
      this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (key === void 0 || key === null || key === "") return;
    if (this.backend && this.backend.create) {
      const opts = {
        ...options,
        isUpdate
      };
      const fc2 = this.backend.create.bind(this.backend);
      if (fc2.length < 6) {
        try {
          let r2;
          if (fc2.length === 5) {
            r2 = fc2(languages, namespace, key, fallbackValue, opts);
          } else {
            r2 = fc2(languages, namespace, key, fallbackValue);
          }
          if (r2 && typeof r2.then === "function") {
            r2.then((data) => clb(null, data)).catch(clb);
          } else {
            clb(null, r2);
          }
        } catch (err) {
          clb(err);
        }
      } else {
        fc2(languages, namespace, key, fallbackValue, clb, opts);
      }
    }
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  }
}
const get = () => ({
  debug: false,
  initImmediate: true,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: false,
  supportedLngs: false,
  nonExplicitSupportedLngs: false,
  load: "all",
  preload: false,
  simplifyPluralSuffix: true,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  partialBundledLanguages: false,
  saveMissing: false,
  updateMissing: false,
  saveMissingTo: "fallback",
  saveMissingPlurals: true,
  missingKeyHandler: false,
  missingInterpolationHandler: false,
  postProcess: false,
  postProcessPassResolved: false,
  returnNull: false,
  returnEmptyString: true,
  returnObjects: false,
  joinArrays: false,
  returnedObjectHandler: false,
  parseMissingKeyHandler: false,
  appendNamespaceToMissingKey: false,
  appendNamespaceToCIMode: false,
  overloadTranslationOptionHandler: (args) => {
    let ret = {};
    if (typeof args[1] === "object") ret = args[1];
    if (typeof args[1] === "string") ret.defaultValue = args[1];
    if (typeof args[2] === "string") ret.tDescription = args[2];
    if (typeof args[2] === "object" || typeof args[3] === "object") {
      const options = args[3] || args[2];
      Object.keys(options).forEach((key) => {
        ret[key] = options[key];
      });
    }
    return ret;
  },
  interpolation: {
    escapeValue: true,
    format: (value) => value,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: true
  }
});
const transformOptions = (options) => {
  if (typeof options.ns === "string") options.ns = [options.ns];
  if (typeof options.fallbackLng === "string") options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === "string") options.fallbackNS = [options.fallbackNS];
  if (options.supportedLngs && options.supportedLngs.indexOf("cimode") < 0) {
    options.supportedLngs = options.supportedLngs.concat(["cimode"]);
  }
  return options;
};
const noop2 = () => {
};
const bindMemberFunctions = (inst) => {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach((mem) => {
    if (typeof inst[mem] === "function") {
      inst[mem] = inst[mem].bind(inst);
    }
  });
};
class I18n extends EventEmitter {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : void 0;
    super();
    this.options = transformOptions(options);
    this.services = {};
    this.logger = baseLogger;
    this.modules = {
      external: []
    };
    bindMemberFunctions(this);
    if (callback && !this.isInitialized && !options.isClone) {
      if (!this.options.initImmediate) {
        this.init(options, callback);
        return this;
      }
      setTimeout(() => {
        this.init(options, callback);
      }, 0);
    }
  }
  init() {
    var _this = this;
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : void 0;
    this.isInitializing = true;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!options.defaultNS && options.defaultNS !== false && options.ns) {
      if (typeof options.ns === "string") {
        options.defaultNS = options.ns;
      } else if (options.ns.indexOf("translation") < 0) {
        options.defaultNS = options.ns[0];
      }
    }
    const defOpts = get();
    this.options = {
      ...defOpts,
      ...this.options,
      ...transformOptions(options)
    };
    if (this.options.compatibilityAPI !== "v1") {
      this.options.interpolation = {
        ...defOpts.interpolation,
        ...this.options.interpolation
      };
    }
    if (options.keySeparator !== void 0) {
      this.options.userDefinedKeySeparator = options.keySeparator;
    }
    if (options.nsSeparator !== void 0) {
      this.options.userDefinedNsSeparator = options.nsSeparator;
    }
    const createClassOnDemand = (ClassOrObject) => {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === "function") return new ClassOrObject();
      return ClassOrObject;
    };
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }
      let formatter;
      if (this.modules.formatter) {
        formatter = this.modules.formatter;
      } else if (typeof Intl !== "undefined") {
        formatter = Formatter;
      }
      const lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);
      const s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
        s.formatter = createClassOnDemand(formatter);
        s.formatter.init(s, this.options);
        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
      }
      s.interpolator = new Interpolator(this.options);
      s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      };
      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      s.backendConnector.on("*", function(event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        _this.emit(event, ...args);
      });
      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
      }
      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init) s.i18nFormat.init(this);
      }
      this.translator = new Translator(this.services, this.options);
      this.translator.on("*", function(event) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        _this.emit(event, ...args);
      });
      this.modules.external.forEach((m2) => {
        if (m2.init) m2.init(this);
      });
    }
    this.format = this.options.interpolation.format;
    if (!callback) callback = noop2;
    if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
    }
    if (!this.services.languageDetector && !this.options.lng) {
      this.logger.warn("init: no languageDetector is used and no lng is defined");
    }
    const storeApi = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
    storeApi.forEach((fcName) => {
      this[fcName] = function() {
        return _this.store[fcName](...arguments);
      };
    });
    const storeApiChained = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
    storeApiChained.forEach((fcName) => {
      this[fcName] = function() {
        _this.store[fcName](...arguments);
        return _this;
      };
    });
    const deferred = defer();
    const load = () => {
      const finish = (err, t2) => {
        this.isInitializing = false;
        if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn("init: i18next is already initialized. You should call init just once!");
        this.isInitialized = true;
        if (!this.options.isClone) this.logger.log("initialized", this.options);
        this.emit("initialized", this.options);
        deferred.resolve(t2);
        callback(err, t2);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized) return finish(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, finish);
    };
    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }
    return deferred;
  }
  loadResources(language) {
    let callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop2;
    let usedCallback = callback;
    const usedLng = typeof language === "string" ? language : this.language;
    if (typeof language === "function") usedCallback = language;
    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (usedLng && usedLng.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
      const toLoad = [];
      const append = (lng) => {
        if (!lng) return;
        if (lng === "cimode") return;
        const lngs = this.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach((l2) => {
          if (l2 === "cimode") return;
          if (toLoad.indexOf(l2) < 0) toLoad.push(l2);
        });
      };
      if (!usedLng) {
        const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach((l2) => append(l2));
      } else {
        append(usedLng);
      }
      if (this.options.preload) {
        this.options.preload.forEach((l2) => append(l2));
      }
      this.services.backendConnector.load(toLoad, this.options.ns, (e2) => {
        if (!e2 && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
        usedCallback(e2);
      });
    } else {
      usedCallback(null);
    }
  }
  reloadResources(lngs, ns, callback) {
    const deferred = defer();
    if (typeof lngs === "function") {
      callback = lngs;
      lngs = void 0;
    }
    if (typeof ns === "function") {
      callback = ns;
      ns = void 0;
    }
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    if (!callback) callback = noop2;
    this.services.backendConnector.reload(lngs, ns, (err) => {
      deferred.resolve();
      callback(err);
    });
    return deferred;
  }
  use(module) {
    if (!module) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!module.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    if (module.type === "backend") {
      this.modules.backend = module;
    }
    if (module.type === "logger" || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }
    if (module.type === "languageDetector") {
      this.modules.languageDetector = module;
    }
    if (module.type === "i18nFormat") {
      this.modules.i18nFormat = module;
    }
    if (module.type === "postProcessor") {
      postProcessor.addPostProcessor(module);
    }
    if (module.type === "formatter") {
      this.modules.formatter = module;
    }
    if (module.type === "3rdParty") {
      this.modules.external.push(module);
    }
    return this;
  }
  setResolvedLanguage(l2) {
    if (!l2 || !this.languages) return;
    if (["cimode", "dev"].indexOf(l2) > -1) return;
    for (let li2 = 0; li2 < this.languages.length; li2++) {
      const lngInLngs = this.languages[li2];
      if (["cimode", "dev"].indexOf(lngInLngs) > -1) continue;
      if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
        this.resolvedLanguage = lngInLngs;
        break;
      }
    }
  }
  changeLanguage(lng, callback) {
    var _this2 = this;
    this.isLanguageChangingTo = lng;
    const deferred = defer();
    this.emit("languageChanging", lng);
    const setLngProps = (l2) => {
      this.language = l2;
      this.languages = this.services.languageUtils.toResolveHierarchy(l2);
      this.resolvedLanguage = void 0;
      this.setResolvedLanguage(l2);
    };
    const done = (err, l2) => {
      if (l2) {
        setLngProps(l2);
        this.translator.changeLanguage(l2);
        this.isLanguageChangingTo = void 0;
        this.emit("languageChanged", l2);
        this.logger.log("languageChanged", l2);
      } else {
        this.isLanguageChangingTo = void 0;
      }
      deferred.resolve(function() {
        return _this2.t(...arguments);
      });
      if (callback) callback(err, function() {
        return _this2.t(...arguments);
      });
    };
    const setLng = (lngs) => {
      if (!lng && !lngs && this.services.languageDetector) lngs = [];
      const l2 = typeof lngs === "string" ? lngs : this.services.languageUtils.getBestMatchFromCodes(lngs);
      if (l2) {
        if (!this.language) {
          setLngProps(l2);
        }
        if (!this.translator.language) this.translator.changeLanguage(l2);
        if (this.services.languageDetector && this.services.languageDetector.cacheUserLanguage) this.services.languageDetector.cacheUserLanguage(l2);
      }
      this.loadResources(l2, (err) => {
        done(err, l2);
      });
    };
    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      if (this.services.languageDetector.detect.length === 0) {
        this.services.languageDetector.detect().then(setLng);
      } else {
        this.services.languageDetector.detect(setLng);
      }
    } else {
      setLng(lng);
    }
    return deferred;
  }
  getFixedT(lng, ns, keyPrefix) {
    var _this3 = this;
    const fixedT = function(key, opts) {
      let options;
      if (typeof opts !== "object") {
        for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          rest[_key3 - 2] = arguments[_key3];
        }
        options = _this3.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      } else {
        options = {
          ...opts
        };
      }
      options.lng = options.lng || fixedT.lng;
      options.lngs = options.lngs || fixedT.lngs;
      options.ns = options.ns || fixedT.ns;
      if (options.keyPrefix !== "") options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
      const keySeparator = _this3.options.keySeparator || ".";
      let resultKey;
      if (options.keyPrefix && Array.isArray(key)) {
        resultKey = key.map((k2) => `${options.keyPrefix}${keySeparator}${k2}`);
      } else {
        resultKey = options.keyPrefix ? `${options.keyPrefix}${keySeparator}${key}` : key;
      }
      return _this3.t(resultKey, options);
    };
    if (typeof lng === "string") {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    fixedT.keyPrefix = keyPrefix;
    return fixedT;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  }
  hasLoadedNamespace(ns) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized) {
      this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
      return false;
    }
    if (!this.languages || !this.languages.length) {
      this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
      return false;
    }
    const lng = options.lng || this.resolvedLanguage || this.languages[0];
    const fallbackLng = this.options ? this.options.fallbackLng : false;
    const lastLng = this.languages[this.languages.length - 1];
    if (lng.toLowerCase() === "cimode") return true;
    const loadNotPending = (l2, n2) => {
      const loadState = this.services.backendConnector.state[`${l2}|${n2}`];
      return loadState === -1 || loadState === 0 || loadState === 2;
    };
    if (options.precheck) {
      const preResult = options.precheck(this, loadNotPending);
      if (preResult !== void 0) return preResult;
    }
    if (this.hasResourceBundle(lng, ns)) return true;
    if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
    return false;
  }
  loadNamespaces(ns, callback) {
    const deferred = defer();
    if (!this.options.ns) {
      if (callback) callback();
      return Promise.resolve();
    }
    if (typeof ns === "string") ns = [ns];
    ns.forEach((n2) => {
      if (this.options.ns.indexOf(n2) < 0) this.options.ns.push(n2);
    });
    this.loadResources((err) => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  loadLanguages(lngs, callback) {
    const deferred = defer();
    if (typeof lngs === "string") lngs = [lngs];
    const preloaded = this.options.preload || [];
    const newLngs = lngs.filter((lng) => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
    if (!newLngs.length) {
      if (callback) callback();
      return Promise.resolve();
    }
    this.options.preload = preloaded.concat(newLngs);
    this.loadResources((err) => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  dir(lng) {
    if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
    if (!lng) return "rtl";
    const rtlLngs = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"];
    const languageUtils = this.services && this.services.languageUtils || new LanguageUtil(get());
    return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : void 0;
    return new I18n(options, callback);
  }
  cloneInstance() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop2;
    const forkResourceStore = options.forkResourceStore;
    if (forkResourceStore) delete options.forkResourceStore;
    const mergedOptions = {
      ...this.options,
      ...options,
      ...{
        isClone: true
      }
    };
    const clone = new I18n(mergedOptions);
    if (options.debug !== void 0 || options.prefix !== void 0) {
      clone.logger = clone.logger.clone(options);
    }
    const membersToCopy = ["store", "services", "language"];
    membersToCopy.forEach((m2) => {
      clone[m2] = this[m2];
    });
    clone.services = {
      ...this.services
    };
    clone.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    if (forkResourceStore) {
      clone.store = new ResourceStore(this.store.data, mergedOptions);
      clone.services.resourceStore = clone.store;
    }
    clone.translator = new Translator(clone.services, mergedOptions);
    clone.translator.on("*", function(event) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      clone.emit(event, ...args);
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = mergedOptions;
    clone.translator.backendConnector.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    return clone;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;
instance.createInstance;
instance.dir;
instance.init;
instance.loadResources;
instance.reloadResources;
instance.use;
instance.changeLanguage;
instance.getFixedT;
instance.t;
instance.exists;
instance.setDefaultNamespace;
instance.hasLoadedNamespace;
instance.loadNamespaces;
instance.loadLanguages;
const {
  slice,
  forEach
} = [];
function defaults(obj) {
  forEach.call(slice.call(arguments, 1), (source) => {
    if (source) {
      for (const prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
const serializeCookie = (name, val, options) => {
  const opt = options || {};
  opt.path = opt.path || "/";
  const value = encodeURIComponent(val);
  let str = `${name}=${value}`;
  if (opt.maxAge > 0) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge)) throw new Error("maxAge should be a Number");
    str += `; Max-Age=${Math.floor(maxAge)}`;
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== "function") {
      throw new TypeError("option expires is invalid");
    }
    str += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) str += "; HttpOnly";
  if (opt.secure) str += "; Secure";
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
};
const cookie = {
  create(name, value, minutes, domain) {
    let cookieOptions = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      path: "/",
      sameSite: "strict"
    };
    if (minutes) {
      cookieOptions.expires = /* @__PURE__ */ new Date();
      cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1e3);
    }
    if (domain) cookieOptions.domain = domain;
    document.cookie = serializeCookie(name, encodeURIComponent(value), cookieOptions);
  },
  read(name) {
    const nameEQ = `${name}=`;
    const ca2 = document.cookie.split(";");
    for (let i = 0; i < ca2.length; i++) {
      let c = ca2[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  remove(name) {
    this.create(name, "", -1);
  }
};
var cookie$1 = {
  name: "cookie",
  // Deconstruct the options object and extract the lookupCookie property
  lookup(_ref) {
    let {
      lookupCookie
    } = _ref;
    if (lookupCookie && typeof document !== "undefined") {
      return cookie.read(lookupCookie) || void 0;
    }
    return void 0;
  },
  // Deconstruct the options object and extract the lookupCookie, cookieMinutes, cookieDomain, and cookieOptions properties
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupCookie,
      cookieMinutes,
      cookieDomain,
      cookieOptions
    } = _ref2;
    if (lookupCookie && typeof document !== "undefined") {
      cookie.create(lookupCookie, lng, cookieMinutes, cookieDomain, cookieOptions);
    }
  }
};
var querystring = {
  name: "querystring",
  // Deconstruct the options object and extract the lookupQuerystring property
  lookup(_ref) {
    var _a2;
    let {
      lookupQuerystring
    } = _ref;
    let found;
    if (typeof window !== "undefined") {
      let {
        search
      } = window.location;
      if (!window.location.search && ((_a2 = window.location.hash) == null ? void 0 : _a2.indexOf("?")) > -1) {
        search = window.location.hash.substring(window.location.hash.indexOf("?"));
      }
      const query = search.substring(1);
      const params = query.split("&");
      for (let i = 0; i < params.length; i++) {
        const pos = params[i].indexOf("=");
        if (pos > 0) {
          const key = params[i].substring(0, pos);
          if (key === lookupQuerystring) {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }
    return found;
  }
};
let hasLocalStorageSupport = null;
const localStorageAvailable = () => {
  if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;
  try {
    hasLocalStorageSupport = window !== "undefined" && window.localStorage !== null;
    const testKey = "i18next.translate.boo";
    window.localStorage.setItem(testKey, "foo");
    window.localStorage.removeItem(testKey);
  } catch (e2) {
    hasLocalStorageSupport = false;
  }
  return hasLocalStorageSupport;
};
var localStorage = {
  name: "localStorage",
  // Deconstruct the options object and extract the lookupLocalStorage property
  lookup(_ref) {
    let {
      lookupLocalStorage
    } = _ref;
    if (lookupLocalStorage && localStorageAvailable()) {
      return window.localStorage.getItem(lookupLocalStorage) || void 0;
    }
    return void 0;
  },
  // Deconstruct the options object and extract the lookupLocalStorage property
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupLocalStorage
    } = _ref2;
    if (lookupLocalStorage && localStorageAvailable()) {
      window.localStorage.setItem(lookupLocalStorage, lng);
    }
  }
};
let hasSessionStorageSupport = null;
const sessionStorageAvailable = () => {
  if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;
  try {
    hasSessionStorageSupport = window !== "undefined" && window.sessionStorage !== null;
    const testKey = "i18next.translate.boo";
    window.sessionStorage.setItem(testKey, "foo");
    window.sessionStorage.removeItem(testKey);
  } catch (e2) {
    hasSessionStorageSupport = false;
  }
  return hasSessionStorageSupport;
};
var sessionStorage = {
  name: "sessionStorage",
  lookup(_ref) {
    let {
      lookupSessionStorage
    } = _ref;
    if (lookupSessionStorage && sessionStorageAvailable()) {
      return window.sessionStorage.getItem(lookupSessionStorage) || void 0;
    }
    return void 0;
  },
  cacheUserLanguage(lng, _ref2) {
    let {
      lookupSessionStorage
    } = _ref2;
    if (lookupSessionStorage && sessionStorageAvailable()) {
      window.sessionStorage.setItem(lookupSessionStorage, lng);
    }
  }
};
var navigator$1 = {
  name: "navigator",
  lookup(options) {
    const found = [];
    if (typeof navigator !== "undefined") {
      const {
        languages,
        userLanguage,
        language
      } = navigator;
      if (languages) {
        for (let i = 0; i < languages.length; i++) {
          found.push(languages[i]);
        }
      }
      if (userLanguage) {
        found.push(userLanguage);
      }
      if (language) {
        found.push(language);
      }
    }
    return found.length > 0 ? found : void 0;
  }
};
var htmlTag = {
  name: "htmlTag",
  // Deconstruct the options object and extract the htmlTag property
  lookup(_ref) {
    let {
      htmlTag: htmlTag2
    } = _ref;
    let found;
    const internalHtmlTag = htmlTag2 || (typeof document !== "undefined" ? document.documentElement : null);
    if (internalHtmlTag && typeof internalHtmlTag.getAttribute === "function") {
      found = internalHtmlTag.getAttribute("lang");
    }
    return found;
  }
};
var path = {
  name: "path",
  // Deconstruct the options object and extract the lookupFromPathIndex property
  lookup(_ref) {
    var _a2;
    let {
      lookupFromPathIndex
    } = _ref;
    if (typeof window === "undefined") return void 0;
    const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
    if (!Array.isArray(language)) return void 0;
    const index2 = typeof lookupFromPathIndex === "number" ? lookupFromPathIndex : 0;
    return (_a2 = language[index2]) == null ? void 0 : _a2.replace("/", "");
  }
};
var subdomain = {
  name: "subdomain",
  lookup(_ref) {
    var _a2, _b2;
    let {
      lookupFromSubdomainIndex
    } = _ref;
    const internalLookupFromSubdomainIndex = typeof lookupFromSubdomainIndex === "number" ? lookupFromSubdomainIndex + 1 : 1;
    const language = typeof window !== "undefined" && ((_b2 = (_a2 = window.location) == null ? void 0 : _a2.hostname) == null ? void 0 : _b2.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i));
    if (!language) return void 0;
    return language[internalLookupFromSubdomainIndex];
  }
};
function getDefaults$1() {
  return {
    order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"],
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupSessionStorage: "i18nextLng",
    // cache user language
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"],
    // cookieMinutes: 10,
    // cookieDomain: 'myDomain'
    convertDetectedLanguage: (l2) => l2
  };
}
class Browser {
  constructor(services) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.type = "languageDetector";
    this.detectors = {};
    this.init(services, options);
  }
  init(services) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let i18nOptions2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.services = services || {
      languageUtils: {}
    };
    this.options = defaults(options, this.options || {}, getDefaults$1());
    if (typeof this.options.convertDetectedLanguage === "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1) {
      this.options.convertDetectedLanguage = (l2) => l2.replace("-", "_");
    }
    if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
    this.i18nOptions = i18nOptions2;
    this.addDetector(cookie$1);
    this.addDetector(querystring);
    this.addDetector(localStorage);
    this.addDetector(sessionStorage);
    this.addDetector(navigator$1);
    this.addDetector(htmlTag);
    this.addDetector(path);
    this.addDetector(subdomain);
  }
  addDetector(detector) {
    this.detectors[detector.name] = detector;
    return this;
  }
  detect(detectionOrder) {
    if (!detectionOrder) detectionOrder = this.options.order;
    let detected = [];
    detectionOrder.forEach((detectorName) => {
      if (this.detectors[detectorName]) {
        let lookup = this.detectors[detectorName].lookup(this.options);
        if (lookup && typeof lookup === "string") lookup = [lookup];
        if (lookup) detected = detected.concat(lookup);
      }
    });
    detected = detected.map((d) => this.options.convertDetectedLanguage(d));
    if (this.services.languageUtils.getBestMatchFromCodes) return detected;
    return detected.length > 0 ? detected[0] : null;
  }
  cacheUserLanguage(lng, caches) {
    if (!caches) caches = this.options.caches;
    if (!caches) return;
    if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
    caches.forEach((cacheName) => {
      if (this.detectors[cacheName]) this.detectors[cacheName].cacheUserLanguage(lng, this.options);
    });
  }
}
Browser.type = "languageDetector";
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function hasXMLHttpRequest() {
  return typeof XMLHttpRequest === "function" || (typeof XMLHttpRequest === "undefined" ? "undefined" : _typeof$2(XMLHttpRequest)) === "object";
}
function isPromise(maybePromise) {
  return !!maybePromise && typeof maybePromise.then === "function";
}
function makePromise(maybePromise) {
  if (isPromise(maybePromise)) {
    return maybePromise;
  }
  return Promise.resolve(maybePromise);
}
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var getFetch$1 = { exports: {} };
var browserPonyfill = { exports: {} };
var hasRequiredBrowserPonyfill;
function requireBrowserPonyfill() {
  if (hasRequiredBrowserPonyfill) return browserPonyfill.exports;
  hasRequiredBrowserPonyfill = 1;
  (function(module, exports) {
    var __global__ = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof commonjsGlobal !== "undefined" && commonjsGlobal;
    var __globalThis__ = function() {
      function F2() {
        this.fetch = false;
        this.DOMException = __global__.DOMException;
      }
      F2.prototype = __global__;
      return new F2();
    }();
    (function(globalThis2) {
      (function(exports2) {
        var global2 = typeof globalThis2 !== "undefined" && globalThis2 || typeof self !== "undefined" && self || typeof global2 !== "undefined" && global2;
        var support = {
          searchParams: "URLSearchParams" in global2,
          iterable: "Symbol" in global2 && "iterator" in Symbol,
          blob: "FileReader" in global2 && "Blob" in global2 && function() {
            try {
              new Blob();
              return true;
            } catch (e2) {
              return false;
            }
          }(),
          formData: "FormData" in global2,
          arrayBuffer: "ArrayBuffer" in global2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
            throw new TypeError('Invalid character in header field name: "' + name + '"');
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars2 = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars2[i] = String.fromCharCode(view[i]);
          }
          return chars2.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this.bodyUsed = this.bodyUsed;
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                var isConsumed = consumed(this);
                if (isConsumed) {
                  return isConsumed;
                }
                if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                  return Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                    )
                  );
                } else {
                  return Promise.resolve(this._bodyArrayBuffer);
                }
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode2);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          if (!(this instanceof Request)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          }
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
          if (this.method === "GET" || this.method === "HEAD") {
            if (options.cache === "no-store" || options.cache === "no-cache") {
              var reParamSearch = /([?&])_=[^&]*/;
              if (reParamSearch.test(this.url)) {
                this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
              } else {
                var reQueryString = /\?/;
                this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
              }
            }
          }
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode2(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split("\r").map(function(header) {
            return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
          }).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!(this instanceof Response)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          }
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = global2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init) {
          return new Promise(function(resolve, reject) {
            var request3 = new Request(input, init);
            if (request3.signal && request3.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              setTimeout(function() {
                resolve(new Response(body, options));
              }, 0);
            };
            xhr.onerror = function() {
              setTimeout(function() {
                reject(new TypeError("Network request failed"));
              }, 0);
            };
            xhr.ontimeout = function() {
              setTimeout(function() {
                reject(new TypeError("Network request failed"));
              }, 0);
            };
            xhr.onabort = function() {
              setTimeout(function() {
                reject(new exports2.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function fixUrl(url) {
              try {
                return url === "" && global2.location.href ? global2.location.href : url;
              } catch (e2) {
                return url;
              }
            }
            xhr.open(request3.method, fixUrl(request3.url), true);
            if (request3.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request3.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr) {
              if (support.blob) {
                xhr.responseType = "blob";
              } else if (support.arrayBuffer && request3.headers.get("Content-Type") && request3.headers.get("Content-Type").indexOf("application/octet-stream") !== -1) {
                xhr.responseType = "arraybuffer";
              }
            }
            if (init && typeof init.headers === "object" && !(init.headers instanceof Headers)) {
              Object.getOwnPropertyNames(init.headers).forEach(function(name) {
                xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
              });
            } else {
              request3.headers.forEach(function(value, name) {
                xhr.setRequestHeader(name, value);
              });
            }
            if (request3.signal) {
              request3.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request3.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request3._bodyInit === "undefined" ? null : request3._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!global2.fetch) {
          global2.fetch = fetch2;
          global2.Headers = Headers;
          global2.Request = Request;
          global2.Response = Response;
        }
        exports2.Headers = Headers;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch2;
        return exports2;
      })({});
    })(__globalThis__);
    __globalThis__.fetch.ponyfill = true;
    delete __globalThis__.fetch.polyfill;
    var ctx = __global__.fetch ? __global__ : __globalThis__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  })(browserPonyfill, browserPonyfill.exports);
  return browserPonyfill.exports;
}
(function(module, exports) {
  var fetchApi2;
  if (typeof fetch === "function") {
    if (typeof commonjsGlobal !== "undefined" && commonjsGlobal.fetch) {
      fetchApi2 = commonjsGlobal.fetch;
    } else if (typeof window !== "undefined" && window.fetch) {
      fetchApi2 = window.fetch;
    } else {
      fetchApi2 = fetch;
    }
  }
  if (typeof commonjsRequire !== "undefined" && typeof window === "undefined") {
    var f2 = fetchApi2 || requireBrowserPonyfill();
    if (f2.default) f2 = f2.default;
    exports.default = f2;
    module.exports = exports.default;
  }
})(getFetch$1, getFetch$1.exports);
var getFetchExports = getFetch$1.exports;
const getFetch = /* @__PURE__ */ getDefaultExportFromCjs(getFetchExports);
const fetchNode = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: getFetch
}, [getFetchExports]);
function ownKeys$1(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$1(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t2), true).forEach(function(r3) {
      _defineProperty$1(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$1(e2, r2, t2) {
  return (r2 = _toPropertyKey$1(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$1(t2) {
  var i = _toPrimitive$1(t2, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t2, r2) {
  if ("object" != _typeof$1(t2) || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2 || "default");
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
var fetchApi;
if (typeof fetch === "function") {
  if (typeof global !== "undefined" && global.fetch) {
    fetchApi = global.fetch;
  } else if (typeof window !== "undefined" && window.fetch) {
    fetchApi = window.fetch;
  } else {
    fetchApi = fetch;
  }
}
var XmlHttpRequestApi;
if (hasXMLHttpRequest()) {
  if (typeof global !== "undefined" && global.XMLHttpRequest) {
    XmlHttpRequestApi = global.XMLHttpRequest;
  } else if (typeof window !== "undefined" && window.XMLHttpRequest) {
    XmlHttpRequestApi = window.XMLHttpRequest;
  }
}
var ActiveXObjectApi;
if (typeof ActiveXObject === "function") {
  if (typeof global !== "undefined" && global.ActiveXObject) {
    ActiveXObjectApi = global.ActiveXObject;
  } else if (typeof window !== "undefined" && window.ActiveXObject) {
    ActiveXObjectApi = window.ActiveXObject;
  }
}
if (!fetchApi && fetchNode && !XmlHttpRequestApi && !ActiveXObjectApi) fetchApi = getFetch || fetchNode;
if (typeof fetchApi !== "function") fetchApi = void 0;
var addQueryString = function addQueryString2(url, params) {
  if (params && _typeof$1(params) === "object") {
    var queryString = "";
    for (var paramName in params) {
      queryString += "&" + encodeURIComponent(paramName) + "=" + encodeURIComponent(params[paramName]);
    }
    if (!queryString) return url;
    url = url + (url.indexOf("?") !== -1 ? "&" : "?") + queryString.slice(1);
  }
  return url;
};
var fetchIt = function fetchIt2(url, fetchOptions, callback, altFetch) {
  var resolver = function resolver2(response) {
    if (!response.ok) return callback(response.statusText || "Error", {
      status: response.status
    });
    response.text().then(function(data) {
      callback(null, {
        status: response.status,
        data
      });
    }).catch(callback);
  };
  if (altFetch) {
    var altResponse = altFetch(url, fetchOptions);
    if (altResponse instanceof Promise) {
      altResponse.then(resolver).catch(callback);
      return;
    }
  }
  if (typeof fetch === "function") {
    fetch(url, fetchOptions).then(resolver).catch(callback);
  } else {
    fetchApi(url, fetchOptions).then(resolver).catch(callback);
  }
};
var omitFetchOptions = false;
var requestWithFetch = function requestWithFetch2(options, url, payload, callback) {
  if (options.queryStringParams) {
    url = addQueryString(url, options.queryStringParams);
  }
  var headers = _objectSpread$1({}, typeof options.customHeaders === "function" ? options.customHeaders() : options.customHeaders);
  if (typeof window === "undefined" && typeof global !== "undefined" && typeof global.process !== "undefined" && global.process.versions && global.process.versions.node) {
    headers["User-Agent"] = "i18next-http-backend (node/".concat(global.process.version, "; ").concat(global.process.platform, " ").concat(global.process.arch, ")");
  }
  if (payload) headers["Content-Type"] = "application/json";
  var reqOptions = typeof options.requestOptions === "function" ? options.requestOptions(payload) : options.requestOptions;
  var fetchOptions = _objectSpread$1({
    method: payload ? "POST" : "GET",
    body: payload ? options.stringify(payload) : void 0,
    headers
  }, omitFetchOptions ? {} : reqOptions);
  var altFetch = typeof options.alternateFetch === "function" && options.alternateFetch.length >= 1 ? options.alternateFetch : void 0;
  try {
    fetchIt(url, fetchOptions, callback, altFetch);
  } catch (e2) {
    if (!reqOptions || Object.keys(reqOptions).length === 0 || !e2.message || e2.message.indexOf("not implemented") < 0) {
      return callback(e2);
    }
    try {
      Object.keys(reqOptions).forEach(function(opt) {
        delete fetchOptions[opt];
      });
      fetchIt(url, fetchOptions, callback, altFetch);
      omitFetchOptions = true;
    } catch (err) {
      callback(err);
    }
  }
};
var requestWithXmlHttpRequest = function requestWithXmlHttpRequest2(options, url, payload, callback) {
  if (payload && _typeof$1(payload) === "object") {
    payload = addQueryString("", payload).slice(1);
  }
  if (options.queryStringParams) {
    url = addQueryString(url, options.queryStringParams);
  }
  try {
    var x2;
    if (XmlHttpRequestApi) {
      x2 = new XmlHttpRequestApi();
    } else {
      x2 = new ActiveXObjectApi("MSXML2.XMLHTTP.3.0");
    }
    x2.open(payload ? "POST" : "GET", url, 1);
    if (!options.crossDomain) {
      x2.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    }
    x2.withCredentials = !!options.withCredentials;
    if (payload) {
      x2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    if (x2.overrideMimeType) {
      x2.overrideMimeType("application/json");
    }
    var h2 = options.customHeaders;
    h2 = typeof h2 === "function" ? h2() : h2;
    if (h2) {
      for (var i in h2) {
        x2.setRequestHeader(i, h2[i]);
      }
    }
    x2.onreadystatechange = function() {
      x2.readyState > 3 && callback(x2.status >= 400 ? x2.statusText : null, {
        status: x2.status,
        data: x2.responseText
      });
    };
    x2.send(payload);
  } catch (e2) {
    console && console.log(e2);
  }
};
var request = function request2(options, url, payload, callback) {
  if (typeof payload === "function") {
    callback = payload;
    payload = void 0;
  }
  callback = callback || function() {
  };
  if (fetchApi && url.indexOf("file:") !== 0) {
    return requestWithFetch(options, url, payload, callback);
  }
  if (hasXMLHttpRequest() || typeof ActiveXObject === "function") {
    return requestWithXmlHttpRequest(options, url, payload, callback);
  }
  callback(new Error("No fetch and no xhr implementation found!"));
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _classCallCheck(a, n2) {
  if (!(a instanceof n2)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e2, r2) {
  for (var t2 = 0; t2 < r2.length; t2++) {
    var o = r2[t2];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e2, _toPropertyKey(o.key), o);
  }
}
function _createClass(e2, r2, t2) {
  return r2 && _defineProperties(e2.prototype, r2), Object.defineProperty(e2, "prototype", { writable: false }), e2;
}
function _defineProperty(e2, r2, t2) {
  return (r2 = _toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey(t2) {
  var i = _toPrimitive(t2, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t2, r2) {
  if ("object" != _typeof(t2) || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2 || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var getDefaults = function getDefaults2() {
  return {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
    addPath: "/locales/add/{{lng}}/{{ns}}",
    parse: function parse(data) {
      return JSON.parse(data);
    },
    stringify: JSON.stringify,
    parsePayload: function parsePayload(namespace, key, fallbackValue) {
      return _defineProperty({}, key, fallbackValue || "");
    },
    parseLoadPayload: function parseLoadPayload(languages, namespaces) {
      return void 0;
    },
    request,
    reloadInterval: typeof window !== "undefined" ? false : 60 * 60 * 1e3,
    customHeaders: {},
    queryStringParams: {},
    crossDomain: false,
    withCredentials: false,
    overrideMimeType: false,
    requestOptions: {
      mode: "cors",
      credentials: "same-origin",
      cache: "default"
    }
  };
};
var Backend = function() {
  function Backend2(services) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var allOptions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    _classCallCheck(this, Backend2);
    this.services = services;
    this.options = options;
    this.allOptions = allOptions;
    this.type = "backend";
    this.init(services, options, allOptions);
  }
  return _createClass(Backend2, [{
    key: "init",
    value: function init(services) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var allOptions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      this.services = services;
      this.options = _objectSpread(_objectSpread(_objectSpread({}, getDefaults()), this.options || {}), options);
      this.allOptions = allOptions;
      if (this.services && this.options.reloadInterval) {
        var timer = setInterval(function() {
          return _this.reload();
        }, this.options.reloadInterval);
        if (_typeof(timer) === "object" && typeof timer.unref === "function") timer.unref();
      }
    }
  }, {
    key: "readMulti",
    value: function readMulti(languages, namespaces, callback) {
      this._readAny(languages, languages, namespaces, namespaces, callback);
    }
  }, {
    key: "read",
    value: function read(language, namespace, callback) {
      this._readAny([language], language, [namespace], namespace, callback);
    }
  }, {
    key: "_readAny",
    value: function _readAny(languages, loadUrlLanguages, namespaces, loadUrlNamespaces, callback) {
      var _this2 = this;
      var loadPath = this.options.loadPath;
      if (typeof this.options.loadPath === "function") {
        loadPath = this.options.loadPath(languages, namespaces);
      }
      loadPath = makePromise(loadPath);
      loadPath.then(function(resolvedLoadPath) {
        if (!resolvedLoadPath) return callback(null, {});
        var url = _this2.services.interpolator.interpolate(resolvedLoadPath, {
          lng: languages.join("+"),
          ns: namespaces.join("+")
        });
        _this2.loadUrl(url, callback, loadUrlLanguages, loadUrlNamespaces);
      });
    }
  }, {
    key: "loadUrl",
    value: function loadUrl(url, callback, languages, namespaces) {
      var _this3 = this;
      var lng = typeof languages === "string" ? [languages] : languages;
      var ns = typeof namespaces === "string" ? [namespaces] : namespaces;
      var payload = this.options.parseLoadPayload(lng, ns);
      this.options.request(this.options, url, payload, function(err, res) {
        if (res && (res.status >= 500 && res.status < 600 || !res.status)) return callback("failed loading " + url + "; status code: " + res.status, true);
        if (res && res.status >= 400 && res.status < 500) return callback("failed loading " + url + "; status code: " + res.status, false);
        if (!res && err && err.message && err.message.toLowerCase().indexOf("failed") > -1 && (err.message.indexOf("fetch") > -1 || err.message.toLowerCase().indexOf("network") > -1)) return callback("failed loading " + url + ": " + err.message, true);
        if (err) return callback(err, false);
        var ret, parseErr;
        try {
          if (typeof res.data === "string") {
            ret = _this3.options.parse(res.data, languages, namespaces);
          } else {
            ret = res.data;
          }
        } catch (e2) {
          parseErr = "failed parsing " + url + " to json";
        }
        if (parseErr) return callback(parseErr, false);
        callback(null, ret);
      });
    }
  }, {
    key: "create",
    value: function create2(languages, namespace, key, fallbackValue, callback) {
      var _this4 = this;
      if (!this.options.addPath) return;
      if (typeof languages === "string") languages = [languages];
      var payload = this.options.parsePayload(namespace, key, fallbackValue);
      var finished = 0;
      var dataArray = [];
      var resArray = [];
      languages.forEach(function(lng) {
        var addPath = _this4.options.addPath;
        if (typeof _this4.options.addPath === "function") {
          addPath = _this4.options.addPath(lng, namespace);
        }
        var url = _this4.services.interpolator.interpolate(addPath, {
          lng,
          ns: namespace
        });
        _this4.options.request(_this4.options, url, payload, function(data, res) {
          finished += 1;
          dataArray.push(data);
          resArray.push(res);
          if (finished === languages.length) {
            if (typeof callback === "function") callback(dataArray, resArray);
          }
        });
      });
    }
  }, {
    key: "reload",
    value: function reload() {
      var _this5 = this;
      var _this$services = this.services, backendConnector = _this$services.backendConnector, languageUtils = _this$services.languageUtils, logger = _this$services.logger;
      var currentLanguage = backendConnector.language;
      if (currentLanguage && currentLanguage.toLowerCase() === "cimode") return;
      var toLoad = [];
      var append = function append2(lng) {
        var lngs = languageUtils.toResolveHierarchy(lng);
        lngs.forEach(function(l2) {
          if (toLoad.indexOf(l2) < 0) toLoad.push(l2);
        });
      };
      append(currentLanguage);
      if (this.allOptions.preload) this.allOptions.preload.forEach(function(l2) {
        return append(l2);
      });
      toLoad.forEach(function(lng) {
        _this5.allOptions.ns.forEach(function(ns) {
          backendConnector.read(lng, ns, "read", null, null, function(err, data) {
            if (err) logger.warn("loading namespace ".concat(ns, " for language ").concat(lng, " failed"), err);
            if (!err && data) logger.log("loaded namespace ".concat(ns, " for language ").concat(lng), data);
            backendConnector.loaded("".concat(lng, "|").concat(ns), err, data);
          });
        });
      });
    }
  }]);
}();
Backend.type = "backend";
const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
const htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
};
const unescapeHtmlEntity = (m2) => htmlEntities[m2];
const unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);
let defaultOptions = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: true,
  unescape
};
const setDefaults = (options = {}) => {
  defaultOptions = {
    ...defaultOptions,
    ...options
  };
};
const initReactI18next = {
  type: "3rdParty",
  init(instance2) {
    setDefaults(instance2.options.react);
  }
};
const isProduction = true;
const defaultNS = "translations";
const i18nOptions = {
  defaultNS,
  ns: [defaultNS],
  debug: !isProduction,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
    // not needed for react as it escapes by default
  },
  backend: {
    loadPath: "locales/{{lng}}/translations.json"
  }
};
void instance.use(initReactI18next).use(Browser).use(Backend).init(i18nOptions);
const memoryHistory = createMemoryHistory({
  initialEntries: ["/"]
});
const router = createRouter({ routeTree, history: memoryHistory });
const rootElement = document.querySelector("#root");
if (!rootElement.innerHTML) {
  const root = client.createRoot(rootElement);
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: "loading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, { router }) })
  );
}
//# sourceMappingURL=index-CSLWkozQ.js.map
