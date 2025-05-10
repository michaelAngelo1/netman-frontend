import { useCommands } from "../context/CommandContext";

// TODO: Create modal action - triggered when Action's Control or Install is clicked
interface ModalActionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
}

export default function ModalAction({ open, action, setOpen } : ModalActionProps) {
  
  function doMagic(command: string) {
    console.log("do magic: ", command);
  }

  console.log("action: ", action);
  const { commands } = useCommands();

  if (!open) {
    return null; 
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white p-6 w-1/4 rounded-lg text-black">
        <div className="flex flex-col gap-3">
          {
            commands.filter(c => c.type === action).map((c) => (
              <div onClick={() => doMagic(c.name)} className="text-lg font-medium p-3 border-2 border-primary rounded-xl hover:bg-primary hover:text-slate-50">{c.name}</div>
            ))
          }
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <div className="btn btn-primary p-4 rounded-xl text-xl cursor-pointer" onClick={() => {}}>Do the magic!</div>
          <div className="btn btn-neutral p-4 rounded-xl text-xl cursor-pointer" onClick={() => setOpen(false)}>Close</div>
        </div>
      </div>
    </div>
  );
}
