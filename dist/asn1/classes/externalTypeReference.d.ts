import { Worksheet } from 'exceljs';
import { IParameterMapping } from '../expander';
import { IRowInput } from '../../common/spreadsheet';
import { AsnType } from './asnType';
import { Constraint } from './constraint';
import { Modules } from './modules';
export declare class ExternalTypeReference {
    moduleReference: string;
    typeReference: string;
    private externalTypeReferenceTag;
    constructor(moduleReference: string, typeReference: string);
    /**
     * Find an Assignment indicated by ExternalTypeReference and
     * returns an expanded copy of it.
     * @param modules
     * @param parameterMappings
     */
    expand(modules: Modules, parameterMappings: IParameterMapping[]): AsnType;
    getDepth(): number;
    setConstraints(constraints: Constraint[]): void;
    toSpreadsheet(worksheet: Worksheet, row: IRowInput, depth: number): void;
    toString(): string;
}
//# sourceMappingURL=externalTypeReference.d.ts.map