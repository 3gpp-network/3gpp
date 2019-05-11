import { isEmpty } from 'lodash';

import { log } from '../../utils/logging';

import { fillRow, IFormatConfig, IIe } from '../format/xlsx';
import { Base } from './base';

export class AsnBoolean extends Base {
  public setConstraint(constraint: any): AsnBoolean {
    if (!isEmpty(constraint)) {
      log.warn(`Boolean could not handle constraint ${JSON.stringify(constraint)}`);
    }
    return this;
  }

  public expand(): AsnBoolean {
    return this;
  }

  public depthMax(): number {
    return 1;
  }

  public toString(): string {
    return 'BOOLEAN';
  }

  public fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: any[],
                       formatConfig: IFormatConfig, depth?: number): [number, number] {
    ieElem.type = 'BOOLEAN';
    [row, col] = fillRow(ieElem, ws, row, col, depthMax, formatConfig, depth);
    return [row, col];
  }
}
