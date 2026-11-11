import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //Specifically, update the URI according to the base URL for express and the endpoint.
    var uri:string = encodeURI(this.expressBaseUrl + endpoint);

    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    var uri:string = encodeURIComponent('/search/' + category + '/' + resource);
    var returnedData:ResourceData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      return returnedData.concat(data);
    });
    //TODO: Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
  }

  getArtist(artistId:string):Promise<ArtistData> {
    var uri:string = encodeURIComponent("/artist/" + artistId);
    return this.sendRequestToExpress(uri).then((data) => {
      return new ArtistData(data);
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    var uri:string = encodeURIComponent("/artist-top-tracks/" + artistId);
    var dataArray:TrackData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      return dataArray.concat(data);
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    var uri:string = encodeURIComponent("/artist-albums/" + artistId);
    var albums:AlbumData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      return albums.concat(data);
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    var uri:string = encodeURIComponent("/album/" + albumId);
    return this.sendRequestToExpress(uri).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    var uri:string = encodeURIComponent("/album-tracks/" + albumId);
    var album_tracks:TrackData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      return album_tracks.concat(data);
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    var uri:string = encodeURIComponent("/track/" + trackId);
    return this.sendRequestToExpress(uri).then((data) => {
      return new TrackData(data);
    });
  }
}