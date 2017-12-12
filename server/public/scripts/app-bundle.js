define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'galleries',
        moduleId: './modules/galleries',
        name: 'Gallery',
        auth: true
      }, {
        route: 'pictures',
        moduleId: './modules/pictures',
        name: 'Pictures',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/galleries',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/galleries', '../resources/data/mypics'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _galleries, _mypics) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Gallery = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Gallery = exports.Gallery = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _galleries.Galleries, _mypics.MyPics), _dec(_class = function () {
        function Gallery(router, auth, galleries, mypics) {
            _classCallCheck(this, Gallery);

            this.router = router;
            this.galleries = galleries;
            this.auth = auth;
            this.mypics = mypics;
            this.message = 'Galleries';
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.showList = 'showGalleries';
        }

        Gallery.prototype.activate = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.galleries.getUserGallery(this.user._id);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function activate() {
                return _ref.apply(this, arguments);
            }

            return activate;
        }();

        Gallery.prototype.logout = function logout() {
            sessionStorage.removeItem('user');
            this.auth.logout();
        };

        Gallery.prototype.createGallery = function createGallery() {
            this.galleryObj = {
                gallery: "",
                description: "",

                userId: this.user._id
            };
            this.showList = 'showGalleriesForm';
        };

        Gallery.prototype.editGallery = function editGallery(gallery) {
            this.galleryObj = gallery;
            this.showList = 'showGalleriesForm';
        };

        Gallery.prototype.deleteGallery = function deleteGallery(gallery) {
            this.galleries.deleteGallery(gallery._id);
        };

        Gallery.prototype.savegallery = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.galleryObj) {
                                    _context2.next = 6;
                                    break;
                                }

                                _context2.next = 3;
                                return this.galleries.save(this.galleryObj);

                            case 3:
                                response = _context2.sent;

                                if (response.error) {
                                    alert("There was an error creating the pics");
                                }
                                this.showList = 'showGalleries';

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function savegallery() {
                return _ref2.apply(this, arguments);
            }

            return savegallery;
        }();

        Gallery.prototype.back = function back() {
            this.showList = 'showGalleries';
        };

        Gallery.prototype.givePictures = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(gallery) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                this.galleryId = gallery._id;
                                this.showList = 'showImages';
                                _context3.next = 4;
                                return this.mypics.getUserPics(this.galleryId);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function givePictures(_x) {
                return _ref3.apply(this, arguments);
            }

            return givePictures;
        }();

        Gallery.prototype.createPicture = function createPicture() {
            this.picsObj = {
                pics: "",
                description: "",
                dateDue: new Date(),
                userId: this.user._id,
                galleryId: this.galleryId
            };
            this.showList = 'showImagesForm';
        };

        Gallery.prototype.editPics = function editPics(pics) {
            this.picsObj = pics;
            this.showList = 'showImagesForm';
        };

        Gallery.prototype.deletePics = function deletePics(pics) {
            this.mypics.deletePics(pics._id);
        };

        Gallery.prototype.changeFiles = function changeFiles() {
            this.filesToUpload = new Array();
            this.filesToUpload.push(this.files[0]);
        };

        Gallery.prototype.removeFile = function removeFile(index) {
            this.filesToUpload.splice(index, 1);
        };

        Gallery.prototype.savepics = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                var response, picsId;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!this.picsObj) {
                                    _context4.next = 14;
                                    break;
                                }

                                _context4.next = 3;
                                return this.mypics.save(this.picsObj);

                            case 3:
                                response = _context4.sent;

                                if (!response.error) {
                                    _context4.next = 8;
                                    break;
                                }

                                alert("There was an error creating the pics");
                                _context4.next = 13;
                                break;

                            case 8:
                                picsId = response._id;

                                if (!(this.filesToUpload && this.filesToUpload.length)) {
                                    _context4.next = 13;
                                    break;
                                }

                                _context4.next = 12;
                                return this.mypics.uploadFile(this.filesToUpload, this.user._id, picsId);

                            case 12:
                                this.filesToUpload = [];

                            case 13:
                                this.showList = 'showImages';

                            case 14:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function savepics() {
                return _ref4.apply(this, arguments);
            }

            return savepics;
        }();

        Gallery.prototype.back = function back() {
            this.showList = 'showImages';
        };

        Gallery.prototype.back2 = function back2() {
            this.showList = 'showGalleries';
        };

        return Gallery;
    }()) || _class);
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
        function Home(router, users, auth) {
            _classCallCheck(this, Home);

            this.router = router;
            this.users = users;
            this.message = 'Photobook';
            this.showLogin = true;
            this.auth = auth;
            this.loginError = '';
        }

        Home.prototype.login = function login() {
            var _this = this;

            return this.auth.login(this.email, this.password).then(function (response) {
                sessionStorage.setItem("user", JSON.stringify(response.user));
                _this.loginError = "";
                _this.router.navigate('galleries');
            }).catch(function (error) {
                console.log(error);
                _this.loginError = "Invalid credentials.";
            });
        };

        Home.prototype.showRegister = function showRegister() {
            this.user = {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            };
            this.registerError = "";
            this.showLogin = false;
        };

        Home.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.users.save(this.user);

                            case 2:
                                serverResponse = _context.sent;

                                if (!serverResponse.error) {
                                    this.showLogin = true;
                                } else {
                                    this.registerError = "There was a problem registering the user.";
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save() {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Home;
    }()) || _class);
});
define('modules/pictures',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/mypics'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _mypics) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Pictures = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Pictures = exports.Pictures = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _mypics.MyPics), _dec(_class = function () {
        function Pictures(router, auth, mypics) {
            _classCallCheck(this, Pictures);

            this.router = router;
            this.mypics = mypics;
            this.auth = auth;
            this.message = 'Galleries';
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.showList = true;

            this.priorities = ['Low', 'Medium', 'High', 'Critical'];
        }

        Pictures.prototype.activate = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.mypics.getUserPics(this.user._id);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function activate() {
                return _ref.apply(this, arguments);
            }

            return activate;
        }();

        Pictures.prototype.logout = function logout() {
            sessionStorage.removeItem('user');
            this.auth.logout();
        };

        Pictures.prototype.createPicture = function createPicture() {
            this.picsObj = {
                pics: "",
                description: "",
                dateDue: new Date(),
                userId: this.user._id,
                priority: this.priorities[0]
            };
            this.showList = false;
        };

        Pictures.prototype.editPics = function editPics(pics) {
            this.picsObj = pics;
            this.showList = false;
        };

        Pictures.prototype.deletePics = function deletePics(pics) {
            this.mypics.deletePics(pics._id);
        };

        Pictures.prototype.changeFiles = function changeFiles() {
            this.filesToUpload = new Array();
            this.filesToUpload.push(this.files[0]);
        };

        Pictures.prototype.removeFile = function removeFile(index) {
            this.filesToUpload.splice(index, 1);
        };

        Pictures.prototype.savepics = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var response, picsId;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.picsObj) {
                                    _context2.next = 14;
                                    break;
                                }

                                _context2.next = 3;
                                return this.mypics.save(this.picsObj);

                            case 3:
                                response = _context2.sent;

                                if (!response.error) {
                                    _context2.next = 8;
                                    break;
                                }

                                alert("There was an error creating the pics");
                                _context2.next = 13;
                                break;

                            case 8:
                                picsId = response._id;

                                if (!(this.filesToUpload && this.filesToUpload.length)) {
                                    _context2.next = 13;
                                    break;
                                }

                                _context2.next = 12;
                                return this.mypics.uploadFile(this.filesToUpload, this.user._id, picsId);

                            case 12:
                                this.filesToUpload = [];

                            case 13:
                                this.showList = true;

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function savepics() {
                return _ref2.apply(this, arguments);
            }

            return savepics;
        }();

        Pictures.prototype.back = function back() {
            this.showList = true;
        };

        return Pictures;
    }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;
			this.BASE_URL = "http://localhost:5000/api/";
			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {
						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);
						console.log('Requesting ' + _request.method + ' ' + _request.url);
						return _request;
					},
					response: function response(_response) {
						console.log('Received ' + _response.status + ' ' + _response.url);
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/galleries',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Galleries = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Galleries = exports.Galleries = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Galleries(data) {
            _classCallCheck(this, Galleries);

            this.data = data;
            this.GALLERY_SERVICE = 'galleries';
            this.galleriesArray = [];
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.showList = true;
        }

        Galleries.prototype.getUserGallery = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.GALLERY_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.galleriesArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserGallery(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserGallery;
        }();

        Galleries.prototype.deleteGallery = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.delete(this.GALLERY_SERVICE + "/" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.galleriesArray.length; i++) {
                                        if (this.galleriesArray[i]._id === id) {
                                            this.galleriesArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function deleteGallery(_x2) {
                return _ref2.apply(this, arguments);
            }

            return deleteGallery;
        }();

        Galleries.prototype.uploadFile = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(files, userId, galleryId) {
                var formData, response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });

                                _context3.next = 4;
                                return this.data.uploadFiles(formData, this.GALLERY_SERVICE + "/upload/" + userId + "/" + galleryId);

                            case 4:
                                response = _context3.sent;
                                return _context3.abrupt('return', response);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function uploadFile(_x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return uploadFile;
        }();

        Galleries.prototype.save = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(gallery) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!gallery) {
                                    _context4.next = 14;
                                    break;
                                }

                                if (gallery._id) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.next = 4;
                                return this.data.post(gallery, this.GALLERY_SERVICE);

                            case 4:
                                serverResponse = _context4.sent;

                                if (!serverResponse.error) {
                                    this.galleriesArray.push(serverResponse);
                                }
                                return _context4.abrupt('return', serverResponse);

                            case 9:
                                _context4.next = 11;
                                return this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);

                            case 11:
                                _serverResponse = _context4.sent;

                                if (!_serverResponse.error) {}
                                return _context4.abrupt('return', _serverResponse);

                            case 14:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function save(_x6) {
                return _ref4.apply(this, arguments);
            }

            return save;
        }();

        return Galleries;
    }()) || _class);
});
define('resources/data/mypics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MyPics = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var MyPics = exports.MyPics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function MyPics(data) {
            _classCallCheck(this, MyPics);

            this.data = data;
            this.PICS_SERVICE = 'mypics';
            this.mypicsArray = [];
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.showList = true;
        }

        MyPics.prototype.getUserPics = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.PICS_SERVICE + "/gallery/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.mypicsArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserPics(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserPics;
        }();

        MyPics.prototype.deletePics = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.delete(this.PICS_SERVICE + "/" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.mypicsArray.length; i++) {
                                        if (this.mypicsArray[i]._id === id) {
                                            this.mypicsArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function deletePics(_x2) {
                return _ref2.apply(this, arguments);
            }

            return deletePics;
        }();

        MyPics.prototype.uploadFile = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(files, userId, picsId) {
                var formData, response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });

                                _context3.next = 4;
                                return this.data.uploadFiles(formData, this.PICS_SERVICE + "/upload/" + userId + "/" + picsId);

                            case 4:
                                response = _context3.sent;
                                return _context3.abrupt('return', response);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function uploadFile(_x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return uploadFile;
        }();

        MyPics.prototype.save = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(pics) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!pics) {
                                    _context4.next = 14;
                                    break;
                                }

                                if (pics._id) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.next = 4;
                                return this.data.post(pics, this.PICS_SERVICE);

                            case 4:
                                serverResponse = _context4.sent;

                                if (!serverResponse.error) {
                                    this.mypicsArray.push(serverResponse);
                                }
                                return _context4.abrupt('return', serverResponse);

                            case 9:
                                _context4.next = 11;
                                return this.data.put(pics, this.PICS_SERVICE + "/" + pics._id);

                            case 11:
                                _serverResponse = _context4.sent;

                                if (!_serverResponse.error) {}
                                return _context4.abrupt('return', _serverResponse);

                            case 14:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function save(_x6) {
                return _ref4.apply(this, arguments);
            }

            return save;
        }();

        return MyPics;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DateFormatValueConverter = undefined;

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
		function DateFormatValueConverter() {
			_classCallCheck(this, DateFormatValueConverter);
		}

		DateFormatValueConverter.prototype.toView = function toView(value) {
			if (value === undefined || value === null) {
				return;
			}

			return (0, _moment2.default)(value).format('MMM Do YYYY');
		};

		return DateFormatValueConverter;
	}();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\n        margin-right: 10px;\n    }\n    "; });
