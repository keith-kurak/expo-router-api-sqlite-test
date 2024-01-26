# Testing SQLite with Expo Router API Routes

## How to try it
- install with bun
- Run it
- Press the "Try Sequelize' or "Try Plain SQLite" button depending on what you want to do. Each one sends a POST to an API route to insert a record.

## Scenario 1: Sequelize
A popular ORM for SQLite (https://sequelize.org/docs/v6/getting-started/)

This code follows the getting started pretty much verbatim, but fails early with:

```
Metro error: Dynamic require defined at line 49; not supported by Metro

  47 |         return this.sequelize.config.dialectModule;
  48 |       }
> 49 |       return require(moduleName);
     |       ^
  50 |     } catch (err) {
  51 |       if (err.code === "MODULE_NOT_FOUND") {
  52 |         if (this.sequelize.config.dialectModulePath) {

Call Stack
  <unknown> (node_modules/sequelize/lib/dialects/abstract/connection-manager.js:49:7)
  ConnectionManager#_loadDialectModule (node_modules/sequelize/lib/dialects/abstract/connection-manager.js:49:7)
  new sequelize (node_modules/sequelize/lib/dialects/sqlite/connection-manager.js:17:21)
  new SqliteDialect (node_modules/sequelize/lib/dialects/sqlite/index.js:12:22)
  new Sequelize (node_modules/sequelize/lib/sequelize.js:193:5)
  <global> (app/sequelize+api.ts:8:19)
  loadModuleImplementation (node_modules/metro-runtime/src/polyfills/require.js:342:5)
  guardedLoadModule (node_modules/metro-runtime/src/polyfills/require.js:240:12)
  metroRequire (node_modules/metro-runtime/src/polyfills/require.js:127:7)
  Object.<anonymous> (http://localhost:8081/app/sequelize+api.bundle)
 LOG  [SyntaxError: JSON Parse error: Unexpected character: F]
```

NOTE: If you uncomment the SQLite references in this example, you'll get roughly the same error as Scenario 2.

## Scenario 2: Plain Node SQLite
Less confident in this code, roughly copied from https://www.npmjs.com/package/sqlite3, but it fails early enough that any mistakes in there probably don't matter yet.

Fails with:
```
Metro error: Unknown named module: "/Users/keith/expo-router-api-sqlite-test/build/node_sqlite3.node"

  110 |     tries.push(n);
  111 |     try {
> 112 |       b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
      |                                                ^
  113 |       if (!opts.path) {
  114 |         b.path = n;
  115 |       }

Call Stack
  requireFunc (node_modules/metro-runtime/src/polyfills/require.js:95:13)
  bindings (node_modules/bindings/bindings.js:112:48)
  factory (node_modules/sqlite3/lib/sqlite3-binding.js:1:37)
  loadModuleImplementation (node_modules/metro-runtime/src/polyfills/require.js:342:5)
  guardedLoadModule (node_modules/metro-runtime/src/polyfills/require.js:240:12)
  require (node_modules/metro-runtime/src/polyfills/require.js:127:7)
  factory (node_modules/sqlite3/lib/sqlite3.js:2:17)
  loadModuleImplementation (node_modules/metro-runtime/src/polyfills/require.js:342:5)
  guardedLoadModule (node_modules/metro-runtime/src/polyfills/require.js:240:12)
  metroRequire (node_modules/metro-runtime/src/polyfills/require.js:127:7)
 LOG  [SyntaxError: JSON Parse error: Unexpected character: F]
```