"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var responses = {
    NOT_FOUND: "There is no image in the images folder with the name your specified and the there is no 'images' folder.",
    OK: 'Request processing finished successfully.',
    BAD_REQUEST: "Make sure to define the needed imageName, width & height properties. And for the width & height to be numbers without 'px'.",
    INTERNAL_SERVER_ERROR: 'An error happened while processing the image and it was logged, try again later.'
};
var getResponseStatus = function (constant) {
    var statusCode = http_status_codes_1.StatusCodes[constant];
    var statusMessage = responses[constant];
    return { code: statusCode, message: statusMessage };
};
exports.default = getResponseStatus;
