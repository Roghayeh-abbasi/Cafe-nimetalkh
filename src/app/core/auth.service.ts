// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private users: { username: string, password: string, role: 'admin' | 'user' }[] = [
//     { username: '09123456788', password: '1234', role: 'admin' },
//     { username: '09301234567', password: 'abcd', role: 'user' },
//     { username: '09108116904', password: '1234', role: 'user' }
//   ];

//   private isLoggedInSubject = new BehaviorSubject<boolean>(false);
//   private currentUserSubject = new BehaviorSubject<{ username: string, password: string, role: 'admin' | 'user' } | null>(null);
//   private isBrowser: boolean;

//   constructor(
//     private router: Router,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     this.isBrowser = isPlatformBrowser(this.platformId);

//     if (this.isBrowser) {
//       const storedUsers = localStorage.getItem('users');
//       if (storedUsers) {
//         this.users = JSON.parse(storedUsers);
//       } else {
//         localStorage.setItem('users', JSON.stringify(this.users));
//       }

//       const storedUser = localStorage.getItem('currentUser');
//       if (storedUser) {
//         const user = JSON.parse(storedUser);
//         this.currentUserSubject.next(user);
//         this.isLoggedInSubject.next(true);
//       }
//     }
//   }

//   signUp(username: string, password: string, role: 'admin' | 'user' = 'user'): boolean {
//     if (this.users.find(user => user.username === username)) {
//       return false;
//     }

//     const newUser: { username: string, password: string, role: 'admin' | 'user' } = {
//       username,
//       password,
//       role
//     };

//     this.users.push(newUser);

//     if (this.isBrowser) {
//       localStorage.setItem('users', JSON.stringify(this.users));
//     }

//     return true;
//   }

//   login(username: string, password: string, returnUrl?: string): Observable<boolean> {
//     return new Observable(observer => {
//       const user = this.users.find(u => u.username === username && u.password === password);
//       if (user) {
//         this.isLoggedInSubject.next(true);
//         this.currentUserSubject.next(user);

//         if (this.isBrowser) {
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           localStorage.setItem('isLoggedIn', 'true');
//         }

//         observer.next(true);

//         if (returnUrl) {
//           this.router.navigate([returnUrl]);
//         } else {
//           if (user.role === 'admin') {
//             this.router.navigate(['/admin']);
//           } else {
//             this.router.navigate(['/']);
//           }
//         }
//       } else {
//         observer.next(false);
//       }
//       observer.complete();
//     });
//   }

//   logout(): void {
//     this.isLoggedInSubject.next(false);
//     this.currentUserSubject.next(null);
//     if (this.isBrowser) {
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('isLoggedIn');
//       localStorage.removeItem('profileImage');
//     }
//     this.router.navigate(['/auth/login']);
//   }

//   isLoggedIn(): boolean {
//     if (this.isBrowser) {
//       return localStorage.getItem('isLoggedIn') === 'true';
//     }
//     return false;
//   }

//   getIsLoggedInObservable(): Observable<boolean> {
//     return this.isLoggedInSubject.asObservable();
//   }

//   getLoggedInUser(): Observable<{ username: string, role: 'admin' | 'user' } | null> {
//     return this.currentUserSubject.asObservable();
//   }

//   getCurrentUserSync(): { username: string, role: 'admin' | 'user' } | null {
//     return this.currentUserSubject.value;
//   }

//   getUserRole(): 'admin' | 'user' | null {
//     const user = this.currentUserSubject.value;
//     return user ? user.role : null;
//   }

//   changePassword(currentPassword: string, newPassword: string): boolean {
//     if (!this.currentUserSubject.value) return false;
//     const userIndex = this.users.findIndex(user => user.username === this.currentUserSubject.value!.username && user.password === currentPassword);

