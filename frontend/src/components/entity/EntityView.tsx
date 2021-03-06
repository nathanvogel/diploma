import React, { FunctionComponent } from "react";
import { Entity, EntityPreview } from "../../utils/types";
import styled from "styled-components";
import { getEntitySAsset } from "../../assets/EntityIcons";
import EntityImage from "./EntityImage";
import EntityDescription from "./EntityDescription";
import EntityName from "./EntityName";
import EntityViewContainer from "./EntityViewContainer";

type Props = {
  entity: Entity | EntityPreview;
  big?: boolean;
};

const Container = styled(EntityViewContainer)`
  padding: ${props => props.theme.inputPaddingTB}
    ${props => props.theme.inputPaddingLR};
  box-shadow: ${props => props.theme.entityViewShadow};
  border-radius: ${props => props.theme.bigRadius};
  text-align: left;
  box-sizing: border-box;
`;

const EntityView: FunctionComponent<Props> = props => {
  const { entity, big } = props;

  return (
    <Container className="entityview">
      <EntityImage src={getEntitySAsset(entity.type)} />
      <div>
        <EntityName big={big}>{entity.name}</EntityName>
        {entity.text && <EntityDescription>{entity.text}</EntityDescription>}
      </div>
    </Container>
  );
};

export default EntityView;
