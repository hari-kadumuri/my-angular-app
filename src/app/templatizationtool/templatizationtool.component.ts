import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Filter } from './model/Filter.model';
import { Table } from './model/table.model';
import { Source } from './model/source.model';
import { SourceType } from './model/sourcetype.model';
import { Projection } from './model/projection.model';

@Component({
    selector: 'app-templatizationtool',
    templateUrl: './templatizationtool.component.html',
    styleUrls: ['./templatizationtool.component.css']
})
export class TemplatizationtoolComponent implements OnInit {

    @ViewChild('tableselect') tableselectElement: ElementRef | undefined;
    @ViewChild('projections') projectionsElement: ElementRef | undefined;
    @ViewChild('aggselect') aggselectElement: ElementRef | undefined;
    @ViewChild('measureselect') measureselectElement: ElementRef | undefined;
    @ViewChild('operations') operationsElement: ElementRef | undefined;
    @ViewChild('Name') NameElement: ElementRef | undefined;
    @ViewChild('conjunction') conjunctionElement: ElementRef | undefined;
    @ViewChild('filters') filtersElement: ElementRef | undefined;
    @ViewChild('aggselect1') aggselect1Element: ElementRef | undefined;
    @ViewChild('measureselect1') measureselect1Element: ElementRef | undefined;
    @ViewChild('operations1') operations1Element: ElementRef | undefined;
    @ViewChild('comparator') comparatorElement: ElementRef | undefined;
    @ViewChild('aggselect2') aggselect2Element: ElementRef | undefined;
    @ViewChild('measureselect2') measureselect2Element: ElementRef | undefined;
    @ViewChild('operations2') operations2Element: ElementRef | undefined;
    @ViewChild('programName') programNameElement: ElementRef | undefined;
    @ViewChild('Version') VersionElement: ElementRef | undefined;
    @ViewChild('AA') AAElement: ElementRef | undefined;

    alertMessage: SafeHtml = "";
    sources: any = [];
    sourcecount: number = 0;
    rulecount: number = 0;
    relations: any = [];
    joins: any = [];
    unions: any = [];
    rules: any = [];
    OverallRule: any = "OverallRule";
    sourceslen: any = [];
    sourcesUIFlag: boolean = false;
    measureFilter: any;
    rowFilter: any = "row Filter";
    measures: any = "measures";
    projections: any = "projections";
    DB: any = [];
    importedFileEvent: any = null;
    editSourceUIFlag: boolean = false;
    editSourceX: string = "";
    editSourceId: number = 0;
    tablesinnerHTML: string = "";
    detailsinnerHTML: string = "";
    testinnerHTML: string = "";
    tableVisibility: string = "";
    output: any;
    outputJson: string = "No output as of yet";

    meta: {key: string, value: string}[] = [
        {key: 'acr', value: '[pi].[modernazureusagewithvorg]'},
        {key: 'competency', value: '[mpn].[PCActiveCompetencies]'},
        {key: 'training', value: '[pi].[TrainingCompletions]'}
    ];

    // meta = {
    //     "acr": "[pi].[modernazureusagewithvorg]",
    //     "competency": "[mpn].[PCActiveCompetencies]",
    //     "training": "[pi].[TrainingCompletions]"
    // };

    constructor() { }

    ngOnInit(): void {
    }

    resetMessage() {
        this.alertMessage = "";
    }

    handleFileInput(event: any) {
        console.log(event);
        var wordsInFileName: string = event.target.files[0].name.split(".");
        if(wordsInFileName[wordsInFileName.length-1].toLowerCase() != "json") {
            this.alertMessage += "Please upload only Json Files :-(";
            return;
        }
        this.importedFileEvent = event;
    }

    importJson() {
        this.alertMessage += "entered into importJson function :-)<br>";
        const reader = new FileReader();
        if (this.importedFileEvent !== null) {
            const result = this.importedFileEvent.target!.result;
            var readerResult = reader.result as string;
            var ui = JSON.parse(readerResult);
            var len = ui?.sources.length;
            this.sources = ui?.sources;
            this.sourcecount = 0;
            this.rulecount = 0;
            this.relations = ui.relations;
            this.joins = ui?.joins;
            this.unions = ui?.unions;
            this.rules = ui?.rules;
            this.OverallRule = ui?.OverallRule;
            var i = 0, j = 0;
            for (i=0;i<len;i++) {
                this.sourcecount += 1;
                var projections = "";
                Object.keys(this.sources[i].projections).forEach(item => projections += Object.values(this.sources[i].projections[item]).join(' ') + " , ");
                var measures = "";
                Object.keys(this.sources[i].measures).forEach(item => measures += Object.values(this.sources[i].measures[item]).join(' ') + " , ");
                var rowFilter = "";
                Object.keys(this.sources[i].rowFilter).forEach(item => rowFilter += Object.values(this.sources[i].rowFilter[item]).join(' ') + " , ");
                var measureFilter = "";
                Object.keys(this.sources[i].measureFilter).forEach(item => measureFilter += Object.values(this.sources[i].rowFilter[item]).join(' ') + " , ");
                this.pushTableToDB(`source${i + 1}`, i);
            }
            this.sourcesUIFlag = true;
            this.sourceslen = Array(len).fill(0).map((x,i)=>i);
        }
    }

