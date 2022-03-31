import GitHubService from '../github';
import GitHubClient from './client';
import { OctokitClient } from './-default';
import { FixturesClient } from './-testing';

export default class DevelopmentGitHubService extends GitHubService {
  protected clientFor(token: string): GitHubClient {
    let client: GitHubClient;

    if (token === 'FIXTURES') {
      console.warn('Using GitHub fixtures...');
      client = new FixturesClient(token);
    } else {
      client = new OctokitClient(token);
    }

    Object.assign(window, { GITHUB_CLIENT: client });

    return client;
  }
}
