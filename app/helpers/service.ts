import { Registry } from '@ember/service';
import { getOwner } from '@ember/application';
import Helper from '@glint/environment-ember-loose/ember-component/helper';

interface ServiceHelperSignature<K extends keyof Registry> {
  PositionalArgs: [name: K];
  NamedArgs: {};
  Return: Registry[K];
}

interface Owner {
  lookup<K extends keyof Registry>(name: `service:${K}`): Registry[K];
}

export default class ServiceHelper<K extends keyof Registry> extends Helper<ServiceHelperSignature<K>> {
  private owner = getOwner(this) as Owner;

  compute([name]: [name: K]): Registry[K] {
    return this.owner.lookup<K>(`service:${name}`);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'service': typeof ServiceHelper;
  }
}
