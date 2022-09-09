const REFRESH_TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const EMAIL_KEY = 'email';
const REMEMBER_KEY = 'rememberMe';

export function getItem<T>(key: string): T | null {
  // if a value is already store
  const localValue = localStorage.getItem(key);
  if (localValue) return JSON.parse(localValue);

  return null;
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getToken(): string {
  return getItem<string>(REFRESH_TOKEN_KEY) || '';
}

export function saveToken(refreshToken: string): void {
  setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function removeToken(): void {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// -------------------------------------------------------------------

export function getLocalUser(username_?: string, email_?: string) {
  const username = username_ || getItem<string>(USERNAME_KEY) || '';
  const email = email_ || getItem<string>(EMAIL_KEY) || '';
  const remember = getItem<boolean>(REMEMBER_KEY) || false;

  return { username, email, remember };
}

export function saveLocalUser(username: string, email: string, remember: boolean): void {
  if (remember) {
    setItem(EMAIL_KEY, email);
    setItem(USERNAME_KEY, username);
  } else {
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(USERNAME_KEY);
  }
  setItem(REMEMBER_KEY, remember);
}
