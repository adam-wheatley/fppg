import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { act } from 'react-dom/test-utils';
import Faker from 'faker';
import theme from '../styles/theme';
import GameState from '../context/GameState';
import Game from './Game';
import times from '../utils/times';

const mockData = {
  players: []
};

times(50)(() =>
  mockData.players.push({
    first_name: Faker.name.firstName(),
    images: {
      default: {
        url: 'https://adamsimage.com'
      }
    },
    fppg: Faker.random.number()
  })
);

const mountComponent = async () => {
  let comp;
  await act(async () => {
    comp = await mount(
      <ThemeProvider theme={theme}>
        <GameState>
          <Game />
        </GameState>
      </ThemeProvider>
    );
  });

  await new Promise(resolve => setTimeout(resolve));
  comp.update();
  return comp;
};

describe('<Game />', () => {
  let component;
  describe('By default', () => {
    beforeEach(async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => mockData
        })
      );

      component = await mountComponent();
    });

    test('the users score should be rendered correctly', () => {
      expect(component.find('[data-at="current-score"]')).toHaveLength(1);
      expect(component.find('[data-at="current-score"]').text()).toContain('0');
    });

    test('should render two player cards', () => {
      expect(component.find('PlayerCard')).toHaveLength(2);

      expect(
        component
          .find('PlayerCard')
          .at(0)
          .props().selected
      ).toEqual(false);
      expect(
        component
          .find('PlayerCard')
          .at(0)
          .props().submitted
      ).toEqual(false);
      expect(
        component
          .find('PlayerCard')
          .at(0)
          .props().player
      ).toBeDefined();

      expect(
        component
          .find('PlayerCard')
          .at(1)
          .props().selected
      ).toEqual(false);
      expect(
        component
          .find('PlayerCard')
          .at(1)
          .props().submitted
      ).toEqual(false);
      expect(
        component
          .find('PlayerCard')
          .at(1)
          .props().player
      ).toBeDefined();
    });

    test('confirm button should be disabled when no card is selected', () => {
      expect(component.find('button').length).toEqual(1);
      expect(component.find('button').text()).toContain('Confirm');
      expect(component.find('button').props().disabled).toBeTruthy();
    });

    describe('when player is selected', () => {
      beforeEach(async () => {
        component
          .find('PlayerCard')
          .at(0)
          .simulate('click');
        component.update();
      });
      test('confirm button should be not disabled', () => {
        expect(component.find('button').text()).toContain('Confirm');
        expect(component.find('button').props().disabled).toBeFalsy();
      });

      test('playercard prop selected should be true', () => {
        expect(
          component
            .find('PlayerCard')
            .at(0)
            .props().selected
        ).toBeTruthy();
      });
    });

    describe('when answer is confirmed and correct', () => {
      beforeEach(() => {
        const p1points = component
          .find('PlayerCard')
          .at(0)
          .props().player.fppg;
        const p2points = component
          .find('PlayerCard')
          .at(1)
          .props().player.fppg;
        if (p1points > p2points) {
          component
            .find('PlayerCard')
            .at(0)
            .simulate('click');
        } else {
          component
            .find('PlayerCard')
            .at(1)
            .simulate('click');
        }
        component.find('button').simulate('click');
      });
      test('confirm button should be gone', () => {
        expect(component.find('button').text()).not.toContain('Confirm');
      });
      test('next button should be rendered', () => {
        expect(component.find('button').text()).toContain('Next');
      });
      test('result container should be rendered', () => {
        expect(component.find('[data-at="result"]')).toHaveLength(1);
        expect(component.find('[data-at="result"]').text()).toContain(
          'Correct'
        );
      });
    });

    describe('when answer is confirmed and incorrect', () => {
      beforeEach(() => {
        const p1points = component
          .find('PlayerCard')
          .at(0)
          .props().player.fppg;
        const p2points = component
          .find('PlayerCard')
          .at(1)
          .props().player.fppg;
        if (p1points < p2points) {
          component
            .find('PlayerCard')
            .at(0)
            .simulate('click');
        } else {
          component
            .find('PlayerCard')
            .at(1)
            .simulate('click');
        }
        component.find('button').simulate('click');
      });
      test('confirm button should be gone', () => {
        expect(component.find('button').text()).not.toContain('Confirm');
      });
      test('next button should be rendered', () => {
        expect(component.find('button').text()).toContain('Next');
      });
      test('result container should be rendered', () => {
        expect(component.find('[data-at="result"]')).toHaveLength(1);
        expect(component.find('[data-at="result"]').text()).toContain(
          'Incorrect'
        );
      });
    });

    describe('when users score reaches 10', () => {
      beforeEach(() => {
        [0, 1, 2, 3, 4, 5, 7, 8, 9, 10].map(async i => {
          const p1points = component
            .find('PlayerCard')
            .at(0)
            .props().player.fppg;
          const p2points = component
            .find('PlayerCard')
            .at(1)
            .props().player.fppg;
          if (p1points > p2points) {
            component
              .find('PlayerCard')
              .at(0)
              .simulate('click');
          } else {
            component
              .find('PlayerCard')
              .at(1)
              .simulate('click');
          }
          component.find('button').simulate('click');
          component.update();
          if (i !== 10) {
            component.find('button').simulate('click');
            component.update();
          }
          await new Promise(resolve => setTimeout(resolve, 500));
        });
      });
      test('winners message should appear', () => {
        expect(component.find('[data-at="winners-message"]')).toHaveLength(1);
      });

      test('button should say play again', () => {
        expect(component.find('button').text()).toContain('Play Again');
      });

      describe('when play again button is clicked', () => {
        test('should start a fresh game', () => {
          component.find('button').simulate('click');
          expect(component.find('[data-at="current-score"]')).toHaveLength(1);
          expect(component.find('[data-at="current-score"]').text()).toContain(
            '0'
          );
          expect(component.find('PlayerCard')).toHaveLength(2);
        });
      });
    });
  });
});
