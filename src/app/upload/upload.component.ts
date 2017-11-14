import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    /* When we select file */
    Name: string; 
    file: File; /* property of File type */
    result = [];
  
    fileChange(files: any){
        this.file = files[0];
    }
  
    /* Now send your form using FormData */
    onSubmit(formValues): void {
        var uploader = new MediaUploader({
          file: this.file,
          token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token,
          metadata: {
            'name': this.file.name,
            'mimeType': this.file.type,
            'parents': [
              "1Ds9TkPgNLBuhz7jZ4Z2ClsWN3U0tZ7Hy"
            ],
            "appProperties": {
              "subject": formValues.subject,
              "chapter": formValues.chapter,
              "section": formValues.section,
              "type": formValues.type,
              "format": formValues.format,
              "answerKey": formValues.answerKey
            }
          },
          onComplete: function(data) {
            var permission =
            {
              'type': 'anyone',
              'role': 'reader',
            }
            gapi.client.drive.permissions.create({
              resource: permission,
              fileId: JSON.parse(data).id
            }).then();
            alert("Submitted!");
          }
        });
        uploader.upload();
    }
}
