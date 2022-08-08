import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {Room} from '../../components.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
    basePath = environment.apiUrl + '/rooms';

    httpOptions = {
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
    getAllRooms(): Observable<Room> {
        return this.http.get<Room>(this.basePath, this.httpOptions);
    }
    createRoom(room: any): Observable<Room> {
        return this.http.post<Room>(this.basePath, JSON.stringify(room), this.httpOptions);
    }
    updateRoom(id: any, room: Room): any {
        return this.http.put<Room>(`this.basePath/${id}`, JSON.stringify(room), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError));
    }

    deleteRoom(id: any): any {
        return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError));
    }
}
