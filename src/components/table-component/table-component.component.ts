import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IonRange } from '@ionic/angular';
import { Howl } from 'howler';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'filename'];
  activeTrack = null;
  player: any;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range: IonRange; //strictPropertyInitialization: false

  start(track: any) {
    if (this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src: [track.path],
      onplay: () => {
        this.activeTrack = track;
        this.isPlaying = true;
        this.updateProgress();
      },
      onend: () => {
        this.nextTrack()
        //this.isPlaying = false;
      },
    });

    this.player.play();
  }

  togglePlayer(pause: any) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  prevTrack() {
    let index = this.playlist.indexOf(this.activeTrack as any);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }
  nextTrack() {
    let index = this.playlist.indexOf(this.activeTrack as any);
    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  moveTo() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }

  playlist: iTrack[] = [
    {
      id: 1,
      name: '',
      filename: '',
      path: '../../assets/sounds/Nabboo and Misha Miller - Feel You.mp3',
    },
    {
      id: 2,
      name: '',
      filename: '',
      path: '../../assets/sounds/Flora Cash - Youre Somebody Else.mp3',
    },
    {
      id: 3,
      name: '',
      filename: '',
      path: '../../assets/sounds/Imagine_Dragons - Radioactive.mp3',
    },
    {
      id: 4,
      name: '',
      filename: '',
      path: '../../assets/sounds/Daddy Yankee Katy Perry Snow - Con Calma.mp3',
    },
    {
      id: 5,
      name: '',
      filename: '',
      path: '../../assets/sounds/C C Catch - Cause You Are Young.mp3',
    },
    {
      id: 6,
      name: '',
      filename: 'Kiffin',
      path: '../../assets/sounds/Jim Yosef_Scarlett - Volcano.mp3',
    },
  ];

  dataSource = new MatTableDataSource(this.playlist);

  ngOnInit(): void {
    for (let i = 0; i < this.playlist.length; i++) {
      this.playlist[i].filename = this.playlist[i].path.substring(
        this.playlist[i].path.lastIndexOf('/') + 1
      );
      this.playlist[i].name = this.playlist[i].path
        .substring(this.playlist[i].path.lastIndexOf('-') + 1)
        .replace(/\.[^/.]+$/, '');
    }
    this.activeTrack = this.playlist[0] as any;
    this.start(this.activeTrack);
  }
}

export interface iTrack {
  id: number;
  name: string;
  filename: string;
  path: string;
}
