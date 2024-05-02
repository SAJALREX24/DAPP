import React ,{useState,useEffect}from "react";
import {useRouter}from "next/router";

//INTERNAL IMPORT:
import{
  ChechIfWalletConnected,connectWallet,connectingWithContract,}from "../Utils/apiFeature";

  export const ChatAppContext=React.createContext();
  export const ChatAppProvider=({children})=>{
    //usestate:
    const [account,setAccount]=useState("");
    const [userName,setUserName]=useState("");
    const [friendLists,setFriendLists] = useState([]);
    const [friendMsg,setFriendMsg]=useState([]);
    const [loading,setLoading]=useState(false);
    const [userLists,setUserLists]=useState([]);
    const [error,setError]=useState("");
    //chatusser:
    const [currentUserName,setCurrentUserName]=useState("");
    const [currentUserAddress,setCurrentUserAddress]=useState("");

    const router =useRouter();
    //fetch data time of page load:
    const fetchData=async()=>{
      try{
        //getcontract
        const contract=await connectingWithContract();
        //get account:
        const connectAccount =await connectWallet();
        setAccount(connectAccount);
        //get user name:
        const userName=await contract.getUsername(connectAccount);
        setUserName(userName);
        // get my friend list:
        const friendLists=await contract.getMyFriendList();
        setFriendLists(friendLists);
        // get all app user list:
        const userList=await contract.getAllAppUser();
        setUserLists(userList);
} catch (error) {
        //setError("please install and connect your wallet");
        console.log(error);
       
      }
    };
    useEffect(()=>{
      fetchData();

    },[]);

    //read message:
    const readMessage=async(friendAddress)=>{
      try{
        const contract=await connectingWithContract();
        const read=await contract.readMessage(friendAddress);
        setFriendMsg(read);
        
      }catch (error){
        setError("currently you have no message:")
      }
    }
    //create account:
    const createAccount=async({  name,accountAddress })=>{
      try {
        //if(name || accountAddress)
        //return setError("Name And AccountAddress Cannot Be Empty");
        const contract = await connectingWithContract();
        const getCreatedUser=await contract.createAccount(name);
        setLoading(true);
        await getCreatedUser.wait();
        setLoading(false);
        window.location.reload();

      } catch(error){
        setError("error while creating your account please reaload browser")
      }

    };


    // add your friend:
    const addFriends=async({name,accountAddress})=>{
      try{
        if(name||accountAddress)return setError("please provide contract");
        const contract=await connectingWithContract();
        const addMyFriend=await contract.addFriend(accountAddress,name);
        setLoading(true)
        await addMyFriend.wait()
        setLoading(false);
        router.push("/");
        window.location.reload();



      }catch(error){
        setError("something went wrong while adding friends,tryagain")
        
      }
    };


    //send message:
    const sendMessage=async({msg,address})=>{
      try{
        //if(msg||address)return setError("please type your Message");
        const contract =await connectingWithContract();
        const addMessage=await contract.sendMessage(address,msg);
        setLoading(true);
        await addMessage.wait();
        setLoading(false);
        window.location.reload();
      }catch (error){
        setError("please reload and try again");
      }
    };

    //read info:
    const readUser=async(userAddress)=>{
      const contract =await connectingWithContract();
      const userName=await contract.getUsername(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);

    };




   
    return (
      <ChatAppContext.Provider value={{readMessage,
      createAccount,addFriends,sendMessage
      ,readUser,connectWallet,
      ChechIfWalletConnected,account,userName,
      friendLists,friendMsg,userLists,loading,error,
      currentUserName,currentUserAddress}}>
      {children}

      </ChatAppContext.Provider>
    );

  };