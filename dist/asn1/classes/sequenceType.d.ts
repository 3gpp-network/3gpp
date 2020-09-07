import { Worksheet } from 'exceljs';
import { IParameterMapping } from '../expander';
import { IRowInput } from '../formatter/spreadsheet';
import { ComponentType } from './componentType';
import { Constraint } from './constraint';
import { ExtensionAdditionGroup } from './extensionAdditionGroup';
import { ExtensionMarker } from './extensionMarker';
import { Modules } from './modules';
import { ObjectSet } from './objectSet';
/**
 * This is a comma placeholder for a sequence component.
 * `ComponentType.toString()` will put this placeholder for the item.
 * `SequenceType` and `ExtensionAdditionGroup` will replace with with either
 * ',' or '' (empty) based on its position in a sequence by using
 * `toStringWithComma()`.
 */
export declare const _COMMA = "_COMMA_";
export declare function toStringWithComma(component: RootSequenceComponents, shouldInsert: boolean): string;
export declare class SequenceType {
    components: RootSequenceComponents[];
    constructor(components: RootSequenceComponents[]);
    /**
     * Expand `components` property. This will mutate the object itself.
     * @param modules
     * @param parameterMappings
     * @returns Returns {@link SequenceType} of {@link ObjectSet}.
     * {@link ObjectSet} is only applicable when expanding RAN3 ASN.1 spec.
     */
    expand(modules: Modules, parameterMappings: IParameterMapping[]): SequenceType | ObjectSet;
    getDepth(): number;
    setConstraints(constraints: Constraint[]): void;
    toSpreadsheet(worksheet: Worksheet, row: IRowInput, depth: number): void;
    toString(): string;
    private expandFallback;
    private parameterToInstantiate;
}
export declare type RootSequenceComponents = ComponentType | ExtensionMarker | ExtensionAdditionGroup;
export declare type ExtensionAddition = ComponentType | ExtensionAdditionGroup;
export declare type Tag = string;
//# sourceMappingURL=sequenceType.d.ts.map