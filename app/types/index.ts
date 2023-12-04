import { User } from "@prisma/client";

//get the user type by replace the listed out types
export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: any;
    updatedAt: any;
    emailVerified: string | null;
}

export type ListingType= {
    category: string,
    location: any,
    guestCount: number,
    roomCount: number,
    bathroomCount: number,
    imageSrc: string,
    price: number,
    title: string,
    description: string,
}