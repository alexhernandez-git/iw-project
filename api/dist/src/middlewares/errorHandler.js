"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = function (err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!err)
            next();
        err.statusCode = err.statusCode || 500;
        err.message = err.message || 'Something went wrong!';
        res.status(err.statusCode).json({ success: false, message: err.message, data: err.data });
    });
};
