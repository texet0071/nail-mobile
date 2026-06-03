import { Component, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonTextarea,
  IonFooter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  closeOutline,
  addCircleOutline,
  cameraOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-post-modal',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonTextarea,
    IonFooter
  ],
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.scss'],
})
export class AddPostModalComponent {
  private readonly modalCtrl = inject(ModalController);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly text = signal<string>('');
  protected readonly photoFile = signal<File | null>(null);
  protected readonly photoPreview = signal<SafeResourceUrl | null>(null);

  constructor() {
    addIcons({
      closeOutline,
      addCircleOutline,
      cameraOutline,
      closeCircleOutline,
    });
  }

  protected onTextInput(event: Event): void {
    const target = event.target as HTMLIonTextareaElement;
    this.text.set(target.value ?? '');
  }

  protected onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    this.photoFile.set(file);

    // Создаём preview (безопасный URL)
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview.set(this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string));
    };
    reader.readAsDataURL(file);
  }

  protected removePhoto(): void {
    this.photoFile.set(null);
    this.photoPreview.set(null);
  }

  protected dismiss(): void {
    this.modalCtrl.dismiss();
  }

  protected submit(): void {
    const text = this.text().trim();
    if (!text) return;

    const photoFile = this.photoFile();

    // Если есть фото — возвращаем base64 строку для отображения
    const data: { text: string; photoUrl?: string } = { text };

    if (photoFile) {
      const reader = new FileReader();
      reader.onload = () => {
        data.photoUrl = reader.result as string;
        this.modalCtrl.dismiss(data, 'submit');
      };
      reader.readAsDataURL(photoFile);
    } else {
      this.modalCtrl.dismiss(data, 'submit');
    }
  }
}
