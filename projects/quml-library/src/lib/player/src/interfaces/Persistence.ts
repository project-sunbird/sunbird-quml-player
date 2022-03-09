export enum PersistenceStatus {
  SUCCESS,
  FAILURE,
}

export interface PersistenceResult {
  initialQuery: any;
  response: {
    data: any;
    error?: string;
  };
  status: PersistenceStatus;
}

export interface Persistence {
  persist?(data: any, meta: any): PersistenceResult;
  fetch?(meta?: any): PersistenceResult;
}
