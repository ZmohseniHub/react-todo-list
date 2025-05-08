interface FilterButtonsProps {
  filter: "All" | "Completed" | "Active";
  setFilter: (filter: "All" | "Completed" | "Active") => void;
}

function FilterButtons({ filter, setFilter }: FilterButtonsProps) {
  const Buttons = ["All", "Active", "Completed"] as const;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
      {Buttons.map((item) => (
        <button
          key={item}
          className={`w-full py-2 sm:py-3 px-4 sm:px-8 text-slate-400 cursor-pointer border-b-2 text transition-colors duration-200 
                    ${filter === item ? "text-teal-600 border-b-2 border-teal-600 " : "text-slate-800  border-slate-50 hover:border-b-2 hover:border-slate-500 border-transparent"}
                    `}
          onClick={() => {
            setFilter(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
export default FilterButtons;
