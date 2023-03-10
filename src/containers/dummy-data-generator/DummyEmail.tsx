import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import RandExp from "randexp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../components/Input";

export const DummyEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [randomEmails, setRandomEmails] = useState<string>(
    'user-fake@example.com'
  );

  const onSubmit = async (data: any) => {
    setRandomEmails('')
    const email = await fetch(`https://randomuser.me/api/?inc=email&results=${data["emailToGenerate"]}`)
    const result = await email.json()
    setRandomEmails(prevValue => prevValue + result.results.map((i: { email: string; }) => i.email + '\n').join(''))
  };


  return (
    <div className="h-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 text-center sm:px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type={"number"}
            label={"Numbers of emails to generate"}
            name={"emailToGenerate"}
            defaultValue={5}
            errors={errors}
            errorsType={{
              required: true,
              max: 100,
              min: 0,
            }}
            register={register}
          />
         
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Generate
          </button>
        </form>
      </div>
      <div className="relative h-5/6 p-4 sm:p-6">
        <div
          className="absolute top-1 right-1 cursor-copy rounded-md border bg-white p-2 shadow-md transition hover:bg-gray-100"
          onClick={() => {
            navigator.clipboard.writeText(randomEmails.toString());
            toast("Copied to clipboard", {
              icon: "✂️",
            });
          }}
        >
          <ClipboardDocumentIcon className="h-5 w-5 text-gray-500" />
        </div>

        <textarea
          placeholder=""
          className="focus-ring-0 block h-full w-full resize-none border-0 p-2 focus:outline-0 sm:text-sm"
          value={randomEmails}
          onChange={(e) => setRandomEmails(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};
