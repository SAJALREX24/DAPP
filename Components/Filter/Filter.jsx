import React,{useState,useContext} from "react";
import Image from "next/image";
import Style from "./Filter.module.css";
import images from "../../assets";

import { ChatAppContext } from '../../Context/ChatAppContext';
import {Model} from "../index";


const Filter = () => {
  const {account,addFriends} =useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);


  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
          <Image src={images.search} alr="image" width={20} height={20}/>
          <input type="text" placeholder="search.." />

          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button onClick={()=> setAddFriend(true)}>
            <Image src={images.clear} alt="clear" width={20} height={20}/>
          </button>
        </div>
      </div>
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model openBox={setAddFriend}
            title="welcome to "
            head="CHAT BUDDY"
            info="A cryptocurrency, crypto-currency, or crypto is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it."
            smallinfo="Kindly Select Your Friend Name & Address..."
            image={images.hero}
            functionName={addFriends}

          />
          
        </div>
      )}
    </div>
  )
};

export default Filter;
