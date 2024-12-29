import { useRouter, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useEffect } from "react";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLogged) {
      router.push("/Home");
    }
  }, [loading, isLogged, router]);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;