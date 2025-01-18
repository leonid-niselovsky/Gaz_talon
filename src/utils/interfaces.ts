import { UserRole } from "../app/store/appSlice.ts";

export interface UserVM {
  login: string;
  password: string;
  role: UserRole;
}

export interface QuotaVM {
  id?: string;
  object: string;
  created: string;
  expired: string;
  gasType: string;
  quantity: number;
  series: string;
  number: number;
  used: string | null;
}
