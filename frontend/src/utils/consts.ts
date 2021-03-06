import {
  RelationType,
  RelationTypeRequirements,
  AmountSelectOption,
  FamilialLink,
} from "./types";
import { EntityType as E } from "./types";

// Should have been maintained in sync with the backend here ?
// /backend/service-graph-api/scripts/consts.js

export const POSSIBLE_LINKS = {
  [RelationType.IsOwned]: [
    [E.MoralPerson, E.Event, E.Media],
    [E.MoralPerson, E.Group, E.Human, E.State],
  ],
  [RelationType.JobDependsOn]: [
    [E.Human, E.MoralPerson, E.Media, E.State],
    [E.Human, E.MoralPerson, E.Group, E.Media, E.State],
  ],
  [RelationType.IsControlled]: [
    [E.Group, E.MoralPerson, E.Media, E.State],
    [E.Human, E.MoralPerson, E.Group, E.State],
  ],
  [RelationType.ValueExchange]: [
    [E.MoralPerson, E.Group, E.Human, E.Media, E.State],
    [E.MoralPerson, E.Group, E.Human, E.Media, E.State],
  ],
  [RelationType.Family]: [[E.Human], [E.Human]],
  // [RelationType.Friendship]: [[E.Human], [E.Human]],
  [RelationType.Love]: [[E.Human], [E.Human]],
  [RelationType.Opposition]: [
    [E.MoralPerson, E.Group, E.Human, E.Media, E.State],
    [E.MoralPerson, E.Group, E.Human, E.Media, E.State],
  ],
  [RelationType.IsInfluenced]: [
    [E.MoralPerson, E.Group, E.Human, E.Media, E.State],
    [E.MoralPerson, E.Group, E.Human, E.Media, E.State],
  ],
  [RelationType.Attendance]: [
    [E.MoralPerson, E.Group, E.Human, E.Media, E.State],
    [E.Event],
  ],
  [RelationType.GroupMember]: [
    [E.MoralPerson, E.Human, E.Human, E.State],
    [E.Group, E.MoralPerson],
  ],
  [RelationType.Other]: [
    [E.MoralPerson, E.Group, E.Human, E.Event, E.Media, E.State],
    [E.MoralPerson, E.Group, E.Human, E.Event, E.Media, E.State],
  ],
};

export const DirectedLinks = [
  RelationType.IsOwned,
  RelationType.IsControlled,
  RelationType.JobDependsOn,
  RelationType.IsInfluenced,
];

export const DirectedFamilialLinks = [FamilialLink.childOf];

type Requirements = {
  [key: number]: RelationTypeRequirements;
};
export const RELATION_REQUIREMENTS: Requirements = {
  [RelationType.IsOwned]: { ownedPercent: true },
  [RelationType.JobDependsOn]: { amount: true, descriptionRequired: true },
  [RelationType.IsControlled]: { descriptionRequired: true },
  [RelationType.ValueExchange]: { amount: true, descriptionRequired: true },
  [RelationType.Family]: { familialLinkType: true },
  // [RelationType.Friendship]: { descriptionRequired: true },
  [RelationType.Love]: {},
  [RelationType.Opposition]: { descriptionRequired: true },
  [RelationType.IsInfluenced]: { descriptionRequired: true },
  [RelationType.Attendance]: {},
  [RelationType.GroupMember]: {},
  [RelationType.Other]: { descriptionRequired: true },
};

const AMOUNT_UNKNOWN = -1;
const AMOUNT_DO_ENTER = -2;

export const AmountOptions: AmountSelectOption[] = [
  { label: "Unknown amount", value: AMOUNT_UNKNOWN },
  { label: "0 US$", value: 0 },
  { label: "1+ US$", value: 1 },
  { label: "1'000+ US$", value: 1000 },
  { label: "10'000+ US$", value: 10000 },
  { label: "100'000+ US$", value: 100000 },
  { label: "1'000'000+ US$", value: 1000000 },
  { label: "10'000'000+ US$", value: 10000000 },
  { label: "100'000'000+ US$", value: 100000000 },
  { label: "1'000'000'000+ US$", value: 1000000000 },
  { label: "10'000'000'000+ US$", value: 10000000000 },
  // { label: "1 - 1'000 US$", value: 1 },
  // { label: "1'000 - 10'000 US$", value: 1000 },
  // { label: "10'000 - 100'000 US$", value: 10000 },
  // { label: "100'000 - 1'000'000 US$", value: 100000 },
  // { label: "1'000'000 - 10'000'000 US$", value: 1000000 },
  // { label: "10'000'000 - 100'000'000 US$", value: 10000000 },
  // { label: "100'000'000 - 1'000'000'000 US$", value: 100000000 },
  // { label: "1'000'000'000 - 10'000'000'000 US$", value: 1000000000 },
  // { label: "10'000'000'000+ US$", value: 10000000000 },
  { label: "Enter the exact amount", value: AMOUNT_DO_ENTER },
];
export const unkownAmountOption = AmountOptions[0];

export const ERROR_CODES = {
  MISSING_SOURCE_FORM: "MISSING_SOURCE_FORM",
  MISSING_SOURCE_LINK: "MISSING_SOURCE_LINK",
  NOT_A_LINK: "NOT_A_LINK",
};

export const MIN_GRAPH_WIDTH = 600;
export const MIN_GRAPH_HEIGHT = 400;

const CONSTS = {
  relCollectionName: "relations",
  entCollectionName: "entities",
  EMPTY_KEY: "_",
  WIKIDATA_SOURCE_KEY: "1379121",
  AMOUNT_UNKNOWN,
  AMOUNT_DO_ENTER,
  ERROR_CODES,
};

export default CONSTS;
