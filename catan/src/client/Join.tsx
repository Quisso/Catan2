import { useState } from 'react';
import { CClient } from './client';
export function ConnectInterface(){
    return 
}

export function StartInterface(){
    const [roomName, setName] = useState("")
    return (
        <form>
          <label>Enter the name of your room:
            <input
              type="text" 
              value={roomName}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
    )
}
export function IDInterface(){
  const [clientID, setID] = useState("NOT CONNECTED")
  const client = new CClient()
  return (
    <button onClick={()=>setID(()=>client.getID())}>
      ID: {clientID}
    </button>
  )
}

export default ConnectInterface

export function DiceRoll(){
  const [dice_val, roll] = useState(0)
  return (
    <button onClick={() => roll(()=>Math.floor(Math.random()*6+1))}>
      Roll: {dice_val}
    </button>

  )
}