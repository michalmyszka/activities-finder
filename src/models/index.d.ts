import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ActivitySubcategory {
  RUNNING = "RUNNING",
  NORDIC_WALKING = "NORDIC_WALKING"
}

export enum ActivityCategory {
  SPORT = "SPORT"
}



type ActivityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Activity {
  readonly id: string;
  readonly category: ActivityCategory | keyof typeof ActivityCategory;
  readonly subcategory: ActivitySubcategory | keyof typeof ActivitySubcategory;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly time: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Activity, ActivityMetaData>);
  static copyOf(source: Activity, mutator: (draft: MutableModel<Activity, ActivityMetaData>) => MutableModel<Activity, ActivityMetaData> | void): Activity;
}