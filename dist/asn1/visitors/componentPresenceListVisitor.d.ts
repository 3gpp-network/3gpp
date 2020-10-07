import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { TypeConstraintsComponent } from '../classes/innerTypeConstraints';
import { ComponentPresenceListContext } from '../grammar/grammar3rdParser';
import { grammar3rdVisitor } from '../grammar/grammar3rdVisitor';
/**
 * # Grammar
 * ```
 * componentPresenceList: (componentPresence) (COMMA componentPresence)*
 * ```
 */
export declare class ComponentPresenceListVisitor extends AbstractParseTreeVisitor<TypeConstraintsComponent[]> implements grammar3rdVisitor<TypeConstraintsComponent[]> {
    visitChildren(ctx: ComponentPresenceListContext): TypeConstraintsComponent[];
    protected defaultResult(): TypeConstraintsComponent[];
}
//# sourceMappingURL=componentPresenceListVisitor.d.ts.map