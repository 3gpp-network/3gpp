import { cloneDeep, isEqual } from 'lodash';
import { unimpl } from 'unimpl';
import { IParameterMapping } from '../expander';
import { BooleanValue } from './booleanValue';
import { IntegerValue } from './integerValue';
import { Modules } from './modules';
import { ObjectIdentifierValue } from './objectIdentifierValue';
import { TypeReference } from './typeReference';
import { Value } from './value';
import { ValueReference } from './ValueReference';

export class ValueRange {
  public lower: Value;
  public upper: Value;

  private valueRangeTag: undefined;

  constructor(lower: Value, upper: Value) {
    this.lower = lower;
    this.upper = upper;
  }

  /**
   * Expand `lower` and `upper` properties. This will mutate the object itself.
   * @param modules
   * @param parameterMappings
   */
  public expand(
    modules: Modules,
    parameterMappings: IParameterMapping[]
  ): ValueRange {
    const expandedLower = this.expandValue(
      this.lower,
      modules,
      parameterMappings
    );
    if (!isEqual(expandedLower, this.lower)) {
      this.lower = expandedLower;
    }
    const expandedUpper = this.expandValue(
      this.upper,
      modules,
      parameterMappings
    );
    if (!isEqual(expandedUpper, this.upper)) {
      this.upper = expandedUpper;
    }
    return this;
  }

  public getDepth(): number {
    return 0;
  }

  public toString(): string {
    return `${this.lower.toString()}..${this.upper.toString()}`;
  }

  private expandValue(
    value: Value,
    modules: Modules,
    parameterMappings: IParameterMapping[]
  ): Value {
    if (typeof value === 'string') {
      const parameterMapping = parameterMappings.find((paramMap) => {
        return paramMap.parameter.dummyReference === value;
      });
      if (parameterMapping === undefined) {
        return value;
        // Necessary to get the actual value?
        // const assignment = modules.findAssignment(value);
        // if (assignment === undefined) {
        //   return value;
        // }
        // if (!(assignment instanceof ValueAssignment)) {
        //   return unimpl();
        // }
        // return assignment.value;
      } else {
        const { actualParameter } = parameterMapping;
        if (actualParameter === undefined) {
          return value;
          // Necessary to get the actual value?
          // const assignment = modules.findAssignment(value);
          // if (assignment === undefined) {
          //   return value;
          // }
          // if (!(assignment instanceof ValueAssignment)) {
          //   return unimpl();
          // }
          // return assignment.value;
        } else {
          if (typeof actualParameter === 'string') {
            return actualParameter;
          }
          if (
            actualParameter instanceof BooleanValue ||
            actualParameter instanceof IntegerValue ||
            actualParameter instanceof ObjectIdentifierValue ||
            typeof actualParameter === 'string'
          ) {
            return actualParameter;
            // Necessary to get the actual value?
          }
          if (actualParameter instanceof TypeReference) {
            return new ValueReference(actualParameter.typeReference);
          }
          // if (actualParameter instanceof ObjectClassReference) {
          //   return unimpl();
          // }
          // const expandedValue = cloneDeep(actualParameter).expand(modules, parameterMappings);
          // if (isEqual(expandedValue, value)) {
          //   return value;
          // }
          // if (
          //   expandedValue instanceof BooleanValue ||
          //   expandedValue instanceof IntegerValue ||
          //   expandedValue instanceof ObjectIdentifierValue ||
          //   typeof expandedValue === 'string'
          // ) {
          //   return expandedValue;
          // }
          return unimpl();
        }
      }
    } else {
      const expandedValue = cloneDeep(value).expand(modules, parameterMappings);
      if (isEqual(expandedValue, value)) {
        return value;
      }
      return expandedValue;
    }
  }
}
