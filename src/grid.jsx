import React from "react";
import { useGlobal } from "reactn";
import { WidthProvider, Responsive } from "react-grid-layout";
import { DragHandleIcon  } from "@chakra-ui/icons";
import Watchlist from "./watchlists"
// import Ticket from "./ticket"
import Buttons from "./orders/buttons"
import Positions from "./positions"
// import Orders from "./orders"
// import Account from "./account"
import Levels from "./levels"
import Rules from "./rules"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import TimeAndSales from "./tape";

//import AnyChart from "anychart-react.js"

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class ResponsiveGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {

    return (
      <div>
        {/* <button onClick={() => this.resetLayout()}>Reset Layout</button> */}
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 8, sm: 8, xs: 4, xxs: 4 }}
          compactType={"vertical"}
          rowHeight={50}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
          isResizable = {true}
          draggableHandle=".dragHandle"
        >
          <div key="1" className="border scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300" data-grid={{ w: 4, h: 10, x: 0, y: 0, minW: 4, minH: 7, isResizable:true }}>
            <div className="flex items-center mb-2 bg-gray-700 text-gray-100">
                <span className="dragHandle cursor-move font-semibold"><DragHandleIcon /> </span>
                <span className="font-semibold pl-2">Watchlist</span>
            </div>
            <div className="p-2"> 
                <Watchlist />
            </div>
           
          </div>
          <div 
            key="2" 
            className="border scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300" 
            data-grid={{ w: 4, h: 5, x: 4, y: 0, minW: 4, minH: 5, isResizable:true }}
            >
              <div className="flex items-center mb-2 bg-gray-400">
                  <span className="dragHandle cursor-move font-semibold"><DragHandleIcon /> </span>
                  <span className="font-semibold pl-2">Positions</span>
              </div>
              <div className="p-2">
                  <Positions />
              </div>
          </div>

          <div key="3" className="border" data-grid={{ w: 4, h: 3, x: 8, y: 0, minW: 4, minH: 3, isResizable:true }}>
            <div className="flex items-center mb-2 bg-gray-400">
                <span className="dragHandle cursor-move font-semibold"><DragHandleIcon /> </span>
                <span className="font-semibold pl-2">Account Details</span>
            </div>
            <div className="p-2">
                {/* <Account /> */}
            </div>
          </div>
          <div key="4" className="border" data-grid={{ w: 4, h: 7, x: 12, y: 0, minW: 4, minH: 7, isResizable:true }}>
              <div className="flex items-center mb-2 bg-gray-400">
                  <span className="dragHandle cursor-move font-semibold"><DragHandleIcon /> </span>
                  <span className="font-semibold pl-2">Buttons</span>
              </div>
              <div className="p-2">
                  <Buttons />
                </div>
          </div>
          <div key="5"  className="border" data-grid={{ w: 4, h: 4, x: 16, y: 3, minW: 4, minH: 4, isResizable:true }}>
            <div className="flex items-center mb-2 bg-gray-400">
                <span className="dragHandle cursor-move font-semibold"><DragHandleIcon /> </span>
                <span className="font-semibold pl-2">Orders</span>
            </div>
            <div className="p-2">
                {/* <Orders /> */}
            </div>
          </div>
          <div key="6" className="border" data-grid={{ w: 4, h: 12, x: 0, y: 3, minW: 4, minH: 8, isResizable:true }}>
              <div className="flex items-center mb-2 bg-gray-400">
                  <span className="dragHandle cursor-move font-semibold"><DragHandleIcon /> </span>
                  <span className="font-semibold pl-2">Levels</span>
              </div>
              <div className="p-2 flex flex-row">
                  <div className="w-full p-2">
                      <Levels />
                  </div>
              </div>
          </div>
          <div key="7" className="border" data-grid={{ w: 4, h: 10, x: 4, y: 3, minW: 4, minH: 3, isResizable:true }}>
             <div className="flex items-center mb-2 bg-gray-400">
                  <span className="dragHandle cursor-move font-semibold"><DragHandleIcon /> </span>
                  <span className="font-semibold pl-2">Rules</span>
              </div>
              <div className="p-2">
                  <TimeAndSales />
                </div>
          </div>
          <div key="8" className="border" data-grid={{ w: 4, h: 10, x: 0, y: 4, minW: 4, minH: 3, isResizable:true }}>
             <div className="flex items-center mb-2 bg-gray-400">
                  <span className="dragHandle cursor-move font-semibold"><DragHandleIcon /> </span>
                  <span className="font-semibold pl-2">Time And Sales</span>
              </div>
              <div className="p-2">
                  <TimeAndSales />
                </div>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}