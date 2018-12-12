import { Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommandBus } from './command-bus';
import { Saga } from './index';
import { IEventPublisher } from './interfaces/events/event-publisher.interface';
import { IEvent, IEventBus, IEventHandler } from './interfaces/index';
import { ObservableBus } from './utils/observable-bus';
export declare type EventHandlerMetatype = Type<IEventHandler<IEvent>>;
export declare class EventBus extends ObservableBus<IEvent>
  implements IEventBus {
  private readonly commandBus;
  private moduleRef;
  private _publisher;
  constructor(commandBus: CommandBus);
  private useDefaultPublisher;
  setModuleRef(moduleRef: any): void;
  publish<T extends IEvent>(event: T): void;
  ofType<T extends IEvent>(
    event: T & {
      name: string;
    },
  ): Observable<IEvent>;
  bind<T extends IEvent>(handler: IEventHandler<IEvent>, name: string): void;
  combineSagas(sagas: Saga[]): void;
  register(handlers: EventHandlerMetatype[]): void;
  protected registerHandler(handler: EventHandlerMetatype): void;
  protected ofEventName(name: string): Observable<IEvent>;
  private getEventName;
  protected registerSaga(saga: Saga): void;
  private reflectEventsNames;
  publisher: IEventPublisher;
}
