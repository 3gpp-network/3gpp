"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("../utils/logging");
function getLogWithAsn1(ctx, prefix = '', postfix = '', length = 80) {
    const asn1Length = length - prefix.length - postfix.length;
    return [prefix, ctx.getText().substring(0, asn1Length), postfix].join(' ').trim();
}
exports.getLogWithAsn1 = getLogWithAsn1;
function findConstantValue(constant, moduleName, asn1Pool) {
    return findReference(constant, moduleName, asn1Pool, 'constants');
}
exports.findConstantValue = findConstantValue;
function findDefinition(typeName, moduleName, asn1Pool) {
    return findReference(typeName, moduleName, asn1Pool, 'assignments');
}
exports.findDefinition = findDefinition;
function findReference(refName, moduleName, asn1Pool, key) {
    if (refName in asn1Pool[moduleName][key]) {
        return asn1Pool[moduleName][key][refName];
    }
    if (refName in asn1Pool[moduleName].imports) {
        const importedModuleName = asn1Pool[moduleName].imports[refName];
        const importedModule = asn1Pool[importedModuleName];
        return importedModule[key][refName];
    }
    logging_1.log.warn(`Cannot find a reference ${refName} in a module ${moduleName}`);
    return null;
}
function sanitizeAsn1(asn1) {
    // Removes comments which are not a Need tag neither a Cond tag
    // Gives one space before a Need tag and a Cond tag
    return asn1.replace(/--(?!.*(Need|Cond)).*$/gm, '')
        .replace(/(--\s*?(Need|Cond).*?)$/gm, ' $1');
}
exports.sanitizeAsn1 = sanitizeAsn1;
