/**
 * @model that represents a source
*/
import { SourceType } from "./sourcetype.model";

export class Source {
  datasourceid: number;
  sourceType: SourceType;
  persist: boolean;
  projections: [];
  measures: [];
  measureFilter: [];
  rowFilter: [];
  rowOrder: number;
  destination: boolean;
  tablecount: number;
  tables: [];
  jointype: [];
  joincondition: [];

  constructor(datasourceid: number) {
    this.datasourceid = datasourceid;
    this.persist = false;
    this.projections = [];
    this.measures = [];
    this.measureFilter = [];
    this.rowFilter = [];
    this.rowOrder;
    this.destination = false;
    this.tablecount;
    this.tables = [];
    this.jointype = [];
    this.joincondition = [];
  }
}
