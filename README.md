# <u>Interactive Video Conference App</u>

Project that aims for a simple peer-to-peer room based group video chat app with interactive movement and camera.

Source of inspiration: https://www.kumospace.com

## <u>Stack</u>

- ReactJs
- Node/Express
- Simple-peer
- Socket.io

## <u>How it works</u>

The server side is using a Full Mesh Topology, meaning that a client is connected to every node in the network.

Number of connections: 
$\frac{n(n-1)}{2}$

![sample](/client/public/fullmesh.jpg)

## <u>Setup</u>

Run ```npm install && npm run``` for both '/' and '/client'