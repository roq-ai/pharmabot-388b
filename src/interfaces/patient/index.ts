import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  symptoms: string;
  disease_prediction?: string;
  medication_suggestion?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  symptoms?: string;
  disease_prediction?: string;
  medication_suggestion?: string;
  user_id?: string;
}
