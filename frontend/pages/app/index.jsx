import {useRouter} from "next/router";
import {useEffect} from "react";
import {useRecoilValue} from "recoil";
import {userRecoil} from "../../recoil/user";

export default function AppPage() {
  const user = useRecoilValue(userRecoil);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [router, user]);

  return <div>App</div>;
}
