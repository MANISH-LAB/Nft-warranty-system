import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { Contract, providers } from "ethers";

function Metawallet() {
  const dispatch = useDispatch();

  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  // state for keeping track of current connected account.
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        dispatch(userActions.setMetawalletAddress(accounts[0]));
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  if (account === null) {
    return (
      <div className="App">
        {isWalletInstalled ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Install Metamask wallet</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <p>Connected </p>
    </div>
  );
}
export default Metawallet;