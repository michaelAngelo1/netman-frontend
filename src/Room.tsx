import Computer from "./components/Computer";

interface RoomProps {
  room: string;
}

const allComputersHD3 = [
  {
    order: 1,
    mac: '38-22-E2-1E-20-02',
    ip: '10.21.45.186',
    hostname: 'PC202010000063-COMP10',
  },
  {
    order: 2,
    mac: 'A8-B1-3B-74-13-B0',
    ip: '10.21.45.187',
    hostname: 'PC8CC2081NP3',
  },
  {
    order: 3,
    mac: 'A8-B1-3B-74-82-E2',
    ip: '10.21.45.188',
    hostname: 'PC8CC2082KZ7',
  },
  {
    order: 4,
    mac: 'A8-B1-3B-74-13-8A',
    ip: '10.21.45.189',
    hostname: 'PC8CC2081NMK',
  },
  {
    order: 5,
    mac: 'A8-B1-3B-74-13-A6',
    ip: '10.21.45.190',
    hostname: 'PC8CC2081NQT',
  },
  {
    order: 6,
    mac: 'A8-B1-3B-74-12-16',
    ip: '10.21.45.191',
    hostname: 'PC8CC2081NQ5',
  },
  {
    order: 7,
    mac: 'A8-B1-3B-74-82-CE',
    ip: '10.21.45.192',
    hostname: 'PC8CC2082KZY',
  },
  {
    order: 8,
    mac: 'A8-B1-3B-74-82-59',
    ip: '10.21.45.193',
    hostname: 'PC8CC2082KYK',
  },
  {
    order: 9,
    mac: 'A8-B1-3B-74-12-15',
    ip: '10.21.45.194',
    hostname: 'PC8CC2081NP7',
  },
  {
    order: 10,
    mac: '38-22-E2-1E-20-17',
    ip: '10.21.45.195',
    hostname: 'PC202010000062-COMP10',
  },
  {
    order: 11,
    mac: '38-22-E2-1C-EB-44',
    ip: '10.21.45.196',
    hostname: 'PC202010000057-COMP04',
  },
  {
    order: 12,
    mac: '38-22-E2-1E-1F-E6',
    ip: '10.21.45.197',
    hostname: 'PC202010000065-COMP12',
  },
  {
    order: 13,
    mac: '38-22-E2-1E-21-f7',
    ip: '10.21.45.198',
    hostname: 'PC202010000061-COMP05',
  },
  {
    order: 14,
    mac: '38-22-E2-1E-22-27',
    ip: '10.21.45.199',
    hostname: 'PC202010000066-COMP11',
  },
  {
    order: 15,
    mac: '38-22-E2-1E-1F-D2',
    ip: '10.21.45.201',
    hostname: 'PC202010000056-Comp3',
  },
  {
    order: 16,
    mac: '38-22-E2-1C-EB-18',
    ip: '10.21.45.202',
    hostname: 'PC202010000058-COMP08',
  },
  {
    order: 17,
    mac: '38-22-E2-1E-21-F8',
    ip: '10.21.45.203',
    hostname: 'PC202010000055-COMP02',
  },
  {
    order: 18,
    mac: '38-22-E2-1C-E8-E5',
    ip: '10.21.45.204',
    hostname: 'PC202010000062-COMP09',
  },
  {
    order: 19,
    mac: '38-22-E2-1E-21-3E',
    ip: '10.21.45.205',
    hostname: 'PC202010000054-COMP01',
  },
  {
    order: 20,
    mac: '38-22-E2-1E-1F-EA',
    ip: '10.21.45.206',
    hostname: 'PC202010000064-Comp00',
  },
]

