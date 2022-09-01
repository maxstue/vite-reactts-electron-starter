from ib_insync import * 
util.startLoop()
import sys 
import pandas as pd

ib = IB()
ib.connect('127.0.0.1', 4001, clientId=sys.argv[3])

def fetch_daily(symbol, timeframe):
    try: 
        contract = Stock(symbol, "SMART", "USD")
        bars = ib.reqHistoricalData(
            contract, endDateTime="", durationStr="2 D",
            barSizeSetting=timeframe, whatToShow="TRADES", useRTH=False
        )

        row = util.df(bars)
        
        row["PP"] = (row["high"] + row["low"] + row["close"])/3
        row["R1"] = (2 * row["PP"]) - row["low"]
        row["R2"] = row["PP"] + (row["high"] - row["low"])
        row["S1"] = (2 * row["PP"]) - row["high"]
        row["S2"] = row["PP"] - (row["high"] - row["low"])
        row["symbol"] = symbol

        df = row.iloc[:1]

        print(df.to_json(orient="records"))

    except Exception as e: 
        print("Problem processing symbol", symbol)
        print(format(e))

fetch_daily(sys.argv[1], sys.argv[2])
ib.disconnect()