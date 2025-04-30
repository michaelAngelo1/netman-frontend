export interface Room {
  id: string;
  name: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  computers: Computer[];
}

export interface Computer {
  id: string;
  hostname: string;
  number: number;
  ip: string;
  mac: string;
  gateway: string;
  roomId: Room;
  createdAt: string;
  updatedAt: string;
}