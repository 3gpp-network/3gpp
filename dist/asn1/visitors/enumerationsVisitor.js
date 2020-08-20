"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractParseTreeVisitor_1 = require("antlr4ts/tree/AbstractParseTreeVisitor");
const unimpl_1 = require("unimpl");
const extensionMarker_1 = require("../classes/extensionMarker");
const ASN_3gppParser_1 = require("../grammar/ASN_3gppParser");
const additionalEnumerationVisitor_1 = require("./additionalEnumerationVisitor");
const rootEnumerationVisitor_1 = require("./rootEnumerationVisitor");
/**
 * # Grammar
 * ```
 * enumerations: rootEnumeration (COMMA ELLIPSIS exceptionSpec? (COMMA additionalEnumeration)?)?
 * ```
 */
class EnumerationsVisitor extends AbstractParseTreeVisitor_1.AbstractParseTreeVisitor {
    visitChildren(ctx) {
        const enumerationItems = [];
        for (let i = 0; i < ctx.childCount; i++) {
            const childCtx = ctx.getChild(i);
            if (childCtx instanceof ASN_3gppParser_1.RootEnumerationContext) {
                const rootEnumeration = childCtx.accept(new rootEnumerationVisitor_1.RootEnumerationVisitor());
                enumerationItems.push(...rootEnumeration);
            }
            else if (childCtx instanceof ASN_3gppParser_1.ExceptionSpecContext) {
                unimpl_1.unimpl(ctx.text);
            }
            else if (childCtx instanceof ASN_3gppParser_1.AdditionalEnumerationContext) {
                const additionalEnumeration = childCtx.accept(new additionalEnumerationVisitor_1.AdditionalEnumerationVisitor());
                enumerationItems.push(...additionalEnumeration);
            }
            else {
                switch (childCtx.text) {
                    case ',': {
                        break;
                    }
                    case '...': {
                        enumerationItems.push(extensionMarker_1.ExtensionMarker.getInstance());
                        break;
                    }
                    default: {
                        throw Error(childCtx.text);
                    }
                }
            }
        }
        return enumerationItems;
    }
    defaultResult() {
        return [];
    }
}
exports.EnumerationsVisitor = EnumerationsVisitor;
//# sourceMappingURL=enumerationsVisitor.js.map