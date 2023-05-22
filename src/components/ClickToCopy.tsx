import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export const CopyOnClick = ({
  children,
  copyText,
  className,
  icon,
  toastCheck
}: {
  children: React.ReactNode;
  copyText: string;
  className?: string;
  icon: boolean;
  toastCheck: boolean;
}) => {
  const handleCopy = () => {
    void navigator.clipboard
      .writeText(copyText)
      .then(() => {
        toastCheck && 
        toast("Copied to clipboard", {
          icon: "✂️",
        });
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard", error);
      });
  };

  return (
    <div
      className={`${className} group relative cursor-copy`}
      onClick={handleCopy}
    >
      {icon && (
        <div
          className={`z-50 absolute top-1 right-1 hidden rounded-md border border-gray-500 p-2 shadow-md group-hover:block`}
        >
          <ClipboardDocumentIcon className="h-5 w-5 text-gray-200" />
        </div>
      )}
      {children}
    </div>
  );
};
