import { declareQueue } from './subscriber';
import { QUEUE_NAME } from '../../../external/constants/job_name';
import { ElasticSearchProduct } from '../../../server/server';

// TODO Add Element To ElasticSearch
export const elasticsearchAddElement = async (channel) => {
  const q = await declareQueue(QUEUE_NAME.ELASTICSEARCHPRODUCT_CREATE, channel, true)
  try {
    channel.consume(q, (msg) => {
      const data = JSON.parse(msg.content.toString());
      ElasticSearchProduct.AddElement(data.index, data.data, '');
    }, {
      noAck: true
    });
  } catch (error) {
    console.error(error);
  }
}

// TODO Update Element To ElasticSearch
export const elasticsearchUpdateElement = async (channel) => {
  const q = await declareQueue(QUEUE_NAME.ELASTICSEARCH_UPDATE, channel, true)
  channel.consume(q, (msg) => {
    const data = JSON.parse(msg.content.toString());
    ElasticSearchProduct.UpdateAndInsert(data.index, data.data, false, "")
  }, {
    noAck: true
  })
}

// TODO Remove Element To ElasticSearch
export const elasticsearchDeleteElement = async (channel) => {
  const q = await declareQueue(QUEUE_NAME.ELASTICSEARCH_REMOVE, channel, true)
  channel.consume(q, (msg) => {
    const data = JSON.parse(msg.content.toString())
    ElasticSearchProduct.DeleteElement(data.index, data.id, "")
  }, {
    noAck: true
  })
}
