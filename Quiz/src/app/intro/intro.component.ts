import { Component, OnInit } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
// import { Socket } from 'src/app/service/serverConnection.js'

//declare var serverData: any;

export interface Question {
  textvalue: string;
  answers: Answer[];
}

export interface Answer {
  text: string,
  feedback: string,
  iscorrect: boolean
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  private httpClient: HttpClient;
  public step: number;

  public completeJson: any = {};

  constructor(http: HttpClient, private router: Router) {
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

      this.completeJson = JSON.parse(JSON.stringify(data));
      console.log(this.completeJson);
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
    value = this.completeJson[step];
    return value;
  }

  returnCurrentQuestion(): Question {
    const step = "step" + this.step;
    const Question: Question = this.completeJson[step];
    return Question;
  }

  chooseVersion(clickedOption: Answer) {
    switch (clickedOption) {
      case this.completeJson["step1"].answers[0]: {
        console.log(this.completeJson["step1"].answers[0]);
        this.router.navigate(['/mainpart'], { queryParams: { version: 'child' } });
        break;
      }
      case this.completeJson["step1"].answers[1]: {
        console.log(this.completeJson["step1"].answers[1]);
        this.changeStep(2);
        break;
      }
      case this.completeJson["step2"].answers[0]: {
        this.router.navigate(['/mainpart'], { queryParams: { version: 'compact' } });
        break;
      }
      case this.completeJson["step2"].answers[1]: {
        this.router.navigate(['/mainpart'], { queryParams: { version: 'bulky' } });
        break;
      }

    }
  }

}

