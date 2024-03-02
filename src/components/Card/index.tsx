import React from "react";
import { Icon } from "@/components/Icon";

export interface CardProps {
  icon: string;
  text: string;
  subtext?: string;
}

export default function Card({ icon, text, subtext }: CardProps) {
  return (
    <div
      className={`flex flex-row justify-center xl:justify-start space-x-4 mb-10 last:mb-0`}
    >
      <div className="flex items-center justify-center px-5 h-16 mx-auto md:mx-0 bg-gray-200 rounded-lg">
        <Icon icon={icon} props={{ size: "21px", color: "rgb(75 85 99)" }} />
      </div>

      <div className="flex flex-col justify-center">
        <div className="font-semibold text-gray-900 text-sm md:text-sm">
          {text}
        </div>
        <div className="font-normal text-gray-500 text-sm md:text-sm">
          {subtext}
        </div>
      </div>
    </div>
  );
}
