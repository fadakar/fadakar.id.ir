import {environment} from '../../environments/environment';
import {AuthModel} from '../modules/auth/_models/auth.model';


export class AuthStorage {
  private static authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  public static setAuth(auth: AuthModel) {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  public static getAuth(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static removeAuth() {
    localStorage.removeItem(this.authLocalStorageToken);
  }

}
