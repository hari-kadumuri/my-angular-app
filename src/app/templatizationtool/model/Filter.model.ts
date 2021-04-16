/**
 * @model that represents a Filter
 */

export class Filter {
  e1: string;
  e2: string;
  e3: string;
  e4: string;
  e5: string;
  e6: string;
  e7: string;
  e8: string;

  constructor(e1: string, e2: string, e3: string, e4: string, e5: string, e6: string, e7: string, e8: string) {
    this.e1 = e1;
    this.e2 = e2;
    this.e3 = e3;
    this.e4 = e4;
    this.e5 = e1;
    this.e6 = e2;
    this.e7 = e3;
    this.e8 = e4;
  }

}
