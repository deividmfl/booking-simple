import { LessIcon, PlusIcon } from "../../utils/icons";
import style from "./style";
import { clamp } from "@/utils/helpers";

export default function IncrementButton({
  max,
  min,
  text,
  icon,
  value,
  onClick,
}: {
  max: number;
  min: number;
  text: string;
  icon: React.ReactNode;
  value: number;
  onClick: Function;
}) {
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        id="decrement-button"
        className={style.decrementButton}
        onClick={() => onClick(clamp({ min, max, value: value - 1 }))}
        disabled={value === min}
      >
        <LessIcon className="w-2 h-2 text-gray-900" />
      </button>

      <div className="py-4 w-full bg-gray-100 text-gray-800 block">
        <span className="block text-center text-sm">{value}</span>
        <div className={style.iconContainer}>
          {icon}
          <span>{text}</span>
        </div>
      </div>

      <button
        type="button"
        id="increment-button"
        className={style.incrementButton}
        onClick={() => onClick(clamp({ min, max, value: value + 1 }))}
        disabled={value === max}
      >
        <PlusIcon className="w-2 h-2 text-gray-900" />
      </button>
    </div>
  );
}
