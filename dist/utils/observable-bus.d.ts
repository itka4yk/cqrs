import { Subject, Observable } from 'rxjs';
import { EventObservable } from '../interfaces/event-observable.interface';
import { Type } from '@nestjs/common';
export declare class ObservableBus<T> extends Observable<T>
  implements EventObservable<T> {
  protected subject$: Subject<T>;
  constructor();
  ofType(...types: Type<any>[]): Observable<T>;
}
