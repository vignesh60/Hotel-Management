import img1 from "../components/assets/No1-room/room1.png";
import img2 from "../components/assets/No1-room/room2.png";
import img3 from "../components/assets/No1-room/room3.png";
import img4 from "../components/assets/No1-room/room4.png";
import img5 from "../components/assets/No1-room/room5.png";

import r1 from "../components/assets/No2-room/room (1).png";
import r2 from "../components/assets/No2-room/room (2).png";
import r3 from "../components/assets/No2-room/room (3).png";
import r4 from "../components/assets/No2-room/room (4).png";
import r5 from "../components/assets/No2-room/room (5).png";

import room1 from "../components/assets/listofrooms/room (1).png";
import room2 from "../components/assets/listofrooms/room (2).png";
import room3 from "../components/assets/listofrooms/room (3).png";
import room4 from "../components/assets/listofrooms/room (4).png";
import room5 from "../components/assets/listofrooms/room (5).png";
import room6 from "../components/assets/listofrooms/room (6).png";
import room7 from "../components/assets/No2-room/room (1).png";

const Rooms = [
  {
    room: [img1, img2, img3, img4, img5],
  },
  {
    room: [r1, r2, r3, r4, r5],
  },
  { room: [room1,room1] },
  { room: [room3,room3] },
  { room: [room4,room4] },
  { room: [room5,room5] },
  { room: [room6,room6] },
  {
    room: [room2, room7, room1, room3, room4, room5, room6],
  },
];

export default Rooms;
