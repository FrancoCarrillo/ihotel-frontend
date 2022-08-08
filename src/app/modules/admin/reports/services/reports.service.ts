import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Hotel} from "../../hotel/Model/hotel";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
    basePath = environment.apiUrl + '/reports';
    httpOptions = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http: HttpClient) { }
    handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.log(`An error ocurred: ${error.error.message}`);
        } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        return throwError(() => new Error('Something happened with request, please try again later'));
    }
    getAllReports(): Observable<any> {
        return this.http.get<any>(this.basePath, this.httpOptions);
    }
}
