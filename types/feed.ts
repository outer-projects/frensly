import { IProfile } from "./users";

export interface IPost extends Document {
  date: string; //понятно
  text: string; //отсутствует в репостах
  media: string; //тут ссылка на файл если есть
  user: IProfile; //кто создал
  isRepost: boolean; //понятно
  repostCount: number;
  _id:string
  originalPost: IPost; //если isRepost - ссылка ог поста, если !isRepost - ссылка на пост к которому этот пост является комментом, если нет - ог пост
  likes: IProfile[]; //список людей которые лайкнули
  comments: IPost[]; //список комментов
}
