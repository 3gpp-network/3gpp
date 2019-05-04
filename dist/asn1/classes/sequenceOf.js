"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var lodash_1 = require("lodash");
var logging_1 = require("../../utils/logging");
var base_1 = require("./base");
var SequenceOf = /** @class */ (function (_super) {
    __extends(SequenceOf, _super);
    function SequenceOf(type /* TODO */) {
        var _this = _super.call(this) || this;
        _this.type = type;
        return _this;
    }
    SequenceOf.prototype.setConstraint = function (constraint) {
        if ('value' in constraint) {
            this.size = constraint.value;
            delete constraint.value;
            this.sizeMin = null;
            this.sizeMax = null;
        }
        if ('min' in constraint && 'max' in constraint) {
            this.size = null;
            this.sizeMin = constraint.min;
            delete constraint.min;
            this.sizeMax = constraint.max;
            delete constraint.max;
        }
        if (!lodash_1.isEmpty(constraint)) {
            logging_1.log.warn("SequenceOf could not handle constraint " + JSON.stringify(constraint));
        }
        return this;
    };
    SequenceOf.prototype.expand = function () {
        // TODO
        return this;
    };
    SequenceOf.prototype.toString = function (depth) {
        if (depth === void 0) { depth = 0; }
        // TODO
        return null;
    };
    return SequenceOf;
}(base_1.Base));
exports.SequenceOf = SequenceOf;