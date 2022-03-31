import { Octokit } from 'octokit';
import GitHubService from '../github';
import GitHubClient from './client';

export default class DefaultGitHubService extends GitHubService {
  protected clientFor(token: string): GitHubClient {
    return new OctokitClient(token);
  }
}

export class OctokitClient extends GitHubClient {
  private client: Octokit;

  constructor(token: string) {
    super();
    this.client = new Octokit({ auth: token });
  }
}
