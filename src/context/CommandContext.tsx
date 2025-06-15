import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { commandInstance, backendApiUrl } from "../api/axiosConfig";
import { io, Socket } from "socket.io-client";

interface Command {
  id: string;
  name: string;
  value: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface LogCommandComputer {
  id: string;
  statusCode: string;
  computerId: string;
  commandId: string;
  createdAt: string;
  updatedAt: string;
  executionTime: number;
}

interface BaseSocketResponse {
  ip: string;
  type: "stdout" | "stderr" | "close";
  executionTime: string;
}

interface StdResponse extends BaseSocketResponse {
  type: "stdout" | "stderr";
  message: string;
}

interface CloseResponse extends BaseSocketResponse {
  type: "close";
  statusCode: number;
  logCommandComputer: LogCommandComputer;
}

interface ErrorResponse {
  message: string;
  executionTime: string;
}

interface StartResponse {
  message: string;
  timestamp: string;
}

type SocketResponse = StdResponse | CloseResponse;

// New interface to track responses by IP
interface IPResponses {
  [ip: string]: SocketResponse[];
}

interface CommandContextState {
  commands: Command[];
  fetchCommands: () => Promise<void>;
  createCommand: (commandName: string, commandValue: string, commandType: string) => Promise<void>;
  responseSocket: SocketResponse | null; // Keep for backward compatibility
  responsesHistory: IPResponses;
  error: ErrorResponse | null;
  startMessage: StartResponse | null;
  sendData: (data: { ips: string[]; commandId: string }) => void;
}

const CommandContext = createContext<CommandContextState | undefined>(
  undefined
);

interface CommandProviderProps {
  children: ReactNode;
}

export const CommandProvider: React.FC<CommandProviderProps> = ({
  children,
}) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [responseSocket, setResponse] = useState<SocketResponse | null>(null);
  const [responsesHistory, setResponsesHistory] = useState<IPResponses>({});
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [startMessage, setStartMessage] = useState<StartResponse | null>(null);

  async function fetchCommands() {
    try {
      const { data } = await commandInstance.get("");
      setCommands(data.response);
    } catch (error) {
      console.error("Failed to fetch commands:", error);
    }
  }

  async function createCommand(commandName: string, commandValue: string, commandType: string) {
    try {
      console.log("name: ", commandName, " type: ", commandType, " value: ", commandValue);
      commandInstance.post('', {
        name: commandName,
        value: commandValue,
        type: commandType,
      }).then(data => {
        console.log("response create command: ", data.data.response);
      }).catch(e => {
        console.log("error create command", e);
      })
    } catch (e) {
      console.log("failed to create command: ", e);
    }
  }

  // Socket Submission & Connection
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState<boolean>();

  useEffect(() => {
    const newSocket = io(backendApiUrl);

    newSocket.on("connect", () => {
      setSocketConnected(true);
    });

    newSocket.on("disconnect", () => {
      setSocketConnected(false);
    });

    newSocket.on("executeCommandOutput", (data: SocketResponse) => {
      setResponse(data); // Keep for backward compatibility

      // Add new response to history
      setResponsesHistory((prev) => ({
        ...prev,
        [data.ip]: [...(prev[data.ip] || []), data],
      }));
    });

    newSocket.on("executeCommandStarted", (data: StartResponse) => {
      setStartMessage(data);
    });

    newSocket.on("error", (data: ErrorResponse) => {
      setError(data);
      setResponse(null);
    });

    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  function sendData(actionData: {
    ips: string[];
    commandId: string | undefined;
  }) {
    if (socket && socketConnected) {
      try {
        // Reset states before sending new command
        setError(null);
        setStartMessage(null);
        setResponse(null);
        setResponsesHistory({}); // Clear previous responses
        socket.emit("executeCommand", JSON.stringify(actionData));
      } catch {
        alert("Please enter valid JSON");
      }
    }
  }

  useEffect(() => {
    fetchCommands();
  }, []);

  const contextValue: CommandContextState = {
    commands,
    fetchCommands,
    createCommand,
    responseSocket,
    responsesHistory,
    error,
    startMessage,
    sendData,
  };

  return (
    <CommandContext.Provider value={contextValue}>
      {children}
    </CommandContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCommands = () => {
  const context = useContext(CommandContext);
  if (context === undefined) {
    throw new Error("useCommands must be used within a CommandProvider");
  }
  return context;
};
