import React, { useState } from "react";
import Button from "../components/button";
import {
  FormFileField,
  FormTextAreaField,
  FormTextField,
} from "../components/form-field";
import FormSection from "../components/form-section";
import NewField from "../containers/expedients-new/partials/new-field";
import { ExpedientRequirementType, Type } from "../utils/types";

type Props = {
  requirements: any;
  onDeleteField: (id: string) => void;
  formik: any;
  onAddField: (_: {
    nombre: string;
    tipo: ExpedientRequirementType;
    descripcion?: string | boolean;
  }) => void;
};

const RequirementsBuilder = ({
  requeriments,
  onDeleteField,
  formik,
  onAddField,
}: Props) => {
  const [isAddingNewField, setIsAddingNewField] = useState(false);
  console.log({ onDeleteField });
  return (
    <>
      <div className="text-black">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <FormSection>
              <div className="space-y-6 sm:space-y-5">
                {requeriments.map((data) => {
                  const props = {
                    data: { ...data, onDeleteField, formik },
                  };
                  switch (data.tipo) {
                    case ExpedientRequirementType.Text:
                      return <FormTextField {...props} />;
                    case ExpedientRequirementType.LargeText:
                      return <FormTextAreaField {...props} />;
                    case ExpedientRequirementType.Files:
                      return <FormFileField {...props} />;
                    default:
                      return <FormTextField {...props} />;
                  }
                })}
              </div>
            </FormSection>
          </div>
        </form>
      </div>
      <div className="py-4">
        {isAddingNewField ? (
          <NewField
            setIsAddingNewField={setIsAddingNewField}
            isAddingNewField={isAddingNewField}
            onAddField={onAddField}
          />
        ) : (
          <Button
            type={Type.Secondary}
            onClick={() => setIsAddingNewField(true)}
          >
            Añadir campo
          </Button>
        )}
      </div>
    </>
  );
};

export default RequirementsBuilder;
