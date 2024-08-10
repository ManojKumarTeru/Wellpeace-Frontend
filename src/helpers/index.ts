import { toast } from "react-toastify";
import { auth, database } from "../firebase";

import Avatar2 from "/src/assets/images/avatar2.png";

import Treking from "../assets/icons/travel and tracking icon.svg";
import CulturalFests from "../assets/icons/cultural.svg";
import Games from "../assets/icons/games icon.svg";
import Music from "../assets/icons/music icon.svg";
import Dancing from "../assets/icons/dancing icon.svg";
import Excercise from "../assets/icons/exercise icon.svg";
import charitableAct from "../assets/icons/charity act icon.svg";

import kodachadriImage from '../assets/images/kodachadri.png'
import coorgImage from '../assets/images/coorg.png'
import dudhSagerImage from '../assets/images/dudhsagar.png'
import savanDurgaImage from '../assets/images/savandurga.png'
import skandaGiriImage from '../assets/images/skandagiri.png'
import uttariBettaImage from '../assets/images/uttaribetta.png'
import nightCampImage from '../assets/images/night camp.png'
import lakeSideImage from '../assets/images/lakeside.png'
import gokarnaImage from '../assets/images/gokarna.png'
import Place45Image from '../assets/images/45 places.png'
import TrekkingInBangloreImage from '../assets/images/trekking in bangalore.png'
import placeToVisitImage from '../assets/images/places to visit.png'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { DataSnapshot, get, push, ref, serverTimestamp} from "firebase/database";


export const signupwithEmail = async (data: ISignupData) => {
  try {
    const usercreds = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const token = await usercreds.user.getIdToken();
    return token;
  } catch (error) {
    console.log(error);
    const errorMsg = error as { message: string };
    toast.warning(errorMsg.message, { autoClose: 1500 });
  }
};

export const signinWithEmail = async (data: ISignupData) => {
  const { email, password } = data;
  try {
    const usercreds = await signInWithEmailAndPassword(auth, email, password);
    const token = await usercreds.user.getIdToken();
    return token;
  } catch (error) {
    console.log(error);
    const errorMsg = error as { message: string };
    toast.warning(errorMsg.message, { autoClose: 1500 });
  }
};

export const getRandomItems=(products:IProduct[],itemsCount:number) => {
  const randomItems:IProduct[] = [];
  for (let i = 0; i < itemsCount; i++) {
    const random=Math.round(Math.random() * products.length);
    const product=products[random];
    const isItem=randomItems.find(item=>item._id===product._id);
    if (isItem) {
      itemsCount++;
      continue;
    }
    randomItems.push(product);
  }
  console.log(randomItems);
  return randomItems;
}

export const firebaseSignout=async()=>{
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    const errMsg=error as {message:string}
    toast.error(errMsg.message)
    return false;
  }
}


export const createChannelFunc=async(data:ICreateChannelData)=>{
  try {
    const completeData={...data,joinedAt:serverTimestamp(),admins:{'BbY0DaLE8dXZBM1DYC58ryRsrpR2':true}};
    const channelsRef=ref(database,'channels');
    const res=await push(channelsRef,completeData);
    toast.success('channel created successfully.',{autoClose:1500})
    return res.key;
  } catch (error) {
    const errMsg=error as {message:string}
    toast.error(errMsg.message,{autoClose:1500})
    console.log(error)
  }
}

export const getChannelsList=async()=>{
  try {
    const channelsRef=ref(database,'channels');
    const res=await get(channelsRef)
    const data=transformObjectToArray(res)
    return data;
  } catch (error) {
    console.log(error);
    const errMsg=error as {message:string}
    toast.error(errMsg.message,{autoClose:1500});
  }
}



export const transformObjectToArray = (snapVal:DataSnapshot) => {
  if (!snapVal.exists()) {
    return null;
  }
  const data=snapVal.val();
  if (typeof data !== 'object' || data === null) {
    return [];
  }

  return Object.keys(data).map(item=>{
    return {...data[item],_id:item}
  })
}

export const quotes=[
  "Peaceful minds create a healthy world",
  "You have a brave heart and an unstoppable spirit. Keep shining your light! ",
  "You are a work of art, and every stroke, even the rough ones, adds to your unique masterpiece."
]

