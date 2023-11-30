import { create } from "zustand";

interface listingProps {
    isOpen: () => void;
    onOpen: boolean;
    onClose: boolean
}


const useListingModal = create<listingProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useListingModal