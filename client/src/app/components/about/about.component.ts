import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {
  name:string = "";
  profile_pic:string = "assets/unknown.jpg";
  profile_link:string = "";

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() { 
    var data = this.spotifyService.aboutMe();
    console.log(data);
  }

   /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */

}
