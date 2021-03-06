import { Worksheet } from 'exceljs';
import { drawBorder, headerIndexed, IRowInput } from '../../common/spreadsheet';
import { BorderTop, FontBold } from '../../common/spreadsheet/style';
import { ICondition } from '../types';
import { HEADER_DESCRIPTION, HEADER_NAME_BASE } from './definition';

export class Conditions {
  public conditionList: ICondition[];

  constructor(conditionList: ICondition[]) {
    this.conditionList = conditionList;
  }

  public add(condition: ICondition) {
    const cond = this.conditionList.find((item) => item.condition === condition.condition);
    if (cond) {
      return;
    }
    this.conditionList.push(condition);
  }

  public toSpreadsheet(worksheet: Worksheet) {
    if (!this.conditionList.length) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    worksheet.addRow({
      [headerIndexed(HEADER_NAME_BASE, 0)]: 'Condition',
      [HEADER_DESCRIPTION]: 'Explanation',
    }).font = FontBold;
    this.conditionList.forEach((cond) => {
      const { condition, explanation } = cond;
      const rowInput: IRowInput = {
        [headerIndexed(HEADER_NAME_BASE, 0)]: condition,
        [HEADER_DESCRIPTION]: explanation,
      };
      const r = worksheet.addRow(rowInput);
      drawBorder(worksheet, r, 0);
    });
    drawBorder(worksheet, worksheet.addRow([]), 0, BorderTop);
  }
}