const allComputersHD4 = [
  {
    order: 1,
    mac: 'E0-73-E7-D2-1D-2F',
    ip: '10.21.45.207',
    hostname: '5CD312F4SP',
  },
  {
    order: 2,
    mac: 'A8-B1-3B-70-5B-4F',
    ip: '10.21.45.208',
    hostname: 'PC8CC2081NNC',
  },
  {
    order: 3,
    mac: 'E0-73-E7-D2-1D-3F',
    ip: '10.21.45.209',
    hostname: '5CD312F4SP',
  },
  {
    order: 4,
    mac: 'A8-B1-3B-74-82-D8',
    ip: '10.21.45.210',
    hostname: 'PC8CC2082KZW',
  },
  {
    order: 5,
    mac: 'E0-73-E7-D2-1D-68',
    ip: '10.21.45.211',
    hostname: '5CD312F4SP',
  },
  {
    order: 6,
    mac: 'E0-73-E7-D2-25-66',
    ip: '10.21.45.212',
    hostname: '5CD312F4SP',
  },
  {
    order: 7,
    mac: 'A8-B1-3B-74-82-DD',
    ip: '10.21.45.213',
    hostname: 'PC8CC2082KZN',
  },
  {
    order: 8,
    mac: 'E0-73-E7-D2-1D-50',
    ip: '10.21.45.214',
    hostname: '5CD312F4SP',
  },
  {
    order: 9,
    mac: 'A8-B1-3B-74-13-43',
    ip: '10.21.45.215',
    hostname: 'PC8CC2081NPS',
  },
  {
    order: 10,
    mac: 'E0-73-E7-D2-1D-43',
    ip: '10.21.45.216',
    hostname: '5CD312F4SP',
  },
  {
    order: 11,
    mac: 'A8-B1-3B-74-13-BB',
    ip: '10.21.45.217',
    hostname: 'PC8CC2081NNP',
  },
  {
    order: 12,
    mac: 'A8-B1-3B-74-11-98',
    ip: '10.21.45.218',
    hostname: 'PC8CC2081NNP',
  },
  {
    order: 13,
    mac: 'A8-B1-3B-74-82-5A',
    ip: '10.21.45.219',
    hostname: 'PC8CC2082KYL',
  },
  {
    order: 14,
    mac: 'A8-B1-3B-74-11-91',
    ip: '10.21.45.220',
    hostname: 'PC8CC2081NQL',
  },
  // PC 15 DIE
  {
    order: 15,
    mac: 'none',
    ip: 'none',
    hostname: 'none',
  },
  {
    order: 16,
    mac: 'A8-B1-3B-74-12-1F',
    ip: '10.21.45.222',
    hostname: 'PC8CC2081NQP',
  },
  {
    order: 17,
    mac: 'A8-B1-3B-74-11-93',
    ip: '10.21.45.223',
    hostname: 'PC8CC2081NQG',
  },
  {
    order: 18,
    mac: 'A8-B1-3B-74-13-4C',
    ip: '10.21.45.224',
    hostname: 'PC8CC2081NPP',
  },
  {
    order: 19,
    mac: 'A8-B1-3B-74-82-E5',
    ip: '10.21.45.225',
    hostname: 'PC8CC2082KZ2',
  },
  {
    order: 20,
    mac: 'A8-B1-3B-74-13-A0',
    ip: '10.21.45.226',
    hostname: 'PC8CC2082KZ2',
  },
  {
    order: 21,
    mac: 'A8-B1-3B-74-13-A4',
    ip: '10.21.45.227',
    hostname: 'PC8CC2081NNP',
  },
]

export default function Room({ room } : RoomProps) {
  return (
    <div className="p-3 flex flex-col gap-6 h-screen items-center">
      <div className="text-slate-50 text-2xl font-bold">Room {room}</div>
      {
        room === "HD03" ? (
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col gap-3">
              <Computer {...allComputersHD3[0]}/>
              <Computer {...allComputersHD3[1]}/>
              <Computer {...allComputersHD3[2]}/>
              <Computer {...allComputersHD3[3]}/>
              <Computer {...allComputersHD3[4]}/>
            </div>
            <div className="flex flex-col gap-3">
              <Computer {...allComputersHD3[5]}/>
              <Computer {...allComputersHD3[6]}/>
              <Computer {...allComputersHD3[7]}/>
              <Computer {...allComputersHD3[8]}/>
              <Computer {...allComputersHD3[9]}/>
            </div>
            <div className="flex flex-col gap-3">
              <Computer {...allComputersHD3[10]}/>
              <Computer {...allComputersHD3[11]}/>
              <Computer {...allComputersHD3[12]}/>
              <Computer {...allComputersHD3[13]}/>
              <Computer {...allComputersHD3[14]}/>
            </div>
            <div className="flex flex-col gap-3">
              <Computer {...allComputersHD3[15]}/>
              <Computer {...allComputersHD3[16]}/>
              <Computer {...allComputersHD3[17]}/>
              <Computer {...allComputersHD3[18]}/>
              <Computer {...allComputersHD3[19]}/>
            </div>
          </div>
        )
        : (
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col gap-3">
              <Computer {...allComputersHD4[0]}/>
              <Computer {...allComputersHD4[1]}/>
              <Computer {...allComputersHD4[2]}/>
              <Computer {...allComputersHD4[3]}/>
              <Computer {...allComputersHD4[4]}/>
            </div>
            <div className="flex flex-col gap-3">
              <Computer {...allComputersHD4[5]}/>
              <Computer {...allComputersHD4[6]}/>
              <Computer {...allComputersHD4[7]}/>
              <Computer {...allComputersHD4[8]}/>
              <Computer {...allComputersHD4[9]}/>
            </div>
            <div className="flex flex-col gap-3">
              <Computer {...allComputersHD4[10]}/>
              <Computer {...allComputersHD4[11]}/>
              <Computer {...allComputersHD4[12]}/>
              <Computer {...allComputersHD4[13]}/>
              <Computer {...allComputersHD4[14]}/>
            </div>
            <div className="flex flex-col gap-3">
              <Computer {...allComputersHD4[15]}/>
              <Computer {...allComputersHD4[16]}/>
              <Computer {...allComputersHD4[17]}/>
              <Computer {...allComputersHD4[18]}/>
              <Computer {...allComputersHD4[19]}/>
            </div>
          </div>
        )
      }
    </div>
  )
}
