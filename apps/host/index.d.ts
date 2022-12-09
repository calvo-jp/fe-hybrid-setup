declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module 'remote/*' {
  import type { ComponentType } from 'svelte';
  const component: ComponentType;
  export default component;
}
