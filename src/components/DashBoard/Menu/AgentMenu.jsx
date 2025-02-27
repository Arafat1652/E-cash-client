import React from 'react';
import { MdVerified } from 'react-icons/md';
import MenuItem from './MenuItem';
import { GiMoneyStack } from 'react-icons/gi';
import { TbCashRegister } from 'react-icons/tb';

const AgentMenu = () => {
    return (
        <div>
              <MenuItem
          icon={TbCashRegister}
          label='Cash In'
          address='cashin'
        />
            <MenuItem
          icon={MdVerified}
          label='Agent Request'
          address='verifyRequest'
        />
            <MenuItem
          icon={GiMoneyStack}
          label='Balance Request'
          address='balanceRequest'
        />
          
        </div>
    );
};

export default AgentMenu;