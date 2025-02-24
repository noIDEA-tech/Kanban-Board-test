import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  username: string;
  exp: number;
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<CustomJwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token); 
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp ? decoded.exp < Date.now() / 1000 : true;
    } catch {
      return true;
    }
  }
  
  getToken(): string | null {
    const token = localStorage.getItem('id_token');
    console.log('Retrieved token from storage:', token ? 'Token exists' : 'No token');
    return token;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
