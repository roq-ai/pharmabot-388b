import { DoctorInterface } from 'interfaces/doctor';
import { HospitalInterface } from 'interfaces/hospital';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProviderInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  doctor?: DoctorInterface[];
  hospital?: HospitalInterface[];
  user?: UserInterface;
  _count?: {
    doctor?: number;
    hospital?: number;
  };
}

export interface ProviderGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
