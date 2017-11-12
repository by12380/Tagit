import { Problem } from './../models/problem';
import { WorksheetService } from './../services/worksheet/worksheet.service';
import { Component, OnInit } from '@angular/core';
import * as bootbox from 'bootbox';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  file: File;
  result = [];
  problemCollection: Problem[] = [];

  constructor(private worksheetService: WorksheetService) {}

  ngOnInit() {
    this.worksheetService.problemCollection.subscribe(
      problemCollection => this.problemCollection = problemCollection
    );
  }

  async listFiles(formValues) {
    var that = this;
    await gapi.client.drive.files.list({
      pageSize: 10,
      fields: "*",
      q: this.queryBuilder(formValues)
    }).then(function(response) {
      that.result = response.result.files;
    });
  }

  add(file) {
    var problem: Problem = {
      fileId: file.id,
      name: file.name,
      webViewLink: file.webViewLink
    }
    this.worksheetService.add(problem);
  }

  delete(fileId) {
    var result = confirm("Are you sure you want to delete this file?");
    if (result) {
      gapi.client.drive.files.delete({
        fileId: fileId
      }).then();
    }
  }

  isSelected(index) {
    return this.worksheetService.isSelectedIndex(index);
  }

  setSelectedIndex(index) {
    this.worksheetService.setSelectedIndex(index);
  }

  moveUp() {
    this.worksheetService.moveUp();
  }

  moveDown() {
    this.worksheetService.moveDown();
  }

  remove() {
    this.worksheetService.remove();
  }

  private queryBuilder(formValues): string{
    var queryString = "('1Ds9TkPgNLBuhz7jZ4Z2ClsWN3U0tZ7Hy' in parents)";
    
    if (formValues.subject) {
      queryString += "and (appProperties has { key='subject' and value='" + formValues.subject + "' })";
    }

    if (formValues.chapter) {
      queryString += "and (appProperties has { key='chapter' and value='" + formValues.chapter + "' })";
    }
    
    if (formValues.section) {
      queryString += "and (appProperties has { key='section' and value='" + formValues.section + "' })";
    }

    if (formValues.type) {
      queryString += "and (appProperties has { key='type' and value='" + formValues.type + "' })";
    }

    return queryString;
  }

}
