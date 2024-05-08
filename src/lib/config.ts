import { ConfigI } from "../types/types";

let CONFIG= {} as ConfigI;

const LOCAL_CONFIG = {
  mongoDbUrl: 'cluster0.ovgne2s.mongodb.net',
  mongoDbName: 'runes-db-dev',
  mongoUser: 'devuasu1',
  mongoPwd: 'FTNM7QpjqMHph4k7',
  host: 'http://localhost',
  port: 6060,
  inscriptionsApi1: 'https://sattitude.io',
  inscriptionsApi2: 'https://ordinals.com',
}

export function printConfig() {
  console.log('== ' + process.env.NODE_ENV + ' ==========================================================')
  console.log('CONFIG.mongoDbUrl = ' + CONFIG.mongoDbUrl)
  console.log('CONFIG.mongoDbName = ' + CONFIG.mongoDbName)
  console.log('CONFIG.mongoUser = ' + CONFIG.mongoUser)
  console.log('CONFIG.mongoPwd = ' + CONFIG.mongoPwd.substring(0,2))
  console.log('CONFIG.host = ' + CONFIG.host)
  console.log('CONFIG.port = ' + CONFIG.port)
}

export function setConfigOnStart() {
  if (process.env.NODE_ENV === 'local') {
      CONFIG = LOCAL_CONFIG
  } else {
    CONFIG.host = process.env.host || '';
    CONFIG.port = Number(process.env.port) || 6060;
    CONFIG.mongoDbUrl = process.env.mongoDbUrl || '';
    CONFIG.mongoDbName = process.env.mongoDbName || '';
    CONFIG.mongoUser = process.env.mongoUser || ''
    CONFIG.mongoPwd = process.env.mongoPwd || ''
  }
}

export function getConfig() {
	return CONFIG;
}
