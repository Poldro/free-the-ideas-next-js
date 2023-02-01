import { type NextPage } from "next";
import { useState } from "react";
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
const CountWords: NextPage = () => {
    const [inputWords, setInputWords] = useState("")
    const [wordCount, setWordCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [specialCharacterCount, setSpecialCharacterCount] = useState(0);

    const specialCharacterRegex = /[^\w\s]/g;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputWords(e.target.value),
            setWordCount(e.target.value.split(' ').filter(word => word.length > 0).length);
        setCharacterCount(e.target.value.length);

        setSpecialCharacterCount(
            (e.target.value.match(specialCharacterRegex) || []).length
        );
    };
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="w-full h-full max-w-3xl my-5 lg:my-8 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                    <h1 className="text-center font-semibold text-3xl">Word Counter</h1>
                </div>
                <div className="px-4 py-4 sm:px-6 h-full">
                    <GrammarlyEditorPlugin clientId="client_2QNNYPesdJhwfCszntmPA6">
                        <textarea
                            onChange={handleChange}
                            placeholder="Write something..."
                            className="p-2 resize-none block w-full h-full sm:text-sm border-0 focus-ring-0 focus:outline-0"
                        >
                        </textarea>
                    </GrammarlyEditorPlugin>
                </div>
            </div>
            <div>
                <dl className="my-4 gap-4 grid grid-cols-3 w-full">

                    <div className="flex flex-col justify-between rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                        <dt className="text-sm font-medium text-gray-500">Words</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{wordCount}</dd>
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                        <dt className="text-sm font-medium text-gray-500">Characters</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{characterCount}</dd>
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 text-center">
                        <dt className="text-sm font-medium text-gray-500">Special Characters</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{specialCharacterCount}</dd>
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