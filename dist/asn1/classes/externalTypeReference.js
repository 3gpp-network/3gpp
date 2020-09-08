"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const unimpl_1 = require("unimpl");
const spreadsheet_1 = require("../formatter/spreadsheet");
const objectSet_1 = require("./objectSet");
const parameterizedTypeAssignment_1 = require("./parameterizedTypeAssignment");
const typeAssignment_1 = require("./typeAssignment");
const valueAssignment_1 = require("./valueAssignment");
class ExternalTypeReference {
    constructor(moduleReference, typeReference) {
        this.moduleReference = moduleReference;
        this.typeReference = typeReference;
    }
    /**
     * Find an Assignment indicated by ExternalTypeReference and
     * returns an expanded copy of it.
     * @param modules
     * @param parameterMappings
     */
    expand(modules, parameterMappings) {
        const referencedAssignment = modules.findAssignment(this.typeReference, this.moduleReference);
        if (referencedAssignment === undefined) {
            return this;
        }
        else if (referencedAssignment instanceof typeAssignment_1.TypeAssignment) {
            const { asnType } = referencedAssignment;
            const expandedType = lodash_1.cloneDeep(asnType).expand(modules, []);
            if (asnType instanceof objectSet_1.ObjectSet) {
                return unimpl_1.unimpl();
            }
            if (lodash_1.isEqual(expandedType, asnType)) {
                return asnType;
            }
            if (expandedType instanceof objectSet_1.ObjectSet) {
                return unimpl_1.unimpl();
            }
            return expandedType;
        }
        else if (referencedAssignment instanceof parameterizedTypeAssignment_1.ParameterizedTypeAssignment) {
            return unimpl_1.unimpl();
        }
        else if (referencedAssignment instanceof valueAssignment_1.ValueAssignment) {
            return unimpl_1.unimpl();
        }
        throw Error();
    }
    getDepth() {
        return 0;
    }
    setConstraints(constraints) {
        if (constraints.length > 0) {
            unimpl_1.unimpl();
        }
    }
    toSpreadsheet(worksheet, row, depth) {
        row[spreadsheet_1.HEADER_REFERENCE] = this.toString();
        const r = worksheet.addRow(row);
        spreadsheet_1.setOutlineLevel(r, depth);
        spreadsheet_1.drawBorder(worksheet, r, depth);
    }
    toString() {
        return `${this.moduleReference}.${this.typeReference}`;
    }
}
exports.ExternalTypeReference = ExternalTypeReference;
//# sourceMappingURL=externalTypeReference.js.map