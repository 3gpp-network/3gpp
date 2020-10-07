import { Worksheet } from 'exceljs';
import { todo } from 'unimpl';
import { setOutlineLevel, IRowInput, drawBorder } from '../../common/spreadsheet';
import { IParameterMapping } from '../expander';
import { HEADER_TYPE } from '../formatter/spreadsheet';

import { Constraint } from './constraint';
import { Modules } from './modules';

export class ObjectIdentifierType {
  public static getInstance() {
    return ObjectIdentifierType.instance;
  }

  private static instance: ObjectIdentifierType = new ObjectIdentifierType();

  private objectIdentifierTypeTag: undefined;

  // eslint-disable-next-line no-unused-vars
  public expand(modules: Modules, parameterMappings: IParameterMapping[]): ObjectIdentifierType {
    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  public getDepth(): number {
    return 0;
  }

  // eslint-disable-next-line class-methods-use-this
  public setConstraints(constraints: Constraint[]) {
    if (constraints.length > 0) {
      todo();
    }
  }

  public toSpreadsheet(worksheet: Worksheet, row: IRowInput, depth: number) {
    // eslint-disable-next-line no-param-reassign
    row[HEADER_TYPE] = this.toString();
    const r = worksheet.addRow(row);
    setOutlineLevel(r, depth);
    drawBorder(worksheet, r, depth);
  }

  // eslint-disable-next-line class-methods-use-this
  public toString(): string {
    return 'OBJECT IDENTIFIER';
  }
}
