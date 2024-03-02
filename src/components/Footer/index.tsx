import { HouseIcon } from "../../utils/icons";
import Link from "./Link";
import style from "./style";

export default function Footer() {
  const itemsBookingSimple = [
    { title: "About", href: "#" },
    { title: "Carrers", href: "#" },
    { title: "Events", href: "#" },
    { title: "Partners", href: "#" },
    { title: "FAQ", href: "#" },
  ];
  const itemsSolutions = [
    { title: "Property Management", href: "#" },
    { title: "Channel Manager", href: "#" },
    { title: "Central Calendar", href: "#" },
    { title: "Unified Inbox", href: "#" },
    { title: "Direct Booking Website", href: "#" },
    { title: "Automation", href: "#" },
  ];
  const itemsCostumers = [
    { title: "FAQ", href: "#" },
    { title: "Terms & Conditions", href: "#" },
  ];
  return (
    <>
      <footer className="bg-white py-5 md:py-16">
        <div className="container max-w-screen-xl mx-auto ">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className={style.category}>
              <div className="flex justify-center lg:justify-start mb-5">
                <HouseIcon className="w-8 h-8" />
              </div>
              <p className="font-light text-gray-400 text-md mb-10">
                Get your dream house
              </p>
            </div>

            <div className={style.category}>
              <h4 className={style.categoryTitle}>Booking Simple</h4>
              {itemsBookingSimple.map((i) => (
                <Link key={i.title} title={i.title} href={i.href} />
              ))}
            </div>

            <div className={style.category}>
              <h4 className={style.categoryTitle}>Solutions</h4>
              {itemsSolutions.map((i) => (
                <Link key={i.title} title={i.title} href={i.href} />
              ))}
            </div>

            <div className="text-center lg:text-left">
              <h4 className={style.categoryTitle}>Costumers</h4>
              {itemsCostumers.map((i) => (
                <Link key={i.title} title={i.title} href={i.href} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
