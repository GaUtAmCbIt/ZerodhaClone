import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

const Positions = () => {

  const [allPositions , setAllPositions]  = useState([]);
  
    useEffect(() => {
      axios.get("https://zerodhaclonebygautam.onrender.com/allPositions").then((res) => {
        console.log(res.data);
        setAllPositions(res.data);
      })
    },[])
  
  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th> day Chg.</th>
          </tr>

          {allPositions.map((i, index) => {
            const curValue = i.price * i.qty;
            const isProfit = curValue - i.qty * i.avg >= 0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = i.isLoss ? "loss" : "profit";
            return (
              <tr key={index}>
                <td>{i.product}</td>
                <td>{i.name}</td>
                <td>{i.qty}</td>
                <td>{i.avg.toFixed(2)}</td>
                <td>{i.price.toFixed(2)}</td>
                
                <td className={profClass}>
                  {(curValue - i.qty * i.avg).toFixed(2)}
                </td>
                
                <td className={dayClass}>{i.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
