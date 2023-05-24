import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import RandExp from "randexp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../components/Input";
import TextAreaInput from "../../components/TextAreaInput";
import { CopyOnClick } from "../../components/ClickToCopy";
import PrimaryButton from "../../components/PrimaryButton";

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
    new RandExp(/^\+39\s\d{10}$/).gen()
  );

  const onSubmit = (data: any) => {
    setRandomNumbers("");
    for (let i = 0; i < data["phoneToGenerate"]; i++) {
      setRandomNumbers(
        (prevValue) =>
          prevValue + substituteRandomNumbers(data["phoneFormat"]) + "\n"
      );
    }
  };

  return (
    <>
      {" "}
      <div className="text-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <span>
              <Input
                type={"text"}
                label={"Format for Phone Numbers"}
                name={"phoneFormat"}
                defaultValue={"+39 ##########"}
                errors={errors}
                errorsType={{
                  required: true,
                }}
                register={register}
              />
              <p className="mt-1 text-xs text-gray-500">
                Es: (#####) ### #### or 570-###-###
              </p>
            </span>
            <span className="mt-4 md:mt-0">
              <Input
                type={"number"}
                label={"Quantity of Phone Numbers"}
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
          <PrimaryButton type="submit" text="Generate" />
        </form>
      </div>
      <CopyOnClick copyText={randomNumbers.toString()} allClickable={false} className="top-1 right-1">
        <div className="relative">
          <TextAreaInput
            value={randomNumbers}
            onChange={(e) => setRandomNumbers(e.target.value)}
          />
        </div>
      </CopyOnClick>
    </>
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
