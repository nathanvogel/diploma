import React from "react";
import { RouteComponentProps, RouterProps, withRouter } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { RootStore } from "../Store";
import { getRelationId } from "../utils/utils";
import { Relation, Status } from "../utils/types";
import { RootAction } from "../utils/ACTIONS";
import EdgeDetails from "./EdgeDetails";
import { loadRelation } from "../features/relationsActionCreators";
import Meta from "./Meta";

const Content = styled.div`
  width: 100%;
`;

type OwnProps = {
  entity1Key: string;
  entity2Key: string;
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const mapStateToProps = (state: RootStore, props: OwnProps) => {
  const entity1Key = props.entity1Key;
  const entity2Key = props.entity2Key;
  const relationId = getRelationId(entity1Key, entity2Key);

  // Get the entity from the Redux Store
  const relations: Relation = relationId
    ? state.relations.data[relationId]
    : {};
  const relationsStatus = relationId
    ? state.relations.status[relationId]
    : null;
  const relationsError = relationId ? state.relations.errors[relationId] : null;

  return {
    entity1Key,
    entity2Key,
    relations,
    relationsStatus,
    relationsError
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      loadRelation
    },
    dispatch
  );

class RelationsScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.loadRelation(this.props.entity1Key, this.props.entity2Key);
  }

  onSecondEntitySelected = (value: string) => {
    // this.props.history.push(
    //   `/${ROUTES.relation}/${ROUTES.add}/${this.props.entity1Key}/${value}`
    // );
  };

  render() {
    const { relations, relationsStatus, relationsError } = this.props;

    // Render loading status and error.
    if (relationsStatus !== Status.Ok)
      return (
        <Content>
          <Meta status={relationsStatus} error={relationsError} />
        </Content>
      );

    if (!relations)
      return (
        <Content>
          <p>The list of edges is empty.</p>
        </Content>
      );

    return (
      <Content>
        {Object.keys(relations).map(key => (
          <EdgeDetails key={key} edge={relations[key]} />
        ))}
      </Content>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RelationsScreen)
);
