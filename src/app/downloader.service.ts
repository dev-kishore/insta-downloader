import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  media = new BehaviorSubject(null)

  isLoading: boolean = false

  constructor(private http: HttpClient) { }

  downloadReel(url: string): Observable<any> {
    return this.http.get(`http://localhost:8080/downloader/reels?url=${url}`)
  }

  downloadImage(url: string): Observable<any> {
    return this.http.get(`http://localhost:8080/downloader/reels?url=${url}`)
  }

  downloadVideo(url: string): Observable<any> {
    return this.http.get(`http://localhost:8080/downloader/reels?url=${url}`)
  }

}
