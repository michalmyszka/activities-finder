// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CompetitionType = {
  "GYMNASTICS": "GYMNASTICS"
};

const { Competition } = initSchema(schema);

export {
  Competition,
  CompetitionType
};