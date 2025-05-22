/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/favorite` | `/favorite`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/search` | `/search`; params?: Router.UnknownInputParams; } | { pathname: `/details/[name]`, params: Router.UnknownInputParams & { name: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}/favorite` | `/favorite`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}/search` | `/search`; params?: Router.UnknownOutputParams; } | { pathname: `/details/[name]`, params: Router.UnknownOutputParams & { name: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}/favorite${`?${string}` | `#${string}` | ''}` | `/favorite${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}/search${`?${string}` | `#${string}` | ''}` | `/search${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/favorite` | `/favorite`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/search` | `/search`; params?: Router.UnknownInputParams; } | `/details/${Router.SingleRoutePart<T>}` | { pathname: `/details/[name]`, params: Router.UnknownInputParams & { name: string | number; } };
    }
  }
}
