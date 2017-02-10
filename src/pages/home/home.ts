declare var ApiAIPlugin:any;

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public messages: Array<string> = [];
  public chatbox: string;
  public feedBackVoicer: string;

  constructor(public navCtrl: NavController) {
    this.messages = ['a', 'b'];
  }

  send(message) {
    if(message && message != "") {
      try {      
        console.log(ApiAIPlugin);
        ApiAIPlugin.requestText(
            {
                query: message
            },
            (response) => { this.receiveText(response)} ,
            function (error) {
                // place your error processing here 
                alert(error);
            });
        } catch (e) {
            alert(e);
        }
      }
  }

  sendVoice() {
     ApiAIPlugin.requestVoice({},
      function (response) {
        console.log(JSON.stringify(response['result']['resolvedQuery']));
          console.log(JSON.stringify(response['result']['fulfillment']['speech']));
      },
      function (error) {
        alert("Error!\n" + error);
      });

//      try {     
//       // ApiAIPlugin.levelMeterCallback(function(level) {
//       //      // console.log(level);
//       //     });

//       ApiAIPlugin.setListeningStartCallback(() => {
//         this.feedBackVoicer = 'Escutando...'
//     console.log("listening started");
// });

// ApiAIPlugin.setListeningFinishCallback(() => {
//   this.feedBackVoicer = 'Enviado!'
//     console.log("listening stopped");
// });     

//       ApiAIPlugin.requestVoice(
//         {}, // empty for simple requests, some optional parameters can be here
//         (response) => { this.receiveText(response)} ,
//         function (error) {
//             // place your error processing here
//             alert(error);
//         });                
//     } catch (e) {
//         alert(e);
//     }
  }

  receiveText(response) {
      // place your result processing here
      console.log(response);
      console.log(response.result.fulfillment.speech); 
      this.messages.push(response.result.fulfillment.speech);
      this.feedBackVoicer = "";
      //alert(JSON.stringify(response));
  }
  

}
