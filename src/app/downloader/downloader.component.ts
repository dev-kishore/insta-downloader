import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DownloaderService } from '../downloader.service';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.scss']
})
export class DownloaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  mediaData = {}

  constructor(private downloaderService: DownloaderService) { }
  
  ngOnInit(): void {
    this.subscription = this.downloaderService.media.subscribe({
      next: (res) => {
        this.mediaData = res
        console.log(this.mediaData);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
