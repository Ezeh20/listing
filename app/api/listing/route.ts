import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const listing = await prisma.listing.create({
      data: {
        userId: currentUser?.id,
        title,
        description,
        imageSrc,
        category,
        roomCount,
        guestCount,
        bathroomCount,
        price: parseInt(price, 10),
        locationValue: location.value,
      },
    });
    return NextResponse.json(
      { message: "listing created successfully", listing: listing },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "listing was not created please try again" },
      { status: 500 }
    );
  }
};
