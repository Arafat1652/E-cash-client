import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';

const AdminMenu = () => {
    return (
        <div>
            <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
            <MenuItem icon={FaUserCog} label='All Request' address='all-request' />
        </div>
    );
};

export default AdminMenu;