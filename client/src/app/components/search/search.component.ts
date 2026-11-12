import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpotifyService],
    standalone: false
})
export class SearchComponent implements OnInit {
  //again am i supposed to change this bc it seriously throws errors if i don't
  searchString:string;
  searchCategory:string;
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
        this.resources = data;
        //console.log(this.resources);
      });
  }

}
