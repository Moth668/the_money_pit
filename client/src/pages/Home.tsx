import { useState } from "react";
import reactLogo from "../assets/react.svg";
// import viteLogo from '/vite.svg'
import "../App.css";
// import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Avatar, AvatarBadge } from "@chakra-ui/react-legacy";


function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a> */}
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Avatar
        src="client/src/assets/Elon_Musk.jpg">
        <AvatarBadge width="1.3em" bg="teal.500">
        </AvatarBadge>
      </Avatar>
      <h1>The Money Pit 💰</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {/* <Demo /> */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;
