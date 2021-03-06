import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { RootStore } from "../Store";
import ROUTES from "../utils/ROUTES";
import { Link } from "react-router-dom";

type OwnProps = {
  entityKey: string;
  baseEntityKey: string;
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootStore, props: OwnProps) => {
  const baseEntityKey = props.baseEntityKey;
  const entityKey = props.entityKey;
  // Get the entity from the Redux Store
  const entity = state.entities.datapreview[entityKey];
  // Return everything.
  return {
    entity,
    entityKey,
    baseEntityKey
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({}, dispatch);

/**
 * This is for a list display of the entities linked to another entity.
 * @extends Component
 */
class LinkedEntityPreview extends Component<Props> {
  render() {
    const { entity, entityKey, baseEntityKey } = this.props;

    return (
      <Link to={`/${ROUTES.relation}/${baseEntityKey}/${entityKey}`}>
        <li>{entity ? entity.name : `Loading ${entityKey}...`}</li>
      </Link>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedEntityPreview);
