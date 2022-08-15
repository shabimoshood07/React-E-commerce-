import React from 'react'
import  {useGlobalContext} from"../context"

function Cart() {
  const {cart} = useGlobalContext()
  console.log(cart);
  return (
    <div>Cart</div>
  )
}

export default Cart