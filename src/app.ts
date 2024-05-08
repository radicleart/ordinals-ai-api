import { setConfigOnStart, getConfig, printConfig } from './lib/config.js';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connect } from './lib/data/mongodb_connection.js'
import { configRoutes } from './routes/config/configRoutes.js'
import { audionalsRoutes } from './routes/audionals/audionalsRoutes.js'
import { runesRoutes } from './routes/runes/runesRoutes.js'
import { createRequire } from 'node:module';
import { WebSocketServer } from 'ws'
import { testJob } from './routes/jobs/JobScheduler.js';

const r = createRequire(import.meta.url);
// - assertions are experimental.. import swaggerDocument from '../public/swagger.json' assert { type: "json" };;
const swaggerDocument = r('./swagger.json');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve); 
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors()); 
setConfigOnStart();
printConfig()

app.use((req, res, next) => {
  console.log('app.use: ok ' + req.method)
  next()
})

app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use('/runes-api/v1/config', configRoutes);
app.use('/runes-api/v1/runes', runesRoutes);
app.use('/runes-api/v1/audionals', audionalsRoutes);

console.log(`\n\nExpress is listening at http://localhost:${getConfig().port}`);
console.log('Startup Environment: ', process.env.TARGET_ENV);
console.log(`Mongo connection at ${getConfig().mongoDbUrl}\n\n`);

async function connectToMongoCloud() {

  await connect();

  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  const server = app.listen(getConfig().port, () => {
    return;
  });
  const wss = new WebSocketServer({ server })
  testJob.start();

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) { 
      ws.send('Got your new rates : ' + message)
    })
  })
}

connectToMongoCloud();

 