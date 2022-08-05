import {SuraName} from '../models/models';

export interface DispatchType<PayloadType> {
  payload?: PayloadType;
  type: string;
}

export interface Bookmark {
  sura: SuraName[];
  juzNumber: number;
  pageNumber: number;
  date: string;
}
