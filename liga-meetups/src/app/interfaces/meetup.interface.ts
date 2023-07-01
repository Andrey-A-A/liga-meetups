export interface Meetup {
  id: number,
  title: string,
  subscribers: number,
  description?: string,
  targetAudience?: string,
  needToKnow: string,
  willHappen: string,
  reasonToCome: string,
  time: Date,
  author: string,
  location?: string,
  status: MeetupStatus,
  isMember: boolean,
  isOwner: boolean,
}

export enum MeetupStatus {
  New = "новый",
  Done = "проведено",
  OnAir = "идет сейчас",
}

export enum FromPage {
  AllMeetups,
  MyMeetups,
}
