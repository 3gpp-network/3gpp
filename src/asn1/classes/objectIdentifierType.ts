import { todo } from 'unimpl';
import { IParameterMapping } from '../expander';
import { Constraint } from './constraint';
import { Modules } from './modules';

export class ObjectIdentifierType {
  private objectIdentifierTypeTag: undefined;

  public expand(
    modules: Modules,
    parameterMappings: IParameterMapping[]
  ): ObjectIdentifierType {
    return this;
  }

  public setConstraints(constraints: Constraint[]) {
    if (constraints.length > 0) {
      return todo();
    }
  }

  public toString(): string {
    return 'OBJECT IDENTIFIER';
  }
}