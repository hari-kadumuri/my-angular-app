import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Filter } from './model/Filter.model';
import { Table } from './model/table.model';
import { Source } from './model/source.model';
import { SourceType } from './model/sourcetype.model';

@Component({
    selector: 'app-templatizationtool',
    templateUrl: './templatizationtool.component.html',
    styleUrls: ['./templatizationtool.component.css']
})
export class TemplatizationtoolComponent implements OnInit {

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
    editSourceX: SafeHtml = "";
    editSourceId: number = 0;

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
                // Object.values(this.sources[i].projections).forEach(item => projections += Object.values(item).join(' ') + " , ");
                // var measures = "";
                // Object.values(this.sources[i].measures).forEach(item => measures += Object.values(item).join(' ') + " , ");
                // var rowFilter = "";
                // Object.values(this.sources[i].rowFilter).forEach(item => rowFilter += Object.values(item).join(' ') + " , ");
                // var measureFilter = "";
                // Object.values(this.sources[i].measureFilter).forEach(item => measureFilter += Object.values(item).join(' ') + " , ");
                // this.pushTableToDB(`source${i + 1}`, i);
            }
            this.sourcesUIFlag = true;
            this.sourceslen = Array(/* len */10).fill(0).map((x,i)=>i);
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

    }

    resetSource(id: number, dest: boolean) {

    }

    saveSource(id: number) {

    }
}
