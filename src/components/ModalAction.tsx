// TODO: Create modal action - triggered when Action's Control or Install is clicked
interface ModalActionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
}

export default function ModalAction({ open, action, setOpen } : ModalActionProps) {
  if (!open) {
    return null; // Return null if 'open' is false, preventing the modal from rendering.
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white p-6 rounded-lg text-black">
        <p>Action: {action}</p>
        <p>Opened: {open.toString()}</p>
        <div className="text-black text-xl cursor-pointer underline" onClick={() => setOpen(false)}>Close</div>
      </div>
    </div>
  );
}
