import { type NextPage } from "next";
import { useState } from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import Head from "next/head";
import Layout from "../containers/layout";
import TextAreaInput from "../components/TextAreaInput";

const CountWords: NextPage = () => {
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);

  const [selectedWordCount, setSelectedWordCount] = useState(0);
  const [selectedCharacterCount, setSelectedCharacterCount] = useState(0);
  const [selectedSentenceCount, setSelectedSentenceCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setWordCount(text.split(" ").filter((word) => word.length > 0).length);
    setCharacterCount(text.length);
    setSentenceCount(text.split(/(?<=[.!?])(?=[^\n]).|\n(?![.])/g).length - 1);
  };
  
  const handleSelection = () => {
    const selection = window.getSelection()?.toString() || "";
    setSelectedWordCount(selection.split(/\s+/g).filter(Boolean).length);
    setSelectedCharacterCount(selection.length);
    setSelectedSentenceCount(selection.split(/(?<=[.!?])(?=[^\n]).|\n(?![.])/g).length - 1);
  };
  

  return (
    <>
      <Head>
        <title>Word Counter</title>
        <meta
          name="description"
          content="A simple free word counter, integrated with Grammarly to check English grammar."
        />
      </Head>
      <Layout>
        <div className="flex w-full flex-col items-center justify-start">
          <div className="flex w-full max-w-3xl flex-col divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-center text-lg font-semibold md:text-3xl">
                Word Counter
              </h1>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <GrammarlyEditorPlugin clientId="client_2QNNYPesdJhwfCszntmPA6">
                <TextAreaInput
                  placeholder="Copy paste your text to count words, characters and sentences. You can select a particular piece of text to count it."
                  onChange={handleChange}
                  onSelect={handleSelection}
                />
              </GrammarlyEditorPlugin>
            </div>
          </div>
          <div className="w-full max-w-3xl">
            <dl className="my-4 grid grid-cols-3 gap-4">
              <div className="flex flex-col justify-between rounded-lg bg-white px-4 py-5 text-center shadow sm:p-6">
                <dt className="text-sm font-medium text-gray-500">
                  {selectedWordCount !== 0 && "Selected"} Words
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {selectedWordCount === 0 ? wordCount : selectedWordCount}
                </dd>
              </div>

              <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-white px-4 py-5 text-center shadow sm:p-6">
                <dt className="text-sm font-medium text-gray-500">
                  {selectedCharacterCount !== 0 && "Selected"} Characters
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {selectedCharacterCount === 0
                    ? characterCount
                    : selectedCharacterCount}
                </dd>
              </div>

              <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-white px-4 py-5 text-center shadow sm:p-6">
                <dt className="text-sm font-medium text-gray-500">
                  {selectedSentenceCount !== 0 && "Selected"} Sentences
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {selectedSentenceCount === 0
                    ? sentenceCount
                    : selectedSentenceCount}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CountWords;
