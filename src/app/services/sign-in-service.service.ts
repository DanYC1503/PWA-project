import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private signInStateSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getSignInState(): Observable<number> {
    return this.signInStateSubject.asObservable();
  }

  setSignInState(value: number): void {
    this.signInStateSubject.next(value);
  }
}
