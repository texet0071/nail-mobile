import { Component, inject, signal, ViewChild, afterNextRender } from '@angular/core';
import { MockDataService, Message } from '../../services/mock-data.service';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonIcon,
  IonFooter,
  IonAvatar,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sendOutline } from 'ionicons/icons';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonButton,
    IonIcon,
    IonFooter,
    IonAvatar,
    IonText,
  ],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  @ViewChild(IonContent) private readonly content?: IonContent;

  private readonly mockData = inject(MockDataService);
  protected readonly messages = signal<Message[]>(this.mockData.getMessages());
  protected readonly newMessage = signal('');

  constructor() {
    addIcons({ sendOutline });
  }

  protected onMessageInput(event: Event): void {
    const value = (event.target as HTMLIonInputElement).value;
    this.newMessage.set(typeof value === 'string' ? value : '');
  }

  protected sendMessage(): void {
    const text = this.newMessage().trim();
    if (!text) {
      return;
    }

    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'client',
      time: new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    this.messages.update((msgs) => [...msgs, newMsg]);
    this.newMessage.set('');

    if (this.content) {
      this.content.scrollToBottom(300);
    }
  }
}
