import SessionService, { Storage } from '../session';

export default class MapStorage implements Storage {
  #storage = new Map<string, string>();

  getItem(key: string): string | null {
    return this.#storage.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.#storage.set(key, value);
  }

  removeItem(key: string): void {
    this.#storage.delete(key);
  }

  clear(): void {
    this.#storage = new Map();
  }
}

export class TestingSessionService extends SessionService {
  protected storage = new MapStorage();
}
