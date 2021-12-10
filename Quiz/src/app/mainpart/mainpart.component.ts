import { Component, OnInit } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Question } from '../intro/intro.component';
import { Answer } from '../intro/intro.component';

@Component({
  selector: 'app-mainpart',
  templateUrl: './mainpart.component.html',
  styleUrls: ['./mainpart.component.scss']
})
export class MainpartComponent implements OnInit {
  private httpClient: HttpClient;
  private version: string;
  currentQuestion: number;
  completeJson;
  showFeedback: boolean = false;
  selectedAnswer: Answer;

  constructor(http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.httpClient = http;
    this.currentQuestion = 1;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.version = params.version;
    }
    );
    switch (this.version) {
      case "compact": {
        this.getFile('/assets/textfiles/versionKompakt.json');
        break;
      }
      case "bulky": {
        this.getFile('/assets/textfiles/versionUmfangreich.json');
        break;
      }
      case "child": {
        this.getFile('/assets/textfiles/versionKinder.json');
        break;
      }
    }


  }

  returnCurrentText(): string {
    let value: string = "";
    const step = "step" + this.currentQuestion;
    value = this.completeJson[step];
    return value;
  }

  returnCurrentAnswer(question: Question): Answer[] {

    return question.answers
  }

stepAfterAudioEnd(){
  this.currentQuestion++;
  this.showFeedback=false
}


  getFile(pathToFile: string) {
    this.httpClient.get(pathToFile, { responseType: 'json' }).subscribe(data => {

      this.completeJson = JSON.parse(JSON.stringify(data));

      // console.log(this.returnCurrentAnswer(this.completeJson['questions']['question' + this.currentQuestion]))
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
}
