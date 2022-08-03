import { BODY_FCM, NOTIFICATION_TYPE, QUEUE_NAME, TITLE_FCM } from '../../../external/constants/job_name';
import { sendDataToQueue } from '../../../internal/ rabbitmq/publisher/publisher';
import { RabbitMQ } from '../../server';

export async function sendNotification(data) {
    try {
      const options = {
        type: data.type,
        to: data.to,
        targetId: data.targetId,
      };
      if (data.data) {
        options.data = data.data;
      }
      switch (data.type) {
        case NOTIFICATION_TYPE.USER_RATING_STORE:
          options.title = `${TITLE_FCM.USER_RATING_STORE} ${data.data.sender}`;
          options.body = `${data.data.sender} ${BODY_FCM.USER_RATING_STORE} ${options.data.star} ${options.data.content}`;
          break;
        default:
          break;
      }
      console.log(options);
      if (options.to) {
        console.log('*** Send notification to : ', options.to);
        console.log('*** Notification type : ', options.type);
        sendDataToQueue(RabbitMQ.getChannel(), QUEUE_NAME.CREATE_NOTIFICATION, options);
      }
    } catch (error) {
      return error500(error);
    }
  }
