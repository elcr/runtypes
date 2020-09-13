"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ValidationError = /** @class */ (function (_super) {
    tslib_1.__extends(ValidationError, _super);
    function ValidationError(message, key) {
        var _this = _super.call(this, key ? message + " in " + key : message) || this;
        _this.key = key;
        _this.name = 'ValidationError';
        Object.setPrototypeOf(_this, ValidationError.prototype);
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
//# sourceMappingURL=errors.js.map