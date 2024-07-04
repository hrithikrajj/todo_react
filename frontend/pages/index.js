import GoalsCard from "@/components/GoalsCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, createGoal } from "@/state/goals/goalsSlice";
export default function Home() {
  const goals = useSelector((state) => state.goals.goals);
  const [title, setTitle] = useState("");
  const [definition, setDefinition] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("token") == null) {
      router.push("/login");
    } else {
      dispatch(getGoals());
    }
  }, [goals]);
  return (
    <>
      <div className="w-screen h-screen bg-background font-serif">
        <div className="w-full h-2/4 flex justify-center align-middle">
          <div className="w-2/6 h-full flex flex-col justify-center align-middle">
            <div className="w-full flex justify-center align-middle">
              <h1 className="text-white w-auto text-6xl m-8 gradient p-3">
                Todo app
              </h1>
            </div>
            <form className="flex  flex-col w-full h-full">
              <input
                type="text "
                id="title"
                className="h-10 p-3 bg-secondary rounded-md border-none focus:outline-none text-white "
                placeholder="Title"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <textarea
                id="description"
                rows="4"
                className="mt-3 p-3 bg-secondary rounded-md border border-background text-white focus:outline-none"
                placeholder="Description"
                required
                onChange={(e) => {
                  setDefinition(e.target.value);
                }}
              />
              <div className="w-full flex justify-center align-middle mt-8">
                <button
                  type="button"
                  className="w-2/4 text-white bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] rounded-md h-10"
                  onClick={(e) => dispatch(createGoal({ title, definition }))}
                >
                  Create a new goal
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full h-2/4 flex flex-col justify-center items-center ">
          <div className="gradient flex text-2xl">
            {goals.length == 0 ? (
              <h1>No Assigned goals</h1>
            ) : (
              <h1>Assigned goals are :</h1>
            )}
          </div>
          <div className="w-2/6 h-full flex-col overflow-x-hidden no-scrollbar">
            {goals.map((el, _) => (
              <GoalsCard el={el} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
