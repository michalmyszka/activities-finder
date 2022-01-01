// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ActivityType = {
  "GYMNASTICS": "GYMNASTICS"
};

const { Activity } = initSchema(schema);

export {
  Activity,
  ActivityType
};