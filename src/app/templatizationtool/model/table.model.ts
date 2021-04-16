/**
 * @model that represents a table
 */

export class Table {
  name: string;
  column: any;

  constructor(name: string, column: any) {
    this.name = name;
    this.column = column;
  }

}
