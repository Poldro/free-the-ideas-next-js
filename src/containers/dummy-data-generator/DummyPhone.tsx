import {
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import RandExp from "randexp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../components/Input";

interface dataSubmit {
  phoneToGenerate: number;
  phoneFormat: string;
}

export const DummyPhone = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [randomNumbers, setRandomNumbers] = useState<string>(
    new RandExp(/^\+39\s\d{10}$/).gen(),
  );

  const onSubmit = (data: any) => {
    setRandomNumbers('')
    for (let i = 0; i < data['phoneToGenerate']; i++) {
      setRandomNumbers(prevValue => prevValue + substituteRandomNumbers(data["phoneFormat"]) + '\n');
    }
  };


  return (
    <div className="flex flex-col flex-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="px-4 py-5 text-center sm:px-6">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="grid grid-cols-1 md:grid-cols-2">
           
            <span>
              <Input
                type={"text"}
                label={"Format of phone to generate"}
                name={"phoneFormat"}
                defaultValue={'+39 ##########'}
                errors={errors}
                errorsType={{
                  required: true,
                }}
                register={register}
              />
              <p className="text-xs text-gray-500 mb-4">Es: (#####) ### #### or 570-###-###</p>
            </span>
            <span>
              <Input
                type={"number"}
                label={"Number of phone numbers to generate"}
                name={"phoneToGenerate"}
                defaultValue={5}
                errors={errors}
                errorsType={{
                  required: true,
                  max: 100,
                  min: 0,
                }}
                register={register}
              />
            </span>

          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Generate
          </button>
        </form>
      </div>
      <div className="relative flex-1 p-4 sm:p-6">
        <div
          className="absolute top-1 right-1 cursor-copy rounded-md border bg-white p-2 shadow-md transition hover:bg-gray-100"
          onClick={() => {
            void navigator.clipboard.writeText(randomNumbers.toString())
              .then(() => {
                toast("Copied to clipboard", {
                  icon: "✂️",
                });
              })
              .catch((error) => {
                console.error("Failed to copy to clipboard", error);
              });
          }}
        >
          <ClipboardDocumentIcon className="h-5 w-5 text-gray-500" />
        </div>

        <textarea
          placeholder=""
          className="scrollbar-hide focus-ring-0 block h-full w-full resize-none border-0 p-2 focus:outline-0 sm:text-sm"
          value={randomNumbers}
          onChange={(e) => setRandomNumbers(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

function substituteRandomNumbers(formatString: string) {
  // Define a regular expression pattern that matches # characters
  const pattern = /#/g;

  // Use the replace() method to substitute # characters with random digits
  const substitutedString = formatString.replace(pattern, () => {
    // Generate a random digit between 0 and 9
    const randomDigit = Math.floor(Math.random() * 10);
    return randomDigit.toString();
  });
  return substitutedString;
}
