"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handle_response_1 = __importDefault(require("../handle-response"));
describe('test getting response status', function () {
    it('test status message type', function () {
        var result = (0, handle_response_1.default)('OK');
        expect(result.message).toBeInstanceOf(String);
    });
    it('test status code', function () {
        var result = (0, handle_response_1.default)('OK');
        expect(result.code).toBeInstanceOf(Number);
    });
});
