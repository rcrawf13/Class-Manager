import { create } from "zustand";


const useRowStore = create((set) => ({
    rows: [],
    insertIntoRows: (newRecordEntry)=> set((state)=> ({rows:[...state.rows,newRecordEntry]})),
    updateRows: (newRows)=>set((state) => ({ rows: newRows })),

    recordStructure: 
    {
      id:0 , 
      assignment: '', 
      type: '', 
      daysleft:null, 
      priority:'', 
      status: '' 
    },
    newRecord:{},

    date:new Date(),
    setDate: (newDate) => set({date: newDate}),

    id: 0,
    incrementId: ()=> set((state) => ({id:state.id + 1})),
    setId: (num)=> set((state) => ({id:num}))
    
    
}))


export default useRowStore
