import { type NextPage } from "next";
import { useState } from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import Head from "next/head";
import Layout from "../containers/layout";
import { HexColorPicker } from "react-colorful";
import convert from "color-convert";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";

const ColorConverter: NextPage = () => {
  const [color, setColor] = useState("#aabbcc");

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const rgbColor = convert.hex.rgb(color);
  const hslColor = convert.hex.hsl(color);
  const hexColor = convert.hex.rgb(color);
  const cmykColor = convert.hex.cmyk(color);

  console.log(color);
  return (
    <>
      <Head>
        <title>Color Converter</title>
        <meta name="description" content="A simple free Regex validator." />
      </Head>
      <Layout>
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="my-5 flex w-full max-w-3xl flex-1 flex-col divide-y divide-gray-200 rounded-lg bg-white shadow lg:my-8">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-center text-lg font-semibold md:text-3xl">
                Color Converter
              </h1>
            </div>
            <div className="px-4 py-5 text-center sm:px-6">
              <Input
                type={"text"}
                label={"rgb, hsl, cmyk, hex"}
                name={"phoneFormat"}
                value={color}
                errors={errors}
                errorsType={{
                  required: true,
                }}
                register={register}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="flex-1 px-4 py-4 sm:px-6">
              <div className="flex w-full justify-center">
                <HexColorPicker color={color} onChange={handleColorChange} />
              </div>

              <div>RGB: {rgbColor.toString()}</div>
              <div>HSL: {hslColor.toString()}</div>
              <div>HEX: {hexColor.toString()}</div>
              <div>CMYK: {cmykColor.toString()}</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ColorConverter;
