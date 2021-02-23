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
`;

export const InputContainer = styled.div.attrs((props) => ({...props}))`
  margin: 7.2% 0 0 20px;
  display: flex;
  flex-flow: column;
  overflow: auto;
  max-height: 50vh;
`;

export const CurrField = styled.div.attrs((props) => ({...props}))`
  $grid__bp--md: 50%;
  $grid__cols: 50;
  max-width: $grid__bp--md * 1%;
  margin-bottom: 2%;
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
  margin: 7.2% 0px;
  width: 50%;
  grid-row: 1;
`;
