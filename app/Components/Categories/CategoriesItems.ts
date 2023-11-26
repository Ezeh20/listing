import { TbBeachOff, TbMountain } from "react-icons/tb";
import {
    GiWindmill,
    GiIsland,
    GiBoatFishing,
    GiCastle,
    GiForestCamp,
    GiCaveEntrance,
    GiCactus,
    GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla, MdPool } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

export const categoriesItems = [
    {
        label: "Beach",
        icon: TbBeachOff,
        desc: "This home is close to the beach",
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        desc: "It's windy and cool over here",
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        desc: "Modern environment for a modern view",
    },
    {
        label: "Countryside",
        icon: TbMountain,
        desc: "This home is close to the mountains",
    },
    {
        label: "Pools",
        icon: MdPool,
        desc: "This home has a pool",
    },
    {
        label: "Island",
        icon: GiIsland,
        desc: "This home is close to an island",
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        desc: "A lake is very close by.",
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        desc: "Skiing is not a problem around here",
    },
    {
        label: "Castle",
        icon: GiCastle,
        desc: "The home is literally a castle",
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        desc: "This is a camp site",
    },
    {
        label: "Actic",
        icon: BsSnow,
        desc: "It's cold and welcoming over here",
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        desc: "An enclosed and private living space",
    },
    {
        label: "Desert",
        icon: GiCactus,
        desc: "This environment is as silent and peaceful as the desert",
    },
    {
        label: "Barns",
        icon: GiBarn,
        desc: "This property has a barn",
    },
    {
        label: "Lux",
        icon: IoDiamond,
        desc: "This is a luxirious property",
    }
];
