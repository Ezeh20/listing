import { create } from "zustand";

interface listingProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void
}


const useListingModal = create<listingProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useListingModal