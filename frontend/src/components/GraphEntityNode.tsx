import React from "react";
import { EntityPreview } from "../utils/types";
import ROUTES from "../utils/ROUTES";
import { Link } from "react-router-dom";
import DefaultPerson from "../assets/physical_p_default_preview_48.png";
import PrimaryDefaultPerson from "../assets/physical_p_default_preview_56.png";

type OwnProps = {
  entity: EntityPreview;
  baseEntityKey?: string;
  x: number;
  y: number;
  scale: number;
  textScale: number;
  primary: boolean;
};

class GraphEntityNode extends React.Component<OwnProps> {
  static defaultProps = {
    scale: 1,
    textScale: 1,
    primary: false
  };

  render() {
    const {
      entity,
      x,
      y,
      scale,
      textScale,
      baseEntityKey,
      primary
    } = this.props;
    const size = primary ? 52 : 40 * scale;
    const fontSize = 12 * textScale;

    const svgNode = (
      <g
        className="node"
        id={entity._key}
        transform={`translate(${x - size / 2},${y - size / 2 - 5})`}
      >
        <image
          opacity="1"
          href={primary ? PrimaryDefaultPerson : DefaultPerson}
          width={size}
          height={size}
        />
        {/* Print a first time the text with a big stroke, it's a hack
            to display a background the size of the text. */}
        <text
          textAnchor="middle"
          dy="1.0em"
          fontSize={fontSize}
          fontWeight={primary ? "bold" : "normal"}
          stroke="#ffffff"
          strokeWidth="0.6em"
          opacity="0.8"
          transform={`translate(${size / 2},${size})`}
        >
          {entity.name}
        </text>
        <text
          textAnchor="middle"
          dy="1.0em"
          fill="black"
          fontSize={fontSize}
          fontWeight={primary ? "bold" : "normal"}
          opacity="1"
          transform={`translate(${size / 2},${size})`}
        >
          {entity.name}
        </text>
      </g>
    );

    // Only wrap in a link if we aren't the base entity.
    return baseEntityKey ? (
      <Link to={`/${ROUTES.relation}/${baseEntityKey}/${entity._key}`}>
        {svgNode}
      </Link>
    ) : (
      svgNode
    );
  }
}

export default GraphEntityNode;