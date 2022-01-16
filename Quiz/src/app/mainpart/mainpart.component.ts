import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Question } from '../intro/intro.component';
import { Answer } from '../intro/intro.component';

declare var serverData: any;

@Component({
  selector: 'app-mainpart',
  templateUrl: './mainpart.component.html',
  styleUrls: ['./mainpart.component.scss']
})
export class MainpartComponent implements OnInit, OnDestroy {
  private httpClient: HttpClient;
  version: string;
  currentQuestion: number;
  currentAudioPart: string;
  completeJson: JSON;
  showFeedback: boolean = false;
  selectedAnswer: Answer;
  currentAudio = new Audio();

  isQuizFinished: boolean;

  public leftFoot: any = "";
  public rightFoot: any = "";

  configJson: any = {}

  lastTimeStamp = new Date().getTime();
  lastSelectedQuestion: number = -1;

  constructor(http: HttpClient, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.httpClient = http;
    this.currentQuestion = 1;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.version = params.version;
    }
    );
    this.getFile('/assets/textfiles/kinectKonfig.json', true);
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
    serverData.camData(this.returnDataFromCam, this);
  }

  playAudio(partOfQuestion: string) {
    try {
      this.currentAudio.src = this.selectAudioPath(partOfQuestion);
      this.currentAudio.load();
      this.currentAudio.play();
      // this.currentAudio.onended = () => {
      //   alert("The audio has ended");
      // }
      this.currentAudio.onended = () => {
        if (this.checkIfAudioAutoStep()) {
          if (this.checkIfAudiopartExiste(partOfQuestion)) {
            // console.log("next part " + this.nextAudioAutoplay())
            this.playAudio(this.nextAudioAutoplay())
          }
        }
        // alert("The audio has been paused");
      }
      // setTimeout(() => {
      //   // audio.pause();
      //   // audio.currentTime = 0;
      //   this.stopAudio();
      //   console.log(this.currentAudio.ended);
      //   console.log(this.currentAudio.paused);
      // }, 1000)
    } catch (e) { console.log("error while playing Audio") }
  }

  nextAudioAutoplay(currentQuestionIndex?: number): string {
    switch (this.currentAudioPart) {
      case "beforequestion": {
        return "question";
      }
      case "afterquestion": {
        return "";
      }
      case "question": {
        return "answer1text";
      }
      case "answer1text": {
        return "answer2text";
      }
      case "answer2text": {
        return "answer3text";
      }
      case "answer1feedback":
      case "answer2feedback":
      case "answer3feedback": {
        if (this.checkIfAudiopartExiste("afterquestion")) {
          return "afterquestion";
        }
        this.stepAfterFeedback();
        if (this.checkIfAudiopartExiste("beforequestion")) {
          return "beforequestion";
        }
        if (this.checkIfAudiopartExiste("question"))
          return "question";
        else return "";
      }
      default: {
        return "";
      }
    }
  }

  checkIfAudiopartExiste(partOfQuestion: string): boolean {
    console.log(partOfQuestion)
    if (this.selectAudioPath(partOfQuestion).length > 5) {
      return true;
    } else return false;
  }

  checkIfAudioAutoStep(): boolean {
    switch (this.currentAudioPart) {
      case "beforequestion":
      case "afterquestion":
      case "question":
      case "answer1text":
      case "answer1feedback":
      case "answer2text":
      case "answer2feedback":
      case "answer3feedback": {
        return true;
      }
      case "answer3text": {
        return false;
      }
      default: {
        return false
      }
    }
  }

  selectAudioPath(partOfQuestion: string): string {
    try {
      this.currentAudioPart = partOfQuestion;
      switch (partOfQuestion) {
        case "beforequestion": {
          return this.completeJson["audio"]["question" + this.currentQuestion].beforequestion;
        }
        case "afterquestion": {
          return this.completeJson["audio"]["question" + this.currentQuestion].afterquestion;
        }
        case "question": {
          return this.completeJson["audio"]["question" + this.currentQuestion].question;
        }
        case "answer1text": {
          return this.completeJson["audio"]["question" + this.currentQuestion].answers[0].text;
        }
        case "answer1feedback": {
          return this.completeJson["audio"]["question" + this.currentQuestion].answers[0].feedback;
        }
        case "answer2text": {
          return this.completeJson["audio"]["question" + this.currentQuestion].answers[1].text;
        }
        case "answer2feedback": {
          return this.completeJson["audio"]["question" + this.currentQuestion].answers[1].feedback;
        }
        case "answer3text": {
          return this.completeJson["audio"]["question" + this.currentQuestion].answers[2].text;
        }
        case "answer3feedback": {
          return this.completeJson["audio"]["question" + this.currentQuestion].answers[2].feedback;
        }
        default: {
          return "";
        }
      }
    } catch (e) {
      console.log("Fehler beim Pfad aufwählen der Audiodatei");
      return "";
    }
  }

  stopAudio() {
    this.currentAudio.pause();
    this.currentAudio.currentTime = 0;
  }

  stepAfterFeedback() {
    // this.currentAudioStep++;
    this.currentQuestion++;
    this.showFeedback = false;
    // this.playAudio(this.currentAudioStep + 1)
    this.cdr.detectChanges();
  }

  answerSelect(answer: Answer, position: number) {
    this.selectedAnswer = answer;
    this.showFeedback = true;
    // const number: number = Number(this.currentQuestion.toString() + position);
    // console.log(number);
    this.playAudio("answer" + (position + 1) + "feedback");
    this.cdr.detectChanges();
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


      if (this.checkIfAudiopartExiste("beforequestion")) {
        this.playAudio("beforequestion");
      }
      else {
        this.playAudio("question");
      }
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

  returnCurrentProgress(): number {
    if (this.completeJson && this.completeJson['questions']) {
      const maxLength: number = Object.keys(this.completeJson['questions']).length + 1
      if (this.currentQuestion === maxLength - 1) {
        if (this.currentAudio.src.split("/assets")[1] === this.selectAudioPath("afterquestion").split("/assets")[1])
          this.currentAudio.onended = () => {
            this.whenQuizFinished();
          }
      }
      return (this.currentQuestion / maxLength) * 100;
    }
    return 0;
  }

  whenQuizFinished() {
    serverData.sendQuizFinished();
    this.isQuizFinished = true;
  }

  ngOnDestroy(): void {
    this.stopAudio();
    serverData.removeListener();
  }

  selectPicturePath(): string {
    if (this.version === 'child') {
      if (this.showFeedback && this.selectedAnswer?.iscorrect === false) {
        console.log(this.completeJson['picture'].goose_wrong)
        return this.completeJson['picture'].goose_wrong;
      }
      if (this.showFeedback && this.selectedAnswer?.iscorrect === true) {
        return this.completeJson['picture'].goose_right;
      }
      return "";
    }
    else return this.returnIconPath();

  }

  returnIconPath(): string {
    if (this.showFeedback) {
      switch (this.selectedAnswer?.iscorrect) {
        case true: {
          return "assets/icons/check.png";
        }
        case false: {
          return "assets/icons/cross.png";
        }
      }
    }
    else return "";
  }

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  //////////////Gesten///////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////

  returnDataFromCam(data: any, obj: any) {
    if (!obj.checkIfUserInteraction()) {
      return;
    }
    // data?.jointType == 15 ? console.log("links "+data?.cameraX) : "";
    if (data?.jointType == 19) {
      obj.rightFoot = data;
      // console.log("rechts "+obj.rightFoot.cameraX);
    }
    if (data?.jointType == 15) {
      // console.log("links "+data?.cameraX)
      obj.leftFoot = data;
    }


    const answer: number = obj.detectFootSelectedQuestion();

    if (answer !== -1 && answer === obj.lastSelectedQuestion && obj.checkIfFieldSelected()) {
      if (obj.completeJson) {
        obj.answerSelect(obj.completeJson['questions']['question' + obj.currentQuestion]?.answers[answer - 1], answer - 1);
        console.log("Step geht weiter");
      }
    }
    obj.lastSelectedQuestion = answer;
  }

  checkIfBothFeetInQuestion(question: number): boolean {

    if (this.checkIfFootInQuestion(question, "left") && this.checkIfFootInQuestion(question, "right"))
      return true;
    return false;
  }

  checkIfFootInQuestion(answer: number, whichFoot: string): boolean {
    if (!this.configJson) {
      return false;
    }
    const heightNear = this.configJson["mainpart"]["antwort" + answer]["höhe"]["nah"];
    const heightFar = this.configJson["mainpart"]["antwort" + answer]["höhe"]["fern"];
    const widthLeft = this.configJson["mainpart"]["antwort" + answer]["breite"]["links"];
    const widthRight = this.configJson["mainpart"]["antwort" + answer]["breite"]["rechts"];

    let foot;
    if (whichFoot === "left") {
      foot = this.leftFoot
    } else if (whichFoot === "right") {
      foot = this.rightFoot;
    }

    // console.log(whichFoot + "hat x Koordinate " + foot?.cameraX)

    if (foot?.cameraX >= widthLeft && foot?.cameraX <= widthRight) {
      if (foot?.cameraZ >= heightNear && foot.cameraZ <= heightFar) {
        if (answer !== -1 && answer <= 3) {
          console.log("stehst in Antwort " + answer + " mit dem " + whichFoot + " Fuß");
          return true;
        }
      }
    }
    console.log("Fuß " + whichFoot + " steht in keiner Antwort");
    // this.lastTimeStamp = new Date().getTime();
    return false;
  }

  detectFootSelectedQuestion(): number {
    let value: number = -1;
    for (let i: number = 1; i <= 3; i++) {
      if (this.checkIfBothFeetInQuestion(i)) {
        // console.log("stehst in Antwort " + i);
        value = i;
      }
    }
    return value;
  }

  checkIfFieldSelected(): boolean {
    let timeDifference: number = this.configJson ? Number(this.configJson["zeit_bis_antwort_ausgewählt_wird"]) : 3000;
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
    if (this.showFeedback === false && this.currentAudio.paused) {
      return true;
    }
    return false;
  }
}
