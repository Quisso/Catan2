import { useState } from 'react';
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

export default ConnectInterface