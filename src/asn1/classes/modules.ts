import { Workbook } from 'exceljs';
import { getWorkbook } from '../../common/spreadsheet';
import { Assignment } from '../types';
import { ModuleDefinition } from './moduleDefinition';

export class Modules {
  public modules: ModuleDefinition[];

  private modulesTag: undefined;

  constructor(modules: ModuleDefinition[] = []) {
    this.modules = modules;
  }

  public findAssignment(
    name: string,
    moduleName?: string,
  ): Assignment | undefined {
    let assignment: Assignment | undefined;
    this.modules.filter((module) => {
      if (moduleName === undefined) {
        return true;
      }
      return module.name === moduleName;
    }).forEach((module) => {
      if (assignment !== undefined) {
        return;
      }
      assignment = module.findAssignment(name);
    });
    return assignment;
  }

  public toSpreadsheet(): Workbook {
    const workbook = getWorkbook();
    this.modules.forEach((module) => module.toSpreadsheet(workbook));
    return workbook;
  }

  public toString(): string {
    return this.modules.map((module) => module.toString()).join('\n\n');
  }
}