export const channels:IChannel[] = [
  {_id:'ch1',admins:['user1', 'user2'],createdAt:new Date(),description:'For tracking and tourisim ',imageUrl:Treking,members:['user3'],name:'Tracking and Tourism'},
  {_id:'ch2',admins:['user1', 'user2'],createdAt:new Date(),description:'For tracking and tourisim ',imageUrl:charitableAct,members:['user3'],name:'Charitable Act'},
  {_id:'ch3',admins:['user1', 'user2'],createdAt:new Date(),description:'For tracking and tourisim ',imageUrl:CulturalFests,members:['user3'],name:'Cultural Fests'},
  {_id:'ch4',admins:['user1', 'user2'],createdAt:new Date(),description:'For tracking and tourisim ',imageUrl:Music,members:['user3'],name:'Music Concerts and Singing'},
  {_id:'ch5',admins:['user1', 'user2'],createdAt:new Date(),description:'For tracking and tourisim ',imageUrl:Dancing,members:['user3'],name:'Dancing'},
  {_id:'ch6',admins:['user1', 'user2'],createdAt:new Date(),description:'For tracking and tourisim ',imageUrl:Excercise,members:['user3'],name:'Exercise and Yoga'},
  {_id:'ch7',admins:['user1', 'user2'],createdAt:new Date(),description:'For tracking and tourisim ',imageUrl:Games,members:['user3'],name:'Games and Fun Zone'},
]
interface IEvents{
  [_id:string]:IEvent[];
}
export const events:IEvents={
  '-O3qsq6I5c_JSoBfpHEw':[
    {_id:'1',name:'kodachadri',description:'For tracking and tourisim',redirectUrl:null,imageUrl:kodachadriImage},
    {_id:'2',name:'Coorg',description:'',redirectUrl:null,imageUrl:coorgImage},
    {_id:'3',name:'Dudh Sagar',description:'',redirectUrl:null,imageUrl:dudhSagerImage},
    {_id:'4',name:'Savan Durga',description:'',redirectUrl:null,imageUrl:savanDurgaImage},
    {_id:'5',name:'Skandagiri',description:'',redirectUrl:null,imageUrl:skandaGiriImage},
    {_id:'6',name:'Uttari Betta',description:'',redirectUrl:null,imageUrl:uttariBettaImage},
    {_id:'7',name:'Night Camp',description:'',redirectUrl:null,imageUrl:nightCampImage},
    {_id:'8',name:'Lake Side',description:'',redirectUrl:null,imageUrl:lakeSideImage},
    {_id:'9',name:'Gokarna',description:'',redirectUrl:null,imageUrl:gokarnaImage},
    {_id:'10',name:'45 Place to visit',description:'',redirectUrl:null,imageUrl:Place45Image},
    {_id:'11',name:'Trekking In bangalore',description:'',redirectUrl:null,imageUrl:TrekkingInBangloreImage},
    {_id:'12',name:'Place to Visit In Banglore',description:'',redirectUrl:null,imageUrl:placeToVisitImage},
  ]
}

export const chatsList:IChat[]=[
  {
    _id: "c1",
    message:
      "Hey everyone! Did anyone else see the Kodachadri trek announcement for July 2? Seems like an epic adventure!",
    replyTo:null,
    author: {
      _id: "us1",
      imageUrl: null,
      name: "Sam",
    },
    createdAt: new Date(),
  },
  {
    _id: "c2",
    message:
      "Hey everyone! Did anyone else see the Kodachadri trek announcement for July 2? Seems like an epic adventure!",
    replyTo: null,
    author: {
      _id: "us1",
      imageUrl: Avatar2,
      name: "Ravi",
    },
    createdAt: new Date(),
  },
  {
    _id: "c3",
    message:
      "Hey everyone! Did anyone else see the Kodachadri trek announcement for July 2? Seems like an epic adventure!",
    replyTo: null,
    author: {
      _id: "us1",
      imageUrl: null,
      name: "Sam",
    },
    createdAt: new Date(),
  },
  {
    _id: "c4",
    message:
      "Hey everyone! Did anyone else see the Kodachadri trek announcement for July 2? Seems like an epic adventure!",
    replyTo: {
      _id: "c2",
      name: "Ravi",
    },
    author: {
      _id: "us1",
      imageUrl: null,
      name: "Sam",
    },
    createdAt: new Date(),
  },
  {
    _id: "c4",
    message:
      "Hey everyone! Did anyone else see the Kodachadri trek announcement for July 2? Seems like an epic adventure!",
    replyTo: {
      _id: "c2",
      name: "Ravi",
    },
    author: {
      _id: "us1",
      imageUrl: null,
      name: "Sam",
    },
    createdAt: new Date(),
  },
  {
    _id: "c4",
    message:
      "Hey everyone! Did anyone else see the Kodachadri trek announcement for July 2? Seems like an epic adventure!",
    replyTo: {
      _id: "c2",
      name: "Ravi",
    },
    author: {
      _id: "us1",
      imageUrl: null,
      name: "Sam",
    },
    createdAt: new Date(),
  },
]