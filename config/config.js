require('dotenv').config(); // this is important!
var setting = require('../config/setting');
module.exports = {
  "development": {
    "username": setting.db.username,
    "password": setting.db.password,
    "database": setting.db.database,
    "host": setting.db.host,
    "dialect": setting.db.dialect,
    "port": setting.db.port,
    "migrationStorage": setting.db.migrationStorage,
    "migrationStoragePath": setting.db.migrationStoragePath,
    "migrationStorageTableName": setting.db.migrationStorageTableName,
    "migrationStorageTableSchema": setting.db.migrationStorageTableSchema,
    "seederStorage": setting.db.seederStorage,
    "seederStoragePath": setting.db.seederStoragePath,
    "seederStorageTableName": setting.db.seederStorageTableName
  },
  "test": {
    "username": setting.db.username,
    "password": setting.db.password,
    "database": setting.db.database,
    "host": setting.db.host,
    "dialect": setting.db.dialect,
    "port": setting.db.port,
    "migrationStorage": setting.db.migrationStorage,
    "migrationStoragePath": setting.db.migrationStoragePath,
    "migrationStorageTableName": setting.db.migrationStorageTableName,
    "migrationStorageTableSchema": setting.db.migrationStorageTableSchema,
    "seederStorage": setting.db.seederStorage,
    "seederStoragePath": setting.db.seederStoragePath,
    "seederStorageTableName": setting.db.seederStorageTableName
  },
  "production": {
    "username": setting.db.username,
    "password": setting.db.password,
    "database": setting.db.database,
    "host": setting.db.host,
    "dialect": setting.db.dialect,
    "port": setting.db.port,
    "migrationStorage": setting.db.migrationStorage,
    "migrationStoragePath": setting.db.migrationStoragePath,
    "migrationStorageTableName": setting.db.migrationStorageTableName,
    "migrationStorageTableSchema": setting.db.migrationStorageTableSchema,
    "seederStorage": setting.db.seederStorage,
    "seederStoragePath": setting.db.seederStoragePath,
    "seederStorageTableName": setting.db.seederStorageTableName
  }
}

