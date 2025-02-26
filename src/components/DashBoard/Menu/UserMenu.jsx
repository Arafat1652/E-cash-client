import React from 'react';
import MenuItem from './MenuItem';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';

const UserMenu = () => {
    return (
        <div>
            <MenuItem
          icon={FaMoneyBillTrendUp}
          label='Send Money'
          address='sendmoney'
        />
        <MenuItem
          icon={FaHandHoldingUsd}
          label='Cash Out'
          address='cashout'
        />
        </div>
    );
};

export default UserMenu;