import { useRoomComputer } from "../context/ComputerContext";
import { Computer } from "../Interface";


export default function ComputerComponent({ ...computer } : Computer) {

  const { setComputersChosen } = useRoomComputer();

  function handleAction({ ...computerProp }, checked: boolean) {
    console.log('PC on IP: ', computerProp.ip, ' is ', checked.toString());
    if (checked) {
        setComputersChosen(prevComputersChosen => [...prevComputersChosen, computerProp.ip]);
    } else {
        setComputersChosen(prevComputersChosen =>
          prevComputersChosen.filter(ip => ip !== computerProp.ip)
        );
    }
  }
  
  return (
    <div className="px-4 py-2 bg-accent rounded-xl cursor-pointer hover:opacity-90 active:opacity-80">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <div className="font-bold text-2xl">PC Student</div>
          <input onChange={(e) => { handleAction({ ...computer }, e.target.checked) }} type="checkbox" className="checkbox checkbox-xl checkbox-primary border-2 border-blue-50"/>
        </div>
        <div className="font-medium text-xl">IP: {computer.ip}</div>
        <div className="font-medium text-xl">MAC: {computer.mac}</div>
      </div>
    </div>
  )
}
