import { isNotEmpty } from "neetocist";
import { assoc, dissoc } from "ramda";
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
    }),
    { name: "cart-items-store" }
  )
);

export default useCartItemsStore;
