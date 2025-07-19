import { fromStorage, inStorage, removeStorage } from "@/library/functions"
import { CartState } from "@/library/interfaces"
import { createSlice } from "@reduxjs/toolkit"
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: JSON.parse(fromStorage('merncart') || '{}')
  } as CartState,
  reducers:{
    setCart:(state,action) =>{
        state.value = action.payload
        inStorage('merncart', JSON.stringify(action.payload))
    },
    clearCart:(state) => {
        state.value = {}
        removeStorage('merncart')
    },

  }
})
export default cartSlice.reducer
 
export const {setCart,clearCart} = cartSlice.actions
