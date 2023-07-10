import { Injectable } from '@angular/core'
import { Meetup, MeetupStatus } from "../interfaces/meetup.interface";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MeetupDTO, UserDTO } from '../interfaces/DTO.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  baseUrl: string = `${environment.backendOrigin}/meetup`;
  isEditMode: boolean = false;
  private editableMeetup:Meetup | null = null
  private meetups: Meetup[] = [ ]

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getListHTTP() {
    return this.http
    .get<MeetupDTO[]>(`${this.baseUrl}`)
  }

  createMeetup(meetup: MeetupDTO) {
    return this.http.post<MeetupDTO>(`${this.baseUrl}`,  meetup )
  }

  registerToMeetup(idMeetup: number, idUser: number) {
    return this.http.put<MeetupDTO>(`${this.baseUrl}`, {idMeetup: idMeetup, idUser: idUser})
  }

  unRegisterMeetup(idMeetup: number, idUser: number) {
    return this.http.delete<MeetupDTO>(`${this.baseUrl}`, {body:{idMeetup: idMeetup, idUser: idUser}})
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
      duration: dto.duration,
      author: dto.owner!.fio,
      location: dto.location,
      status: this.getStatus(dto.time, dto.duration),
      isMember: this.isMember(dto),
      isOwner: this.isOwner(dto),
    }
  }


  private getStatus(dateStr: string, duration: number): MeetupStatus {

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

  isMember(meetup: MeetupDTO): boolean {
    if (meetup.users?.find((currentUser:UserDTO) => {
      return this.authService.user?.id === currentUser.id
    })?.id) {
      return true
    } else return false
  }

  isOwner(meetup: MeetupDTO): boolean {
    if (this.authService.user?.id === meetup.createdBy) {
      return true
    } else return false
  }

  editMeetup(meetup: MeetupDTO) {
    return this.http.put<MeetupDTO>(`${this.baseUrl}/${meetup.id}`, meetup)
  }

  public set currentEditableMeetup(meetup:Meetup | null) {
    this.editableMeetup = meetup
  }

  public get currentEditableMeetup():Meetup | null {
    return this.editableMeetup
  }

}


