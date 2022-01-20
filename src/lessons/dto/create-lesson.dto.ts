export class CreateLessonDto {
  name: string;
  user: string;
  ground: string;
  lessonDateTime: Date;
  duration: number;
  discipline: string;
  isValid: boolean;
}
