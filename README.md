# Description
This project is shooter-fighter online browser game, based on Nest.js, React.js, WebSocket. In plans we have to do lobbies, several heroes as mag, bow, viking, thief and maybe more, if it would be necessary. Our main goal- make dynamic action, that would be fun to play with friends. In development we would try to make it reliable and good working solution

## Solutions
In backend part I decided to use Nest.js, WebSocket and JWT authorization. I use Nest.js instead of Express or something else because It has good architecture and reliable code. Maybe developing with express would be much easier and faster, but it ok. Also in online game we need to have realtime actions, so for that we use socket.io package. And JWT for authorization, because It is faster and tested in developing.

## Launching project
You need to clone project to your own device, open in and in root derectory write
```bash
$ npm install
```
or
```bash
$ yarn install
```
With database you should have .env file with needed DATABASE_URL for prisma. And also have created database. After for configuration DB write
```bash
$ npx prisma migrate dev
```
and
```bash
$ npx prisma generate
```
It would generate prisma client in ./node_modules/.prima/client and set tables from schema prisma.
For launching write 
```bash
$ npm start
```
Server would be started on your local device.