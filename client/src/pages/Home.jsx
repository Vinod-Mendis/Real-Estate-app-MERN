/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(offerListings);
  SwiperCore.use(Navigation);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/fetch?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/fetch?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/fetch?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="text-black pb-10">
      {/* top */}
      <div className="p-28 mx-auto flex flex-col gap-6">
        <h1 className="text-7xl font-semibold">
          Find your next{" "}
          <span className="font-bold uppercase text-blue-500">perfect</span>{" "}
          <br /> place with ease.
        </h1>
        <div className="">
          <p className="text-lg text-gray-500">
            Real Estate is the best place to find your next
            <br /> perfect place to live
          </p>
        </div>
        <Link to={"/search"}>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold -translate-x-3 mt-5">
            Get started now
          </button>
        </Link>
      </div>
      {/* Carousel */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat `,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* Listings for offer, rent, and sale */}
      <div className="px-28">
        <div className="">
          <h1>Recent offers</h1>
          <Link to={"/search?offer=true"}>Show more</Link>
        </div>
        <div className="flex gap-5">
          {offerListings.map((listing) => (
            <ListingCard listing={listing} key={listing._id} />
          ))}
        </div>
      </div>
      <div className="px-28">
        <div className="">
          <h1>Rent rents</h1>
          <Link to={"/search?type=rent"}>Show more</Link>
        </div>
        <div className="flex gap-5">
          {rentListings.map((listing) => (
            <ListingCard listing={listing} key={listing._id} />
          ))}
        </div>
      </div>
      <div className="px-28">
        <div className="">
          <h1>Recent sales</h1>
          <Link to={"/search?type=sale"}>Show more</Link>
        </div>
        <div className="flex gap-5">
          {saleListings.map((listing) => (
            <ListingCard listing={listing} key={listing._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
