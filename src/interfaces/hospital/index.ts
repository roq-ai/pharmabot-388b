import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface HospitalInterface {
  id?: string;
  name: string;
  address: string;
  provider_id?: string;
  created_at?: any;
  updated_at?: any;

  provider?: ProviderInterface;
  _count?: {};
}

export interface HospitalGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  address?: string;
  provider_id?: string;
}
