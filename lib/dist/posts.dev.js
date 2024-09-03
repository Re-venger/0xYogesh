"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoredFiles = getStoredFiles;
exports.getStoredFilesById = getStoredFilesById;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _grayMatter = _interopRequireDefault(require("gray-matter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// BASE PATH
var postsDirectory = _path["default"].join(process.cwd(), 'content'); // FETCHING ALL


function getStoredFiles() {
  var fileNames, allpostData;
  return regeneratorRuntime.async(function getStoredFiles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // reading the files
          fileNames = _fs["default"].readdirSync(postsDirectory); // getting and parsing the filecontent

          allpostData = fileNames.map(function (filename) {
            var id = filename.replace(/\.md$/, '');

            var fullpath = _path["default"].join(postsDirectory, filename);

            var fileContent = _fs["default"].readFileSync(fullpath, 'utf-8');

            var metadata = (0, _grayMatter["default"])(fileContent); // console.log(metadata.data);

            return _objectSpread({
              id: id
            }, metadata.data);
          });
          return _context.abrupt("return", allpostData.sort(function (_ref, _ref2) {
            var a = _ref.date;
            var b = _ref2.date;

            if (a < b) {
              return 1;
            } else if (a > b) {
              return -1;
            } else {
              return 0;
            }
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getStoredFilesById(slug) {
  var filename, fileContent, _matter, data, content;

  return regeneratorRuntime.async(function getStoredFilesById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          filename = _path["default"].join(postsDirectory, "".concat(slug, ".md"));
          fileContent = _fs["default"].readFileSync(filename, 'utf-8');
          _matter = (0, _grayMatter["default"])(fileContent), data = _matter.data, content = _matter.content; // console.log(data);

          return _context2.abrupt("return", _objectSpread({}, data, {
            // Metadata (e.g., title, date, author)
            content: content // The content of the markdown file

          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error reading file for slug ".concat(slug, ":"), _context2.t0);
          return _context2.abrupt("return", null);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}