import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import GameState from './GameState';
import GameContext from './game-context';

const mockData = {
    players: [{
        first_name: "Adam",
        player_card_url: "https://userImageUrl.com/1",
        fppg: 50,
    }, {
        first_name: "Dave",
        player_card_url: "https://userImageUrl.com/2",
        fppg: 74,
    }, 
    {
        first_name: "Bob",
        player_card_url: "https://userImageUrl.com/2",
    }],
};

const MockComponent = () => <div />;

describe('<GameState />', () => {
    let component;
    describe('When fetching players data is successful', () => {
        beforeAll(async () => {
            global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
                json: () => mockData,
            }));
            await act(async () => {
                component = await mount(
                    <GameState>
                        <GameContext.Consumer>
                            {context => (
                                <MockComponent {...context}/>
                            )}
                        </GameContext.Consumer>
                    </GameState>
                );
            });
            await new Promise(resolve => setTimeout(resolve));
            component.update();
        });

        test('should set players data that has fppg score and loading to false', async () => {
            expect(component.find('MockComponent').props().players.length).toEqual(2);
            expect(component.find('MockComponent').props().loading).toEqual(false);
            expect(component.find('MockComponent').props().error).toEqual(false);
            expect(component.find('MockComponent').props().score).toEqual(0);
        });

        describe('when setIncrement is called', () => {
            test('score should be incremented by one', () => {
                act(() => {
                    component.find('MockComponent').props().incrementScore();
                });
                component.update();
                expect(component.find('MockComponent').props().score).toEqual(1);
            });
        });
    
        describe('when resetScore is called', () => {
            test('score should be reset to 0', () => {
                expect(component.find('MockComponent').props().score).toEqual(1);
                act(() => {
                    component.find('MockComponent').props().resetScore();
                });
                component.update();
                expect(component.find('MockComponent').props().score).toEqual(0);
            });
        });
    
        describe('when resetGame is called', () => {
            test('score should be reste 0', () => {
                act(() => {
                    component.find('MockComponent').props().incrementScore();
                    component.find('MockComponent').props().resetGame();
                });
                component.update();
                expect(component.find('MockComponent').props().score).toEqual(0);
            });
        });
    });

    describe('When fetching players data is unsuccessful', () => {
        beforeAll(async () => {
            global.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('Error')));
            await act(async () => {
                component = await mount(
                    <GameState>
                        <GameContext.Consumer>
                            {context => (
                                <MockComponent {...context}/>
                            )}
                        </GameContext.Consumer>
                    </GameState>
                );
            });
            await new Promise(resolve => setTimeout(resolve));
            component.update();
        });

        test('should set players data and loading to false', async () => {
            expect(component.find('MockComponent').props().players).toEqual([]);
            expect(component.find('MockComponent').props().loading).toEqual(false);
            expect(component.find('MockComponent').props().error).toEqual(true);
            expect(component.find('MockComponent').props().score).toEqual(0);
        });
    });
});