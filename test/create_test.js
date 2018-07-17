const mongoose = require('mongoose');
const assert = require('assert');
// const User = mongoose.model('users');
const User = require('../models/User');
describe('creating record', ()=>{

    it('saves a user', () => {
        const me = new User({
            profileId: "thisisaprofileidtoo",
            name: "Vipul P",
            firstname: "Vipul",
            lastname: "P",
            avatar: "linktosomewhere"
        });
        me.save();
    });


});