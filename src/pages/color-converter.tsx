import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../containers/layout";
import { HexAlphaColorPicker, RgbaColorPicker } from "react-colorful";
import convert from "color-convert";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { Title } from "../components/Title";
import { NextPage } from "next";
import { CopyOnClick } from "../components/ClickToCopy";
import { toast } from "react-toastify";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const ColorConverter: NextPage = () => {
  const [colorHex, setColorHex] = useState("#aabbcc");
  const [colorRgba, setColorRgba] = useState({ r: 170, g: 187, b: 204, a: 1 });
  const [inputColor, setInputColor] = useState("#aabbcc");
  const [colorFormat, setColorFormat] = useState("hex");

  const {
    register,
    formState: { errors },
  } = useForm();

  const hexStats = [
    { name: "HEX", stat: colorHex },
    { name: "RGBA", stat: `rgb(${convert.hex.rgb(colorHex).toString()})` },
    { name: "HSL", stat: `hsl(${convert.hex.hsl(colorHex).toString()})` },
    { name: "CMYK", stat: `cmyk(${convert.hex.cmyk(colorHex).toString()})` },
  ];

  const rgbaStats = [
    {
      name: "HEX",
      stat: `#${convert.rgb.hex(colorRgba.r, colorRgba.g, colorRgba.b)}`,
    },
    {
      name: "RGBA",
      stat: `rgba(${colorRgba.r}, ${colorRgba.g}, ${colorRgba.b}, ${colorRgba.a})`,
    },
    {
      name: "HSL",
      stat: `hsl(${convert.rgb
        .hsl(colorRgba.r, colorRgba.g, colorRgba.b)
        .toString()})`,
    },
    {
      name: "CMYK",
      stat: `cmyk(${convert.rgb
        .cmyk(colorRgba.r, colorRgba.g, colorRgba.b)
        .toString()})`,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputColor(inputValue); // directly connected to the input

    if (inputValue.startsWith("#") || /^[0-9A-Fa-f]{6}$/i.test(inputValue)) {
      setColorHex(inputValue.startsWith("#") ? inputValue : `#${inputValue}`);
      setColorFormat("hex");
    } else if (inputValue.toLowerCase().startsWith("rgb")) {
      const rgbaValues = inputValue
        .replace(/rgba?\(/i, "")
        .replace(/\)/, "")
        .split(",")
        .map(Number);

      if (rgbaValues.length === 4) {
        const [r, g, b, a] = rgbaValues;
        setColorRgba({ r, g, b, a });
        setColorFormat("rgba");
      } else if (rgbaValues.length === 3) {
        const [r, g, b] = rgbaValues;
        setColorRgba({ r, g, b, a: colorRgba.a });
        setColorFormat("rgba");
      }
    } else {
      setColorFormat("invalid");
    }
  };

  const handleHexChange = (color) => {
    setColorHex(color);
    setInputColor(color);
  };

  const handleRgbaChange = (color) => {
    setColorRgba(color);
    const rgbString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    setInputColor(rgbString);
  };

  return (
    <>
      <Head>
        <title>Color Converter</title>
        <meta name="description" content="A simple color converter." />
      </Head>
      <Layout>
        <div className="flex w-full flex-col items-center justify-start space-y-4 lg:space-y-6">
          <Title title="Color Converter" />

          <div className="w-full max-w-3xl rounded-xl bg-white shadow ">
            <div
              style={{
                backgroundColor:
                  colorFormat === "rgba"
                    ? `rgba(${colorRgba.r},${colorRgba.g},${colorRgba.b},${colorRgba.a})`
                    : colorHex,
              }}
              className={`flex flex-col rounded-xl px-4 lg:px-6 py-8`}
            >
              <div className="space-y-4 lg:space-y-6">
                <div className="relative flex justify-center">
                  <div className="">
                    <Input
                      type={"text"}
                      name={"colorFormat"}
                      value={inputColor}
                      errors={errors}
                      errorsType={{ required: true }}
                      register={register}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    className="absolute right-0 top-0 mr-4 cursor-copy rounded-md border border-gray-500 p-2 shadow-md hover:border-gray-200" // Added ml-2 for margin left
                    onClick={() => {
                      void navigator.clipboard
                        .writeText(inputColor.toString())
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
                    <ClipboardDocumentIcon className="h-5 w-5 text-gray-200" />
                  </div>
                </div>

                <div className="flex w-full justify-center">
                  <ColorPicker
                    colorFormat={colorFormat}
                    colorHex={colorHex}
                    handleHexChange={handleHexChange}
                    colorRgba={colorRgba}
                    handleRgbaChange={handleRgbaChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {colorFormat === "rgba" ? (
            <Stats stats={rgbaStats} />
          ) : (
            <Stats stats={hexStats} />
          )}
        </div>
      </Layout>
    </>
  );
};

export default ColorConverter;

const ColorPicker = ({
  colorFormat,
  colorHex,
  handleHexChange,
  colorRgba,
  handleRgbaChange,
}) => {
  if (colorFormat === "rgba") {
    return <RgbaColorPicker color={colorRgba} onChange={handleRgbaChange} />;
  } else {
    return <HexAlphaColorPicker color={colorHex} onChange={handleHexChange} />;
  }
};

type StatsProps = {
  stats: { name: string; stat: string }[];
};

const Stats = ({ stats }: StatsProps) => {
  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        {stats &&
          stats.map((stat) => (
            <CopyOnClick
              copyText={stat.stat}
              key={stat.name}
              icon={true}
              toastCheck={true}
            >
              <div className="group relative h-full rounded-lg bg-white/10 px-2 py-2 shadow-md transition hover:bg-white/20 lg:px-4 lg:py-4">
                <p className="text-sm font-medium leading-6 text-gray-400">
                  {stat.name}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-md font-semibold tracking-tight text-white">
                    {stat.stat}
                  </span>
                </p>
              </div>
            </CopyOnClick>
          ))}
      </div>
    </div>
  );
};
