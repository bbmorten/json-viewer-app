import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class MyDataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    console.log(environment.srv_port);
    return this.http.get(`http://backend:${environment.srv_port}/getData`);
  }
}
