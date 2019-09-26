import React from 'react';
import { shallow } from 'enzyme';
import PlayerCard from './PlayerCard';

const mockSelectPlayer = jest.fn();

describe('<PlayerCard />', () => {
  let component;

  beforeAll(() => {
    component = shallow(
      <PlayerCard
        selectPlayer={mockSelectPlayer}
        player={{
          images: {
            default: {
              url: 'http://test.url'
            }
          },
          first_name: 'Adam',
          fppg: 50
        }}
      />
    );
  });

  test('should render players name', () => {
    expect(component.find('[data-at="player-name"]')).toHaveLength(1);
    expect(component.find('[data-at="player-name"]').text()).toEqual('Adam');
  });

  test('should render players image', () => {
    expect(component.find('[data-at="player-img"]')).toHaveLength(1);
    expect(component.find('[data-at="player-img"]').props().src).toEqual(
      'http://test.url'
    );
  });

  test('should not render fppg by default', () => {
    expect(component.find('[data-at="fanduel-points"]')).toHaveLength(0);
  });

  test('should call selectPlayer function prop when clicked', () => {
    component.find('[data-at="player-card"]').simulate('click');
    expect(mockSelectPlayer).toHaveBeenCalled();
  });

  describe('when submitted is true', () => {
    beforeAll(() => {
      component = shallow(
        <PlayerCard
          selectPlayer={mockSelectPlayer}
          player={{
            images: {
              default: {
                url: 'http://test.url'
              }
            },
            first_name: 'Adam',
            fppg: 50
          }}
          submitted
        />
      );
    });
    test('should render fppg', () => {
      expect(component.find('[data-at="fanduel-points"]')).toHaveLength(1);
      expect(component.find('[data-at="fanduel-points"]').text()).toContain(
        '50'
      );
    });
  });
});
