import { Injectable, signal } from '@angular/core';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
  comments: number;
  commentsList: Comment[];
}

export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'client' | 'master';
  time: string;
}

export interface Appointment {
  id: string;
  service: string;
  client: string;
  clientPhone: string;
  clientRating: number;
  clientComment: string;
  master: string;
  date: string;
  time: string;
  amount: number;
  status: 'completed' | 'cancelled' | 'upcoming';
}

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  /** Реактивный список всех записей (доступен и для календаря, и для профиля) */
  readonly appointments = signal<Appointment[]>(this._getInitialAppointments());

  private _getInitialAppointments(): Appointment[] {
    return [
      {
        id: 'a1',
        service: 'Маникюр + покрытие гель-лак',
        client: 'Екатерина',
        clientPhone: '+7 (912) 345-67-89',
        clientRating: 5,
        clientComment: 'Очень аккуратно и красиво! Обязательно приду ещё 💅',
        master: 'Анна С.',
        date: '2026-05-15',
        time: '14:30',
        amount: 1500,
        status: 'completed'
      },
      {
        id: 'a2',
        service: 'Педикюр + покрытие',
        client: 'Ольга',
        clientPhone: '+7 (922) 456-78-90',
        clientRating: 4,
        clientComment: 'Хорошо, но хотелось бы побыстрее по времени',
        master: 'Елена М.',
        date: '2026-05-01',
        time: '11:00',
        amount: 2000,
        status: 'completed'
      },
      {
        id: 'a3',
        service: 'Снятие + наращивание',
        client: 'Мария',
        clientPhone: '+7 (932) 567-89-01',
        clientRating: 5,
        clientComment: 'Лучший мастер! Уже 3 года хожу только к ней ✨',
        master: 'Мария К.',
        date: '2026-04-20',
        time: '16:00',
        amount: 2500,
        status: 'completed'
      },
      {
        id: 'a4',
        service: 'Укрепление ногтей',
        client: 'Светлана',
        clientPhone: '+7 (942) 678-90-12',
        clientRating: 3,
        clientComment: 'Нормально, но ноготь скололся через неделю',
        master: 'Анна С.',
        date: '2026-04-05',
        time: '10:00',
        amount: 1200,
        status: 'completed'
      },
      {
        id: 'a5',
        service: 'Маникюр + дизайн',
        client: 'Дарья',
        clientPhone: '+7 (952) 789-01-23',
        clientRating: 0,
        clientComment: '',
        master: 'Ольга В.',
        date: '2026-06-10',
        time: '13:00',
        amount: 1800,
        status: 'upcoming'
      },
    ];
  }

  getServices(): ServiceItem[] {
    return [
      {id: 's1', name: 'Маникюр + покрытие гель-лак', duration: '1.5 ч', price: 1500},
      {id: 's2', name: 'Педикюр + покрытие гель-лак', duration: '2 ч', price: 2000},
      {id: 's3', name: 'Снятие + наращивание', duration: '2.5 ч', price: 2500},
      {id: 's4', name: 'Укрепление ногтей', duration: '1 ч', price: 1200},
      {id: 's5', name: 'Маникюр + дизайн', duration: '2 ч', price: 1800},
    ];
  }

  getPosts(): Post[] {
    return [
      {
        id: '1',
        author: 'Анна С.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna&backgroundColor=ffd5dc',
        text: 'Сегодня сделала клиентке новый дизайн "Кошачий глаз" 💅 ✨ Очень нежно и стильно! Запись на следующую неделю уже открыта.',
        date: '2 июн 2026',
        likes: 15,
        comments: 3,
        commentsList: [
          {
            id: 'c1',
            author: 'Ольга',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=olga&backgroundColor=c0aede',
            text: 'Очень красиво! А сколько держится такое покрытие?',
            time: '2 июн, 14:23'
          },
          {
            id: 'c2',
            author: 'Анна С.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna&backgroundColor=ffd5dc',
            text: 'Спасибо! Держится около 3 недель при правильном уходе 😊',
            time: '2 июн, 15:01'
          },
          {
            id: 'c3',
            author: 'Екатерина',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ekaterina&backgroundColor=b6e3f4',
            text: 'Записалась! Жду не дождусь ✨',
            time: '2 июн, 16:45'
          },
        ],
      },
      {
        id: '2',
        author: 'Елена М.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena&backgroundColor=b6e3f4',
        text: 'Яркое летнее покрытие для моей клиентки 🏖️ Работаю с гель-лаками премиум-брендов. Скидка 10% на первое посещение!',
        date: '1 июн 2026',
        likes: 24,
        comments: 7,
        commentsList: [
          {
            id: 'c4',
            author: 'Светлана',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=svetlana&backgroundColor=ffd5dc',
            text: 'А какие цвета сейчас в тренде?',
            time: '1 июн, 10:15'
          },
          {
            id: 'c5',
            author: 'Елена М.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena&backgroundColor=b6e3f4',
            text: 'Сейчас в тренде нежные пастельные тона и яркие неоновые акценты 🌸',
            time: '1 июн, 10:30'
          },
        ],
      },
      {
        id: '3',
        author: 'Мария К.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariya&backgroundColor=c0aede',
        text: 'Результат работы 🎉 Наращивание + покрытие гель-лаком. Клиентка довольна, держится уже 3 недели!',
        date: '30 мая 2026',
        likes: 31,
        comments: 12,
        commentsList: [
          {
            id: 'c6',
            author: 'Дарья',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=darya&backgroundColor=ffd5dc',
            text: 'Шикарно! А какая длина?',
            time: '30 мая, 09:20'
          },
          {
            id: 'c7',
            author: 'Мария К.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariya&backgroundColor=c0aede',
            text: 'Длина medium — самое то для активной жизни 😊',
            time: '30 мая, 10:00'
          },
          {
            id: 'c8',
            author: 'Анна',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna2&backgroundColor=b6e3f4',
            text: 'Беру пример 👍',
            time: '30 мая, 12:35'
          },
        ],
      },
      {
        id: '4',
        author: 'Ольга В.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=olga_v&backgroundColor=ffd5dc',
        text: 'Маникюр с дизайном "Морская волна" 🌊 Клиентка в восторге!',
        date: '28 мая 2026',
        likes: 19,
        comments: 5,
        commentsList: [
          {
            id: 'c9',
            author: 'Ирина',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=irina&backgroundColor=b6e3f4',
            text: 'Очень свежий дизайн!',
            time: '28 мая, 11:10'
          },
          {
            id: 'c10',
            author: 'Ольга В.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=olga_v&backgroundColor=ffd5dc',
            text: 'Спасибо! Летнее настроение 🌞',
            time: '28 мая, 12:00'
          },
        ],
      },
      {
        id: '5',
        author: 'Татьяна К.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tatyana&backgroundColor=c0aede',
        text: 'Педикюр + покрытие гель-лаком 💕 Идеально для открытой обуви!',
        date: '25 мая 2026',
        likes: 22,
        comments: 8,
        commentsList: [
          {
            id: 'c11',
            author: 'Наталья',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=natalya&backgroundColor=ffd5dc',
            text: 'Запишите меня, пожалуйста!',
            time: '25 мая, 15:30'
          },
        ],
      },
    ];
  }

  isDateAvailable(date: string): boolean {
    return this.getTimeSlots(date).some(slot => slot.available);
  }

  getTimeSlots(date: string): TimeSlot[] {
    return [
      {time: '10:00', available: date !== '2026-06-04'},
      {time: '11:30', available: true},
      {time: '13:00', available: true},
      {time: '14:30', available: date !== '2026-06-04'},
      {time: '16:00', available: true},
      {time: '17:30', available: true},
      {time: '19:00', available: true},
    ];
  }

  getMessages(): Message[] {
    return [
      {
        id: '1',
        text: 'Здравствуйте! Хотела бы записаться на маникюр.',
        sender: 'client',
        time: '10:30',
      },
      {
        id: '2',
        text: 'Добрый день! Конечно, на какое время вам удобно?',
        sender: 'master',
        time: '10:31',
      },
      {
        id: '3',
        text: 'На среду, после 14:00.',
        sender: 'client',
        time: '10:32',
      },
      {
        id: '4',
        text: 'Отлично, есть свободное время в 14:30. Записываю вас!',
        sender: 'master',
        time: '10:33',
      },
      {
        id: '5',
        text: 'Спасибо! Буду 😊',
        sender: 'client',
        time: '10:34',
      },
    ];
  }


  /** Добавляет новую запись в начало списка */
  addAppointment(appointment: Omit<Appointment, 'id'>): void {
    const id = `a${Date.now()}`;
    this.appointments.update(list => [{id, ...appointment}, ...list]);
  }

  getAppointments(): Appointment[] {
    return this.appointments();
  }
}
