import Image from "next/image";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="">
      Is it working
      <Button className="text-3xl bg-blue-500 border-2 rounded-md border-black p-2 m-2 hover:bg-red-500" appName="Ride or Die">
        Do something
      </Button>
    </div>
  );
}
