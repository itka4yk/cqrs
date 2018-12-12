import 'reflect-metadata';
import { Type } from '@nestjs/common';
import { IQueryBus, IQuery, IQueryHandler, IQueryResult } from './interfaces';
import { ObservableBus } from './utils/observable-bus';
export declare type QueryHandlerMetatype = Type<
  IQueryHandler<IQuery<IQueryResult>, IQueryResult>
>;
export declare class QueryBus extends ObservableBus<IQuery<IQueryResult>>
  implements IQueryBus {
  private handlers;
  private moduleRef;
  setModuleRef(moduleRef: any): void;
  execute<T extends IQuery<TResult>, TResult extends IQueryResult>(
    query: T,
  ): Promise<TResult>;
  bind<T extends IQuery<TResult>, TResult>(
    handler: IQueryHandler<T, TResult>,
    name: string,
  ): void;
  register(handlers: QueryHandlerMetatype[]): void;
  protected registerHandler(handler: QueryHandlerMetatype): void;
  private getQueryName;
  private reflectQueryName;
}
