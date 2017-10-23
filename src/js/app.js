// @ts-check

import UserService from './userService.js';
import { registerSW } from './register-sw.js';

const userService = new UserService();

window.pageEvents = {
    loadUserPage: function(userId) {
        userService.loadUserPage(userId);
    },
    loadMore: function() {
        userService.loadMoreRequest();
    }
}

userService.loadMoreRequest();

registerSW();