    pushTableToDB(alias: string, id: number) {
        var x: any[] = [];
        for (var i = 0; i < this.sources[id].projections.length; i++) {
            this.sources[id].projections[i].column = this.sources[id].projections[i].column.split(".")[1];
            if (this.sources[id].projections[i].alias != "")
            x.push(this.sources[id].projections[i].alias);
            else x.push(this.sources[id].projections[i].column);
        }
        for (var i = 0; i < this.sources[id].measures.length; i++) {
            if (this.sources[id].tablecount > 1)
           this.sources[id].measures[i].column = this.sources[id].measures[i].column.split(".")[1];
            if (this.sources[id].measures[i].alias != "")
            x.push(this.sources[id].measures[i].alias);
            else x.push(this.sources[id].measures[i].column);
        }
        // Object.values(DB).forEach(obj => {
        //     if (obj.name == `source${id + 1}`)
        //     obj = new Table(alias, x);
        // })
        this.DB.push(new Table(alias, x));
    }

    addSource(destination: boolean) {

    }

    editSource(id: number) {
        this.alertMessage += "entered into editSource function :-)<br>";
        var b = new Source(this.sourcecount);
        b.sourceType = new SourceType(`source${id + 1}`);
        b.datasourceid = id + 1;
        b.tablecount = 0;
        if (this.sources[id].destination == true) {
            b.destination = this.sources[id].destination;
            // document.getElementById(`addsource`).style.visibility = "hidden";
            // document.getElementById(`dest`).style.visibility = "hidden";
        }
        this.sources[id] = b;
        this.editSourceX = "";
        this.editSourceId = id;
        for (var i = 0; i < this.DB.length - this.sourcecount + id; i++) {
            this.editSourceX = this.editSourceX + "<option value=" + this.DB[i].name + ">" + this.DB[i].name + "</option>";
        }
        this.editSourceUIFlag = true;
    }

    addTable(id: number) {
        var source = this.sources[id - 1];
        source.tablecount += 1;
        this.tablesinnerHTML += this.tableselectElement?.nativeElement.value + ", ";
        source.tables.push(this.tableselectElement?.nativeElement.value);
        // if (source.tablecount > 1) {
        //     var a = document.getElementById(source[this.sourcecount]).innerHTML;
        //     document.getElementById(`source${sourcecount}`).innerHTML = `<h4>What Type of Join Should these Tables have?</h4>
        //                     <input id = "jointype${source.tablecount - 1}" type = "textarea" placeholder = "Join Type"></input>
        //                     <input id = "joincondition${source.tablecount - 1}" type = "textarea" placeholder = "Join Condition"></input>` + a;
        // }
        this.sources[id - 1] = source;
        this.addDetails(id);
    }

    resetSource(id: number, dest: boolean) {

    }

    saveSource(id: number) {

    }

