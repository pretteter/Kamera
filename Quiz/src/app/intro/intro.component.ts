import { Component, OnInit } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
// import { Socket } from 'src/app/service/serverConnection.js'

declare var serverData: any;

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

  completeJson: any = {};
  configJson: any = {}
  currentAudio = new Audio();

  constructor(http: HttpClient, private router: Router) {
    this.httpClient = http;
    this.step = 0;
  }

  ngOnInit(): void {
    console.log("start")
    // const pathToFile: string = '/assets/textfiles/begruesungstext.html'
    // console.table(this.getFile(pathToFile));
    this.loadGreeting();
    serverData.camData(this.returnDataFromCam);
  }

  loadGreeting() {
    this.getFile('/assets/textfiles/intro.json');
    this.getFile('/assets/textfiles/kinectKonfig.json');
  }

  returnDataFromCam(data: any) {
    console.log(data);
  }

  getFile(pathToFile: string, config?: boolean) {
    this.httpClient.get(pathToFile, { responseType: 'json' }).subscribe(data => {

      if (config) {
        this.configJson = JSON.parse(JSON.stringify(data));
        console.log(this.configJson);
      } else {
        this.completeJson = JSON.parse(JSON.stringify(data));
        console.log(this.completeJson);
      }
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
      case this.completeJson["step2"].answers[0]: {
        console.log(this.completeJson["step2"].answers[0]);
        this.router.navigate(['/mainpart'], { queryParams: { version: 'child' } });
        break;
      }
      case this.completeJson["step2"].answers[1]: {
        console.log(this.completeJson["step2"].answers[1]);
        this.changeStep(3);
        break;
      }
      case this.completeJson["step3"].answers[0]: {
        this.router.navigate(['/mainpart'], { queryParams: { version: 'compact' } });
        break;
      }
      case this.completeJson["step3"].answers[1]: {
        this.router.navigate(['/mainpart'], { queryParams: { version: 'bulky' } });
        break;
      }

    }
  }

  stopAudio() {
    this.currentAudio.pause();
    this.currentAudio.currentTime = 0;
  }

  playAudio() {
    try {
      this.currentAudio.src = this.completeJson["audio"];
      this.currentAudio.load();
      this.currentAudio.play();


      this.currentAudio.onended = () => {
        this.changeStep(2);
      }

    } catch (e) { console.log("error while playing Audio") }
  }

}

