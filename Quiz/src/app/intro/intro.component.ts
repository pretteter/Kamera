import { Component, OnInit } from '@angular/core';
import {
  HttpClient, HttpErrorResponse
} from '@angular/common/http';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  private httpClient: HttpClient;
  public status: number;


  constructor(http: HttpClient) { this.httpClient = http; this.status = 1; }

  ngOnInit(): void {
    console.log("start")
    const pathToFile: string = 'src/assets/textfiles/begruesungstext.html'
    console.table(this.getFile(pathToFile));
  }
  loadGreeting(): string {
    // const pathToFile: string = '../../assets/textfiles/begruesungstext.html'
    // this.getFile(pathToFile);
    return "Hallo";
  }

  getFile(pathToFile: string) {
    this.httpClient.get(pathToFile).subscribe(data => {
      console.table(data.toString());
    },
      // (err: HttpErrorResponse) => {
      //   if (err.error instanceof Error) {
      //     // A client-side or network error occurred. Handle it accordingly.
      //     console.log('An error occurred:', err.error.message);
      //   } else {
      //     // The backend returned an unsuccessful response code.
      //     // The response body may contain clues as to what went wrong,
      //     console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      //   }
      // }
    );
  }

  changeStep(change: number) {
    this.status = change;
  }

}

