document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Registration form submitted!');
});

document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Appointment booked successfully!');
});




let localStream;
let remoteStream;
let peerConnection;
const config = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        // Include your TURN server here if needed
    ]
};

document.getElementById('startButton').addEventListener('click', async () => {
    console.log('Start button clicked');
    const id = prompt('Enter the ID to connect:');
    if (id) {
        console.log('Joining ID:', id);
        joinCall(id);
    }

    try {
        const constraints = { video: true, audio: true };
        localStream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log('Local stream obtained');
        document.getElementById('localVideo').srcObject = localStream;

        peerConnection = new RTCPeerConnection(config);
        peerConnection.addStream(localStream);
        peerConnection.onaddstream = (event) => {
            remoteStream = event.stream;
            document.getElementById('remoteVideo').srcObject = remoteStream;
            console.log('Remote stream received');
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        console.log('Local description set and offer created');

        // Signaling server interaction: send offer to remote peer
        sendSignal('offer', offer);
    } catch (err) {
        console.error('Error accessing media devices.', err);
    }
});

document.getElementById('endButton').addEventListener('click', () => {
    console.log('End button clicked');
    if (peerConnection) {
        peerConnection.close();
        console.log('Peer connection closed');
    }
    document.getElementById('localVideo').srcObject = null;
    document.getElementById('remoteVideo').srcObject = null;
});

function joinCall(id) {
    // Implement signaling logic to join a call with the given ID
}

function sendSignal(type, data) {
    // Implement signaling logic to send SDP and ICE candidates to the signaling server
}







function increaseTextSize() {
    document.body.style.fontSize = 'larger';
}

function decreaseTextSize() {
    document.body.style.fontSize = 'smaller';
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

// Example event listeners for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Accessibility feature activated!');
    });
});




