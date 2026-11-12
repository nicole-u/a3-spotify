import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css'],
    standalone: false
})
export class ArtistPageComponent implements OnInit {
  //am i supposed to change this bc it throws errors if i don't
	artistId:string;
	artist:ArtistData;
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.spotifyService.getArtist(this.artistId).then((artist:ArtistData) => {
      this.artist = new ArtistData(artist);
    });

    this.spotifyService.getAlbumsForArtist(this.artistId).then((albums:AlbumData[]) => {
      this.albums = albums;
    });

    this.spotifyService.getTopTracksForArtist(this.artistId).then((tracks:TrackData[]) => {
      this.topTracks = tracks;
    });
  }

}