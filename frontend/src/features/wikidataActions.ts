import * as ACTIONS from "../utils/ACTIONS";
import { Edge, Entity, Dictionary, SimilarEntities } from "../utils/types";

// ===== Dataset Fetching
interface DI_DatasetRequested_Action {
  type: ACTIONS.DI_DatasetRequested;
  namespace: string;
}
export function requestedDataset(
  namespace: string
): DI_DatasetRequested_Action {
  return {
    type: ACTIONS.DI_DatasetRequested,
    namespace
  };
}

interface DI_DatasetFetched_Action {
  type: ACTIONS.DI_DatasetFetched;
  namespace: string;
  dsEdges: Dictionary<Edge>;
  dsEntities: Dictionary<Entity>;
}
export function fetchedDataset(
  namespace: string,
  dsEdges: Dictionary<Edge>,
  dsEntities: Dictionary<Entity>
): DI_DatasetFetched_Action {
  return {
    type: ACTIONS.DI_DatasetFetched,
    namespace,
    dsEdges,
    dsEntities
  };
}

// ===== Find Similar Entities
interface DI_SimilarEntitiesRequested_Action {
  type: ACTIONS.DI_SimilarEntitiesRequested;
  namespace: string;
}
export function requestedSimilarEntities(
  namespace: string
): DI_SimilarEntitiesRequested_Action {
  return {
    type: ACTIONS.DI_SimilarEntitiesRequested,
    namespace
  };
}

interface DI_SimilarEntitiesFetched_Action {
  type: ACTIONS.DI_SimilarEntitiesFetched;
  namespace: string;
  similarEntities: SimilarEntities;
}
export function fetchedSimilarEntities(
  namespace: string,
  similarEntities: SimilarEntities
): DI_SimilarEntitiesFetched_Action {
  return {
    type: ACTIONS.DI_SimilarEntitiesFetched,
    namespace,
    similarEntities
  };
}

export type DI_Action =
  | DI_DatasetRequested_Action
  | DI_DatasetFetched_Action
  | DI_SimilarEntitiesRequested_Action
  | DI_SimilarEntitiesFetched_Action;
