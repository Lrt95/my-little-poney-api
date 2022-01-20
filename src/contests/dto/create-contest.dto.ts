export class CreateContestDto {
  user: string;
  name: string;
  address: string;
  picturePath: string;
  contestDateTime: Date;
  isValid: boolean;
}
