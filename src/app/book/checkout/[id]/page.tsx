"use client";
import React, { type FormEvent, useState, type ReactElement } from "react";
import style from "./style";
import { useAppStore } from "@/lib/store";
import { calcPriceCheckout } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowBackIcon, BankIcon, CreditCardIcon } from "@/utils/icons";

export default function CheckoutPage(): ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    user,
    toggleCheckout,
    showCheckout,
    checkout,
    createReservation,
    removeFromCheckout,
    updateBookings,
  } = useAppStore();
  const fee = 1.99;

  const handleCreateReservation = () => {
    setIsLoading(true);
    try {
      const data = {
        ...checkout,
        price: calcPriceCheckout({
          startDate: checkout.startDate,
          endDate: checkout.endDate,
          averageDailyRate: checkout.price,
          fee: fee,
        }),
        paymentMethod: user.paymentMethod,
        renter: {
          id: user.id,
        },
      };
      createReservation(data, () => {
        updateBookings({
          id: checkout.id,
          startDate: checkout.startDate,
          endDate: checkout.endDate,
          placeId: checkout.place.id,
        });
        removeFromCheckout();
      });
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/book/my-bookings");
      toggleCheckout(false);
      setIsLoading(false);
    }
  };

  if (!showCheckout) return <>Loading...</>;

  return (
    <section className="bg-gray py-5 rounded-lg md:rounded-none">
      <div className="flex items-center">
        <Link href={"/reservation"} className="mr-3">
          <ArrowBackIcon className="w-6 h-6" />
        </Link>
        <h1 className="font-semibold text-gray-900 text-3xl">
          Request to book
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row justify-between md:py-14 rounded-lg">
          <form
            className="xl:relative md:px-6 px-3 py-3 rounded-lg border"
            onSubmit={handleCreateReservation}
          >
            <div className="py-3">
              <h3 className="font-semibold text-gray-900 text-2xl">
                Your trip
              </h3>
            </div>
            <div className="py-3">
              <input
                type="text"
                value={user.name}
                placeholder="Full Name"
                className={style.Input}
                disabled
              />
            </div>
            <div className="py-3">
              <input
                type="text"
                value={user.email}
                placeholder="Email"
                className={style.Input}
                disabled
              />
            </div>
            <div className="py-3">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <BankIcon className="w-6 h-6" />
                    <span className="font-medium text-gray-600">{`${user.paymentMethod.expirationMonth}/${user.paymentMethod.expirationYear}`}</span>
                  </div>
                  <div className="mt-4">
                    <div className="font-semibold text-gray-900 text-xl">
                      {user.paymentMethod.number}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-600">
                        {user.paymentMethod.holderName}
                      </div>
                      <CreditCardIcon className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-gray-100 py-4">
                  <div className="font-medium text-gray-900 px-6">
                    Card Verification
                  </div>
                  <input type="number" className={style.CardVerification} />
                </div>
              </div>
            </div>

            <div className="py-3">
              <button className={style.ButtonSubmit} disabled={isLoading}>
                {isLoading ? "Loading..." : "Booking"}
              </button>
            </div>
          </form>

          <div className="text-left my-10 md:mt-0 h-1/2 md:w-1/2 border rounded-lg">
            <div className="bg-white md:px-6 px-3 py-3 rounded-lg">
              <h3 className="font-semibold text-gray-900 text-2xl mb-5">
                Your trip
              </h3>
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={checkout.place.img}
                    width={96}
                    height={96}
                    alt="Product Image"
                    className="mr-4"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {checkout.place.title}
                    </h2>
                    <p className="text-gray-900">
                      {checkout.place.roomTypeTitle}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center">
                <span className="font-bold">Subtotal:</span>
                <span className="font-bold">
                  $
                  {calcPriceCheckout({
                    startDate: checkout.startDate,
                    endDate: checkout.endDate,
                    averageDailyRate: checkout.price,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span>Service fee</span>
                <span>$1.99</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center">
                <span className="font-bold">Total:</span>
                <span className="font-bold">
                  $
                  {calcPriceCheckout({
                    startDate: checkout.startDate,
                    endDate: checkout.endDate,
                    averageDailyRate: checkout.price,
                    fee: fee,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
