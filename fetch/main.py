from ib_insync import * 
util.startLoop()
import json
import sys
import pandas as pd
import pandas_ta as ta

ib = IB()
ib.connect('127.0.0.1', 7497, clientId=sys.argv[3])

def fetch(symbol, timeframe):
    try: 
        #print ("before data fetch", datetime.now())
        contract = Stock(symbol, "ISLAND", "USD")
        bars = ib.reqHistoricalData(
            contract, endDateTime="", durationStr="6 D",
            barSizeSetting=timeframe, whatToShow="TRADES", useRTH=False
        )

        #print ("after data fetch", datetime.now())
        df = util.df(bars)

        #squeeze = ta.squeeze(df["high"], df["low"], df["close"], lazybear=True)
        #df["squeeze"] = squeeze["SQZ_20_2.0_20_1.5_LB"]
        #df["triple_volume"] = (df["volume"].diff(1) > 0) & (df["volume"].shift(1).diff(1) > 0)

        #print("before td sequential", datetime.now())
        
        df.ta.td_seq(asint=True, show_all=True, append=True)

        # df["symbol"] = symbol
        df.set_index(pd.DatetimeIndex(df["date"]), inplace=True)
        # df["vwap"] = ta.vwap(high=df["high"], low=df["low"], close=df["close"], volume=df["volume"])
        df.ta.vwap(append=True)
        df.ta.ema(length=5, append=True)
        df.ta.ema(length=9, append=True)
        df.ta.ema(length=20, append=True)
        df.ta.sma(length=50, append=True)
        df.ta.sma(length=200, append=True)
        

        # TODO: Take n number of bars that should be used for computing volume profile, store in new df
        # print(ta.vp(df["close"], df["volume"], 20, sort_close=True))
        # TODO: Find the max volume in the total_volume column, and return the corresponding mean close
        # TODO: Add the Mean Close as the Volume Profile Point of Control to the row about to be returned
        

        row = df.iloc[-9:]
        #row["symbol"] = symbol
        print(row.to_json(orient="records"))

        
        # ib.waitOnUpdate(timeout=0.1)

        #print("after td sequential", datetime.now())
        #print(df.tail(10))
        # with open("processed-symbols.csv", "a") as results: 
        #     results.write(symbol + "\n")
    
    except Exception as e: 
            print("Problem processing symbol", symbol)
            print(format(e))


#fetch("AAPL", "15 mins")
fetch(sys.argv[1], sys.argv[2])
ib.disconnect()