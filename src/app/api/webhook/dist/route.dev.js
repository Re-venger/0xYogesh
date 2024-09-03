"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _child_process = require("child_process");

var _server = require("next/server");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var REPO_DIR = _path["default"].join(process.cwd(), 'path/to/your/local/repo');

var CONTENT_DIR = _path["default"].join(process.cwd(), 'content');

function POST(req) {
  var payload, ref;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(req.json());

        case 2:
          payload = _context.sent;
          ref = payload.ref;

          if (ref === 'refs/heads/main') {
            // Pull the latest changes from GitHub
            (0, _child_process.exec)("git -C ".concat(REPO_DIR, " pull"), function (err) {
              if (err) {
                console.error('Error pulling repo:', err);
                return _server.NextResponse.json({
                  error: 'Failed to pull repository'
                }, {
                  status: 500
                });
              } // Sync files to content directory


              (0, _child_process.exec)("rsync -av --delete ".concat(REPO_DIR, "/ ").concat(CONTENT_DIR), function (err) {
                if (err) {
                  console.error('Error syncing files:', err);
                  return _server.NextResponse.json({
                    error: 'Failed to sync files'
                  }, {
                    status: 500
                  });
                }
              });
            });
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: 'Webhook received'
          }, {
            status: 200
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}