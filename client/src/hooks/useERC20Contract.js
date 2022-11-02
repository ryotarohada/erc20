import { ethers, utils } from "ethers";
import { useState } from "react";
import contractsJson from "../contracts/MyToken.json"

export const useERC20Contract = () => {

    const [userAccount, setUserAccount] = useState("None")
    const [userBalance, setUserBalance] = useState(0)

    const contractAddress = process.env.CONTRACT_ADDRESS
    const contractAbi = contractsJson.abi
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
    );

    const transfer = async (toAddress, amount) => {
        if (!contract) return
        console.log( utils.parseEther(amount + ".0"))
        const transferResult = await contract.transfer(toAddress, utils.parseEther(amount + ".0"))
        return transferResult
    }

    const getUserBalance = async (userAccount) => {
        if (!contract) return
        const balanceOfResult = await contract.balanceOf(userAccount)
        const formatBalance = ethers.utils.formatEther(balanceOfResult)
        console.log("balance", formatBalance)
        return formatBalance
    }

    const connectWallet = async () => {
        // windowオブジェクトにethereumオブジェクトが存在するか
        const isExistEth = Boolean(window.ethereum)

        // 存在しない場合、MetaMaskにインストールを催促する
        if (!isExistEth) {
            alert("Get MetaMask!");
            return;
        }

        // ウォレットを接続
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        return accounts[0]
    }

    const onConnectWallet = async () => {
        const currentUserAccount = await connectWallet()
        const getUserBalanceResult = await getUserBalance(currentUserAccount)

        if (currentUserAccount) setUserAccount(currentUserAccount)
        if (getUserBalanceResult) setUserBalance(getUserBalanceResult)
    }

    const onGetUserBalance = async () => {
        const getUserBalanceResult = await getUserBalance(userAccount)
        if (getUserBalanceResult) setUserBalance(getUserBalanceResult)
    }

    return {
        userAccount,
        userBalance,
        onConnectWallet,
        onGetUserBalance,
        transfer
    }
}