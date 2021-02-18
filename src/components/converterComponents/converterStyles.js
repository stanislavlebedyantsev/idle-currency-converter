import styled from "styled-components";
import background from "@assets/1155007.jpg";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: url(${background});
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: none;
`;

export const ContentContainer = styled.div`
  min-width: 70%;
  border-radius: 10%;
  background-color: #fff;
  min-height: 70vh;
  display: grid;
`;

export const InputContainer = styled.div`
  margin: 7.2% 7.2% 0;
  display: flex;
  flex-flow: column;
  overflow: auto;
  max-height: 50vh;
  grid-column: 1;
  grid-row: 1;
`;
export const ValueInput = styled.input.attrs((props) => ({
  type: props.type,
}))`
  max-width: 95%;
  min-height: 5%;
  border: none;
  border-bottom: 3px silver solid;
  font-size: 100%;
`;

export const CurrField = styled.div`
  $grid__bp--md: 20%;
  $grid__cols: 12;
  max-width: $grid__bp--md * 1%;
  margin-bottom: 4%;
`;

export const CurrSelect = styled.select`
  margin-left: 5%;
  min-height: 5%;
  min-width: 15%;
  border: none;
`;

export const Button = styled.button`
  width: 35%;
  height: 7vh;
  outline: none;
  border-radius: 20%;
  border: 2px #858585 solid;
  margin-left: 5%;
`;

export const ToolsArea = styled.div`
  grid-column: 2;
  margin: 7.2%;
  grid-row: 1;
`;

export const CurrLabel = styled.label`
  margin-right: 1%
`
