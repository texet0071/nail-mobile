import { Component, inject, signal } from '@angular/core';
import { MockDataService, Post } from '../../services/mock-data.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardContent, IonAvatar, IonLabel,
  IonItem, IonList, IonRefresher, IonRefresherContent, IonModal, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, heartOutline, chatbubbleOutline, closeOutline, timeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
    IonCard, IonCardHeader, IonCardContent, IonAvatar, IonLabel,
    IonItem, IonList, IonRefresher, IonRefresherContent, IonModal, IonButtons
  ],
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {
  private readonly mockData = inject(MockDataService);
  protected posts: Post[] = this.mockData.getPosts();

  protected selectedPost = signal<Post | null>(null);
  protected isModalOpen = signal(false);

  constructor() {
    addIcons({
      personCircleOutline, heartOutline, chatbubbleOutline, closeOutline, timeOutline
    });
  }

  protected doRefresh(event: CustomEvent): void {
    this.posts = this.mockData.getPosts();
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
}
