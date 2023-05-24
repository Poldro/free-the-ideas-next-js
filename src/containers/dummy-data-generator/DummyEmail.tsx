import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import RandExp from "randexp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../components/Input";
import { CopyOnClick } from "../../components/ClickToCopy";
import TextAreaInput from "../../components/TextAreaInput";
import PrimaryButton from "../../components/PrimaryButton";

export const DummyEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [randomEmails, setRandomEmails] = useState<string>(
    "user-fake@example.com"
  );

  const onSubmit = async (data: any) => {
    setRandomEmails("");
    const email = await fetch(
      `https://randomuser.me/api/?inc=email&results=${data["emailToGenerate"]}`
    );
    const result = await email.json();
    setRandomEmails(
      (prevValue) =>
        prevValue +
        result.results.map((i: { email: string }) => i.email + "\n").join("")
    );
  };

  return (
    <>
      <div className="text-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type={"number"}
            label={"Number of emails to generate"}
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
          <PrimaryButton type="submit" text="Generate" />
        </form>
      </div>
      <CopyOnClick copyText={randomEmails.toString()} allClickable={false} className="top-1 right-1">
        <div className="relative">
          <TextAreaInput
            value={randomEmails}
            onChange={(e) => setRandomEmails(e.target.value)}
          />
        </div>
      </CopyOnClick>
    </>
  );
};
