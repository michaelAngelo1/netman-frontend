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
import { roomInstance } from "../api/axiosConfig";

interface RoomComputerContextState {
  rooms: Room[];
  computers: Computer[];
  loading: boolean;
  error: string | null;
  // room chosen by user
  roomChosen: string;
  setRoomChosen: Dispatch<SetStateAction<string>>;

  fetchRoomsAndComputers: () => Promise<void>;

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

  const [roomChosen, setRoomChosen] = useState("HDX");
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

  useEffect(() => {
    fetchRoomsAndComputers();
  }, []);

  const contextValue: RoomComputerContextState = {
    rooms,
    computers,
    loading,
    error,
    roomChosen,
    setRoomChosen,
    fetchRoomsAndComputers,
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
