import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Room, Computer } from "../Interface";
import { computerInstance, roomInstance } from "../api/axiosConfig";

interface RoomComputerContextState {
  rooms: Room[];
  computers: Computer[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  // room chosen by user
  roomChosen: string;
  setRoomChosen: Dispatch<SetStateAction<string>>;

  fetchRoomsAndComputers: () => Promise<void>;
  createRoom: (name: string, capacity: number) => Promise<void>;
  assignComputer: (hostname: string, number: number, ip: string, mac: string, roomId: string) => Promise<void>;

  computersChosen: string[];
  setComputersChosen: Dispatch<SetStateAction<string[]>>;
}

const RoomComputerContext = createContext<RoomComputerContextState | undefined>(
  undefined
);

interface RoomComputerProviderProps {
  children: ReactNode;
}

export const RoomComputerProvider: React.FC<RoomComputerProviderProps> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [roomChosen, setRoomChosen] = useState("HD3");
  const [computersChosen, setComputersChosen] = useState<string[]>([]);

  console.log("computersChosen: ", computersChosen);

  async function fetchRoomsAndComputers() {
    setLoading(true);
    setError(null);

    try {
      roomInstance
        .get("")
        .then((data) => {
          setRooms(data.data.response);
          setComputers(data.data.response);
        })
        .catch((e) => {
          console.log("error fetching room instance", e);
        });
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  }

  async function createRoom(name: string, capacity: number) {
    try {
      console.log("name: ", name, " capacity: ", capacity);
      roomInstance.post('', {
        name: name,
        capacity: capacity
      }).then((data) => {
        console.log("response create room: ", data.data.response);
        fetchRoomsAndComputers();
      }).catch((e) => {
        console.log("error creating room", e);
      })
    } catch {
      console.log("error create room");
    }
  }

  async function assignComputer(hostname: string, number: number, ip: string, mac: string, roomId: string) {
    try {
      console.log("hostname: ", hostname, " ip: ", ip);

      computerInstance.post('', {
        hostname: hostname,
        number: number,
        ip: ip,
        mac: mac,
        roomId: roomId
      }).then((data) => {
        console.log("response assign computer: ", data.data.response);
        fetchRoomsAndComputers();
      }).catch((e) => {
        console.log("error assign computer: ", e);
      })
    } catch {
      console.log("error assign computer");
    }
  }

  useEffect(() => {
    fetchRoomsAndComputers();
  }, []);

  const contextValue: RoomComputerContextState = {
    rooms,
    computers,
    loading,
    setLoading,
    error,
    roomChosen,
    setRoomChosen,
    fetchRoomsAndComputers,
    assignComputer,
    createRoom,
    computersChosen,
    setComputersChosen,
  };

  return (
    <RoomComputerContext.Provider value={contextValue}>
      {children}
    </RoomComputerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomComputer = () => {
  const context = useContext(RoomComputerContext);
  if (context === undefined) {
    throw new Error(
      "useRoomComputer must be used within a RoomComputerProvider"
    );
  }
  return context;
};
