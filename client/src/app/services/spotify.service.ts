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
    var uri:string = '/search/' + category + '/' + encodeURIComponent(resource);
    //var returnedData:ResourceData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      //console.log(data);
      if (category === "artist") {
        return data.artists.items.map((artist:any) => new ArtistData(artist));
      } else if (category === "album") {
        return data.albums.items.map((album:any) => new AlbumData(album));
      } else if (category === "track") {
        return data.tracks.items.map((track:any) => new TrackData(track));
      } else {
        return [];
      }
    })
  }

  getArtist(artistId:string):Promise<ArtistData> {
    var uri:string = "/artist/" + encodeURIComponent(artistId);
    return this.sendRequestToExpress(uri).then((data) => new ArtistData(data));
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    var uri:string = "/artist-top-tracks/" + encodeURIComponent(artistId);
    //var dataArray:TrackData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      return data.items.map((track:any) => new TrackData(track));
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    var uri:string = "/artist-albums/" + encodeURIComponent(artistId);
    //var albums:AlbumData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      return data.items.map((album:any) => new AlbumData(album));
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    var uri:string = "/album/" + encodeURIComponent(albumId);
    return this.sendRequestToExpress(uri).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    var uri:string = "/album-tracks/" + encodeURIComponent(albumId);
    //var album_tracks:TrackData[] = [];
    return this.sendRequestToExpress(uri).then((data) => {
      return data.items.map((track:any) => new TrackData(track));
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    var uri:string = "/track/" + encodeURIComponent(trackId);
    return this.sendRequestToExpress(uri).then((data) => {
      return new TrackData(data);
    });
  }
}