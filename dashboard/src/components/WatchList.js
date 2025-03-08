import React from "react";
import { useState  , useContext} from "react";
import { Tooltip, Grow } from "@mui/material";
import { watchlist } from "../data/data";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GeneralContext from "./GeneralContext";
import { DoughnutGraphs } from "./DoughnutGraphs";



const WatchList = () => {

  const data = {
    labels: watchlist.map((i) => i["name"]),
    datasets: [
      {
        label: 'Price of stocks',
        data: watchlist.map((i) => i["price"]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((i, index) => {
          return <WatchListItem i={i} index={index} />;
        })}
      </ul>
      <DoughnutGraphs  data = {data} />
    </div>
  )
};

export default WatchList;

const WatchListItem = ({ i, index }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);
  const handleMouseEnter = (event) => {
    setShowWatchListActions(true);
  };
  const handleMouseLeave = (event) => {
    setShowWatchListActions(false);
  };

  

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      index={index}
    >
      <div className="item">
        <p className={i.isDown ? "down" : "up"}>{i.name}</p>
        <div className="itemInfo">
          <span className="percent">{i.percent}</span>
          {i.isDown ? (
            <KeyboardArrowDownIcon className="down" />
          ) : (
            <KeyboardArrowUpIcon className="up" />
          )}
          <span>{i.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListAction uid={i.name} />}
    </li>
  );
};

const WatchListAction = ({ uid }) => {

  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };


  return (
    <span className="actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow} onClick={handleBuyClick}>
        <button className="buy" >Buy</button>
      </Tooltip>
      <Tooltip
        title="Sell (S)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className="sell">Sell</button>
      </Tooltip>
      <Tooltip
        title=" Analytics(A)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className="action">
          <BarChartIcon className="icon"></BarChartIcon>
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <MoreHorizIcon className="icon"></MoreHorizIcon>
        </button>
      </Tooltip>
    </span>
  );
};
