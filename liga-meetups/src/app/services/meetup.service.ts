import { Injectable } from '@angular/core'
import { Meetup, MeetupStatus } from "../interfaces/meetup.interface";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MeetupDTO, UserDTO } from '../interfaces/meetupDTO.interface';


@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  baseUrl: string = `${environment.backendOrigin}/meetup`;

  constructor(private http: HttpClient) {

  }

  private meetups: Meetup[] = [
    // {
    //   id: 1,
    //   title: 'Angular vs react',
    //   subscribers: 351,
    //   description: 'Расскажу о том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом.',
    //   fullDescription: 'Полный текст',
    //   targetAudience: 'переговорная 14',
    //   needToNow: '1. вот это\n 2. вот это',
    //   willHappen: '1. вот это\n 2. вот это',
    //   reasonToCome: 'У меня красный пояс по C++ ',
    //   time: '14.08.22 13:00',
    //   author: 'Александр Козаченко',
    //   // isFull: false,
    //   status: MeetupStatus.New,
    // },
    // {
    //   id: 2,
    //   title: 'Angular vs Vue',
    //   subscribers: 351,
    //   description: 'Расскажу о том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом.',
    //   fullDescription: 'Полный текст',
    //   targetAudience: 'переговорная 14',
    //   needToNow: '1. вот это\n 2. вот это',
    //   willHappen: '1. вот это\n 2. вот это',
    //   reasonToCome: 'У меня красный пояс по C++ ',
    //   time: '14.08.22 13:00',
    //   author: 'Александр Козаченко',
    //   // isFull: false,
    //   status: MeetupStatus.New
    // },
  ]

  getList() {
    return this.meetups
  }

  setList(list: Meetup[]) {
    this.meetups = list
  }

  getListHTTP() {
    return this.http
    .get<MeetupDTO[]>(`${this.baseUrl}`)
  }

  createMeetup(meetup: MeetupDTO) {
    return this.http.post<MeetupDTO>(`${this.baseUrl}`,  meetup )
  }

  getById(id: number) {
    const index = this.meetups.findIndex(t => t.id === id);
    return this.meetups[index];
  }

  public transform(dto: MeetupDTO):Meetup {
    return {
      id: dto.id!,
      title: dto.name,
      description: dto.description,
      subscribers: dto.users!.length,
      needToKnow: dto.need_to_know,
      willHappen: dto.will_happen,
      targetAudience: dto.target_audience,
      reasonToCome: dto.reason_to_come,
      time: new Date(dto.time),
      author: dto.owner!.fio,
      location: dto.location,
      // isFull: false,
      status: this.getStatus(dto.time, dto.duration)
    }
  }

  getStatus(dateStr: string, duration: number): MeetupStatus {

    let startTime:Date = new Date(dateStr)

    let currentTime: Date = new Date()

    let endTime = new Date(startTime.getTime() + duration*60000);

    if (startTime > currentTime) {
      return MeetupStatus.New
    } else if (currentTime > startTime && currentTime < endTime) {
      return MeetupStatus.OnAir
    } else {
      return MeetupStatus.Done
    }

  }

}


