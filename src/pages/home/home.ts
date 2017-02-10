declare var ApiAIPlugin:any;

import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public messages: Array<any> = [];
  public data: Observable<Array<any>>;
  public chatBox: string;
  public feedBackVoicer: string;
  
  private anyErrors: any;
  private finished: Boolean;
  private events: Events;
  
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public eventsInject: Events) {
    this.events = eventsInject;
    this.pushMessageBoxBender("I'm Bender, baby! Oh god, please insert liquor before request anything", null);

     this.data = new Observable(observer => {
          setTimeout(() => {
              observer.complete();
          }, 3000);
      });

      this.data.subscribe(
          value => this.messages.push(value),
          error => this.anyErrors = true,
          () => this.finished = true
      );

    this.events.subscribe('messages:updated', (messagesUpdated) => {
      console.log(messagesUpdated);
      //Perform some operations
      this.messages = messagesUpdated;
    });

  }
  
  send(message) {
    if(message && message != "") {
      this.pushMessageBoxPerson(message);
      this.chatBox = '';
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

  scrollToBottom(){
    if (this.content) {
      this.content.scrollToBottom();
    }
  }

  pushMessageBoxPerson(mensagem) {
    this.pushMessageBox(mensagem, 'Person', 'Ricardex Dj', null);
  }

  pushMessageBoxBender(mensagem, fullMessages) {
    this.pushMessageBox(mensagem, 'Bender', 'Bender', fullMessages);
  }

  pushMessageBox(mensagem, sender, nickname, fullMessages) {
    this.messages.push({
        mensagem: mensagem,
        sender: sender,
        nickname: nickname,
        fullMessages: fullMessages
      });
      this.events.publish('messages:updated', this.messages);
      this.scrollToBottom();
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
      if (response.result.fulfillment.speech === '') {
        this.handleBlankResponse()
      } else {
        console.log(response);
        console.log(response.result.fulfillment.speech); 

         setTimeout( () => {
        this.pushMessageBoxBender(response.result.fulfillment.speech, response.result.fulfillment.messages);
 },500)
      }
      //alert(JSON.stringify(response));
  }

  handleBlankResponse() {
    this.pushMessageBoxBender('Fui atacado por Klingons e não consegui entregar seu pedido, por favor contate meu criador!', null);
  }
  

}
