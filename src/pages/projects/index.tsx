// /src/pages/projects/index.tsx
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Projects() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data: projects } = api.projects.getUserAllProjects.useQuery();
  const updateUsername = api.users.update.useMutation();

  const [username, setUsername] = useState<string>(sessionData?.user?.username ?? "");

  useEffect(() => {
    if (sessionData) {
      setUsername(sessionData.user?.username ?? "");
    }
  }, [sessionData]);

  const handleUsernameChange = async () => {
    const toastId = toast("Updating username", { isLoading: true });
    const modal = document.getElementById("username_modal") as HTMLDialogElement; // Typecast here
    if (modal) modal.close();
    await updateUsername.mutateAsync({ username }).catch(() => {
      toast.update(toastId, {
        render: "Error occurred",
        isLoading: false,
        type: "error",
        autoClose: 5000,
      });
    });

    toast.update(toastId, {
      render: "Username updated successfully",
      isLoading: false,
      type: "success",
      autoClose: 5000,
    });
  };

  return (
    <>
      <Head>
        <title>Your Projects</title>
        <meta
          name="description"
          content="Manage all your projects efficiently in one place."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-1 flex-col bg-gradient-to-r from-blue-50 to-blue-100 p-10">
        <dialog id="username_modal" className="modal">
          <div className="modal-box bg-white rounded-lg shadow-lg p-5">
            <h3 className="mb-3 text-lg font-bold text-gray-700">
              Set Username
            </h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-5 w-full rounded-md border bg-gray-50 p-2"
              placeholder="Enter your new username"
            />
            <Button variant="primary" onClick={handleUsernameChange}>
              Update
            </Button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Welcome Back, {username}!
          </h1>
          <div className="flex justify-center items-center gap-2">
            <div
              onClick={() => (document.getElementById("username_modal") as HTMLDialogElement).showModal()} // Typecast here as well
              className="cursor-pointer text-blue-600"
            >
              <MdEdit size={25} />
            </div>
            <Button
              variant="primary"
              onClick={() => void router.push("/projects/create")}
            >
              Create a New Project
            </Button>
          </div>
        </div>

        <h3 className="mb-8 text-center text-xl font-semibold text-gray-600 md:text-left">
          Your Projects
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No projects created yet.</p>
              <Button
                variant="secondary"
                onClick={() => void router.push("/projects/create")}
              >
                Start a Project
              </Button>
            </div>
          ) : (
            projects?.map((project, i) => (
              <div key={i} className="p-2">
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                />
              </div>
            ))
          )}

        </div>
      </main>
    </>
  );
}
