import ACTIONS from "../utils/ACTIONS";
import { Action } from "../utils/types";
import update from "immutability-helper";

const defaultState = { data: {}, status: {}, errors: {} };

export default (state = defaultState, action: Action) => {
  switch (action.type) {
    case ACTIONS.EntityPostSent:
    case ACTIONS.EdgePostSent:
      const key1 = action.meta.requestId as string;
      return update(state, {
        status: { [key1]: { $set: action.status } }
      });
    case ACTIONS.EntityPostClear:
    case ACTIONS.EdgePostClear:
      const key4 = action.meta.requestId as string;
      return update(state, {
        data: { $unset: [key4] },
        status: { $unset: [key4] },
        errors: { $unset: [key4] }
      });
    case ACTIONS.EntityPostSuccess:
    case ACTIONS.EdgePostSuccess:
      const key2 = action.meta.requestId as string;
      return update(state, {
        data: { [key2]: { $set: action.payload } },
        status: { [key2]: { $set: action.status } }
      });
    case ACTIONS.EntityPostError:
    case ACTIONS.EdgePostError:
      const key3 = action.meta.requestId as string;
      return update(state, {
        data: { [key3]: { $set: null } },
        status: { [key3]: { $set: action.status } },
        errors: { [key3]: { $set: action.meta.error } }
      });
    default:
      return state;
  }
};
