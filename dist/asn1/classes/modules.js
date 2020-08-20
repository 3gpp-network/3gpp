"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unimpl_1 = require("unimpl");
class Modules {
    constructor(modules = []) {
        this.modules = modules;
    }
    findAssignment(name, moduleName) {
        let assignment;
        if (moduleName !== undefined) {
            return unimpl_1.unimpl();
        }
        this.modules.forEach((module) => {
            if (assignment !== undefined) {
                return;
            }
            assignment = module.findAssignment(name);
        });
        return assignment;
    }
    toString() {
        return this.modules.map((module) => module.toString()).join('\n\n');
    }
}
exports.Modules = Modules;
//# sourceMappingURL=modules.js.map