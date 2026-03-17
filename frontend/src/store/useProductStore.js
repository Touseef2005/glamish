// // store/useCartStore.js
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       cart: [],
//       addToCart: (item) => {
//         const existingItem = get().cart.find((p) => p._id === item._id);
//         if (existingItem) {
//           set({
//             cart: get().cart.map((p) =>
//               p._id === item._id
//                 ? { ...p, quantity: p.quantity + 1 }
//                 : p
//             ),
//           });
//         } else {
//           set({ cart: [...get().cart, { ...item, quantity: 1 }] });
//         }
//       },
//       removeFromCart: (_id) =>
//         set({ cart: get().cart.filter((p) => p._id !== _id) }),
//       clearCart: () => set({ cart: [] }),
//     }),
//     {
//       name: "cart-storage", // key in localStorage
//     }
//   )
// );




import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      cartItems: [],
      fetchStatus: 'idle',
      checkoutSummary: null,
      error: null,

      setCheckoutSummary: (summary) => {
        set({ checkoutSummary: summary })
      },


      addToCart: (productId, item, qty) => {
        const { cartItems, products } = get()

        if (item) {
          if (!qty) return { isAdded: false, message: "Please add quantity" };

          const isItemInCart = cartItems.some(cartItem => cartItem._id === item._id);
          if (isItemInCart) return { isAdded: false, message: "Product already in cart" };

          set({ cartItems: [...cartItems, { ...item, quantity: qty }] });
          return { isAdded: true, message: "Successfully added!" };
        }

        const product = products.find(item => item._id === productId)

        if (!product) {
          console.error(`Product with ID ${productId} not found`)
          return { isAdded: false, message: `Product with ID ${productId} not found` }
        }

        const existingItem = cartItems.find(item => item._id === productId)

        if (!existingItem) {
          set({ cartItems: [...cartItems, { ...product, quantity: 1 }] })
          return { isAdded: true, message: "Successfully added!" }
        }
        return { isAdded: false, message: "Product already in cart" }
      },

      updateQuantity: (productId, quantity) => {
        set({
          cartItems: get().cartItems.map(item =>
            item._id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        })
      },

      removeFromCart: (productId) => {
        set({
          cartItems: get().cartItems.filter(item => item._id !== productId)
        })
      },

      fetchProducts: async () => {
        if (get().products.length > 0 || get().fetchStatus === 'succeeded') {
          console.log('Products already loaded, using cached data')
          return
        }

        set({ fetchStatus: 'loading' })

        try {
          const response = await fetch('/api/product/get')
          const data = await response.json()
          set({ products: data.products, fetchStatus: 'succeeded' })
        } catch (error) {
          console.error('Failed to fetch products:', error)
          set({ error: 'Failed to fetch products', fetchStatus: 'failed' })
        }
      },

      clearCart: () => {
        set({ cartItems: [] })
      },

      clearCheckoutSummary: () => set({ checkoutSummary: null }),


    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cartItems: state.cartItems,
        checkoutSummary: state.checkoutSummary

      }),
    }
  )
)
