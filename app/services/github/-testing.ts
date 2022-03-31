import GitHubService from '../github';
import GitHubClient from './client';

export default class TestingGitHubService extends GitHubService {
  protected clientFor(token: string): GitHubClient {
    return new FixturesClient(token);
  }

  protected navigateTo(url: string): never {
    throw new Error(`Navigated to "${url}"`);
  }
}

export class FixturesClient extends GitHubClient {
  constructor(readonly token: string) {
    super();
  }
}
