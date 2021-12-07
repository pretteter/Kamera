import { Component, OnInit } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';
// import { Socket } from 'src/app/service/serverConnection.js'

declare var serverData: any;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  private httpClient: HttpClient;
  public status: number;
  public greetings: string;


  constructor(http: HttpClient) {
    this.httpClient = http;
    this.status = 1;
    this.greetings=this.loadGreeting();
  }

  ngOnInit(): void {
    console.log("start")
    const pathToFile: string = '/assets/textfiles/begruesungstext.html'
    console.table(this.getFile(pathToFile));

  }
  loadGreeting(): string {
    // this.getFile(pathToFile);
    return this.getFile('/assets/textfiles/begruesungstext.html');
  }

  getFile(pathToFile: string):any {
    this.httpClient.get(pathToFile, { responseType: 'text' }).subscribe(data => {
      console.table(data.toString());
      this.greetings = data.toString();
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
    this.status = change;
  }

}

