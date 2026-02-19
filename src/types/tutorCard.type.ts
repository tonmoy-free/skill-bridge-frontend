export interface TutorProfile {
  id: string;
  userId: string;
  bio: string;
  hourlyFee: number;
  monthlyFee?: number | null;
  experience?: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  }
}