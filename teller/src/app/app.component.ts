import { Component, OnInit } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';

declare var serverData: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'teller';
  private httpClient: HttpClient;

  configData;

  pathToJson: string;

  currentRotation: number = 0;
  currentPartOfPlate: number = 1;

  currentAudio = new Audio();

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {
    // camData();
    serverData.camData(this.returnDataFromCam);
    this.getFile('/assets/config.json');
  }

  returnDataFromCam(data: any) {
    console.log(data);
  }

  getFile(pathToFile: string) {
    this.httpClient.get(pathToFile, { responseType: 'json' }).subscribe(data => {
      this.configData = data;

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

  async stopMovement() {

  }

  async startMovement() {
    await this.rotate(0.01);
  }

  async rotate(deg: number, stop?: boolean) {
    //start bremsen
    if (deg >= 0.5 && !stop) {
      deg += 0.01;
      if (this.currentRotation >= 360) { this.currentRotation = 0; }
      this.currentRotation += deg;
      await this.delay(1);
      this.rotate(deg, true);
    }
    //beschleunigt
    else if (deg < 0.5 && !stop) {
      deg += 0.01;
      if (this.currentRotation >= 360) { this.currentRotation = 0; }
      this.currentRotation += deg;
      await this.delay(1);
      this.rotate(deg);
    }
    //bremsen
    else if (deg > 0 && stop) {
      deg -= 0.01;
      if (this.currentRotation >= 360) { this.currentRotation = 0; }
      this.currentRotation += deg;
      await this.delay(1);
      this.rotate(deg, true);
    }
    if (deg <= 0) {
      console.log("currentRotation " + this.currentRotation)
      this.afterStopOfRotation();
    }
  }

  afterStopOfRotation() {
    if (this.configData) {
      for (let [index, element] of this.configData['plateSection'].entries()) {
        const firstCoordinate: number = element[index + 1]["from"];
        const secondCoordinate: number = element[index + 1]["until"];
        console.log("first " + firstCoordinate)
        console.log("second " + secondCoordinate)
        console.log("currentRotation " + this.currentRotation)
        if (this.checkPartOfPlate(Number(firstCoordinate), Number(secondCoordinate))) {
          this.currentPartOfPlate = index + 1;
          console.log("partOfPlate = " + this.currentPartOfPlate)
          break;
        }
      }
      this.playAudio();
    }

  }

  checkPartOfPlate(start: number, end: number): boolean {
    if (start < end) {
      if (this.currentRotation >= start && this.currentRotation <= end) {
        return true;
      }
    }
    if (start > end) {
      if (this.currentRotation > start || this.currentRotation < end) {
        return true;
      }
    }
    return false;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stopAudio() {
    this.currentAudio.pause();
    this.currentAudio.currentTime = 0;
  }

 async playAudio() {
    try {
      if (this.currentAudio.src.split("/assets")[1] !== this.configData['plateSection'][this.currentPartOfPlate][this.currentPartOfPlate + 1]["audioPath"].split("/assets")[1]) {
        this.stopAudio();
      }

      console.log(this.currentAudio.src.split("/assets")[1])
      console.log(this.configData['plateSection'][this.currentPartOfPlate][this.currentPartOfPlate + 1]["audioPath"].split("/assets")[1])

      if (this.currentAudio.src.split("/assets")[1] !== this.configData['plateSection'][this.currentPartOfPlate][this.currentPartOfPlate + 1]["audioPath"].split("/assets")[1]) {
        // console.log(this.currentAudio.src.split("/assets")[1])
        console.log("in loop")
        this.currentAudio.src = this.configData['plateSection'][this.currentPartOfPlate][this.currentPartOfPlate + 1]["audioPath"];
        this.currentAudio.load();
        this.currentAudio.play();
        await this.delay(2000);
      }
      this.currentAudio.onended = () => {

      }

    } catch (e) { console.log("error while playing Audio") }
  }
  // selectAudioPath(): string {
  //   switch (this.currentPartOfPlate) {
  //     case 1: {
  //       return this.configData['plateSection'][this.currentPartOfPlate]
  //     }
  //     case 2: {

  //     }
  //     case 3: {

  //     }
  //     case 4: {

  //     }
  //     case 5: {

  //     }
  //     case 6: {

  //     }
  //     case 7: {

  //     }
  //     case 8: {

  //     }

  //   }
  // }
}
