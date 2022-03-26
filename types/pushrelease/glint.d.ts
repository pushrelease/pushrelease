import '@glint/environment-ember-loose/registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'page-title': typeof import('./glint/page-title').default;
  }
}

export {};
