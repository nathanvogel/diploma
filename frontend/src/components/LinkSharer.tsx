import React from "react";
import styled from "styled-components";

import BreakableA from "./buttons/BreakableA";
import copyTextToClipboard from "../utils/snippets/clipboard";
import { withoutHttps } from "../utils/utils";
import IconButton from "./buttons/IconButton";

const P = styled.p`
  font-size: ${props => props.theme.fontSizeS};
`;

type Props = {
  link: string;
  children?: React.ReactNode;
};

class LinkSharer extends React.PureComponent<Props> {
  readonly state = {
    copied: false,
  };

  render() {
    const { link } = this.props;
    const { copied } = this.state;

    return (
      <React.Fragment>
        <P>
          {this.props.children}
          <br />
          <BreakableA href={link}>{withoutHttps(link)}</BreakableA>
        </P>
        {copied ? (
          <P>Copied!</P>
        ) : (
          <IconButton
            small
            withText
            onClick={() => {
              copyTextToClipboard(link);
              this.setState({ copied: true });
            }}
          >
            Copy link
          </IconButton>
        )}
      </React.Fragment>
    );
  }
}

export default LinkSharer;
