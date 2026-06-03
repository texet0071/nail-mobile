import { Component, inject, signal } from '@angular/core';
import { MockDataService, Post } from '../../services/mock-data.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardContent, IonAvatar, IonLabel,
  IonItem, IonList, IonRefresher, IonRefresherContent, IonModal, IonButtons,
  IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, heartOutline, chatbubbleOutline, closeOutline, timeOutline, add
} from 'ionicons/icons';
import { AddPostModalComponent } from '../../components/add-post-modal/add-post-modal.component';

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
  private readonly modalCtrl = inject(ModalController);

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
    const modal = await this.modalCtrl.create({
      component: AddPostModalComponent,
      cssClass: 'add-post-modal',
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss<{ text: string; photoUrl?: string }>();

    if (role === 'submit' && data?.text) {
      this.mockData.addPost(data.text.trim(), data.photoUrl);
    }
  }
}
