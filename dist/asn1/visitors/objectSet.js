"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractParseTreeVisitor_1 = require("antlr4ts/tree/AbstractParseTreeVisitor");
const objectSet_1 = require("../classes/objectSet");
const objectSetSpec_1 = require("./objectSetSpec");
/**
 * ANTLR4 grammar
 * ```
 * objectSet : L_BRACE objectSetSpec R_BRACE
 * ```
 */
class ObjectSetVisitor extends AbstractParseTreeVisitor_1.AbstractParseTreeVisitor {
    defaultResult() {
        return undefined;
    }
    visitChildren(objectSetCtx) {
        return new objectSet_1.ObjectSet(objectSetCtx.children[1].accept(new objectSetSpec_1.ObjectSetSpecVisitor()));
    }
}
exports.ObjectSetVisitor = ObjectSetVisitor;
