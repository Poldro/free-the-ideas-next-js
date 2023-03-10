import { NextPage } from "next";
import Head from "next/head";
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
    <>
          <Head>
        <title>Dummy Data Generator</title>
        <meta name="description" content="A tool to generate random text, emails and phone numbers" />
      </Head>
    <Layout>
      <div className="flex flex-1 w-full flex-col items-center justify-center">
        <div className="flex flex-col flex-1 w-full max-w-3xl rounded-lg bg-white lg:my-8 ">
          <div className="space-y-4 px-4 py-2 md:p-6">
            <h1 className="text-center text-lg md:text-3xl font-semibold">
              Dummy Data Generator
            </h1>
            <Tabs tabs={currentTabs} setTabs={setCurrentTabs} />
          </div>
          <div className="flex flex-1">{renderTab()}</div>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default CountWords;
