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
  // isFull: boolean,
  location?: string,
  status: MeetupStatus,
}

export enum MeetupStatus {
  New = "новый",
  Done = "проведено",
  OnAir = "идет сейчас",
}
