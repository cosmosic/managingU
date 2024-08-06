import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { FaProjectDiagram } from "react-icons/fa";

export default function Landing() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/projects");
    }
  }, [status, router]);

  return (
    <>
      <Head>
        <title>PM App</title>
        <meta name="description" content="Project management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex h-screen flex-col items-center justify-center bg-gray-100 bg-cover bg-center"
        style={{ backgroundImage: "url(/background.jpg)" }}
      >
        <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-80 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
          <div className="flex justify-center">
            <FaProjectDiagram className="text-6xl text-blue-600" />
          </div>
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            Manage Your Projects Seamlessly
          </h1>
          <h3 className="text-center text-lg font-medium text-gray-600">
            Organize, track, and collaborate with ease
          </h3>

          {status === "loading" ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button onClick={() => signIn()} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition duration-300">
              Get Started
            </Button>
          )}

          <p className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?
          </p>
          <div className="text-center">
            <Link href="/signUp" className="text-blue-600 hover:text-blue-500 underline">
              Create one now
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
