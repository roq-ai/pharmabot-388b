import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface DoctorInterface {
  id?: string;
  name: string;
  specialization: string;
  provider_id?: string;
  created_at?: any;
  updated_at?: any;

  provider?: ProviderInterface;
  _count?: {};
}

export interface DoctorGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  specialization?: string;
  provider_id?: string;
}
