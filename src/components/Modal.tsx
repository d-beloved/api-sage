import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ModalProps } from "@/types";

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 backdrop:blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative w-full transform rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 max-w-[95vw] sm:max-w-xl md:max-w-2xl">
                <div className="px-4 sm:px-6 pt-5 pb-4 sm:p-6">
                  <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
                    <DialogTitle className="text-lg sm:text-xl font-semibold leading-6 text-white pr-6">
                      {title}
                    </DialogTitle>
                    <button
                      type="button"
                      className="rounded-full p-1.5 text-gray-400 hover:text-gray-50 hover:bg-gray-700 transition-colors"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="max-h-[60vh] sm:max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 pr-2">
                    {children}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
