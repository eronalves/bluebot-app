declare var ApiAIPlugin:any;

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      if (platform.is('cordova')) {
        ApiAIPlugin.init(
            {
                clientAccessToken: "2be3f8191a4949dbb447e72558951e6f", // insert your client access key here
                lang: "en" // set lang tag from list of supported languages
            }, 
            function(result) { /* success processing */ },
            function(error) { /* error processing */ }
        );
      }
    });
  }
}
