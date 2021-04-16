/**
 * @model that represents a rule
 */

export class Rule {
  name: string = "";
  expression: string = "";
  valueIfTrue: string = "";
  valueIfFalse: string = "";
  storeAs: string = "";
  update: boolean = false;

  constructor() {
  }

}
