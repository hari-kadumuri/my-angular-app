/**
 * @model that represents a sourcetype
 */

export class SourceType {
  alias: string;
  tableName: string;
  location: string;

  constructor(alias: string) {
    this.alias = alias;
  }
}
