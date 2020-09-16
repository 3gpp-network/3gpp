"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const unimpl_1 = require("unimpl");
const spreadsheet_1 = require("../../common/spreadsheet");
const formatter_1 = require("../formatter");
const spreadsheet_2 = require("../formatter/spreadsheet");
const spreadsheet_3 = require("../../common/spreadsheet");
/**
 * X.681 clause 9.3
 * ```
 * CLASS { fieldSpec[0], ..., fieldSpec[n-1] } WITH SYNTAX { syntax[0] ... syntax[n-1] }
 * ```
 */
class ObjectClassDefinition {
    constructor(fieldSpecs, syntaxList) {
        this.fieldSpecs = fieldSpecs;
        this.syntaxList = syntaxList;
    }
    /**
     * Expand `fieldSpecs` property. This will mutate the object itself.
     * @param modules
     * @param parameterMappings
     */
    expand(modules, parameterMappings) {
        if (parameterMappings.length) {
            return unimpl_1.unimpl();
        }
        this.fieldSpecs = this.fieldSpecs.map((fieldSpec) => {
            return lodash_1.cloneDeep(fieldSpec).expand(modules, parameterMappings);
        });
        return this;
    }
    getDepth() {
        const depthFieldSpecs = this.fieldSpecs.reduce((prev, curr) => {
            return Math.max(prev, curr.getDepth() + 1);
        }, 0);
        const depthSyntaxList = this.syntaxList.reduce((prev, curr) => {
            return Math.max(prev, curr.getDepth() + 1);
        }, 0);
        return Math.max(depthFieldSpecs, depthSyntaxList);
    }
    toSpreadsheet(worksheet, row, depth) {
        row[spreadsheet_2.HEADER_TYPE] = 'CLASS';
        const r1 = worksheet.addRow(row);
        spreadsheet_1.setOutlineLevel(r1, depth);
        spreadsheet_3.drawBorder(worksheet, r1, depth);
        this.fieldSpecs.forEach((fieldSpec) => {
            fieldSpec.toSpreadsheet(worksheet, {}, depth + 1);
        });
        if (this.syntaxList.length > 0) {
            const r2 = worksheet.addRow({
                [spreadsheet_2.HEADER_TYPE]: 'WITH SYNTAX',
            });
            spreadsheet_1.setOutlineLevel(r2, depth);
            spreadsheet_3.drawBorder(worksheet, r2, depth);
            this.syntaxList.forEach((syntax) => {
                syntax.toSpreadsheet(worksheet, {}, depth + 1);
            });
        }
    }
    toString() {
        const arrToString = [
            'CLASS {',
            formatter_1.indent(this.fieldSpecs.map((fieldSpec) => fieldSpec.toString()).join(',\n')),
            '}',
        ];
        if (this.syntaxList.length > 0) {
            arrToString.push('WITH SYNTAX {');
            arrToString.push(formatter_1.indent(this.syntaxList.map((syntax) => syntax.toString()).join('\n')));
            arrToString.push('}');
        }
        return arrToString.join('\n');
    }
}
exports.ObjectClassDefinition = ObjectClassDefinition;
// | VariableTypeFieldSpec // VariableTypeValue[Set]FieldSpec
// | ObjectFieldSpec // Object[Set]FieldSpec
//# sourceMappingURL=objectClass.js.map