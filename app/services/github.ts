import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { AbstractService } from 'ember-swappable-service';
import SessionService from './session';
import GitHubClient from './github/client';

export default abstract class GitHubService extends AbstractService {
  @service declare private session: SessionService;

  readonly #client: GitHubClient | null;

  constructor(owner: unknown) {
    super(owner);

    let token = this.readToken();

    if (token) {
      this.#client = this.clientFor(token);
    } else {
      this.#client = null;
    }
  }

  get isLoggedIn(): boolean {
    return this.#client !== null;
  }

  get client(): GitHubClient {
    assert('not logged in', this.#client !== null);
    return this.#client;
  }

  @action login(): never {
    assert('already logged in', this.#client === null);
    this.navigateTo('/auth/github');
  }

  @action logout(): never {
    assert('not logged in', this.#client !== null);
    this.session.clear();
    this.navigateTo('/');
  }

  protected abstract clientFor(token: string): GitHubClient;

  protected readToken(): string | null {
    return this.session.get('GITHUB_TOKEN');
  }

  protected navigateTo(url: string): never {
    return (location.href = url) as never;
  }
}

declare module '@ember/service' {
  interface Registry {
    'github': GitHubService;
  }
}
