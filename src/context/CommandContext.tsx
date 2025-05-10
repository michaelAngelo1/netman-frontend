import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { commandInstance } from "../api/axiosConfig";

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

  useEffect(() => {
    fetchCommands();
  }, [])
  
  const contextValue: CommandContextState = {
    commands,
    fetchCommands,
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
