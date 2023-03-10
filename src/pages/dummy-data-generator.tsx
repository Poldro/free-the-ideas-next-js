import { NextPage } from "next";
import { useState } from "react";
import Tabs from "../components/Tabs";
import { DummyEmail } from "../containers/dummy-data-generator/DummyEmail";
import { DummyPhone } from "../containers/dummy-data-generator/DummyPhone";
import { DummyText } from "../containers/dummy-data-generator/DummyText";
import Layout from "../containers/layout";

const tabs = [
  { name: "Text", current: true },
  { name: "Email", current: false },
  { name: "Phone", current: false },
];

const CountWords: NextPage = () => {
  const [currentTabs, setCurrentTabs] = useState(tabs);

  const renderTab = () => {
    const activeTab = currentTabs.find((tab) => tab.current);
    if (!activeTab) {
      return <p>No tab is currently active</p>;
    }
    switch (activeTab.name) {
      case "Email":
        return <DummyEmail />;
      case "Phone":
        return <DummyPhone />;
      case "Text":
        return <DummyText />;
      default:
        return null;
    }
  };
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="h-full w-full max-w-3xl rounded-lg bg-white lg:my-8 ">
          <div className="space-y-4 px-4 py-5 sm:p-6">
            <h1 className="text-center text-3xl font-semibold">
              Dummy Data Generator
            </h1>
            <Tabs tabs={currentTabs} setTabs={setCurrentTabs} />
          </div>
          <div className="h-4/5 ">{renderTab()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default CountWords;
