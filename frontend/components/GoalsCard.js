import { MdDelete } from "react-icons/md"; // Assuming you're using react-icons for the MdDelete icon
import { useDispatch } from "react-redux";
import { deleteGoal } from "@/state/goals/goalsSlice";

function GoalCard({ el }) {
  const dispatch = useDispatch();
  const id = el._id;
  return (
    <>
      <div className="p-5 m-5 bg-secondary rounded-md text-white/70 shadow-lg ring-1 ring-black/5">
        <div className="w-full flex justify-evenly">
          <h1 className="w-2/4 text-2xl">{el.title}</h1>
          <div className="text-4xl w-2/4 flex justify-end align-middle hover:text-white">
            <MdDelete onClick={() => dispatch(deleteGoal({ id }))} />
          </div>
        </div>
        <p>{el.definition}</p>
      </div>
    </>
  );
}

export default GoalCard;
