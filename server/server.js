import mongoose from 'mongoose';
import app from './api/app';
import { MONGO_URI, SERVER_PORT, RABBITMQ_URI, ELASTICSEARCH_HOST, ELASTICSEARCH_PORT } from './config';
import logger from './api/logger';
import dummySomeData from '../internal/mongo/dummySomeData';
import initUploadFolders from './util/InitFolders';
import rabbitmq from '../internal/ rabbitmq/rabbitmq';
import ElasticSearch from '../internal/elasticsearch/elasticsearch';
import { ProductsPayload } from '../external/elasticsearch/product/product';

export const RabbitMQ = new rabbitmq(RABBITMQ_URI);
export const ElasticSearchProduct = new ElasticSearch({
  host: ELASTICSEARCH_HOST,
  port: ELASTICSEARCH_PORT
});
console.log('MONGO_URI: ', MONGO_URI)
initUploadFolders();
// MongoDB Connection
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// }).then(async () => {
//   logger.info('Mongodb connected');
//   // eslint-disable-next-line new-cap
//   // await UserElasticsearch.DeployMultiDocument(UserPayload);
//   if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
//     dummySomeData().catch((error) => {
//       console.error('dummySomeData error');
//       console.error(error);
//     });
//   }
// }).catch((error) => {
//   console.log(error);
//   logger.error('Please make sure Mongodb is installed and running!');
//   // eslint-disable-next-line no-process-exit
//   process.exit(1);
// });

app.listen(SERVER_PORT, async (error) => {
  if (error) {
    logger.error('Cannot start backend services:');
    logger.error(error);
  } else {
    // await RabbitMQ.init();
    logger.info(`Backend service is running on port: ${SERVER_PORT}${process.env.NODE_APP_INSTANCE ? ` on core ${process.env.NODE_APP_INSTANCE}` : ''}!`);
  }
});

export default app;
