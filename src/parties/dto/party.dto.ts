import { User } from '../../users/schema/users.schema';

export interface AttendeeParty {
  user: User;
  comment: string;
}
