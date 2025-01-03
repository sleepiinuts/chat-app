import { Message } from './message.model';

export interface Bot {
  id: string;
  name: string;
  imgSrc: string;
  message: Message[];
}