//     if (userIndex !== -1) {
//       this.users[userIndex].password = newPassword;
//       if (this.currentUserSubject.value && this.currentUserSubject.value.username === this.users[userIndex].username) {
//         const updatedUser = { ...this.currentUserSubject.value, password: newPassword };
//         this.currentUserSubject.next(updatedUser);
//       }
//       if (this.isBrowser) {
//         localStorage.setItem('users', JSON.stringify(this.users));
//         if (this.currentUserSubject.value) {
//           localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
//         }
//       }
//       return true;
//     }
//     return false;
//   }

//   updateUsername(newUsername: string): boolean {
//     if (!this.currentUserSubject.value) return false;
//     if (this.users.find(user => user.username === newUsername)) return false;

//     const userIndex = this.users.findIndex(user => user.username === this.currentUserSubject.value!.username);

//     if (userIndex === -1) return false;

//     this.users[userIndex].username = newUsername;
//     if (this.currentUserSubject.value) {
//       const updatedUser = { ...this.currentUserSubject.value, username: newUsername };
//       this.currentUserSubject.next(updatedUser);
//       if (this.isBrowser) {
//         localStorage.setItem('users', JSON.stringify(this.users));
//         localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
//       }
//     }
//     return true;
//   }
// }




import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: { username: string, password: string, role: 'admin' | 'user' }[] = [
    { username: '09123456788', password: '1234', role: 'admin' },
    { username: '09301234567', password: 'abcd', role: 'user' },
    { username: '09108116904', password: '1234', role: 'user' }
  ];

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<{ username: string, password: string, role: 'admin' | 'user' } | null>(null);
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      } else {
        localStorage.setItem('users', JSON.stringify(this.users));
      }

      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
      }
    }
  }

  signUp(username: string, password: string, role: 'admin' | 'user' = 'user'): boolean {
    if (this.users.find(user => user.username === username)) {
      return false;
    }

    const newUser: { username: string, password: string, role: 'admin' | 'user' } = {
      username,
      password,
      role
    };

    this.users.push(newUser);

    if (this.isBrowser) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    return true;
  }

  login(username: string, password: string, returnUrl?: string): Observable<boolean> {
    return new Observable(observer => {
      const user = this.users.find(u => u.username === username && u.password === password);
      if (user) {
        this.isLoggedInSubject.next(true);
        this.currentUserSubject.next(user);

        if (this.isBrowser) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', 'true');
        }

        observer.next(true);

        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        }
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('profileImage');
    }
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  getIsLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getLoggedInUser(): Observable<{ username: string, role: 'admin' | 'user' } | null> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUserSync(): { username: string, role: 'admin' | 'user' } | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): 'admin' | 'user' | null {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
  }

  changePassword(currentPassword: string, newPassword: string): boolean {
    if (!this.currentUserSubject.value) return false;
    const userIndex = this.users.findIndex(user => user.username === this.currentUserSubject.value!.username && user.password === currentPassword);

    if (userIndex !== -1) {
      this.users[userIndex].password = newPassword;
      if (this.currentUserSubject.value && this.currentUserSubject.value.username === this.users[userIndex].username) {
        const updatedUser = { ...this.currentUserSubject.value, password: newPassword };
        this.currentUserSubject.next(updatedUser);
      }
      if (this.isBrowser) {
        localStorage.setItem('users', JSON.stringify(this.users));
        if (this.currentUserSubject.value) {
          localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
        }
      }
      return true;
    }
    return false;
  }

  updateUsername(newUsername: string): boolean {
    if (!this.currentUserSubject.value) return false;
    if (this.users.find(user => user.username === newUsername)) return false;

    const userIndex = this.users.findIndex(user => user.username === this.currentUserSubject.value!.username);

    if (userIndex === -1) return false;

    this.users[userIndex].username = newUsername;
    if (this.currentUserSubject.value) {
      const updatedUser = { ...this.currentUserSubject.value, username: newUsername };
      this.currentUserSubject.next(updatedUser);
      if (this.isBrowser) {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
      }
    }
    return true;
  }
}