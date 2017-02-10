declare var ApiAIPlugin:any;

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public messages: Array<any> = [];
  public chatbox: string;
  public feedBackVoicer: string;

  constructor(public navCtrl: NavController) {
    this.pushMessageBoxBender('Oi, em que posso ajudá-lo?');
    this.pushMessageBoxPerson('Quando o André vai liberar cerveja?');
  }

  send(message) {
    if(message && message != "") {
      this.pushMessageBoxPerson(message);

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

  private 

  pushMessageBoxPerson(mensagem) {
    this.pushMessageBox(mensagem, 'Person', 'Ricardex Dj');
  }

  pushMessageBoxBender(mensagem) {
    this.pushMessageBox(mensagem, 'Bender', 'Bender');
  }

  pushMessageBox(mensagem, sender, nickname) {
    this.messages.push({
        mensagem: mensagem,
        sender: sender,
        nickname: nickname
      });
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
  }

  receiveText(response) {
      // place your result processing here
      console.log(response);
      console.log(response.result.fulfillment.speech); 
      this.pushMessageBoxBender(response.result.fulfillment.speech);

      //alert(JSON.stringify(response));
  }
  

}
