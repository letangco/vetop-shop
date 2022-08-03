import ElasticSearch from '../../internal/elasticsearch/elasticsearch';
import {ELASTICSEARCH_HOST, ELASTICSEARCH_PORT} from '../config';

export const UserElasticsearch = new ElasticSearch({
  host: ELASTICSEARCH_HOST,
  port: ELASTICSEARCH_PORT,
});
