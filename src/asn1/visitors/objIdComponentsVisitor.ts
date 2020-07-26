import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { todo, unimpl } from 'unimpl';
import {
  BuiltinTypeContext,
  DefinedValueContext,
  ObjIdComponentsContext,
} from '../grammar/ASN_3gppParser';
import { ASN_3gppVisitor } from '../grammar/ASN_3gppVisitor';
import { ObjectIdComponents } from '../types';
import { BuiltinTypeVisitor } from './builtinTypeVisitor';
import { ConstraintVisitor } from './constraintVisitor';

/**
 * # Grammar
 * ```
 * objIdComponents:
 *     NUMBER
 *   | IDENTIFIER (L_PARAN (NUMBER | definedValue ) R_PARAN)?
 *   | definedValue
 *   // 3GPP-specific: Syntactic sugar for {BIT, OCTET} STRING and other complex definition
 *   | builtinType constraint?
 * ```
 */
export class ObjIdComponentsVisitor
  extends AbstractParseTreeVisitor<ObjectIdComponents>
  implements ASN_3gppVisitor<ObjectIdComponents> {
  public visitChildren(ctx: ObjIdComponentsContext): ObjectIdComponents {
    const { childCount } = ctx;
    const firstCtx = ctx.getChild(0);
    if (firstCtx instanceof DefinedValueContext) {
      return todo();
    } else if (firstCtx instanceof BuiltinTypeContext) {
      const builtinType = firstCtx.accept(new BuiltinTypeVisitor());
      const constraintCtx = ctx.constraint();
      if (constraintCtx !== undefined) {
        const constraint = constraintCtx.accept(new ConstraintVisitor());
        builtinType.setConstraints([constraint]);
      }
      return builtinType;
    } else {
      const firstText = firstCtx.text;
      if (isNaN(+firstText)) {
        if (childCount > 1) {
          return todo();
        }
        return firstText;
      } else {
        return todo();
      }
    }
  }

  protected defaultResult(): ObjectIdComponents {
    return unimpl();
  }
}
