"use client"

import { Button } from "@/components/shadcn-ui/button"
import { Card, CardContent } from "@/components/shadcn-ui/card"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import { useProductStore } from "@store/useProductStore.js"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

const CartSidebar = dynamic(() => import("@/pages/cart/CartSidebar"), {
  ssr: true,
})

function EmptyCart() {
  return (
    <motion.div className="text-center mx-auto min-h-[60vh] flex flex-col items-center justify-center">
      <ShoppingBag className="mx-auto h-20 w-20 text-gray-400 mb-4" />
      <motion.h3 className="text-xl font-semibold text-gray-900 mb-2">
        Your cart is empty
      </motion.h3>
      <motion.p className="text-gray-500 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet.
      </motion.p>
    </motion.div>
  );
}

function CartItem({ item, onRemove, onUpdateQuantity }) {

  return (
    <Card key={item._id} className="w-full shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
      <CardContent className="flex flex-col sm:flex-row items-stretch gap-4 p-4">

        <div className="relative w-full md:w-36 h-48 md:h-44 mx-auto md:mx-0 max-w-[180px]">
          <div className="absolute inset-0 bg-gradient-to-br from-peach-400 to-orange-600 rounded-lg shadow-md p-1">
            <div className="absolute inset-0 bg-white rounded-md m-0.5 flex items-center justify-center p-4">
              <Image
                src={item.images[0]?.url}
                alt={item.name}
                width={100}
                height={160}
                className="object-contain h-full"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
              {item.name}
            </h3>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-1"
                onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-base font-medium min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-1"
                disabled={item.quantity >= item.stock}
                onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row xs:flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">
                {item.quantity > 1 && (
                  <span>Rs {item.price.toLocaleString()} × {item.quantity} </span>
                )}
                <span className={item.quantity > 1 ? "hidden xs:inline" : ""}>
                  Rs {item.price.toLocaleString()} each
                </span>
              </p>
              <p className="text-lg font-bold text-black">
                Rs {(item.price * item.quantity).toLocaleString()}
              </p>

            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item._id)}
              className="text-destructive hover:text-destructive/80 self-end xs:self-center -mt-2 xs:mt-0"
            >
              <Trash2 className="w-4 h-4 sm:mr-2" />
              <span className="">Remove</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


export default function ShoppingCart() {

  const { cartItems, removeFromCart, updateQuantity } = useProductStore()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        <motion.div
          className={`${cartItems.length === 0 ? "md:col-span-4" : "md:col-span-2 space-y-4"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <EmptyCart />
            </motion.div>
          ) : (
            cartItems.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CartItem
                  item={product}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              </motion.div>
            ))
          )}
        </motion.div>

        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}

          >
            <CartSidebar />
          </motion.div>
        )}
      </div>
    </div>
  )
}