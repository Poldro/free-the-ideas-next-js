interface TabProps {
  tabs: {
    name: string;
    current: boolean;
  }[];
  setTabs: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        current: boolean;
      }[]
    >
  >;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setTabs }: TabProps) {
  const handleClick = (clickedTabIdx: number) => {
    setTabs(
      tabs.map((tab, tabIdx) => ({
        ...tab,
        current: tabIdx === clickedTabIdx,
      }))
    );
  };
  return (
    <div>
      <div className="block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              onClick={() => handleClick(tabIdx)}
              key={tab.name}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700 cursor-pointer",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-primary" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