define('text!modules/galleries.html', ['module'], function(module) { module.exports = "<template><head><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><style type=\"text/css\">.container{position:absolute;left:0;right:0;height:100%;width:100%;margin:auto}</style></head><div class=\"container\">    <h1>${message}</h1>    <compose show.bind=\"showList == 'showGalleries'\" view=\"./components/galleryList.html\"></compose>    <compose show.bind=\"showList=='showGalleriesForm'\" view=\"./components/galleryForm.html\"></compose><compose show.bind=\"showList =='showImages'\" view=\"./components/picturesList.html\"></compose><compose show.bind=\"showList =='showImagesForm'\" view=\"./components/picturesForm.html\"></compose></div></template>"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><head><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><style type=\"text/css\">body{margin:0;padding:0;background:url(https://ak2.picdn.net/shutterstock/videos/4189474/thumb/7.jpg) no-repeat center fixed;background-size:100%}.container{position:absolute;left:0;right:0;height:100%;width:100%;margin-left:10px}.header{margin-left:10px}</style></head><body><div class=\"container\"></div><h1 class=\"header\">${message}</h1><compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose><compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></body></template>"; });
define('text!modules/pictures.html', ['module'], function(module) { module.exports = "<template><head><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><style type=\"text/css\">.container{position:absolute;left:0;right:0;height:100%;width:100%;margin:auto}</style></head><div class=\"container\">    <h1>${message}</h1>    <compose show.bind=\"showList == 'showGalleries'\" view=\"./components/picturesList.html\"></compose>    <compose show.bind=\"!showList\" view=\"./components/picturesForm.html\"></compose></div></template>"; });
define('text!modules/components/galleryForm.html', ['module'], function(module) { module.exports = "<template><head><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><style type=\"text/css\">.container{position:absolute;left:0;right:0;height:100%;width:100%;margin:auto}.card-img-overlay{margin:0 auto;float:none}body{margin:0;padding:0;background:url(https://ak2.picdn.net/shutterstock/videos/4189474/thumb/7.jpg) no-repeat center fixed;background-size:100%}</style></head><body><div class=\"container\"><div class=\"card-img-overlay\" style=\"width:50rem\"><img class=\"card-img-top\" src=\"...\" alt=\"Card image cap\"><div class=\"card-body\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group topMargin\"><label for=\"galleryInput\">Gallery *</label><input value.bind=\"galleryObj.gallery\" type=\"text\" class=\"form-control\" id=\"galleryInput\" aria-describedby=\"galleryHelp\" placeholder=\"Enter Gallery\"> <small id=\"galleryHelp\" class=\"form-text text-muted\">A short name for the Gallery.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"galleryObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><label for=\"dateChangedInput\">Date</label><flat-picker value.bind=\"galleryObj.dateChanged\"></flat-picker><small id=\"dateChangedHelp\" class=\"form-text text-muted\">The date gallery was created.</small></div><button click.trigger=\"savegallery()\" class=\"btn btn-primary topMargin\">Save</button></form></div></div></div></body></template>"; });
define('text!modules/components/galleryList.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"card-img-overlay\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i> </span><span class=\"rightMargin pull-right\"><i click.trigger=\"createGallery()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"galleries.galleriesArray.length\"><table class=\"table\"><thead><tr><th>Gallery</th><th>Description</th><th>Date Changed</th></tr></thead><tbody><tr repeat.for=\"gallery of galleries.galleriesArray\"><th click.trigger=\"givePictures(gallery)\">${gallery.gallery}</th><td click.trigger=\"givePictures(gallery)\">${gallery.description}</td><td click.trigger=\"givePictures(gallery)\">${gallery.dateChanged|dateFormat}</td><td><a href=\"http://localhost:5000/uploads/${user._id}/${gallery.file.filename}\" target=\"_blank\"></a></td><td><i click.trigger=\"editGallery(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteGallery(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!galleries.galleriesArray.length\"><h2>No pictures</h2></div></div></div></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><head><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><style type=\"text/css\">.card-img-overlay{margin:0 auto;float:none;top:30%}.card-img-top{font-weight:700;margin-left:10px}</style></head><div class=\"card-img-overlay\" style=\"width:40rem\"><img class=\"card-img-top\" src=\"...\" alt=\"Log in to view your photobook\"><div class=\"card-body\"><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><label for=\"email\">Email</label><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"><label for=\"password\">Password</label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"><button type=\"button\" class=\"btn btn-light\" click.trigger=\"login()\">Login</button> <span class=\"registerLink\" click.trigger=\"showRegister()\">Register</span></div></div></template>"; });
define('text!modules/components/picturesForm.html', ['module'], function(module) { module.exports = "<template><head><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><style type=\"text/css\">.container{position:absolute;left:0;right:0;height:100%;width:100%;margin:auto}.card-img-overlay{margin:0 auto;float:none}body{margin:0;padding:0;background:url(https://ak2.picdn.net/shutterstock/videos/4189474/thumb/7.jpg) no-repeat center fixed;background-size:100%}</style></head><body><div class=\"container\"><div class=\"card-img-overlay\" style=\"width:50rem\"><img class=\"card-img-top\" src=\"...\" alt=\"Card image cap\"><div class=\"card-body\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group topMargin\"><label for=\"picsInput\">Picture *</label><input value.bind=\"picsObj.pics\" type=\"text\" class=\"form-control\" id=\"picsInput\" aria-describedby=\"picsHelp\" placeholder=\"Enter MyPic\"> <small id=\"picsHelp\" class=\"form-text text-muted\">A short name for the Gallery.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"picsObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><label for=\"dueDateInput\">Upload Date</label><flat-picker value.bind=\"picsObj.dateDue\"></flat-picker><small id=\"dueDateHelp\" class=\"form-text text-muted\">The date to pics is due.</small></div><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Browse for files&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\" multiple=\"multiple\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload any files that will be useful.</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name} <span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div><button click.trigger=\"savepics()\" class=\"btn btn-primary topMargin\">Save</button></form></div></div></div></body></template>"; });
define('text!modules/components/picturesList.html', ['module'], function(module) { module.exports = "<template><head><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><style type=\"text/css\">.container{position:absolute;left:0;right:0;height:100%;width:100%;margin:auto}.rightMargin{margin-right:20px}body{margin:0;padding:0;background:url(https://ak2.picdn.net/shutterstock/videos/4189474/thumb/7.jpg) no-repeat center fixed;background-size:100%}</style></head><body><div class=\"container\"><div class=\"card-img-overlay\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><button class=\"rightMargin pull-right\" click.trigger=\"back2()\">Back to Galleries</button> <span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i> </span><span class=\"rightMargin pull-right\"><i click.trigger=\"createPicture()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"mypics.mypicsArray.length\"><table class=\"table\"><thead><tr><th>Mypics</th><th>Description</th></tr></thead><tbody><tr class=\"${pics.priority === 'Critical' ? 'table-secondary' : ' '} \" repeat.for=\"pics of mypics.mypicsArray\"><th>${pics.pics}</th><th>${pics.description}</th><td>${pics.dateDue|dateFormat}</td><td class=\"img-thumbnail\" alt=\"Cinque Terre\"><a href=\"http://localhost:5000/uploads/${user._id}/undefined/${pics.file.filename}\" target=\"_blank\"><img src=\"http://localhost:5000/uploads/${user._id}/undefined/${pics.file.filename}\" class=\"img-rounded\" style=\"height:50px;width:50px\" alt=\"Cinque Terre\"></a></td><td><i click.trigger=\"editPics(pics)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deletePics(pics)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!mypics.mypicsArray.length\"><h2>No pictures</h2></div></div></div></div></body></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template>First Name: <input value.bind=\"user.firstName\">     Last Name: <input value.bind=\"user.lastName\">     Email: <input value.bind=\"user.email\">     Password: <input value.bind=\"user.password\">     <button click.trigger=\"save()\">Save</button></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">        <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map