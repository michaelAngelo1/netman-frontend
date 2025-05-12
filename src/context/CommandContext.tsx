import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { commandInstance } from "../api/axiosConfig";
import { socket } from "../socket";

interface Command {
  id: string;
  name: string;
  value: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface CommandContextState {
  commands: Command[];
  fetchCommands: () => Promise<void>;
  responseSocket: {
    message: string;
    body: unknown;
  } | null;
  sendData: (data:{ ips: string[], commandId: string }) => void;
}

const CommandContext = createContext<CommandContextState | undefined>(undefined);

interface CommandProviderProps {
  children: ReactNode;
}

export const CommandProvider: React.FC<CommandProviderProps> = ({ children }) => {

  const [commands, setCommands] = useState<Command[]>([]);

  async function fetchCommands() {
    try {
      console.log("start fetch commands");

      commandInstance
        .get('')
        .then((data) => {
          console.log("data room: ", data.data);
          setCommands(data.data.response);
        })
        .catch((e) => {
          console.log("error fetching commands: ", e);
        })
    } catch (e) {
      console.log("fail fetch commands", e);
    }
  }

  // Socket Submission & Connection
  const [socketConnected, setSocketConnected] = useState<boolean>();
  const [responseSocket, setResponse] = useState<{
    message: string;
    body: {
      ip: string;
      type: string;
      executionTime: string;
    };
  } | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setSocketConnected(true);
      console.log('Connected to socket');
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
      console.log('Disconnected from socket');
    });

    socket.on(
      'testingConnectionOutput',
      (data: { message: string; body: {
      ip: string;
      type: string;
      executionTime: string;
    } }) => {
        console.log('Received:', data);
        setResponse(data);
      }
    );
  }, []);

  function sendData(actionData: { ips: string[]; commandId: string | undefined; }) {
    if (socket && socketConnected) {
      try {
        console.log(socket + ' ' + socketConnected);
        socket.emit('testingConnection', JSON.stringify(actionData));
      } catch (e) {
        console.log("failed send action data: " + e);
      }
    } else {
      console.log('Socket not connected');
    }
  }

  useEffect(() => {
    fetchCommands();
  }, [])
  
  const contextValue: CommandContextState = {
    commands,
    fetchCommands,
    responseSocket,
    sendData
  }

  return (
    <CommandContext.Provider value={contextValue}>
      {children}
    </CommandContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCommands = () => {
  const context = useContext(CommandContext);
  if(context === undefined) {
    throw new Error("error useCommands");
  }
  return context;
}
