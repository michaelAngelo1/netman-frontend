// TODO: Create modal action - triggered when Action's Control or Install is clicked
interface ModalActionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
}

export default function ModalAction({ open, action, setOpen } : ModalActionProps) {
  if (!open) {
    return null; 
  }

  function doMagic() {
    console.log("do magic");
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white p-6 w-1/4 rounded-lg text-black">
        {
          action == "control" ?
            <div className="flex flex-col gap-3">
              <div className="text-2xl font-bold text-center">Choose action to control</div>
              <div className="flex flex-col gap-3">
                <div className="text-lg font-medium p-3 border-2 border-accent rounded-xl hover:bg-accent hover:text-slate-50">Turn on PC</div>
                <div className="text-lg font-medium p-3 border-2 border-accent rounded-xl hover:bg-accent hover:text-slate-50">Shut down PC</div>
                <div className="text-lg font-medium p-3 border-2 border-accent rounded-xl hover:bg-accent hover:text-slate-50">Start Chrome</div>
                <div className="text-lg font-medium p-3 border-2 border-accent rounded-xl hover:bg-accent hover:text-slate-50">Open File Explorer</div>
              </div>
            </div>
          :
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-bold text-center">Choose software to install</div>
            <div className="flex flex-col gap-3">
              <div className="text-lg font-medium p-3 border-2 border-primary rounded-xl hover:bg-accent hover:text-slate-50">Install Git</div>
              <div className="text-lg font-medium p-3 border-2 border-primary rounded-xl hover:bg-accent hover:text-slate-50">Install Visual Studio Code</div>
              <div className="text-lg font-medium p-3 border-2 border-primary rounded-xl hover:bg-accent hover:text-slate-50">Install Flutter</div>
              <div className="text-lg font-medium p-3 border-2 border-primary rounded-xl hover:bg-accent hover:text-slate-50">Install Android Studio</div>
            </div>
          </div>
        }
        <div className="flex justify-center gap-3 mt-4">
          <div className="btn btn-primary p-4 rounded-xl text-xl cursor-pointer" onClick={() => doMagic()}>Do the magic!</div>
          <div className="btn btn-neutral p-4 rounded-xl text-xl cursor-pointer" onClick={() => setOpen(false)}>Close</div>
        </div>
      </div>
    </div>
  );
}
