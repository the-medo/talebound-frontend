// import { Middleware, QueryHook, SuspenseQueryHook } from 'react-query-kit';
//
// type MiddlewareEnabledGetter = (enabled: boolean) => Middleware<QueryHook>;
//
// export const getMiddlewareEnabled: MiddlewareEnabledGetter = (enabled: boolean) => {
//   const queryMiddleware: Middleware<QueryHook> = (useQueryNext) => {
//     return (options) => {
//       return useQueryNext({
//         ...options,
//         enabled,
//       });
//     };
//   };
//
//   return queryMiddleware;
// };
//
// export const globalQueryMiddleware: Middleware<SuspenseQueryHook> = (useQueryNext) => {
//   return (options) => {
//     return useQueryNext({
//       ...options,
//       enabled: false,
//     });
//   };
// };
