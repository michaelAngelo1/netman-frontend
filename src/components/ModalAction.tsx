import { useState } from "react";
import { useCommands } from "../context/CommandContext";
import { useRoomComputer } from "../context/ComputerContext";

// TODO: Create modal action - triggered when Action's Control or Install is clicked
interface ModalActionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
}

export default function ModalAction({
  open,
  action,
  setOpen,
}: ModalActionProps) {
  const { computersChosen } = useRoomComputer();

  const [commandId, setCommandId] = useState<string>("");

  const { commands, responsesHistory, error, startMessage, sendData } =
    useCommands();

  function doMagic() {
    try {
      const actionData = {
        ips: computersChosen,
        commandId: commandId,
      };
      sendData(actionData);
    } catch (e) {
      console.log("failed send action data: ", e);
    }
  }

  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 w-1/3 max-h-[80vh] overflow-y-auto rounded-lg text-black">
        <div className="flex flex-col gap-3">
          {
            action == "ADDROOM" ?
              <div className="flex flex-col gap-3">
                <div className="text-xl font-medium">Add Room</div>
                <input type="text" placeholder="Room name" className="input bg-slate-100 text-md w-full"/>
                <input type="number" placeholder="Room capacity" className="input bg-slate-100 text-md w-full"/>
              </div>
            :
              commands
                .filter((c) => c.type === action)
                .map((c, i) => (
                  <div
                    key={i}
                    onClick={() => setCommandId(c.id)}
                    className={`text-lg font-medium p-3 border-2 border-primary rounded-xl cursor-pointer transition-colors
                      ${
                        commandId === c.id
                          ? "bg-primary text-slate-50"
                          : "hover:bg-primary/10"
                      }`}
                  >
                    {c.name}
                  </div>
                ))
          }
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-3 mt-4">
          <div
            className="btn btn-primary p-4 rounded-xl text-xl cursor-pointer"
            onClick={doMagic}
          >
            Do the magic!
          </div>
          <div
            className="btn btn-neutral p-4 rounded-xl text-xl cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Close
          </div>
        </div>
        <div className="mt-4">
          {/* Start Message */}
          {startMessage && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
              <p>{startMessage.message}</p>
              <p className="text-xs mt-1">
                Started at: {new Date(startMessage.timestamp).toLocaleString()}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              <p className="font-semibold">Error:</p>
              <p>{error.message}</p>
              <p className="text-xs mt-1">Duration: {error.executionTime}</p>
            </div>
          )}

          {/* Command Outputs Per IP */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(responsesHistory).map(([ip, responses]) => (
              <div key={ip} className="p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">IP: {ip}</h3>
                  {responses.length > 0 && (
                    <span className="text-xs text-gray-500">
                      Latest: {responses[responses.length - 1].executionTime}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {responses.map((response, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded text-sm ${
                        response.type === "stderr"
                          ? "bg-red-50"
                          : response.type === "stdout"
                          ? "bg-green-50"
                          : "bg-blue-50"
                      }`}
                    >
                      {/* Output for stdout/stderr */}
                      {(response.type === "stdout" ||
                        response.type === "stderr") && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium capitalize">
                              {response.type}
                            </span>
                            <span className="text-xs">
                              {response.executionTime}
                            </span>
                          </div>
                          <p className="font-mono text-xs whitespace-pre-wrap">
                            {response.message}
                          </p>
                        </div>
                      )}

                      {/* Output for close event */}
                      {response.type === "close" && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">Completed</span>
                            <span className="text-xs">
                              {response.executionTime}
                            </span>
                          </div>
                          <p className="mb-1">
                            <span className="font-medium">Status: </span>
                            <span
                              className={
                                response.statusCode === 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {response.statusCode}
                            </span>
                          </p>
                          <div className="text-xs space-y-1 mt-2 pt-2 border-t border-gray-200">
                            <p>ID: {response.logCommandComputer.id}</p>
                            <p>
                              Execution Time:{" "}
                              {response.logCommandComputer.executionTime}s
                            </p>
                            <p>
                              Completed:{" "}
                              {new Date(
                                response.logCommandComputer.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Waiting State */}
          {Object.keys(responsesHistory).length === 0 &&
            !error &&
            !startMessage && (
              <div className="text-gray-500 text-center">
                Waiting for response...
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
