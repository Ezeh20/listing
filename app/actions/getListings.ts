import prisma from "@/app/libs/prismadb";

export const getListing = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    const safeListing = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
};
