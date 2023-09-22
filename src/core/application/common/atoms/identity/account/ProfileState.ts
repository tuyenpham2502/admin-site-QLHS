import { Roles } from './../../../../../domain/enums/Roles';
import { atom } from "recoil";

export const ProfileState = atom ({
    key: 'Profile_State',
    default: {
        data: {},
    }
})

export const UserIdState = atom ({
    key: 'userId_State',
    default: {
        data: null,
    }
})

export const RolesState = atom ({
    key: 'roles_State',
    default: {
        data: [],
    }
})
