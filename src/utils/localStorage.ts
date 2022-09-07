const REFRESH_TOKEN_KEY = 'token';
const REMEMBER_KEY = 'rememberMe';
const EMAIL_KEY = 'email';

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

export function getRemember(value?: string): [boolean, string] {
  if (value) return [false, value];

  const remember = getItem<boolean>(REMEMBER_KEY);
  if (remember) {
    const email = getItem<string>(EMAIL_KEY);
    if (email) return [true, email];
  }
  return [false, ''];
}

export function saveRemember(remember: boolean, email: string): void {
  if (remember) {
    setItem(REMEMBER_KEY, true);
    setItem(EMAIL_KEY, email);
  } else {
    setItem(REMEMBER_KEY, false);
    localStorage.removeItem(EMAIL_KEY);
  }
}
