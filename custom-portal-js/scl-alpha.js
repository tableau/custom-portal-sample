/*
 *  This is an unsupported, pre-release version of the forthcoming server client library for JavaScript.
 *  Included here to enable the browser to fetch objects from Tableau Server.
 */


var TableauServerClient =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _enums = __webpack_require__(2);

	var _server = __webpack_require__(3);

	var _server2 = _interopRequireDefault(_server);

	var _auth = __webpack_require__(17);

	var _auth2 = _interopRequireDefault(_auth);

	var _formats = __webpack_require__(5);

	var _requests = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var apiVersion = '2.5';

	function get_api_version() {
	  return apiVersion;
	}

	function set_api_version(value) {
	  apiVersion = value;
	}

	function normalize_base_url(url) {
	  var retval = url;
	  if (retval.endsWith('/')) {
	    retval = retval.substring(0, retval.length - 1);
	  }
	  if (!retval.startsWith('http')) {
	    retval = 'https://' + retval;
	  }

	  return '' + retval;
	}

	function api_url(url) {
	  var api_version = get_api_version();
	  return url + '/api/' + api_version;
	}

	var TableauServerClient = {
	  operators: _enums.Operator,
	  fields: _enums.Field,
	  formats: _formats.formats,
	  set_cors_proxy: _requests.set_cors_proxy,
	  set_format: _formats.set_formatter,
	  set_vesrion: set_api_version,
	  Auth: _auth2.default,
	  sign_in: function sign_in(serverName, authObj) {
	    var baseUrl = normalize_base_url(serverName);
	    return new Promise(function (resolve, reject) {
	      authObj.requestAuthFromServer(api_url(baseUrl)).then(function (value) {
	        var authToken = value.authToken;
	        var userId = value.userId;
	        var siteId = value.siteId;
	        var contentUrl = value.contentUrl;

	        resolve((0, _server2.default)(baseUrl, api_url(baseUrl), authToken, userId, siteId, contentUrl));
	      }).catch(reject);
	    });
	  }
	};

	exports.default = TableauServerClient;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Operator = exports.Operator = {
	  Equal: 'eq',
	  GreaterThan: 'gt',
	  GreaterThanOrEqual: 'gte',
	  LessThan: 'lt',
	  LessThanOrEqual: 'lte',
	  In: 'in'
	};

	var Field = exports.Field = {
	  CreatedAt: 'createdAt',
	  LastLogin: 'lastLogin',
	  Name: 'name',
	  OwnerName: 'ownerName',
	  Tag: 'tags',
	  UpdatedAt: 'updatedAt'
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _workbookList = __webpack_require__(4);

	var _workbookList2 = _interopRequireDefault(_workbookList);

	var _workbook = __webpack_require__(8);

	var _favoriteList = __webpack_require__(14);

	var _favoriteList2 = _interopRequireDefault(_favoriteList);

	var _requests = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function filter_options_to_string(option) {
	  // TODO: Adding url encoding
	  return option.field + ':' + option.operator + ':' + option.value;
	}

	function convertOptionsToQueryString(options) {
	  var values = [];

	  if (options.filter.value) {
	    values.push("filter=" + filter_options_to_string(options.filter));
	  }

	  return values.join("&");
	}

	var Server = function () {
	  function Server(baseUrl, apiUrl, authToken, userId, siteId, contentUrl) {
	    var _this = this;

	    _classCallCheck(this, Server);

	    this.baseUrl = baseUrl;
	    this.url = apiUrl + '/sites/' + siteId;
	    this.userId = userId;
	    this.siteId = siteId;
	    this.siteContentUrl = contentUrl;
	    this.requests = (0, _requests.wrapAuthentication)({ authToken: authToken });
	    this.workbooks = new _workbookList2.default(this);
	    this.workbook = function (id) {
	      return new _workbook.DeferredWorkbook(_this, id, {});
	    };
	    this.favorites = new _favoriteList2.default(this);
	  }

	  _createClass(Server, [{
	    key: 'getUrl',
	    value: function getUrl(path, options) {
	      var retval = this.url + '/' + path;
	      if (options && (options.filter.value || options.sort.value)) {
	        var queryString = convertOptionsToQueryString(options);
	        retval = retval + '?' + queryString;
	      }

	      return retval;
	    }
	  }]);

	  return Server;
	}();

	exports.default = function (hostname, apiUrl, authToken, userId, siteId) {
	  return new Server(hostname, apiUrl, authToken, userId, siteId);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formats = __webpack_require__(5);

	var _formats2 = _interopRequireDefault(_formats);

	var _workbook = __webpack_require__(8);

	var _workbook2 = _interopRequireDefault(_workbook);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// ES6 Hack for treating HTMLCollection as an array
	HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

	var WorkbookList = function () {
	  function WorkbookList(server) {
	    _classCallCheck(this, WorkbookList);

	    this.server = server;
	    this.baseUrl = "workbooks";
	  }

	  _createClass(WorkbookList, [{
	    key: 'get',
	    value: function get(o) {
	      var _this = this;

	      var options = o || {};
	      options.filter = options.filter || {};
	      options.sort = options.sort || {};
	      var url = this.server.getUrl(this.baseUrl, options);

	      return this.server.requests.get(url).then(function (response) {
	        return new Promise(function (done, err) {
	          var workbooks = WorkbookList.fromResponse(_this.server, response);
	          done({ server: _this.server, workbooks: workbooks });
	        });
	      });
	    }
	  }], [{
	    key: 'fromResponse',
	    value: function fromResponse(server, rawResp) {
	      var resp = (0, _formats2.default)().fromResponse(rawResp);
	      var pagination = resp.get('/pagination');
	      var workbooks = resp.getList('/workbooks/workbook').map(function (x) {
	        return _workbook2.default.fromResponse(server, x);
	      });

	      return workbooks;
	    }
	  }]);

	  return WorkbookList;
	}();

	exports.default = WorkbookList;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.formats = undefined;
	exports.set_formatter = set_formatter;

	exports.default = function () {
	  return formatter;
	};

	var _xml = __webpack_require__(6);

	var _xml2 = _interopRequireDefault(_xml);

	var _json = __webpack_require__(7);

	var _json2 = _interopRequireDefault(_json);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var formatter = _xml2.default;

	function set_formatter(type) {
	  switch (type) {
	    case _json2.default:
	      formatter = type;
	      break;
	    default:
	      formatter = _xml2.default;
	  }
	}

	var formats = exports.formats = {
	  JSON: _json2.default,
	  XML: _xml2.default
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _find_value(element, key) {
	  var possibleChildren = element.getElementsByTagName(key);
	  if (possibleChildren && possibleChildren.length == 1) {
	    return possibleChildren[0];
	  }

	  if (element.hasAttribute && element.hasAttribute(key)) {
	    return element.getAttribute(key);
	  }

	  return undefined;
	}

	var Response = function () {
	  function Response(response) {
	    _classCallCheck(this, Response);

	    // TODO: build response
	    this.response = response.activeElement || response;
	  }

	  _createClass(Response, [{
	    key: 'get',
	    value: function get(path) {
	      if (path.startsWith('/')) {
	        path = path.substring(1, path.length); // Chop off the leading '/'
	      }
	      var parts = path.split('/');
	      var currentElement = this.response;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var part = _step.value;

	          var nextPiece = _find_value(currentElement, part);
	          if (nextPiece === undefined) {
	            return undefined;
	          }

	          currentElement = nextPiece;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return currentElement;
	    }
	  }, {
	    key: 'has',
	    value: function has(path) {
	      return this.get(path) !== undefined;
	    }
	  }, {
	    key: 'getList',
	    value: function getList(path) {
	      var parts = path.split('/');
	      var listName = parts[parts.length - 1];
	      var baseParts = parts.slice(0, parts.length - 1).join('/'); // Remove the last portion
	      var parentValue = this.get(baseParts);
	      if (!parentValue) {
	        return []; // Empty List
	      }

	      return Array.from(parentValue.getElementsByTagName(listName));
	    }
	  }], [{
	    key: 'fromResponse',
	    value: function fromResponse(response) {
	      return new Response(response);
	    }
	  }]);

	  return Response;
	}();

	var toRequestMap = {
	  auth: function auth(data) {
	    var parser = new DOMParser();
	    var xmlDoc = parser.parseFromString('<tsRequest />', 'application/xml');
	    var root = xmlDoc.firstChild;
	    var credentials = xmlDoc.createElement('credentials');
	    var site = xmlDoc.createElement('site');

	    credentials.setAttribute('name', data.credentials.name);
	    credentials.setAttribute('password', data.credentials.password);

	    site.setAttribute('contentUrl', data.credentials.site.contentUrl);
	    credentials.appendChild(site);

	    if (data.credentials.loginAs) {
	      var impersonate = xmlDoc.createElement('user');
	      impersonate.setAttribute('id', data.credentials.loginAs.id);
	      credentials.appendChild(impersonate);
	    }

	    root.appendChild(credentials);

	    return new XMLSerializer().serializeToString(xmlDoc);
	  }
	};

	function toRequest(type, data) {
	  var func = toRequestMap[type];
	  if (!func) {
	    // TODO: Raise an error
	    return data;
	  }

	  return func(data);
	}

	exports.default = {
	  contentType: "application/xml",
	  responseBody: function responseBody(xhr) {
	    return xhr.responseXML;
	  },
	  fromResponse: function fromResponse(data) {
	    return Response.fromResponse(data);
	  },
	  toRequest: toRequest
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Response = function () {
	  function Response(response) {
	    _classCallCheck(this, Response);

	    // TODO: build response
	    this.response = response;
	  }

	  _createClass(Response, [{
	    key: "get",
	    value: function get(path) {
	      var parts = path.split('/');
	      var response = this.response;
	      return parts.reduce(function (element, key) {
	        if (key === "") {
	          return element;
	        }

	        return element[key];
	      }, response);
	    }
	  }, {
	    key: "getList",
	    value: function getList(path) {
	      return this.get(path);
	    }
	  }], [{
	    key: "fromResponse",
	    value: function fromResponse(response) {
	      return new Response(response);
	    }
	  }]);

	  return Response;
	}();

	exports.default = {
	  contentType: "application/json",
	  toRequest: function toRequest(_, data) {
	    return JSON.stringify(data);
	  },
	  fromResponse: function fromResponse(data) {
	    return Response.fromResponse(data);
	  },
	  responseBody: function responseBody(data) {
	    return JSON.parse(data.responseText);
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DeferredWorkbook = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formats = __webpack_require__(5);

	var _formats2 = _interopRequireDefault(_formats);

	var _previewImage = __webpack_require__(9);

	var _previewImage2 = _interopRequireDefault(_previewImage);

	var _view = __webpack_require__(10);

	var _view2 = _interopRequireDefault(_view);

	var _workbook = __webpack_require__(11);

	var _workbook2 = _interopRequireDefault(_workbook);

	var _viewList = __webpack_require__(12);

	var _viewList2 = _interopRequireDefault(_viewList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Workbook = function () {
	  // TODO: Property Bag should be a base class
	  function Workbook(server, properties) {
	    var _this = this;

	    _classCallCheck(this, Workbook);

	    if (server in properties) {
	      delete properties.server;
	    }
	    for (var idx in properties) {
	      this[idx] = properties[idx];
	    }

	    this.server = server;
	    var previewImageUrl = this.server.getUrl('workbooks/' + this.id + '/previewImage');
	    this._previewImage = new _previewImage2.default(function () {
	      return _this.server.requests.getPng(previewImageUrl);
	    });
	  }

	  _createClass(Workbook, [{
	    key: 'connections',
	    get: function get() {
	      var _this2 = this;

	      return new Promise(function (resolve, reject) {
	        resolve({ workbook: _this2, connections: [] });
	      });
	    }
	  }, {
	    key: 'views',
	    get: function get() {
	      var _this3 = this;

	      return _view2.default.getListFor(this.server, this.id).then(function (views) {
	        var viewList = _viewList2.default.fromResponse(_this3.server, _this3.id, views);
	        return Promise.resolve(viewList);
	      });
	    }
	  }, {
	    key: 'previewImage',
	    get: function get() {
	      var _this4 = this;

	      return new Promise(function (done, err) {
	        return _this4._previewImage.fetch().then(function (imageUrl) {
	          done({ workbook: _this4, imageUrl: imageUrl });
	        }).catch(err);
	      });
	    }
	  }], [{
	    key: 'fromResponse',
	    value: function fromResponse(server, rawResp) {
	      var response = (0, _formats2.default)().fromResponse(rawResp);
	      var data = {};

	      data.name = response.get('/name');
	      data.id = response.get('/id');
	      data.url = response.get('/contentUrl');
	      data.showTabs = response.get('/showTabs');
	      data.createdAt = response.get('/createdAt'); // TODO: Use moment js to parse
	      data.updatedAt = response.get('/updatedAt'); // TODO: Use moment js to parse
	      data.size = response.get('/size');
	      data.project = {
	        id: response.get('/project/id'),
	        name: response.get('/project/name')
	      };
	      data.owner = response.get('/owner/id');
	      data.tags = response.getList('/tags/tag').map(function (x) {
	        return (0, _formats2.default)().fromResponse(x).get('/label');
	      });
	      return new Workbook(server, data);
	    }
	  }]);

	  return Workbook;
	}();

	exports.default = Workbook;

	var DeferredWorkbook = exports.DeferredWorkbook = function () {
	  function DeferredWorkbook(server, workbook_id, properties) {
	    _classCallCheck(this, DeferredWorkbook);

	    if (server in properties) {
	      delete properties.server;
	    }
	    for (var idx in properties) {
	      this[idx] = properties[idx];
	    }

	    this.workbookId = workbook_id;
	    this.server = server;
	  }

	  _createClass(DeferredWorkbook, [{
	    key: 'populate',
	    value: function populate() {
	      var _this5 = this;

	      return _workbook2.default.getById(this.server, this.workbookId).then(function (value) {
	        return Workbook.fromResponse(_this5.server, value);
	      });
	    }
	  }], [{
	    key: 'fromResponse',
	    value: function fromResponse(server, response) {
	      var properties = {};
	      if (response.has('label')) {
	        properties.label = response.get('label');
	      }

	      var workbook_id = response.get('workbook/id');

	      return new DeferredWorkbook(server, workbook_id, properties);
	    }
	  }]);

	  return DeferredWorkbook;
	}();

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PreviewImage = function () {
	  function PreviewImage(getter) {
	    _classCallCheck(this, PreviewImage);

	    this.get = getter;
	    this._previewImage = undefined;
	  }

	  _createClass(PreviewImage, [{
	    key: "fetch",
	    value: function fetch() {
	      var _this = this;

	      if (this._previewImage) {
	        return Promise.resolve(this._previewImage);
	      }

	      return new Promise(function (done, err) {
	        return _this.get().then(function (response) {
	          _this._previewImage = URL.createObjectURL(response); // TODO: Need a polyfill
	          done(_this._previewImage);
	        }).catch(err);
	      });
	    }
	  }]);

	  return PreviewImage;
	}();

	exports.default = PreviewImage;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getListFor(server, workbookId) {
	  var url = server.getUrl("workbooks/" + workbookId + "/views");
	  return server.requests.get(url);
	}

	exports.default = {
	  getListFor: getListFor
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getById(server, workbookId) {
	  var url = server.getUrl("workbooks/" + workbookId);
	  return server.requests.get(url).then(function (value) {
	    return new Promise(function (done, err) {
	      console.dir(value);
	      var element = value.activeElement || value.firstChild;
	      console.dir(element);
	      done(element.firstChild);
	    });
	  });
	}

	exports.default = {
	  getById: getById
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _formats = __webpack_require__(5);

	var _formats2 = _interopRequireDefault(_formats);

	var _view = __webpack_require__(13);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// ES6 Hack for treating NodeList as an array
	NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

	function createListFromResponse(server, workbookId, rawResp) {
	  var views = (0, _formats2.default)().fromResponse(rawResp);
	  return views.getList('/views/view').map(function (x) {
	    return _view2.default.fromResponse(server, workbookId, x);
	  });
	}

	exports.default = {
	  fromResponse: createListFromResponse
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formats = __webpack_require__(5);

	var _formats2 = _interopRequireDefault(_formats);

	var _previewImage = __webpack_require__(9);

	var _previewImage2 = _interopRequireDefault(_previewImage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// export function foo(server, view_id) {
	//   return new Promise((done, err) => {
	//     return server.views.get(view_id).then((value) => {
	//       const {view} = value;
	//       done({server, view});
	//     }).catch(err);
	//   });
	// }
	//
	// export class DeferredView {
	//   constructor(server, label, view_id) {
	//     this.server = server;
	//     this.label = label;
	//     this.view_id = view_id;
	//   }
	//
	//   populate() {
	//     return new Promise((done, err) => {
	//       this.server.get()
	//     });
	//   }
	// }
	//
	// export function DeferredViewFromResponse(server, rawResp) {
	//   console.dir(rawResp);
	//   const resp = formatter().fromResponse(server, rawResp);
	//   const label = resp.get('label');
	//   const view_id = resp.get('view/id');
	//   return new DeferredView(server, label, view_id);
	// }

	var View = function () {
	  function View(server, workbookId, properties) {
	    var _this = this;

	    _classCallCheck(this, View);

	    if (server in properties) {
	      delete properties.server;
	    }

	    if (workbookId in properties) {
	      delete properties.workbookId;
	    }

	    for (var idx in properties) {
	      this[idx] = properties[idx];
	    }

	    this.server = server;
	    this.workbookId = workbookId;

	    var requestUrl = this.server.getUrl('workbooks/' + this.workbookId + '/views/' + this.id + '/previewImage');
	    this._previewImage = new _previewImage2.default(function () {
	      return _this.server.requests.getPng(requestUrl);
	    });
	  }

	  _createClass(View, [{
	    key: 'previewImage',
	    get: function get() {
	      var _this2 = this;

	      return new Promise(function (done, err) {
	        return _this2._previewImage.fetch().then(function (imageUrl) {
	          done({ view: _this2, imageUrl: imageUrl });
	        }).catch(err);
	      });
	    }
	  }], [{
	    key: 'fromResponse',
	    value: function fromResponse(server, workbookId, rawResp) {
	      var resp = (0, _formats2.default)().fromResponse(rawResp);
	      var data = {
	        id: resp.get('/id'),
	        name: resp.get('/name'),
	        url: resp.get('/contentUrl').replace('/sheets', '') // This is HACKY, why don't we return usable urls?
	      };
	      return new View(server, workbookId, data);
	    }
	  }]);

	  return View;
	}();

	exports.default = View;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formats = __webpack_require__(5);

	var _formats2 = _interopRequireDefault(_formats);

	var _favorite = __webpack_require__(15);

	var _favorite2 = _interopRequireDefault(_favorite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// ES6 Hack for treating HTMLCollection as an array
	HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

	var FavoriteList = function () {
	  function FavoriteList(server) {
	    _classCallCheck(this, FavoriteList);

	    this.server = server;
	    this.baseUrl = "favorites";
	  }

	  _createClass(FavoriteList, [{
	    key: 'get',
	    value: function get(o) {
	      var _this = this;

	      var options = o || {};
	      options.filter = options.filter || {};
	      options.sort = options.sort || {};
	      var url = this.server.getUrl(this.baseUrl + '/' + this.server.userId, options);

	      return this.server.requests.get(url).then(function (response) {
	        return new Promise(function (done, err) {
	          var favorites = FavoriteList.fromResponse(_this.server, response);
	          done({ server: _this.server, favorites: favorites });
	        });
	      });
	    }
	  }], [{
	    key: 'fromResponse',
	    value: function fromResponse(server, rawResp) {
	      var resp = (0, _formats2.default)().fromResponse(rawResp);
	      var pagination = resp.get('/pagination');
	      var favorites = resp.getList('/favorites/favorite').map(function (x) {
	        return _favorite2.default.fromResponse(server, x);
	      }).filter(function (x) {
	        return x !== undefined;
	      });
	      return favorites;
	    }
	  }]);

	  return FavoriteList;
	}();

	exports.default = FavoriteList;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formats = __webpack_require__(5);

	var _formats2 = _interopRequireDefault(_formats);

	var _workbook = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function get_deferred_factory(resp) {
	  if (resp.has('workbook')) {
	    return _workbook.DeferredWorkbook.fromResponse;
	  }

	  if (resp.has('view')) {
	    return undefined;
	  }

	  if (resp.has('datasource')) {
	    return undefined;
	  }
	}

	var Favorite = function () {
	  function Favorite() {
	    _classCallCheck(this, Favorite);
	  }

	  _createClass(Favorite, null, [{
	    key: 'fromResponse',
	    value: function fromResponse(server, rawResp) {
	      var resp = (0, _formats2.default)().fromResponse(rawResp);
	      var DeferredFactory = get_deferred_factory(resp);
	      if (DeferredFactory === undefined) {
	        return undefined;
	      }

	      return DeferredFactory(server, resp);
	    }
	  }]);

	  return Favorite;
	}();

	exports.default = Favorite;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.wrapAuthentication = wrapAuthentication;
	exports.set_cors_proxy = set_cors_proxy;

	var _formats = __webpack_require__(5);

	var _formats2 = _interopRequireDefault(_formats);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RequestObjectFactory = function () {
	  function RequestObjectFactory(ip, port) {
	    _classCallCheck(this, RequestObjectFactory);

	    if (ip !== undefined && port !== undefined) {
	      this.ip = ip;
	      this.port = port;
	    }
	  }

	  _createClass(RequestObjectFactory, [{
	    key: 'resolve_url',
	    value: function resolve_url(url) {
	      if (this.ip === undefined) {
	        return url;
	      }

	      return 'http://' + this.ip + ':' + this.port + '/' + url;
	    }
	  }, {
	    key: 'new_request',
	    value: function new_request(url, method, auth) {
	      var full_url = this.resolve_url(url);
	      var xhr = new XMLHttpRequest();
	      xhr.open(method, full_url);
	      if (auth) {
	        xhr.setRequestHeader('X-Tableau-Auth', auth.authToken);
	      }
	      return xhr;
	    }
	  }]);

	  return RequestObjectFactory;
	}();

	function doRESTRequest(url, method, body, auth) {
	  return new Promise(function (done, err) {
	    var xhr = requestFactory.new_request(url, method, auth);
	    xhr.setRequestHeader('Content-Type', (0, _formats2.default)().contentType);
	    xhr.setRequestHeader('Accept', (0, _formats2.default)().contentType);

	    xhr.onload = function () {

	      if (xhr.status === 200) {
	        var parsedBody = (0, _formats2.default)().responseBody(xhr);
	        done(parsedBody);
	      } else {
	        err(xhr.status + ' - ' + xhr.responseText);
	      }
	    };
	    xhr.send(body);
	  });
	}

	function doPNGRequest(url, _, auth) {
	  return new Promise(function (done, err) {
	    var xhr = requestFactory.new_request(url, 'GET', auth);
	    xhr.responseType = 'arraybuffer';

	    xhr.onload = function () {
	      var buffer = xhr.response;
	      if (buffer) {
	        var blob = new Blob([buffer], { type: "image/png" });
	        done(blob);
	      } else {
	        err('buffer was not created');
	      }
	    };
	    xhr.send(null);
	  });
	}

	var basicRequests = {
	  get: function get(url, body, auth) {
	    return doRESTRequest(url, 'GET', body, auth);
	  },
	  getPng: function getPng(url, _, auth) {
	    return doPNGRequest(url, null, auth);
	  },
	  post: function post(url, body, auth) {
	    return doRESTRequest(url, 'POST', body, auth);
	  }
	};

	function wrapAuthentication(auth) {
	  var attachFunction = function attachFunction(func, token) {
	    return function (url, body) {
	      return basicRequests[func](url, body, token);
	    };
	  };

	  var retval = {};
	  for (var method in basicRequests) {
	    if (basicRequests.hasOwnProperty(method)) {
	      retval[method] = attachFunction(method, auth);
	    }
	  }

	  return retval;
	}

	var requestFactory = new RequestObjectFactory();

	function set_cors_proxy(ip, port) {
	  requestFactory = new RequestObjectFactory(ip, port);
	}

	exports.default = basicRequests;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formats = __webpack_require__(5);

	var _formats2 = _interopRequireDefault(_formats);

	var _requests = __webpack_require__(16);

	var _requests2 = _interopRequireDefault(_requests);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TableauAuthScheme = function () {
	  function TableauAuthScheme(username, password, site, loginAs) {
	    _classCallCheck(this, TableauAuthScheme);

	    this.username = username;
	    this.password = password;
	    this.site = site || '';
	    this.loginAs = loginAs || null;
	  }

	  _createClass(TableauAuthScheme, [{
	    key: 'requestAuthFromServer',
	    value: function requestAuthFromServer(baseUrl) {
	      var requestUrl = baseUrl + '/auth/signin';
	      var requestBody = this.toRequest();
	      return new Promise(function (done, err) {
	        _requests2.default.post(requestUrl, requestBody).then(function (result) {
	          var data = TableauAuthScheme.fromResponse(result);
	          console.log('Logged in as ' + data.userId);
	          done(data);
	        }).catch(err);
	      });
	    }
	  }, {
	    key: 'toRequest',
	    value: function toRequest() {
	      var data = {
	        credentials: {
	          name: this.username,
	          password: this.password,
	          site: {
	            contentUrl: this.site
	          }
	        }
	      };

	      if (this.loginAs !== null) {
	        data.user = {
	          id: this.loginAs
	        };
	      }

	      return (0, _formats2.default)().toRequest('auth', data);
	    }
	  }], [{
	    key: 'fromResponse',
	    value: function fromResponse(rawResp) {
	      var response = (0, _formats2.default)().fromResponse(rawResp);

	      var authToken = response.get('/credentials/token');
	      var userId = response.get('/credentials/user/id');
	      var siteId = response.get('/credentials/site/id');
	      var contentUrl = response.get('/credentials/site/contentUrl');

	      return { authToken: authToken, userId: userId, siteId: siteId, contentUrl: contentUrl };
	    }
	  }]);

	  return TableauAuthScheme;
	}();

	exports.default = function (username, password, site, loginAs) {
	  return new TableauAuthScheme(username, password, site, loginAs);
	};

/***/ }
/******/ ]);