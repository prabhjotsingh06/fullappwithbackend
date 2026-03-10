import { Item, ItemContent } from "../components/ui/item";
import TodoChangeDialogBox from "../components/TodoChangeDialogBox";
import { Spinner } from "../components/ui/spinner";
import { useQuery } from "@apollo/client/react";
import { type TodoData } from "../assets/Types";
import { getTodos } from "../api/querys";

interface todos {
  todos: TodoData[];
}
const Home = () => {
  const { loading, error, data } = useQuery(getTodos);

  if (data === undefined) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 p-6 text-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-200">
        <Spinner />
        <span className="text-lg tabular-nums">Somthig went wrong login Again</span>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 p-6 text-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-200">
        <Spinner />
        <span className="text-lg tabular-nums">Loading your data</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 p-6 text-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-200">
        <Spinner />
        <span className="text-lg tabular-nums">Somthig went wrong login Again</span>
      </div>
    );
  }

  console.log("data", data);
  const myList = (data as todos).todos;
  console.log((data as todos).todos);

  return (
    <section className="flex flex-col gap-6 h-full w-full items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <h1 className="font-bold text-2xl">Todos List</h1>
      <div className="flex w-full max-w-xl flex-col gap-6">
        {myList.map(({ id, completed, todo }: Omit<TodoData, "userId">) => (
          <Item variant={"outline"} key={`todo-${id}`}>
            <ItemContent className={completed ? "line-through" : ""}>{todo}</ItemContent>
            <TodoChangeDialogBox id={id} typeCheckbox={true} todoCompleted={completed} />
            <TodoChangeDialogBox id={id} Trigger={"Edit"} Title={"Edit Todo"} Description={"Edit your todo"} />
            <TodoChangeDialogBox
              id={id}
              Trigger={"Delete"}
              Title={"Delete Todo"}
              Description={"Are you sure you want to delete this todo?"}
              hideinput={true}
            />
          </Item>
        ))}
      </div>
      <Item variant={"outline"} className="max-w-30">
        <TodoChangeDialogBox id={"new"} Trigger={"Add New Todo"} Title={"Add New Todo"} Description={"Add new todo to your list"} />
      </Item>
    </section>
  );
};

export default Home;
