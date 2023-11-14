import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { baseUrl } from 'src/app/environments/environment';
import { ServerExceptionResponse } from 'src/app/shared/models/ServerExceptionResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // message = 'essa';
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    // this.httpClient.get<ServerExceptionResponse>(`${baseUrl}/demo`).subscribe(res => {
    //   this.message = res.message
    // })
  }
}