// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ActivityType = {
  "RUNNING": "RUNNING",
  "NORDIC_WALKING": "NORDIC_WALKING"
};

const { Activity } = initSchema(schema);

export {
  Activity,
  ActivityType
};