import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface SLUG {
  slug?: string;
}

export const POST = async (request: NextRequest, { params }: { params: SLUG }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  //spread the current favorites
  let favourites = [...(currentUser.favoritesId || [])];
  favourites.push(slug);

  try {
    const updatedFavorites = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoritesId: favourites,
      },
    });
    return NextResponse.json(
      { message: "added to favourites", user: updatedFavorites },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: SLUG }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { slug } = params;
  let favorites = [...(currentUser.favoritesId || [])];
  favorites = favorites.filter((ids) => ids !== slug);

  try {
    const updatedFavorites = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoritesId: favorites,
      },
    });
    return NextResponse.json({ messege: "removed from favourites", updatedFavorites }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
};
