import {IPaginatorState} from "./_types/paginator.model";


export interface ApiResponse<T> {
  type: number;
  model: number;
  messages: Array<string>;
  paginator?: IPaginatorState;
  data: T;
}
