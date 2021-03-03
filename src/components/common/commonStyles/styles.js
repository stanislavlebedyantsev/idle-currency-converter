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
  border-radius: 4%;
  background-color: #fff;
  max-height: 100vh;
`;