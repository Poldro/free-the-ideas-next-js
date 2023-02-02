import { type NextPage } from "next";
import { useState } from "react";
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
const CountWords: NextPage = () => {
    const [wordCount, setWordCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [sentenceCount, setSentenceCount] = useState(0);

    const [selectedWordCount, setSelectedWordCount] = useState(0);
    const [selectedCharacterCount, setSelectedCharacterCount] = useState(0);
    const [selectedSentenceCount, setSelectedSentenceCount] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWordCount(e.target.value.split(' ').filter(word => word.length > 0).length);
        setCharacterCount(e.target.value.length);
        setSentenceCount(e.target.value.split(/[.!?]+/g).length - 1);
    };

    const handleSelection = () => {
        const selection = window.getSelection() || '';
        setSelectedWordCount(selection.toString().split(/\s+/g).filter(Boolean).length);
        setSelectedCharacterCount(selection.toString().length);
        setSelectedSentenceCount(selection.toString().split(/[.!?]+/g).length - 1);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="w-full h-full max-w-3xl my-5 lg:my-8 divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                    <h1 className="text-center font-semibold text-3xl">Word Counter</h1>
                </div>
                <div className="px-4 py-4 sm:px-6 h-5/6">
                    <GrammarlyEditorPlugin clientId="client_2QNNYPesdJhwfCszntmPA6">
                        <textarea
                            onChange={handleChange}
                            onSelect={handleSelection}
                            placeholder="Write something..."
                            className="p-2 resize-none block w-full h-full sm:text-sm border-0 focus-ring-0 focus:outline-0"
                        >
                        </textarea>
                    </GrammarlyEditorPlugin>
                </div>
            </div>
            <div className="max-w-3xl w-full">
                <dl className="my-4 gap-4 grid grid-cols-3">

                    <div className="flex flex-col justify-between rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                        <dt className="text-sm font-medium text-gray-500">{selectedWordCount !== 0 && 'Selected'} Words</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{selectedWordCount === 0 ? wordCount : selectedWordCount}</dd>
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                        <dt className="text-sm font-medium text-gray-500">{selectedCharacterCount !== 0 && 'Selected'} Characters</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{selectedCharacterCount === 0 ? characterCount : selectedCharacterCount}</dd>
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                        <dt className="text-sm font-medium text-gray-500">{selectedSentenceCount !== 0 && 'Selected'} Sentences</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{selectedSentenceCount === 0 ? sentenceCount : selectedSentenceCount}</dd>
                    </div>

                </dl>
            </div>
        </div>

        /*        <LayoutCountWords>
                   <div>hello</div>
               </LayoutCountWords> */
    )
}

export default CountWords