    addDetails(id: number) {
        var t = [];
        for (var i = 0; i < this.DB.length - this.sourcecount + id - 1; i++) {
            for (var j = 0; j < this.sources[id - 1].tablecount; j++) {
                if (this.DB[i].name == this.sources[id - 1].tables[j]) {
                t.push(i);
                }
            }
        }
        var x = `<option value = " "></option>`;
        for (j = 0; j < t.length; j++) {
            for (i = 0; i < this.DB[t[j]].column.length; i++) {
                x = x + "<option value=" + this.DB[t[j]].name + "." + this.DB[t[j]].column[i] + ">" + this.DB[t[j]].name + "." + this.DB[t[j]].column[i] + "</option>";
            }
        
        this.detailsinnerHTML = `<h3>Projections</h3>
                            <div id = "projections"></div>
                            <div>
                                <h4>Aggregation</h4>
                            <select id = "aggselect">agg</select>
                                <h4>Column</h4>
                            <select id = "measureselect">` + x + `</select>
                                <h4>Calculations</h4>
                            <input id = "operations" type = "textarea" placeholder = "Operations"></input>
                            AS
                                <h4>Alias</h4>
                            <input id = "Name" type = "textarea" placeholder = "Alternative Name"></input>
                            </div>
                            <br>
                            <button onClick="addProjection(sourcecount-1)">Add Projection +</button>
                            <h3>Filters</h3>
                            <div id = "filters"></div>
                            <div>
                                <h4>Left Side Aggregator</h4>
                            <select id = "aggselect1">agg</select>
                                <h4>Left Side Projection</h4>
                            <select id = "measureselect1">` + x + `</select>
                                <h4>Left Side Operations</h4>
                            <input id = "operations1" type = "textarea" placeholder = "Operations"></input>
                                <h4>Comparator</h4>
                            <select id = "comparator">comp</select>
                            <br>
                                <h4>Right Side Aggregator</h4>
                            <select id = "aggselect2">agg</select>
                                <h4>Right Side Projection</h4>
                            <select id = "measureselect2">` + x + `</select>
                                <h4>Right Side Operations</h4>
                            <input id = "operations2" type = "textarea" placeholder = "Operations"></input>
                                <h4>Conjunction To Next Filter (If Any)</h4>
                            <select id = "conjunction"><option value = ""></option><option value = "AND">AND</option><option value = "OR">OR</option></select>
                            </div>
                            <br>
                            <button onClick="addFilter(sourcecount-1)">Add Filter +</button>
                            <h3>Order By</h3>
                            <div id = "order"></div>
                            <select id = "orderselect">` + x + `</select>
                            <select id = "asc"><option value = "ASC">Ascending</option><option value = "DESC">Desccending</option></select>
                            <button id = "orderbutton" onClick="addOrder(sourcecount-1)">Set Order</button>
                            `;
        }
    }

    addProjection(id: number) {
        this.tableVisibility = "hidden";
        var a = this.projectionsElement?.nativeElement.innerHTML;
        var e1 = this.aggselectElement?.nativeElement.value;
        var e2 = this.measureselectElement?.nativeElement.value;
        var e3 = this.operationsElement?.nativeElement.value;
        var e4 = this.NameElement?.nativeElement.value;
        var res = "";
        if (e4 != "")
            res = e1 + " " + e2 + " " + e3 + " " + "AS" + " " + e4 + " , ";
        else res = e1 + " " + e2 + " " + e3 + " , ";
        if (e1 == "")
            this.sources[id].projections.push(new Projection(e1, e2, e3, e4));
        else this.sources[id].measures.push(new Projection(e1, e2, e3, e4));
        if(this.projectionsElement)
            this.projectionsElement.nativeElement.innerHTML = a + res;
    }

    addFilter(id: number) {
        this.tableVisibility = "hidden";
        var a = this.filtersElement?.nativeElement.innerHTML;
        var e1 = this.aggselect1Element?.nativeElement.innerHTML;
        var e2 = this.measureselectElement?.nativeElement.value;
        var e3 = this.operations1Element?.nativeElement.value;
        var e4 = this.comparatorElement?.nativeElement.value;
        var e5 = this.aggselect2Element?.nativeElement.value;
        var e6 = this.measureselect2Element?.nativeElement.value;
        var e7 = this.operations2Element?.nativeElement.value;
        var e8 = this.conjunctionElement?.nativeElement.value;
        var res = e1 + " " + e2 + " " + e3 + " " + e4 + " " + e5 + " " + e6 + " " + e7 + " " + e8 + " , ";
        if (e1 == "" && e5 == "")
            this.sources[id].rowFilter.push(new Filter(e1, e2, e3, e4, e5, e6, e7, e8));
        else this.sources[id].measureFilter.push(new Filter(e1, e2, e3, e4, e5, e6, e7, e8));
        if(this.filtersElement)
            this.filtersElement.nativeElement.innerHTML = a + res;
    }

    addRule(overallRule: boolean) {

    }

    saveRule(id: number, overallRule: boolean) {

    }

    convertMetaData() {
        for (var i = 0; i < this.sources.length; i++) {
            for (var j = 0; j < this.sources[i].tables.length; j++) {
                if (this.sources[i].tables[j] in this.meta) {
                this.sources[i].sourceType.tableName = this.meta[this.sources[i].tables[j]];
                this.sources[i].sourceType.location = "DW";
                }
            }
        }
    }

    submit() {
        this.convertMetaData();
        this.output["programName"] = this.programNameElement?.nativeElement.value;
        this.output["version"] = this.VersionElement?.nativeElement.value;
        this.output["ApproverAlias"] = this.AAElement?.nativeElement.value;
        this.output["sources"] = this.sources;
        this.output["rules"] = this.rules;
        this.output["OverallRule"] = this.OverallRule;
        this.submitTemplatizationInput(JSON.stringify(this.output));
    }

    submitTemplatizationInput(output: string) {
        this.outputJson = output;
    }
    
    testFunction(id: number) {
        this.alertMessage += "argument received = " + id + "<br>";
        this.testinnerHTML += "testing successful :-)";
        this.tableVisibility = "hidden";
    }

}
