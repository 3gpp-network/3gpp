"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractParseTreeVisitor_1 = require("antlr4ts/tree/AbstractParseTreeVisitor");
const nullType_1 = require("../classes/nullType");
const asnTypeVisitor_1 = require("./asnTypeVisitor");
/**
 * # Grammar
 * ```
 * typeAssignment: ASSIGN_OP asnType
 * ```
 */
class TypeAssignmentVisitor extends AbstractParseTreeVisitor_1.AbstractParseTreeVisitor {
    visitChildren(ctx) {
        const asnTypeCtx = ctx.asnType();
        return asnTypeCtx.accept(new asnTypeVisitor_1.AsnTypeVisitor());
    }
    defaultResult() {
        return nullType_1.NullType.getInstance();
    }
}
exports.TypeAssignmentVisitor = TypeAssignmentVisitor;
//# sourceMappingURL=typeAssignmentVisitor.js.map