const app = {
    rooms: () => {
        const socket = io('/rooms', { transports: ['websocket'] })
        socket.on('connect', () => {
            console.log('Connected to rooms namespace');

            
            const addRoomButton = document.querySelector('.room-create button');
            const roomTitleInput = document.querySelector('.room-create input[name="title"]');

            socket.on('updateRoomsList', (data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Assuming you have a function to update the room list in the UI
                    app.helpers.updateRoomList(data);
                }
            });

            addRoomButton.addEventListener('click', function() {
                const roomTitle = roomTitleInput.value.trim();
                if (roomTitle) {
                    socket.emit('createRoom', { title: roomTitle });
                    roomTitleInput.value = ''; // Clear the input after creating the room
                } else {
                    alert('Please enter a room title.');
                }
            });
        });
    },


    chats: () => {
        const socket = io('/chats', { transports: ['websocket'] })
        socket.on('connect', () => {
            console.log('Connected to chats namespace');
        })
    },

    helpers: {
        updateRoomList: (roomModel) => {
            const roomList = document.querySelector('.room-list ul')
            roomList.innerHTML += `
                <a href="/chat/${roomModel._id}">
                    <li class="room-item">${roomModel.title}</li>
                </a>
            `; 
        }
    }
}