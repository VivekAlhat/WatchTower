import clsx from "clsx";

interface IProps {
  isUp: boolean;
}

export default function PingEffect({ isUp }: IProps) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={clsx(
          "relative h-4 w-4 rounded-full",
          isUp ? "bg-green-500" : "bg-red-500"
        )}
      ></div>
      <div
        className={clsx(
          "absolute animate-ping h-4 w-4 rounded-full opacity-75",
          isUp ? "bg-green-400" : "bg-red-400"
        )}
      ></div>
    </div>
  );
}
