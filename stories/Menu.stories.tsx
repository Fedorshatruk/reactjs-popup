import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PopupProps } from '../src/types';
import { Popup } from '../src';
import { Center } from './components';

import './index.css';

const Menu = () => (
  <div className="menu">
    <div className="menu-item"> item 1</div>
    <div className="menu-item"> item test </div>
    <div className="menu-item"> item 3</div>
    <Popup
      trigger={<div className="menu-item"> Sub Menu</div>}
      position={['left top', 'left top']}
      on="hover"
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: '0px', border: 'none' }}
      onClose={() => console.log('close ')}
      onOpen={() => console.log('open ')}
      arrow={false}
    >
      <div className="menu">
        <div className="menu-item"> item 1</div>
        <div className="menu-item"> item 2</div>
        <div className="menu-item"> item 3</div>
        <Popup
          trigger={<div className="menu-item"> Sub Menu</div>}
          position={['right top', 'left top']}
          on="hover"
          contentStyle={{ padding: '0px', border: 'none' }}
          arrow={false}
        >
          <div className="menu">
            <div className="menu-item"> item 1 sjdh</div>
            <div className="menu-item"> item 2</div>
            <Popup
              trigger={<div className="menu-item"> Sub Menu</div>}
              position={[
                'right top',
                'left top',
                'right bottom',
                'left bottom',
              ]}
              on="hover"
              contentStyle={{ padding: '0px', border: 'none' }}
              arrow={false}
            >
              <div className="menu">
                <div className="menu-item"> item 1</div>
                <div className="menu-item"> item 2</div>
                <Popup
                  trigger={<div className="menu-item"> Sub Menu</div>}
                  position={['right top', 'left top']}
                  on="hover"
                >
                  <div className="menu">
                    <div className="menu-item"> item 1</div>
                    <div className="menu-item"> item 2</div>
                    <div className="menu-item"> item 3</div>
                  </div>
                </Popup>
                <div className="menu-item"> item 3</div>
              </div>
            </Popup>
            <div className="menu-item"> item 3</div>
          </div>
        </Popup>
      </div>
    </Popup>
    <div className="menu-item"> item 4</div>
    <div className="menu-item"> item 5</div>
  </div>
);

export default {
  title: 'Example/Menu',
  component: Popup,
} as Meta;

const Template: Story<PopupProps> = args => (
  <Center>
    <Menu />
  </Center>
);

export const SimpleTooltip = Template.bind({});

SimpleTooltip.args = {
  trigger: <button> click Me </button>,
};
