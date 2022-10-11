import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DownloaderService } from '../downloader.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnDestroy {

  errorMessage: string = ''

  subscription: Subscription

  link = new FormControl('', Validators.required)

  constructor(public downloaderService: DownloaderService) { }

  getMedia() {
    this.downloaderService.isLoading = true
    let url: string = this.link.value
    if (url.includes('/reel/')) {
      this.subscription = this.downloaderService.downloadReel(url).subscribe({
        next: (res) => {
          this.downloaderService.media.next(res)
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else if (url.includes('/tv/')) {
      this.subscription = this.downloaderService.downloadVideo(url).subscribe({
        next: (res) => {
          this.downloaderService.media.next(res)
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else if (url.includes('/p/')) {
      this.subscription = this.downloaderService.downloadImage(url).subscribe({
        next: (res) => {
          this.downloaderService.media.next(res)
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {

    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
