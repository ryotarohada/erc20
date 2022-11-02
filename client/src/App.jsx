import { BigNumber } from 'ethers'
import { useRef } from 'react'
import './App.css'
import { useERC20Contract } from './hooks/useERC20Contract'

function App() {
  const { userAccount, userBalance, onConnectWallet, onGetUserBalance, transfer } = useERC20Contract()

  const toAddressInputRef = useRef()
  const amountInputRef = useRef()

  const onTransfer = async () => {
    
    console.log(toAddressInputRef.current.value, amountInputRef.current.value)
    
    if (toAddressInputRef.current.value === undefined, amountInputRef.current.value === undefined) {
      console.log("フォームを入力してください")
      return
    }
    
    const toAddress = toAddressInputRef.current.value.toString()
    const amount = BigNumber.from(amountInputRef.current.value)

    console.log(amount.toString())

    await transfer(toAddress, amount.toString())
  }

  return (
    <div className="App">
      <header>
        <p>Wallet address : {userAccount}</p>
        <button onClick={onConnectWallet}>connect wallet</button>
      </header>
      {userAccount && (
        <div className='balance'>
          <p>Balance : {userBalance} MTK</p>
          <button onClick={onGetUserBalance}>Reload MTK balance</button>
        </div>
      )}
      <div className='transfer'>
        <p>transfer : </p>
        <input type="text" placeholder='to address' ref={toAddressInputRef} />
        <input type="text" placeholder='amount' ref={amountInputRef} />
        <button onClick={onTransfer}>Send MTK</button>
      </div>
    </div>
  )
}

export default App
