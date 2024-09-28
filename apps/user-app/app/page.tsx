
import { Button } from "@repo/ui/button";
import {auth} from "../auth"

export default async function Home() {
  const seesion = await auth()
  return (
    <div className="">
      {JSON.stringify(seesion)}
      <Button className="text-3xl bg-blue-500 border-2 rounded-md border-black p-2 m-2 hover:bg-red-500" appName="Ride or Die">
        Do something
      </Button>
    </div>
  );
}
