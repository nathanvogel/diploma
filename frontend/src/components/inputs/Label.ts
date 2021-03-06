import styled from "styled-components";

const Label = styled.label`
  display: block;
  color: ${props => props.theme.secondaryTextColor};
  font-family: ${props => props.theme.brandFont};
  font-size: ${props => props.theme.fontSizeM};
  font-weight: 300;
  // text-transform: uppercase;
  margin: ${props => props.theme.marginTB} 0px;
  margin-bottom: 3px;
`;

export default Label;
