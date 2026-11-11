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
    //console.log(uri);

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
      if (category == "artist") {
        returnedData = data.artists.items.map((artist:any) => new ArtistData(artist));
        return returnedData;
      } else if (category == "album") {
        returnedData = data.albums.items.map((album:any) => new AlbumData(album));
        return returnedData;
      } else if (category == "track") {
        returnedData = data.tracks.items.map((track:any) => new TrackData(track));
        return returnedData;
      } else {
        return [];
      }
    });
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
      dataArray = data.items.map((track:any) => new TrackData(track));
      return dataArray;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    var uri:string = encodeURIComponent("/artist-albums/" + artistId);
    var albums:AlbumData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      albums = data.items.map((album:any) => new AlbumData(album));
      return albums;
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
      album_tracks = data.items.map((track:any) => new TrackData(track));
      return album_tracks;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    var uri:string = encodeURIComponent("/track/" + trackId);
    return this.sendRequestToExpress(uri).then((data) => {
      return new TrackData(data);
    });
  }
}