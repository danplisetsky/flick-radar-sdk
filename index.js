"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superagent = require("superagent");
var prefix = require("superagent-prefix")("https://flick-radar-api.herokuapp.com");

// ================================

var generateRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var method = _ref2.method,
        path = _ref2.path,
        query = _ref2.query;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return method(path).query(query).use(prefix).timeout({
              response: 26000,
              deadline: 60000
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function generateRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

// ================================

exports.searchDirectors = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
    var query = _ref4.query,
        _ref4$lang = _ref4.lang,
        lang = _ref4$lang === undefined ? "en" : _ref4$lang;
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return generateRequest({
              method: superagent.get,
              path: "/directors",
              query: {
                query: query,
                lang: lang
              }
            });

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response.body.directors);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            console.log("error in searchDirectors in sdk: ", _context2.t0.response);
            throw new Error(_context2.t0.response.body.error.description);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// ================================

exports.getDirectorInfo = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref6) {
    var directorId = _ref6.directorId,
        _ref6$lang = _ref6.lang,
        lang = _ref6$lang === undefined ? "en" : _ref6$lang;
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return generateRequest({
              method: superagent.get,
              path: "/directors/director",
              query: {
                directorId: directorId,
                lang: lang
              }
            });

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response.body.directorInfo);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            console.log("error in getDirectorInfo in sdk: ", _context3.t0.response);
            throw new Error(_context3.t0.response.body.error.description);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
}();

// ================================

exports.getMoviesByDirector = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref8) {
    var directorId = _ref8.directorId,
        _ref8$lang = _ref8.lang,
        lang = _ref8$lang === undefined ? "en" : _ref8$lang;
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return generateRequest({
              method: superagent.get,
              path: "/directors/movies",
              query: {
                directorId: directorId,
                lang: lang
              }
            });

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response.body.movies);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            console.log("error in getMoviesByDirector in sdk: ", _context4.t0.response);
            throw new Error(_context4.t0.response.body.error.description);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function (_x4) {
    return _ref7.apply(this, arguments);
  };
}();

// ================================

exports.createUser = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref10) {
    var login = _ref10.login,
        email = _ref10.email,
        password = _ref10.password;
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return generateRequest({
              method: superagent.post,
              path: "/users",
              query: {
                login: login,
                email: email,
                password: password
              }
            });

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", {
              user: response.body.user
            });

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);

            console.log("error in createUser in sdk: ", _context5.t0.response);

            if (!(_context5.t0.response.body.error.errorCode === "u001")) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", {
              errorCode: "u001",
              duplicateFields: _context5.t0.response.body.error.duplicateFields
            });

          case 14:
            throw new Error(_context5.t0.response.body.error.description);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function (_x5) {
    return _ref9.apply(this, arguments);
  };
}();

// ================================

exports.login = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref12) {
    var loginOrEmail = _ref12.loginOrEmail,
        password = _ref12.password;
    var response;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return superagent.get("/login").auth(loginOrEmail, password).use(prefix);

          case 3:
            response = _context6.sent;
            return _context6.abrupt("return", response.body.user);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);

            console.log("error in login in sdk: ", _context6.t0.response);
            throw new Error(_context6.t0.response.error.status);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function (_x6) {
    return _ref11.apply(this, arguments);
  };
}();

// ================================

exports.addDirectorToFavorites = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref14) {
    var directorId = _ref14.directorId,
        directorName = _ref14.directorName,
        directorImage = _ref14.directorImage,
        userId = _ref14.userId;
    var response;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return generateRequest({
              method: superagent.put,
              path: "/users/director",
              query: {
                directorId: directorId,
                directorName: directorName,
                directorImage: directorImage,
                userId: userId
              }
            });

          case 3:
            response = _context7.sent;
            return _context7.abrupt("return", response.body.director);

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);

            console.log("error in addDirectorToFavorites in sdk: ", _context7.t0.response);

            if (!(_context7.t0.response.body.error && _context7.t0.response.body.error.errorCode === "u003")) {
              _context7.next = 14;
              break;
            }

            throw new Error(_context7.t0.response.body.error.description);

          case 14:
            throw new Error(_context7.t0.response.body.errorMessage);

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 7]]);
  }));

  return function (_x7) {
    return _ref13.apply(this, arguments);
  };
}();

// ================================

exports.getFavoriteDirectors = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(userId) {
    var response;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return generateRequest({
              method: superagent.get,
              path: "/users/directors",
              query: {
                userId: userId
              }
            });

          case 3:
            response = _context8.sent;
            return _context8.abrupt("return", response.body.favoriteDirectors);

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);

            console.log("error in getFavoriteDirectors in sdk :", _context8.t0);
            throw _context8.t0;

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 7]]);
  }));

  return function (_x8) {
    return _ref15.apply(this, arguments);
  };
}();

// ================================

exports.removeFromFavorites = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref17) {
    var userId = _ref17.userId,
        directorId = _ref17.directorId;
    var response;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return generateRequest({
              method: superagent.delete,
              path: "/users/director",
              query: {
                userId: userId,
                directorId: directorId
              }
            });

          case 3:
            response = _context9.sent;
            return _context9.abrupt("return", response);

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);

            console.log("error in removeFromFavorites in sdk: ", _context9.t0.response);

            if (!(_context9.t0.response.body.error && _context9.t0.response.body.error.errorCode === "u003")) {
              _context9.next = 14;
              break;
            }

            throw new Error(_context9.t0.response.body.error.description);

          case 14:
            throw new Error(_context9.t0.response.body.errorMessage);

          case 15:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 7]]);
  }));

  return function (_x9) {
    return _ref16.apply(this, arguments);
  };
}();

// ================================

/* exports.getFavoriteDirectorMovies = async ({ userId, directorId }) => {
  try {
    const response = await superagent
      .get("/users/director/movies")
      .query({
        userId,
        directorId
      })
      .use(prefix);

    return response.body.movies;
  } catch (error) {
    console.log("error :", error);
    return [];
  }
};
 */

// ================================

exports.toggleMovieWatched = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(_ref19) {
    var userId = _ref19.userId,
        directorId = _ref19.directorId,
        movieId = _ref19.movieId;
    var response;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return generateRequest({
              method: superagent.put,
              path: "/users/movie",
              query: {
                userId: userId,
                directorId: directorId,
                movieId: movieId
              }
            });

          case 3:
            response = _context10.sent;
            return _context10.abrupt("return", response.body.watched);

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);

            console.log("error in toggleMovieWatched in sdk: ", _context10.t0.response);
            throw new _context10.t0(_context10.t0.response.body.errorMessage);

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[0, 7]]);
  }));

  return function (_x10) {
    return _ref18.apply(this, arguments);
  };
}();

// ================================
