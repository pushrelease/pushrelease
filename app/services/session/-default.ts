import SessionService from '../session';

export default class DefaultSessionService extends SessionService {
  protected storage = sessionStorage;
}
