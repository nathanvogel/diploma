import React, { useState } from "react";
import { RouteComponentProps, withRouter, Route, Switch } from "react-router";
import { useLastLocation } from "react-router-last-location";
import styled from "styled-components";
import Info from "@material-ui/icons/InfoOutlined";

import DrawerLayout from "../components/layout/DrawerLayout";
import { RootStore } from "../Store";
import { bindActionCreators, AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";
import RelationPreview from "../components/RelationPreview";
import EdgesListContainer from "../components/EdgesListContainer";
import HeaderModal from "../components/layout/HeaderModal";
import ROUTES from "../utils/ROUTES";
import IconButton from "../components/buttons/IconButton";
import GraphLegend from "../components/graph/GraphLegend";
import { mediaq } from "../styles/responsive-utils";

const GraphWrapper = styled.div`
  width: 100%;
  height: calc(
    100vh - ${props => props.theme.hoverBoxHeight} -
      ${props => props.theme.navBarHeight}
  );
`;

const DrawerPadder = styled.div`
  padding: ${props => props.theme.blockPadding};
  padding-top: 0.85em;

  ${mediaq.desktop} {
    margin-bottom: ${props => props.theme.hoverBoxHeight};
  }
`;

const EdgesListWrapper = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
  min-height: 50vh;
  box-sizing: border-box;
`;

interface LegendProps {
  hideColumn?: boolean;
}

const LegendColumn = styled.div<LegendProps>`
  position: absolute;
  right: ${props => props.theme.marginLR};
  left: unset;
  top: ${props => props.theme.navBarHeight};
  bottom: unset;
  height: auto;
  overflow-y: auto;
  min-width: ${props => props.theme.appMiniSidebarWidth};
  width: ${props => props.theme.appMiniSidebarWidth};
  max-height: calc(
    100vh
     - ${props => props.theme.navBarHeight}
     - ${props => props.theme.hoverBoxHeight}
     - 20px);
  padding: ${props => props.theme.blockPadding};
  box-sizing: border-box;
  // box-shadow: -15px 0px 15px 0px ${props => props.theme.sidebarBG};
  // Space for the toggle button
  padding-bottom: 44px;

  background-color: ${props => props.theme.appBG};
  opacity: 0.95;

  transition: transform ${props => props.theme.shortAnim} ease-out;
  // A bit more than 100% for the margin/position of the legend
  transform: translateX(${props => (props.hideColumn ? "130" : "0")}%);
`;

interface OwnProps {
  entity1Key?: string;
  sidebarContent?: React.ReactNode;
}

const mapStateToProps = (state: RootStore, props: OwnProps) => {
  const { hover } = state;
  return {
    ...props,
    hover,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({}, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const GraphScreenWrapper: React.FunctionComponent<Props> = props => {
  const { hover, entity1Key } = props;
  const [showLegend, setShowLegend] = useState(false);
  const toggleLegend = () => setShowLegend(!showLegend);
  const lastLocation = useLastLocation();

  const closeRelationDetail = () => {
    // Don't leave the relation details in the history stack if the previous
    // location was within our website.
    if (lastLocation) props.history.goBack();
    else props.history.push(props.match.url);
  };

  return (
    <DrawerLayout
      drawerContent={<DrawerPadder>{props.sidebarContent}</DrawerPadder>}
      appBarContent={
        <IconButton onClick={toggleLegend}>
          <Info />
        </IconButton>
      }
    >
      {/* The GRAPH */}
      <GraphWrapper>{props.children}</GraphWrapper>
      {/* The LEGEND with id and data-hidden for the PDF export */}
      <LegendColumn
        id="graph-legend"
        data-hidden={!showLegend}
        hideColumn={!showLegend}
      >
        <GraphLegend />
      </LegendColumn>
      {/* The RELATION PREVIEW */}
      <Switch>
        <Route
          path={`${props.match.url}/${ROUTES.relation}/:entity1Key/:entity2Key`}
          render={props => (
            <HeaderModal
              fullyVisible={true}
              onClose={closeRelationDetail}
              header={
                <RelationPreview
                  fullyVisible={true}
                  entity1Key={props.match.params.entity1Key}
                  entity2Key={props.match.params.entity2Key}
                />
              }
            >
              <EdgesListWrapper>
                <EdgesListContainer
                  entity1Key={props.match.params.entity1Key}
                  entity2Key={props.match.params.entity2Key}
                />
              </EdgesListWrapper>
            </HeaderModal>
          )}
        />
        <Route
          render={props => (
            <HeaderModal
              fullyVisible={false}
              onClose={closeRelationDetail}
              header={
                <RelationPreview
                  fullyVisible={false}
                  entity1Key={entity1Key || hover.relationSourceKey}
                  entity2Key={hover.relationTargetKey || hover.entityKey}
                />
              }
            />
          )}
        />
      </Switch>
    </DrawerLayout>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GraphScreenWrapper)
);
