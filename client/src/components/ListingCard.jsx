/** @format */

import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg hover:scale-105 transition duration-300 overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`} className="flex flex-col gap-4">
        <img
          src={listing.imageUrls[0]}
          alt="listing image"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />

        <div className="p-3 flex flex-col gap-3">
          <p className="text-xl font-semibold truncate">{listing.name}</p>
          <div className=" flex items-center gap-2">
            <MdLocationOn className="text-green-700 h-5 w-5" />
            <p className="text-slate-500">{listing.address} </p>
          </div>
          <p className="truncate text-slate-400">{listing.description} </p>
          <p className="text-2xl font-semibold text-slate-800">
            {listing.offer
              ? `$${listing.discountPrice.toLocaleString("en-us")}`
              : `$${listing.regularPrice.toLocaleString("en-us")}`}{" "}
            {listing.type === "rent" && (
              <span className="text-sm text-slate-500">/month</span>
            )}
          </p>
          <div className="flex gap-2 font-semibold text-slate-500">
            <p>{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</p>
            <p>{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} baths`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
