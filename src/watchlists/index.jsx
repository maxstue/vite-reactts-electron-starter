import React from "react";
import WatchlistTable from "./table";
import AddSymbol from "./add-symbol";
import { useGlobal } from "reactn";


const Watchlist = function () {

  const [ watchlist, setWatchlist ] = useGlobal("watchlist");
  const [ candles, setCandles ] = useGlobal("candles");

  //   const handleCandles = React.useCallback((data) => {
  //     console.log(data)
  //     const newCandles = candles
  //     newCandles[data.symbol] = data.candles
  //     setCandles(newCandles)
  //   }, [])

  //   React.useEffect(() => {
  //     socket.on("candles", handleCandles)

  //     return () => {
  //       socket.off("candles", handleCandles)
  //     }
  // }, [socket, handleCandles])

  React.useEffect(() => {
    const getWatchlist = async function () {
      const response = await window.Main.asyncData({
        route: "watchlists/get-symbols"
      });
      if (response.data) {
        let sortedData = response.data.sort((a, b) => {
          if (a.symbol == b.symbol) return 0;
          else return a.symbol > b.symbol ? 1 : -1;
        });
        // console.log(sortedData);
        setWatchlist(sortedData);
      }
    };
    getWatchlist();
  }, []);

  // React.useEffect( () => {
  //     //TODO: write code to subscribe to socket data feed here
  //     const getAssetDetails = async function () {
  //       if (watchlist && watchlist.length > 0) {
  //         let data = {
  //             symbols: watchlist.map(item => item.symbol)
  //         }
  //         const details = await Axios.post(import.meta.env.VITE_BACKEND + "/symbols/details", data)
  //         setSymbolsDetails(details)
  //       }
  //     }

  //     getAssetDetails()
  //   }, [watchlist])

  return (
    <>
      <div className="m-2"><AddSymbol /></div>
      <div className="mt-4"><WatchlistTable list={ watchlist } /></div>
    </>
  );
};

export default Watchlist;