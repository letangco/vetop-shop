import colors from 'colors'
import { elasticsearchAddElement, elasticsearchDeleteElement, elasticsearchUpdateElement } from './elasticsearch';

export const declareQueue = async (queueName, channel, durable) => {
  try {
    const q = await channel.assertQueue(queueName, { durable })
    console.log(colors.green(colors.italic(' *** Declare queue success: ')), colors.italic(q.queue))
    return q.queue
  } catch (err) {
    console.log(err)
  }
}

export const listQueues = async (channel) => {

}
