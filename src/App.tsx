import React, { useEffect, useState } from 'react';
import { useGlobal } from "reactn";
import AppBar from './AppBar';
import { ChakraProvider } from "@chakra-ui/react"
import ResponsiveGrid from "./grid"
import useHotkeyOrders from "./orders/hotkeys"


function App() {
  // console.log(window.ipcRenderer);

  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);

  

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };
  const sendMessageToElectron = () => {
    if (window.Main) {
      window.Main.sendMessage("Hello I'm from React World");
    } else {
      setFromMain('You are in a Browser, so no Electron functions are available');
    }
    setSent(true);
  };

  useEffect(() => {
    if (isSent && window.Main)
      window.Main.on('message', (message: string) => {
        setFromMain(message);
      });
  }, [fromMain, isSent]);

  React.useEffect(() => {
    window.Main.on("toast", data => {
      // TODO: Plug this into electron notification system. Otherwise, use Chakra UI toast
      // Focus on generating notifications only for error messages, order fulfillment and rules executions in order to minimize noise
      // console.log("toast notification", data)
    })
  }, [])

  React.useEffect(() => {
    window.Main.on("data", data => {
      if (data.type == "test") console.log("Test Data", data.content)
    })
  }, []) 

  // const [selectedAsset, setSelectedAsset] = useGlobal("selectedAsset")
  // const [ hotkeys ] = useHotkeyOrders(selectedAsset)
  // React.useEffect(() => {
  //   hotkeys()
  // }, [selectedAsset])

  useHotkeyOrders()
  

  const [ levels, setLevels ] = useGlobal("levels")
  const [ candles, setCandles ] = useGlobal("candles") 
  const [ orders, setOrders ] = useGlobal("orders")
  const [ updatePositions, setUpdatePositions ] = useGlobal("updatePositions")
  const [ rules, setRules ] = useGlobal("rules")
  React.useEffect(() => {
    window.Main.on("data", (data:any) => {
      // console.log(levels)
      if (data.type == "levels") {
        const newLevels = levels
        newLevels[data.content.symbol] = data.content.levels 
        setLevels(newLevels)
      }

      if (data.type == "candles") {
        const newCandles = candles 
        newCandles[data.content.symbol] = data.content.candles
        setCandles(newCandles)
      }

      if (data.type == "order") {
        const order = JSON.parse(data.content).order
        const updatedOrders = orders.filter(o => o.id !== order.id)
        updatedOrders.push(order)
        setOrders(updatedOrders)
        setUpdatePositions( updatePositions => ! updatePositions)
        console.log(`Filled ${order.filled_qty} shares of ${order.symbol}`, order)
      }

      if (data.type == "rule") {
        const newRules = rules.map(rule => {
          if (rule.id === data.content.id) return data.content
          return rule
        })
        setRules(newRules)
      }

      if (data.type == "rules") {
        setRules(data.content)
      }
    })

    window.Main.asyncData({route: "orders/get-many"})
    .then(response => {
      if (response.data) {
        setOrders(response.data)
      }
    })

  }, [])

  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="">
        <div className=" flex flex-col justify-center items-center h-full bg-gray-800 space-y-4">
          <h1 className="text-2xl text-gray-200">Vite + React + Typescript + Electron + Tailwind</h1>
          <button
            className="bg-yellow-400 py-2 px-4 rounded focus:outline-none shadow hover:bg-yellow-200"
            onClick={handleToggle}
          >
            Click Me
          </button>
          {isOpen && (
            <div className="flex">
              <div className="flex">
                <h1 className="text-xl text-gray-50">💝 Welcome 💝, now send a message to the Main 📩📩</h1>
                <button
                  onClick={sendMessageToElectron}
                  className=" bg-green-400 rounded px-4 py-0 focus:outline-none hover:bg-green-300"
                >
                  Send
                </button>
              </div>
              {isSent && (
                <div>
                  <h4 className=" text-green-500">Message sent!!</h4>
                </div>
              )}
              {fromMain && (
                <div>
                  {' '}
                  <h4 className=" text-yellow-200">{fromMain}</h4>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <ChakraProvider>
            <ResponsiveGrid />
        </ChakraProvider>
                
      </div>
    </div>
  );
}

export default App;
