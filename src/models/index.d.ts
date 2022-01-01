import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ActivityType {
  GYMNASTICS = "GYMNASTICS"
}



type ActivityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Activity {
  readonly id: string;
  readonly type?: ActivityType | keyof typeof ActivityType;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Activity, ActivityMetaData>);
  static copyOf(source: Activity, mutator: (draft: MutableModel<Activity, ActivityMetaData>) => MutableModel<Activity, ActivityMetaData> | void): Activity;
}