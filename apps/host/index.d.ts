/* eslint-disable */

declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module 'remote/*' {
  const Component: any;
  export default Component;
}
