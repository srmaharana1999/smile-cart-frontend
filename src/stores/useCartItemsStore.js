import { isNotEmpty } from "neetocist";
import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {},
      setSelectedQuantity: (slug, qunatity) => {
        set(({ cartItems }) => {
          if (qunatity <= 0 && isNotEmpty(qunatity)) {
            return { cartItems: dissoc(slug, cartItems) };
          }

          return { cartItems: assoc(slug, String(qunatity), cartItems) };
        });
      },
      removeCartItem: slug => set(evolve({ cartItems: dissoc(slug) })),
    }),
    { name: "cart-items-store" }
  )
);

export default useCartItemsStore;
