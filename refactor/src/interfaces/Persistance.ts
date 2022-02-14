export enum PersistanceStatus {
  SUCCESS,
  FAILURE,
}

export interface PersistanceResult {
  initialQuery: any;
  response: {
    data: any;
    error?: string;
  };
  status: PersistanceStatus;
}

export interface Persistance {
  persist?(data: any, meta: any): PersistanceResult;
  fetch?(meta?: any): PersistanceResult;
}
