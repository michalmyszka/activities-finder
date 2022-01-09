// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ActivitySubcategory = {
  "RUNNING": "RUNNING",
  "NORDIC_WALKING": "NORDIC_WALKING"
};

const ActivityCategory = {
  "SPORT": "SPORT"
};

const { Activity } = initSchema(schema);

export {
  Activity,
  ActivitySubcategory,
  ActivityCategory
};