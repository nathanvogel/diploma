import React, { useState } from "react";
import styled from "styled-components";

import { Edge, Status } from "../utils/types";
import EdgeEditor from "./EdgeEditor";
import { RELATION_COLORS } from "../styles/theme";
import EdgeSummary from "./edgeDetails/EdgeSummary";
import { RootStore } from "../Store";
import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactComponent as EditIcon } from "../assets/ic_edit.svg";
import SourceListItemContainerCSS from "./sourceDetails/SourceListItemContainer";
import IconButton from "./buttons/IconButton";
import SourceList from "./edgeDetails/SourceList";
import ButtonBar from "./buttons/ButtonBar";

const Content = styled.section`
  box-sizing: border-box;
  border-color: ${props => props.theme.inputBG};
  border-width: ${props => props.theme.borderWidth};
  border-style: solid;
  border-radius: ${props => props.theme.radius};

  transition: border-color 0.1s ease-in-out;

  &:hover {
    border-color: ${props => props.color}dd;
  }

  // background-color: #f4f4f4;
  padding: ${props => props.theme.blockPadding};
  margin-top: ${props => props.theme.blockSpacingTB};
  margin-bottom: ${props => props.theme.blockSpacingTB};
`;

const EdgeMainText = styled.p`
  font-size: ${props => props.theme.fontSizeM};
  margin-top: 0.8em;
  margin-bottom: 20px;
`;

const DatasetInfoText = styled.p`
  font-size: ${props => props.theme.fontSizeS};
  color: ${props => props.theme.secondaryTextColor};
  margin-top: ${props => props.theme.inputTBSpacing};
  margin-bottom: ${props => props.theme.inputTBSpacing};
`;

const AddSourceButton = styled(IconButton)`
  ${SourceListItemContainerCSS}
  // width: 100%;
  display: block;
  padding-top: ${props => props.theme.inputPaddingTB};
  padding-bottom: ${props => props.theme.inputPaddingTB};
  margin-bottom: 0px; // It's the last element
  font-size: 6px; // smaller than the icon so that it is centered
  // background-color: white;

  & > svg {
    height: 18px;
    width: 18px;
    // margin-right: 10px;
  }
`;

type OwnProps = {
  edge: Edge;
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  editing: boolean;
};

const mapStateToProps = (state: RootStore, props: OwnProps) => {
  const { edge } = props;
  const entityFrom = state.entities.data[props.edge._from];
  const statusFrom = state.entities.status[props.edge._from];
  const entityTo = state.entities.data[props.edge._to];
  const statusTo = state.entities.status[props.edge._to];

  const hasLoadedEntities = statusFrom === Status.Ok && statusTo === Status.Ok;

  return {
    edge,
    entityFrom,
    entityTo,
    hasLoadedEntities,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({}, dispatch);

const EdgeDetails: React.FunctionComponent<Props> = props => {
  const [editing, setEditing] = useState(false);
  const [showDatasetEditInfo, setShowDatasetEditInfo] = useState(false);

  const { edge, entityFrom, entityTo } = props;
  if (!edge._key) return <Content>Error: missing _key attribute.</Content>;

  if (editing)
    return (
      <div>
        <EdgeEditor
          key={edge._key}
          edgeKey={edge._key}
          entity1Key={edge._from}
          entity2Key={edge._to}
          dismiss={() => setEditing(false)}
          editorId={edge._key}
        />
      </div>
    );

  return (
    <Content color={RELATION_COLORS[edge.type]}>
      {props.hasLoadedEntities && (
        <EdgeSummary edge={edge} entityFrom={entityFrom} entityTo={entityTo} />
      )}
      <EdgeMainText>{edge.text}</EdgeMainText>
      {edge.sourceText && (!edge.sources || edge.sources.length === 0) && (
        <div>Previous source: {edge.sourceText}</div>
      )}
      <SourceList sources={edge.sources} />
      {showDatasetEditInfo ? (
        <DatasetInfoText>
          {edge.ds && edge.ds.wd
            ? "This information comes from Wikidata. You can modify it by going to the source link, making the changes on Wikidata and clicking 'Update from Wikidata' here on the relevant entity. This way, you'll be contributing to both relations.watch and Wikidata!"
            : "This information comes from an external source and can't be modified directly here."}
        </DatasetInfoText>
      ) : (
        <ButtonBar buttonsAlign="right">
          <AddSourceButton
            onClick={() =>
              edge.ds ? setShowDatasetEditInfo(true) : setEditing(true)
            }
          >
            <EditIcon />
          </AddSourceButton>
        </ButtonBar>
      )}
    </Content>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EdgeDetails);
