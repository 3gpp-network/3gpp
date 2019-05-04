"use strict";
exports.__esModule = true;
/**
 * ANTLR4 grammar
 * ```
 * enumeratedValue  : IDENTIFIER
 * ```
 */
var EnumeratedValueVisitor = /** @class */ (function () {
    function EnumeratedValueVisitor() {
    }
    EnumeratedValueVisitor.prototype.visitChildren = function (enumeratedValueCtx) {
        return enumeratedValueCtx.getText();
    };
    return EnumeratedValueVisitor;
}());
exports.EnumeratedValueVisitor = EnumeratedValueVisitor;