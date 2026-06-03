import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-master-tabs',
  standalone: true,
  imports: [
    RouterLink,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  ],
  templateUrl: './master-tabs.page.html'
})
export class MasterTabsPage {
  constructor() {
    addIcons({ calendarOutline, personCircleOutline });
  }
}
