import { Worksheet } from 'exceljs';
import { cloneDeep, isEqual } from 'lodash';
import { unimpl } from 'unimpl';
import { headerIndexed } from '../../common/spreadsheet';
import { IParameterMapping } from '../expander';
import {
  HEADER_NAME_BASE,
  HEADER_OPTIONAL,
  HEADER_UNIQUE,
} from '../formatter/spreadsheet';
import { IRowInput } from '../../common/spreadsheet';
import { AsnType } from './asnType';
import { Modules } from './modules';
import { ObjectSet } from './objectSet';
import { Optionality } from './optionality';
import { PrimitiveFieldName } from './primitiveFieldName';

export class FixedTypeValueFieldSpec {
  public fieldReference: PrimitiveFieldName;
  public asnType: AsnType;
  public unique: boolean;
  public optionality: Optionality | undefined;

  private fixedTypeValueFieldSpecTag: undefined;

  constructor(
    fieldRerence: PrimitiveFieldName,
    asnType: AsnType,
    unique: boolean,
    optionality?: Optionality
  ) {
    this.fieldReference = fieldRerence;
    this.asnType = asnType;
    this.unique = unique;
    this.optionality = optionality;
  }

  /**
   * Expand `asnType` property. This will mutate the object itself.
   * @param modules
   * @param parameterMappings
   */
  public expand(
    modules: Modules,
    parameterMappings: IParameterMapping[]
  ): FixedTypeValueFieldSpec {
    if (parameterMappings.length) {
      return unimpl();
    }
    const expandedType = cloneDeep(this.asnType).expand(
      modules,
      parameterMappings
    );
    if (expandedType instanceof ObjectSet) {
      return unimpl();
    }
    if (!isEqual(expandedType, this.asnType)) {
      this.asnType = expandedType;
    }
    // TODO: Shall `optionality` be expanded?
    return this;
  }

  public getDepth(): number {
    return this.asnType.getDepth();
  }

  public toSpreadsheet(worksheet: Worksheet, row: IRowInput, depth: number) {
    this.asnType.toSpreadsheet(
      worksheet,
      {
        [headerIndexed(
          HEADER_NAME_BASE,
          depth
        )]: this.fieldReference.toString(),
        [HEADER_OPTIONAL]: this.optionality
          ? this.optionality.toString()
          : undefined,
        [HEADER_UNIQUE]: this.unique ? 'UNIQUE' : undefined,
      },
      depth
    );
  }

  public toString(): string {
    const arrToString: string[] = [
      this.fieldReference.toString(),
      this.asnType.toString(),
    ];
    if (this.unique) {
      arrToString.push('UNIQUE');
    }
    if (this.optionality !== undefined) {
      arrToString.push(this.optionality.toString());
    }
    return arrToString.join(' ');
  }
}
