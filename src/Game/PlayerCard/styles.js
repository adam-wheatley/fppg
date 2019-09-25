import styled from 'styled-components';

export const Container = styled.div`
    background: #FFF;
    margin: 25px;
    color: #000;
    border-radius: 50px;
    padding: 15px;
    cursor: pointer;
    border: ${({ selected }) => selected ? `
        5px solid blue;
    ` : '5px solid grey'};
`;

export const PlayerImage = styled.img`
    border-radius: 15px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    max-width: 80%;
`;