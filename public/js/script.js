const socket = io();

let map = L.map('map').setView([0, 0], 2); // Initial world view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

const markers = {};

navigator.geolocation.watchPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        console.log("My Location:", latitude, longitude);
        socket.emit("send-location", { latitude, longitude });
    },
    (err) => {
        alert("Location Error: " + err.message);
        console.error(err);
    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    }
);

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnect", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
