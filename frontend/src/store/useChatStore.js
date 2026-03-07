import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useChat = create((set) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        set({ isUserLoading: true});
        try {
            const res = await axiosInstance.get("messages/users");
            set({ users: res.data});
        } catch (error) {
            toast.error(error.message)
        }finally{
            set({ isUserLoading: false})
        }
    },

    getMessages: async(userId)=>{
        set({ isMessagesLoading: true});
        try {
            const res= await axiosInstance.get(`messsages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.message)
        }finally{
            set({ isMessagesLoading: false})
        }
    },

    setSelectedUser:(selectedUser)=>{
        set({selectedUser})
    }
}))