import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import EntityEditor from "../components/EntityEditor";
import { connect } from "react-redux";
import { DatasetId, ImportStage } from "../utils/types";
import ErrorBox from "../components/meta/ErrorBox";
import styled from "styled-components";
import { PageWidthSizer, PagePadder } from "../styles/sizers";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { RootStore } from "../Store";
import * as actions from "../features/wikidataAC";
import SimilarEntitiesSelector from "../components/dataimport/SimilarEntitiesSelector";

const Content = styled.div`
  ${PageWidthSizer}
  ${PagePadder}
`;
const Loading = styled.div`
  background: ${props => props.theme.inputBG};
  padding: 8px;
  border-radius: ${props => props.theme.radius};
`;

interface DataimportMatch {
  datasetId?: DatasetId;
  entityDatasetId?: string;
}

const mapStateToProps = (state: RootStore, props: RouteComponentProps) => {
  const { datasetId, entityDatasetId } = props.match.params as DataimportMatch;
  const data =
    entityDatasetId && state.dataimport[entityDatasetId]
      ? state.dataimport[entityDatasetId]
      : undefined;
  return {
    datasetId,
    entityDatasetId,
    data
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      startImport: actions.fetchWikidataGraphAndFamiliarEntities
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const ImportScreen: FunctionComponent<Props> = props => {
  useEffect(() => {
    if (!props.data && props.entityDatasetId)
      props.startImport(props.entityDatasetId);
    // if (props.data) {
    //   switch(props.data.importStage) {
    //     case
    //   }
    // }
  });

  if (props.datasetId !== DatasetId.Wikidata)
    return (
      <ErrorBox>
        Importing from datasets other than Wikidata isn't supported on the
        client.
      </ErrorBox>
    );
  if (!props.entityDatasetId)
    return <ErrorBox>Missing ID of the entry point.</ErrorBox>;
  if (!props.data) return <div>Data not loaded</div>;

  switch (props.data.importStage) {
    case ImportStage.FetchingDataset:
      return <Loading>Loading from Wikidata</Loading>;
    case ImportStage.FetchingEntityDiff:
      return <Loading>Fetching entities</Loading>;
    case ImportStage.FetchingEdgeDiff:
      return <Loading>Fetching relations</Loading>;
    case ImportStage.FetchingSimilarEntities:
      return <Loading>Fetching similar entities</Loading>;
    case ImportStage.FetchedSimilarEntities:
      return (
        <SimilarEntitiesSelector
          dsEntities={props.data.dsEntities}
          similarEntities={props.data.similarEntities}
          similarEntitiesSelection={props.data.similarEntitiesSelection}
        />
      );
  }

  return <div />;
};

const ImportScreenWrapper: FunctionComponent<Props> = props => (
  <Content>
    <ImportScreen {...props} />
  </Content>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportScreenWrapper);
