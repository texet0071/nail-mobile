import { Component, inject, signal } from '@angular/core';
import { MockDataService, Post } from '../../services/mock-data.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardContent, IonAvatar, IonLabel,
  IonItem, IonList, IonRefresher, IonRefresherContent, IonModal, IonButtons,
  IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, heartOutline, chatbubbleOutline, closeOutline, timeOutline, add
} from 'ionicons/icons';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
    IonCard, IonCardHeader, IonCardContent, IonAvatar, IonLabel,
    IonItem, IonList, IonRefresher, IonRefresherContent, IonModal, IonButtons,
    IonFab, IonFabButton
  ],
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {
  private readonly mockData = inject(MockDataService);
  private readonly alertCtrl = inject(AlertController);

  protected readonly posts = this.mockData.posts;

  protected selectedPost = signal<Post | null>(null);
  protected isModalOpen = signal(false);

  constructor() {
    addIcons({
      personCircleOutline, heartOutline, chatbubbleOutline, closeOutline, timeOutline, add
    });
  }

  protected doRefresh(event: CustomEvent): void {
    this.mockData.getPosts(); // просто обновляем сигнал
    setTimeout(() => (event.target as HTMLIonRefresherElement).complete(), 500);
  }

  // 🔧 Убран лишний параметр isOpen, всегда true при клике
  protected openComments(post: Post): void {
    console.log('Opening modal for post:', post.id); // Для отладки
    this.selectedPost.set(post);
    this.isModalOpen.set(true);
  }

  protected closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedPost.set(null); // Очищаем выбор для безопасности
  }

  protected async addNewPost(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Новый пост',
      message: 'Напишите текст нового поста',
      inputs: [
        {
          name: 'text',
          type: 'textarea',
          placeholder: 'Текст поста...',
          attributes: {
            rows: 4,
          },
        },
      ],
      buttons: [
        { text: 'Отмена', role: 'cancel' },
        {
          text: 'Опубликовать',
          handler: (data: { text: string }) => {
            const text = data.text?.trim();
            if (text) {
              this.mockData.addPost(text);
            }
            return true;
          },
        },
      ],
    });

    await alert.present();
  }
}
