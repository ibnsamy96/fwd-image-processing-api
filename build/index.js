"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv = __importStar(require("dotenv"));
var handle_fs_1 = require("./handle-fs");
var handle_response_1 = __importDefault(require("./handle-response"));
var resize_image_1 = __importDefault(require("./resize-image"));
dotenv.config();
var PORT = process.env.PORT || 3000;
// create an instance server
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World 🌍'
    });
});
app.get('/resize-image', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imagesDirectories, imageName, _a, width, height, responseStatus_1, isImageExist, responseStatus_2, responseStatus_3, isImageResized, isResizingCompleted, responseStatus_4, responseStatus;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                imagesDirectories = {
                    resized: 'thumbnails',
                    main: 'images'
                };
                imageName = req.query.filename;
                _a = req.query, width = _a.width, height = _a.height;
                if (!imageName) {
                    responseStatus_1 = (0, handle_response_1.default)('BAD_REQUEST');
                    res.status(responseStatus_1.code).send({
                        error: responseStatus_1.message,
                        'received-imageName': imageName
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, handle_fs_1.isThisFileExist)("".concat(imageName, ".jpg"), path_1.default.join(__dirname, imagesDirectories.main))];
            case 1:
                isImageExist = _b.sent();
                if (!isImageExist) {
                    responseStatus_2 = (0, handle_response_1.default)('NOT_FOUND');
                    res
                        .status(responseStatus_2.code)
                        .send({ error: responseStatus_2.message, 'received-imageName': imageName });
                    return [2 /*return*/];
                }
                if (!width || !height || Number.isNaN(Number(width)) || Number.isNaN(Number(height))) {
                    responseStatus_3 = (0, handle_response_1.default)('BAD_REQUEST');
                    res
                        .status(responseStatus_3.code)
                        .send({ error: responseStatus_3.message, 'received-width': width, 'received-height': height });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, handle_fs_1.createFolderIfNotExist)('thumbnails')];
            case 2:
                _b.sent();
                return [4 /*yield*/, (0, handle_fs_1.isThisFileExist)("".concat(imageName, "-").concat(width, "-").concat(height, ".jpg"), path_1.default.join(__dirname, imagesDirectories.resized))];
            case 3:
                isImageResized = _b.sent();
                if (!!isImageResized) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, resize_image_1.default)("".concat(imageName, ".jpg"), parseInt(width, 10), parseInt(height, 10), imagesDirectories.main, imagesDirectories.resized)];
            case 4:
                isResizingCompleted = _b.sent();
                if (!isResizingCompleted) {
                    responseStatus_4 = (0, handle_response_1.default)('INTERNAL_SERVER_ERROR');
                    res.status(responseStatus_4.code).send({ error: responseStatus_4.message });
                    return [2 /*return*/];
                }
                _b.label = 5;
            case 5:
                responseStatus = (0, handle_response_1.default)('OK');
                res
                    .status(responseStatus.code)
                    .sendFile("".concat(__dirname, "/thumbnails/").concat(imageName, "-").concat(width, "-").concat(height, ".jpg"));
                return [2 /*return*/];
        }
    });
}); });
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at port:".concat(PORT));
});
exports.default = app;
