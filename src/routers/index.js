const express = require('express');
const router = express.Router();
const passport = require('../auth/index');
const roomModel = require('../models/room.model');

router.get('/', passport.isAuthenticated, async(req, res) => {
    const rooms = await roomModel.find().lean()
    console.log(rooms)
    res.render('rooms', {
        title: 'Rooms',
        message: 'Available chat rooms',
        rooms: rooms,
        availableRooms: rooms.length > 0
    });
})


router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        message: 'Please log in to continue.'
    });
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
}), (req, res) => {
    res.redirect('/');
})


router.get('/rooms', passport.isAuthenticated, async(req, res, next) => {
	const rooms = await roomModel.find().lean()
    res.render('rooms', {
        title: 'Rooms',
        message: 'Available chat rooms',
        rooms: rooms,
        availableRooms: rooms.length > 0
    });
});

router.get('/chat/:roomId', passport.isAuthenticated, async(req, res, next) => {
    const roomId = req.params.roomId;
    const room = await roomModel.findById(roomId).lean();
    if (!room) {
        return res.status(404).send('Room not found');
    }
    res.render('chatroom', {
        room
    });
})

module.exports = router