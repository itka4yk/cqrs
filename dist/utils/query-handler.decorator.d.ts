import 'reflect-metadata';
import { IQuery, IQueryResult } from '../interfaces';
export declare const QueryHandler: (
  query: IQuery<IQueryResult>,
) => ClassDecorator;
