"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
function expand(msgIe, asn1Pool /* TODO */) {
    var msgIeClone = lodash_1.cloneDeep(msgIe);
    msgIeClone.definition.expand(asn1Pool, msgIeClone.definition.moduleName);
    return msgIeClone;
}
exports.expand = expand;
