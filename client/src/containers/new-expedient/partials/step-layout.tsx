import React from "react";
import Button from "../../../components/button";

type Props = {
  children: React.ReactNode;
  textButton: string;
  disabledButton: boolean;
  onNextStep: () => void;
};

const StepLayout = ({
  children,
  textButton,
  disabledButton,
  onNextStep,
}: Props) => {
  return (
    <section aria-labelledby="quick-links-title" className="mt-6 shadow-md">
      <div className="p-6 bg-white space-y-8 divide-y divide-gray-200 sm:space-y-5">
        {children}
      </div>
      <div className="p-2 bg-indigo-300 flex justify-end">
        <div className="flex justify-end">
          <Button disabled={disabledButton} onClick={onNextStep}>
            {textButton}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StepLayout;
