import { Component, OnInit } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';
// import { Socket } from 'src/app/service/serverConnection.js'

//declare var serverData: any;

export interface Question {
  question: string;
  answers: string[];
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  private httpClient: HttpClient;
  public step: number;

  public completeText: any = {};

  constructor(http: HttpClient) {
    this.httpClient = http;
    this.step = 0;
  }

  ngOnInit(): void {
    console.log("start")
    // const pathToFile: string = '/assets/textfiles/begruesungstext.html'
    // console.table(this.getFile(pathToFile));
    this.loadGreeting();
  }
  loadGreeting() {
    this.getFile('/assets/textfiles/intro.json');
  }

  getFile(pathToFile: string) {
    this.httpClient.get(pathToFile, { responseType: 'json' }).subscribe(data => {

      this.completeText = JSON.parse(JSON.stringify(data));
      console.log(this.completeText);
      // this.showText.text = data.toString();
      // this.showText.step = this.step;
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

  changeStep(change: number) {
    this.step = change;

  }

  returnCurrentText(): string {
    let value: string = "";
    const step = "step" + this.step;
    value = this.completeText[step];
    return value;
  }

  returnCurrentQuestion(): Question {
    const step = "step" + this.step;
    const Question = this.completeText[step];
    return Question;
  }

}

