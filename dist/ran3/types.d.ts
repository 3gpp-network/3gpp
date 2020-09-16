export interface ICondition {
    condition: string;
    explanation: string;
}
export interface IDefinition {
    sectionNumber: string;
    name: string;
    descriptionList: string[];
    direction: string;
    elementList: IInformationElement[];
    rangeBoundList: IRangeBound[];
    conditionList: ICondition[];
}
export interface IInformationElement {
    name: string;
    presence: string;
    range: string;
    typeAndRef: string;
    description: string;
    criticality: string;
    assignedCriticality: string;
    depth: number;
}
export interface IRangeBound {
    rangeBound: string;
    explanation: string;
}
//# sourceMappingURL=types.d.ts.map