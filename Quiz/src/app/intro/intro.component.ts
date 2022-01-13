import { Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
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
export class IntroComponent implements OnInit, OnDestroy {
  private httpClient: HttpClient;
  public step: number;

  public leftFoot: any = "";
  public rightFoot: any = "tschüss";

  completeJson: any = {};
  configJson: any = {}
  currentAudio = new Audio();

  lastTimeStamp = new Date().getTime();
  lastSelectedQuestion: number;

  constructor(http: HttpClient, private router: Router, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this.httpClient = http;
    this.step = 0;
  }

  ngOnInit(): void {
    console.log("start")
    this.loadGreeting();
    serverData.camData(this.returnDataFromCam, this);
    //  serverData.sendQuizFinished();
  }

  loadGreeting() {
    this.getFile('/assets/textfiles/intro.json');
    this.getFile('/assets/textfiles/kinectKonfig.json', true);
  }

  returnDataFromCam(data: any, obj: any) {

    if (!obj.checkIfUserInteraction()) {
      return;
    }
    obj.leftFoot = data;
    if (data?.jointType == 19)
      obj.leftFoot = data;
    if (data?.jointType == 15)
      obj.rightFoot = data;
    const answer: number = obj.detectFootSelectedQuestion();
    //const checkQuestion: number = Object.assign({}, question)
    if (answer !== -1 && answer === obj.lastSelectedQuestion && obj.checkIfFieldSelected()) {
      if (obj.step === 0) {
        obj.changeStep(1);
        obj.playAudio();
      } else {
        const currentQuestion = obj.returnCurrentQuestion();
        obj.chooseVersion(currentQuestion.answers[answer - 1])
      }
      console.log("Step geht weiter");
    }
    obj.lastSelectedQuestion = answer;
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
    this.cdr.detectChanges();
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
        this.ngZone.run(() => this.router.navigate(['/mainpart'], { queryParams: { version: 'child' } }));
        break;
      }
      case this.completeJson["step2"].answers[1]: {
        console.log(this.completeJson["step2"].answers[1]);
        this.changeStep(3);
        break;
      }
      case this.completeJson["step3"].answers[0]: {
        this.ngZone.run(() => this.router.navigate(['/mainpart'], { queryParams: { version: 'compact' } }));
        break;
      }
      case this.completeJson["step3"].answers[1]: {
        this.ngZone.run(() => this.router.navigate(['/mainpart'], { queryParams: { version: 'bulky' } }));
        break;
      }

    }
    this.cdr.detectChanges();
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

  checkIfBothFeetInQuestion(question: number): boolean {
    const heightNear = this.configJson["intro"]["antwort" + question]["höhe"]["nah"];
    const heightFar = this.configJson["intro"]["antwort" + question]["höhe"]["fern"];
    const widthLeft = this.configJson["intro"]["antwort" + question]["breite"]["links"];
    const widthRight = this.configJson["intro"]["antwort" + question]["breite"]["rechts"];



    if (this.leftFoot?.cameraX >= widthLeft && this.leftFoot?.cameraX <= widthRight) {
      if (this.leftFoot?.cameraZ >= heightNear && this.leftFoot?.cameraZ <= heightFar) {
        if (question === 0 && this.checkIfFootStep()) {
          return true;
        } else if (question !== 0 && !this.checkIfFootStep()) {
          return true;
        }
      }
    }
    return false;
  }

  detectFootSelectedQuestion(): number {
    let value: number = -1;
    for (let i: number = 0; i <= 2; i++) {
      if (this.checkIfBothFeetInQuestion(i)) {
        console.log("stehst in Antwort " + i);
        value = i;
      }
    }
    if (value === -1) {
      console.log("du stehst in keiner Antwort")
    }

    return value;
  }

  checkIfFootStep(): boolean {
    if (this.step === 0 || this.step === 1) {
      return true;
    }
    return false;
  }

  checkIfFieldSelected(): boolean {
    const timeDifference: number = this.configJson ? Number(this.configJson["zeit_bis_antwort_ausgewählt_wird"]) : 3000;
    const currentTimeStamp = new Date().getTime();
    if (!this.lastTimeStamp) {
      this.lastTimeStamp = new Date().getTime();
    }

    if (currentTimeStamp - this.lastTimeStamp > timeDifference * 2 + 2000) {
      console.log("lastTime zu lang her")
      this.lastTimeStamp = currentTimeStamp
    }

    if (this.lastTimeStamp + timeDifference <= currentTimeStamp) {
      this.lastTimeStamp = currentTimeStamp;
      return true;
    }
    return false;
  }

  checkIfUserInteraction(): boolean {
    if (this.step !== 1) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    serverData.removeListener();
  }
}

