/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { listFields } from "../../../data";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<any>>;
  selectedFields: string[];
  setSelectedFields: Dispatch<SetStateAction<any>>;
};

export default function FieldsFilter({
  open,
  setOpen,
  selectedFields,
  setSelectedFields,
}: Props) {
  const onSelectField = (e) => {
    console.log(e.target.name);
    if (e.target.checked) {
      const newField = listFields.find(
        (selectedField) => selectedField?.value === e.target.name
      );
      console.log({ newField, selectedFields });
      setSelectedFields([...selectedFields, newField]);
    } else {
      setSelectedFields(
        selectedFields.filter((field) => field?.value !== e.target.name)
      );
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 divide-y divide-gray-200">
                      {/* Replace with your content */}
                      {listFields.map((field) => (
                        <div className="relative flex items-start py-2">
                          <div className="flex h-5 items-center">
                            <input
                              id={field?.value}
                              checked={
                                selectedFields &&
                                selectedFields.some(
                                  (selectedFieldItem) =>
                                    selectedFieldItem?.value === field?.value
                                )
                              }
                              aria-describedby="comments-description"
                              name={field?.value}
                              onChange={onSelectField}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor={field?.value}
                              className="font-medium text-gray-700"
                            >
                              {field?.label}
                            </label>
                            {/* <p
                              id="comments-description"
                              className="text-gray-500"
                            >
                              Get notified when someones posts a comment on a
                              posting.
                            </p> */}
                          </div>
                        </div>
                      ))}
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
