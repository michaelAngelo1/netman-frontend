import { useState } from "react";
import { useCommands } from "../context/CommandContext";
import { useRoomComputer } from "../context/ComputerContext";

// TODO: Create modal action - triggered when Action's Control or Install is clicked
interface ModalActionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
}

export default function ModalAction({ open, action, setOpen } : ModalActionProps) {
  
  const { computersChosen } = useRoomComputer();

  const [commandId, setCommandId] = useState<string>('');

  function doMagic() {
    console.log("do magic: ", commandId);
    console.log("computers chosen: ", computersChosen);

    try {
      const actionData = {
        "ips": computersChosen,
        "commandId": commandId
      };
      sendData(actionData);
    } catch (e) {
      console.log("failed send action data: ", e);
    }
  }

  const { commands, responseSocket, sendData } = useCommands();

  if (!open) {
    return null; 
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white p-6 w-1/4 rounded-lg text-black">
        <div className="flex flex-col gap-3">
          {
            commands.filter(c => c.type === action).map((c) => (
              <div onClick={() => setCommandId(c.name)} className="text-lg font-medium p-3 border-2 border-primary rounded-xl hover:bg-primary hover:text-slate-50">{c.name}</div>
            ))
          }
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <div className="btn btn-primary p-4 rounded-xl text-xl cursor-pointer" onClick={() => doMagic()}>Do the magic!</div>
          <div className="btn btn-neutral p-4 rounded-xl text-xl cursor-pointer" onClick={() => setOpen(false)}>Close</div>
        </div>
        { responseSocket 
          ? <div className="text-black">{responseSocket.message}</div>
          : <div className="text-black">No response socket yet</div>
        }
      </div>
    </div>
  );
}
