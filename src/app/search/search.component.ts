import { Worksheet } from './../models/worksheet';
import { Problem } from './../models/problem';
import { WorksheetService } from './../services/worksheet/worksheet.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as bootbox from 'bootbox';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  file: File;
  result = [];
  problemCollection: Problem[] = [];
  // Update Form Values
  fileId;
  name;
  subject;
  chapter;
  section;
  type;
  format;
  answerKey;
  //Modal
  modal: NgbModalRef;

  constructor(private worksheetService: WorksheetService, private modalService: NgbModal) {}

  
  ngOnInit() {
    this.worksheetService.problemCollection.subscribe(
      problemCollection => this.problemCollection = problemCollection
    );
  }

  async listFiles(formValues) {
    var that = this;
    await gapi.client.drive.files.list({
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

  open(content, file) {
    this.fileId = file.id;
    this.name = file.name;
    this.subject = file.appProperties.subject;
    this.chapter = file.appProperties.chapter;
    this.section = file.appProperties.section;
    this.type = file.appProperties.type;
    this.format = file.appProperties.format;
    this.answerKey = file.appProperties.answerKey
    this.modal = this.modalService.open(content);
  }

  remove() {
    this.worksheetService.remove();
  }

  update(formValues, modal) {
    let that = this;
    gapi.client.drive.files.update({
      fileId: formValues.fileId,
      appProperties: {
        "subject": formValues.subject,
        "chapter": formValues.chapter,
        "section": formValues.section,
        "type": formValues.type,
        "format": formValues.format,
        "answerKey": formValues.answerKey
      }
    }).then(function() {
      alert("Updated!");
      that.modal.close();
    });
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

  async generate() {
    let worksheet = new Worksheet();

    for(let problem of this.problemCollection) {
      await gapi.client.drive.files.get({
        fileId: problem.fileId,
        alt: "media"
      }).then(function(data){
        var imgData = 'data:image/jpeg;base64,';
        imgData += btoa(data.body);
        worksheet.add(imgData, 'a');
      })
    }

    worksheet.save();
  }

}
