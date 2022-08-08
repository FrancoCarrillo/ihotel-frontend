import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {catchError, Observable, retry, throwError} from "rxjs";
import {Hotel} from '../Model/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
    basePath = environment.apiUrl + '/hotels';
    httpOptions = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  constructor(private http: HttpClient) { }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log(`An error ocurred: ${error.error.message}`);
        } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        return throwError(() => new Error('Something happened with request, please try again later'));
    }
    getAllHotels(): Observable<Hotel> {
        return this.http.get<Hotel>(this.basePath, this.httpOptions);
    }
    createHotel(hotel: Hotel): Observable<Hotel> {
      return this.http.post<Hotel>(this.basePath, JSON.stringify(hotel), this.httpOptions);
    }
    updateHotel(id: any, hotel: Hotel): any {
      return this.http.put<Hotel>(`${this.basePath}/${id}`, JSON.stringify(hotel), this.httpOptions)
          .pipe(
              retry(2),
              catchError(this.handleError));
    }

    deleteHotel(id: any): any {
        return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError));
    }
}
