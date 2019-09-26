import styled from 'styled-components';

export const Container = styled.div`
  max-width: 50rem;
  margin: 10px auto;
  text-align: center;
`;

export const ResultContainer = styled.div`
  background: ${props => (props.result === 'true' ? '#B2FF9E' : '#EF626C')};
  padding: 5px 15px;
  border-radius: 15px;
`;

export const Button = styled.button`
  border: none;
  border-radius: 15px;
  background: ${props => (props.disabled ? '#DAD2D8' : props.color)};
  padding: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  color: #000;
  min-width: 150px;
  margin: 15px;
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
`;
