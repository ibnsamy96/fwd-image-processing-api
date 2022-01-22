"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResizer = exports.home = void 0;
var path_1 = __importDefault(require("path"));
var handle_fs_1 = require("./handle-fs");
var handle_response_1 = __importDefault(require("./handle-response"));
var resize_image_1 = __importDefault(require("./resize-image"));
var validate_query_params_1 = __importDefault(require("./validate-query-params"));
var home = function (req, res) {
    res.json({
        message: 'Hello World 🌍'
    });
};
exports.home = home;
var imageResizer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imagesDirectories, imageName, _a, width, height, queriesValidationResult, isImageResized, isResizingCompleted, responseStatus_1, responseStatus;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                imagesDirectories = {
                    resized: ['..', 'public', 'thumbnails'],
                    main: ['..', 'public', 'images']
                };
                imageName = req.query.filename;
                _a = req.query, width = _a.width, height = _a.height;
                return [4 /*yield*/, (0, validate_query_params_1.default)(imageName, width, height, imagesDirectories)];
            case 1:
                queriesValidationResult = _d.sent();
                if (!queriesValidationResult.isQueriesValid) {
                    res.status((_b = queriesValidationResult.responseStatus) === null || _b === void 0 ? void 0 : _b.code).send(__assign({ error: (_c = queriesValidationResult.responseStatus) === null || _c === void 0 ? void 0 : _c.message }, queriesValidationResult.extraValues));
                }
                return [4 /*yield*/, handle_fs_1.createFolderIfNotExist.apply(void 0, imagesDirectories.resized)];
            case 2:
                _d.sent();
                return [4 /*yield*/, (0, handle_fs_1.isThisFileExist)("".concat(imageName, "-").concat(width, "-").concat(height, ".jpg"), path_1.default.join.apply(path_1.default, __spreadArray([__dirname], imagesDirectories.resized, false)))];
            case 3:
                isImageResized = _d.sent();
                if (!!isImageResized) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, resize_image_1.default)("".concat(imageName, ".jpg"), parseInt(width, 10), parseInt(height, 10), imagesDirectories.main, imagesDirectories.resized)];
            case 4:
                isResizingCompleted = _d.sent();
                if (!isResizingCompleted) {
                    responseStatus_1 = (0, handle_response_1.default)('INTERNAL_SERVER_ERROR');
                    res.status(responseStatus_1.code).send({ error: responseStatus_1.message });
                    return [2 /*return*/];
                }
                _d.label = 5;
            case 5:
                responseStatus = (0, handle_response_1.default)('OK');
                res
                    .status(responseStatus.code)
                    .sendFile(path_1.default.join.apply(path_1.default, __spreadArray(__spreadArray([__dirname], imagesDirectories.resized, false), ["".concat(imageName, "-").concat(width, "-").concat(height, ".jpg")], false)));
                return [2 /*return*/];
        }
    });
}); };
exports.imageResizer = imageResizer;
