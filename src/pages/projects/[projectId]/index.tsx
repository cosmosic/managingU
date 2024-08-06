import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Link from "next/link";
import { MdOutlineSettings, MdFilterList } from "react-icons/md";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type Filters = {
  status: "TODO" | "DOING" | "DONE" | "ALL";
  assignee: "All" | "Me" | "Unassigned";
  sortByDeadline: "None" | "Earliest" | "Latest";
};

const Tasks = () => {
  const router = useRouter();
  const projectId = parseInt(router.query.projectId as string);

  const { data: sessionData } = useSession();
  const { data: project } = api.projects.get.useQuery(
    { id: projectId },
    { enabled: !!projectId }
  );

  const [filters, setFilters] = useState<Filters>({
    status: "ALL",
    assignee: "All",
    sortByDeadline: "None",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const tasks = useMemo(() => {
    if (!project || !sessionData) return [];
    const filteredTasks = project.tasks.filter((task) => {
      if (task.status === filters.status || filters.status === "ALL") {
        if (filters.assignee === "All") return true;
        if (
          filters.assignee === "Me" &&
          sessionData.user.id === task.assigneeId
        )
          return true;
        if (filters.assignee === "Unassigned" && !task.assigneeId) return true;
      }
      return false;
    });
    if (filters.sortByDeadline === "Earliest") {
      filteredTasks.sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline));
    } else if (filters.sortByDeadline === "Latest") {
      filteredTasks.sort((a, b) => +new Date(b.deadline) - +new Date(a.deadline));
    }
    return filteredTasks;
  }, [project, filters, sessionData]);

  const handleStatusFilterChange = (status: Filters["status"]) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handleAssigneeFilterChange = (assignee: Filters["assignee"]) => {
    setFilters((prev) => ({ ...prev, assignee }));
  };

  const handleDeadlineFilterChange = (sortByDeadline: Filters["sortByDeadline"]) => {
    setFilters((prev) => ({ ...prev, sortByDeadline }));
  };

  return (
    <>
      <Head>
        <title>Project tasks page</title>
        <meta name="description" content="Shows all tasks created within a project." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col p-5 sm:px-28 sm:py-10 bg-gray-100">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex flex-1 items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-700">{project?.title}</h1>
            <div
              onClick={() => void router.push(`/projects/${projectId}/update`)}
              className="cursor-pointer text-gray-700 hover:text-gray-900"
            >
              <MdOutlineSettings size={24} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <MdFilterList size={24} />
            </Button>
            <Link href={`/projects/${projectId}/tasks/create`}>
              <Button variant="primary">Add Task</Button>
            </Link>
          </div>
        </div>

        {isFilterOpen && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <div className="flex gap-2">
                  {["ALL", "TODO", "DOING", "DONE"].map((status) => (
                    <button
                      key={status}
                      className={`px-4 py-2 rounded-md border ${
                        filters.status === status ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                      }`}
                      onClick={() => handleStatusFilterChange(status as Filters["status"])}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Assignee</label>
                <div className="flex gap-2">
                  {["All", "Me", "Unassigned"].map((assignee) => (
                    <button
                      key={assignee}
                      className={`px-4 py-2 rounded-md border ${
                        filters.assignee === assignee ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                      }`}
                      onClick={() => handleAssigneeFilterChange(assignee as Filters["assignee"])}
                    >
                      {assignee}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-gray-700 font-medium mb-2">Sort by Deadline</label>
                <div className="flex gap-2">
                  {["None", "Earliest", "Latest"].map((sortBy) => (
                    <button
                      key={sortBy}
                      className={`px-4 py-2 rounded-md border ${
                        filters.sortByDeadline === sortBy ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                      }`}
                      onClick={() => handleDeadlineFilterChange(sortBy as Filters["sortByDeadline"])}
                    >
                      {sortBy}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {["TODO", "DOING", "DONE"].map((status) => (
            <div key={status} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">{status}</h2>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <div key={task.id} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                      <p className="text-gray-600">Assignee: {task.assignee?.username ?? "Unassigned"}</p>
                      <p className="text-gray-600">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <MdOutlineSettings
                          className="cursor-pointer text-gray-700 hover:text-gray-900"
                          size={18}
                          onClick={() => void router.push(`/projects/${projectId}/tasks/${task.id}/update`)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Tasks;
