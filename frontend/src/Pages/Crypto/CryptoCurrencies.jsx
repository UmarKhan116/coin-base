import React, { useEffect, useState } from "react";
import { getCryptoData } from "../../api/external";
import styles from "./CryptoCurrencies.module.css";
import Loader from "../../component/Loader/Loader";

function CryptoCurrencies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    debugger;
    (async function CryptoApiCall() {
      try {
        let res;
      res = await getCryptoData();
      setData(res);
      console.log(data);
      } catch (error) {
        console.error("Error fetching crypto data:",error)
      }
      
    })();

    // setData([])
  }, []);

  
  const negativeStyle = {
    color: "#ea3943",
  };

  const positiveStyle = {
    color: "#16c784",
  };

  if(data.length === 0){
    return <Loader text="Crypto page loading"/>
      }
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.head}>
            <th>#</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id} className={styles.tableRow}>
              <td>{d.market_cap_rank}</td>
              <td>
                {" "}
                <div className={styles.logo}>
                  <img src={d.image} width={40} height={40} /> {d.name}
                </div>
              </td>
              <td className={styles.symbol}>{d.symbol}</td>
              <td>$ {d.current_price}</td>
              <td
                style={
                  d.price_change_percentage_24h < 0
                    ? negativeStyle
                    : positiveStyle
                }
              >
                {d.market_cap_change_24h}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoCurrencies;
