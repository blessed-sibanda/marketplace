import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { UiService } from '../common/ui.service';
import { IUser } from '../user/user';
import { AuthService, IAuthService, IAuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    protected authService: AuthService,
    private uiService: UiService,
    protected router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthorizations(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthorizations(childRoute);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthorizations();
  }

  protected checkAuthorizations(
    route?: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map((authStatus) => {
        if (!authStatus.isAuthenticated) {
          this.uiService.showToast('You must login to continue');
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.getResolvedUrl(route),
            },
          });

          return false;
        }

        this.authService.getCurrentUser().subscribe({
          next: (currentUser) => {
            const isSeller = this.checkIsSeller(currentUser, route);
            if (!isSeller) {
              this.uiService.showToast(
                'Only users with seller accounts are allowed to access this page'
              );
              this.router.navigate(['/home']);
              return false;
            }
            return true;
          },
          error: (err) => this.uiService.showToast(err.message),
        });

        const isOwner = this.checkIsOwner(authStatus, route);
        if (!isOwner) {
          this.uiService.showToast(
            'Only the profile owner is allowed to perform this action'
          );
          this.router.navigate([`/users/${authStatus.userId}`]);
          return false;
        }

        return true;
      }),

      take(1) // the observable must complete for the guard to work
    );
  }

  private checkIsOwner(
    authStatus: IAuthStatus,
    route?: ActivatedRouteSnapshot
  ) {
    if (!route?.data?.['onlyOwner']) {
      return true;
    }
    return authStatus.userId === route.paramMap.get('userId');
  }

  private checkIsSeller(currentUser: IUser, route?: ActivatedRouteSnapshot) {
    if (!route?.data?.['onlySeller']) {
      return true;
    }
    return currentUser.seller;
  }

  getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) return '';
    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/');
  }
}
