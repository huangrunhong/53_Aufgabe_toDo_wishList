import { useEffect, useState } from "react";

const Home = () => {
  const [textInput, setTextInput] = useState("");

  //   get saved list in lokal storage
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("wish") || "[]") || []
  );
  const [priority, setPriority] = useState("");
  //   const [check, setCheck] = useState(false);

  const addWish = () => {
    setList([
      ...list,
      {
        id: list.length + 1,
        text: textInput,
        priority: priority,
        checked: false,
      },
    ]);
  };

  //   if list getting changed, save list back to localstorage
  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(list));
  }, [list]);

  const deleteItem = (listId) => () => {
    const listAfterRemove = [...list].filter((item) => item.id !== listId);
    // console.log(id);
    setList(listAfterRemove);
  };

  return (
    <section className="flex flex-col gap-4 items-center text-center bg-slate-200 py-6 h-screen">
      <h1 className="text-3xl font-bold">My Wishlist ❤️</h1>
      <h2>Add a wish to your list</h2>
      <div className="flex gap-2">
        <input
          className="border-slate-500 border-2 rounded-md h-8 px-4"
          placeholder="Type in your wish..."
          onChange={(event) => setTextInput(event.target.value)}
        />
        <select
          className="border-slate-500 border-2 rounded-md h-8 px-4"
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button
        className="bg-green-500 py-2 px-8 rounded-full text-white"
        onClick={addWish}
      >
        Add wish
      </button>
      {/* Result */}

      {list.map((toDo) => (
        <div className="flex gap-2 items-center" key={toDo.id}>
          <input
            type="checkbox"
            checked={toDo.checked}
            onChange={() => {
              setList(
                list.map((item) => {
                  if (item.id !== toDo.id) {
                    return item;
                  }
                  return { ...item, checked: !toDo.checked };
                })
              );
            }}
          />
          <p className={toDo.priority + (toDo.checked ? " checked" : "")}>
            <span>{toDo.text}</span>
          </p>

          <button
            className="border-2 border-green-500 px-4 py-0.5 rounded-full text-green-500"
            onClick={deleteItem(toDo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
};

export default Home;
