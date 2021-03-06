import React from "react";
import styled from "styled-components";

import { RelationType, Entity, Edge } from "../../utils/types";
import { getEdgeSummary } from "../../strings/getEdgeSummary";
import { RELATION_COLORS } from "../../styles/theme";

const Span = styled.span`
  & {
    font-family: ${props => props.theme.mainFont};
    font-size: ${props => props.theme.fontSizeL};
    font-weight: bold;
    position: relative;
    z-index: 1;
    margin-bottom: 3px;
  }

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: calc(100% - 4px);
    bottom: -2px;
    left: -0em;
    right: -0em;
    background-color: ${props => props.color};
    transform-origin: bottom center;
    // transform: scaleY(0.3);
    transition: all ${props => props.theme.shortAnim} ease-in-out;
    opacity: 1;
  }

  &:hover::before {
    // transform: scaleY(1);
  }

  &:hover {
    // color: white;
  }
`;

type Props = {
  edge: Edge;
  entityFrom: Entity;
  entityTo: Entity;
  alsoOther?: boolean;
};

const EdgeSummary: React.FunctionComponent<Props> = (props: Props) => {
  if (props.edge.type === RelationType.Other && !props.alsoOther) return null;
  return (
    <Span color={RELATION_COLORS[props.edge.type]}>
      {getEdgeSummary(props.edge, props.entityFrom, props.entityTo)}
    </Span>
  );
};

export default EdgeSummary;
