import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum CompetitionType {
  GYMNASTICS = "GYMNASTICS"
}



type CompetitionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Competition {
  readonly id: string;
  readonly type?: CompetitionType | keyof typeof CompetitionType;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Competition, CompetitionMetaData>);
  static copyOf(source: Competition, mutator: (draft: MutableModel<Competition, CompetitionMetaData>) => MutableModel<Competition, CompetitionMetaData> | void): Competition;
}