import { IFormatConfig, IIe } from '../format/xlsx';
import { Base } from './base';
export declare class AsnBoolean extends Base {
    setConstraint(constraint: any): AsnBoolean;
    expand(): AsnBoolean;
    depthMax(): number;
    toString(): string;
    fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: any[], formatConfig: IFormatConfig, depth?: number): [number, number];
}
