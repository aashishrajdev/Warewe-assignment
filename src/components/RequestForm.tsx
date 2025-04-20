import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Tab } from "@headlessui/react";

type RequestFormData = {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body: string;
};

type RequestFormProps = {
  onSubmit: (data: RequestFormData) => void;
  isLoading: boolean;
};

export default function RequestForm({ onSubmit, isLoading }: RequestFormProps) {
  const { register, handleSubmit, control } = useForm<RequestFormData>({
    defaultValues: {
      method: "GET",
      url: "",
      headers: [{ key: "", value: "" }],
      body: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "headers",
  });

  const [selectedTab, setSelectedTab] = useState(0);

  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex space-x-2">
        <select {...register("method")} className="px-3 py-2 border rounded-md">
          {methods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
        <input
          {...register("url")}
          placeholder="Enter URL"
          className="flex-1 px-3 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 border-b">
          <Tab
            className={({ selected }) =>
              `px-4 py-2 focus:outline-none ${
                selected
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Headers
          </Tab>
          <Tab
            className={({ selected }) =>
              `px-4 py-2 focus:outline-none ${
                selected
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Body
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <div className="space-y-2">
              {/* Headers input */}
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Key</div>
                <div className="font-medium">Value</div>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-2">
                  <input
                    {...register(`headers.${index}.key`)}
                    placeholder="Header key"
                    className="px-3 py-2 border rounded-md"
                  />
                  <div className="flex space-x-2">
                    <input
                      {...register(`headers.${index}.value`)}
                      placeholder="Header value"
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-3 py-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ key: "", value: "" })}
                className="mt-2 px-3 py-2 text-blue-500 hover:text-blue-700"
              >
                + Add Header
              </button>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <textarea
              {...register("body")}
              placeholder="Request body (JSON)"
              rows={10}
              className="w-full px-3 py-2 border rounded-md font-mono"
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </form>
  );
}
