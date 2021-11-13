import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcel } from '../models/parcel';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private http : HttpClient

  constructor(http : HttpClient) {
    this.http = http;
  }
  public getAllParcels(): Observable<Parcel[]>{
    return this.http.get<Parcel[]>("https://localhost:44368/Parcel")
  }
  public addParcel(parcel : Parcel): Observable<number>{
    return this.http.post<number>("https://localhost:44368/Parcel", parcel)
  }

  public updateParcel(updatedParcel:Parcel): Observable<Parcel> {
    return this.http.put<Parcel>("https://localhost:44368/Parcel", updatedParcel);
  }

  public deleteParcel(id: number): Observable<Parcel> {
    return this.http.delete<Parcel>(`https://localhost:44368/Parcel/${id}`);
  }
}
