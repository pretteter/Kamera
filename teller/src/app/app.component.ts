import { Component, OnInit } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';

declare function camData(): any;
declare var serverData: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'teller';
  private httpClient: HttpClient;


  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {
    // camData();
    let x = serverData.camData()
    console.log(x)

  }



  getFile(pathToFile: string) {
    this.httpClient.get(pathToFile, { responseType: 'json' }).subscribe(data => {

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
