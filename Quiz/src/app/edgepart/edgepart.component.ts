import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edgepart',
  templateUrl: './edgepart.component.html',
  styleUrls: ['./edgepart.component.scss']
})
export class EdgepartComponent implements OnInit {
  httpClient: HttpClient;
  completeJson: JSON;
  currentText: number;

  constructor(http: HttpClient) {
    this.httpClient = http;
    this.currentText = 1;
   }

  ngOnInit(): void {
  }


  getFile(pathToFile: string) {
    this.httpClient.get(pathToFile, { responseType: 'json' }).subscribe(data => {
      this.completeJson = JSON.parse(JSON.stringify(data));
      //this.playAudio("question");
      // setTimeout(()=> {this.stopAudio()}, 1000)
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }


  //selects which text should be played
  selectTextPart() {

  }

}
