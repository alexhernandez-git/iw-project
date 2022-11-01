import React, { useState } from "react";
import Button from "../components/button";
import {
  FormFileField,
  FormTextAreaField,
  FormTextField,
} from "../components/form-field";
import FormSection from "../components/form-section";
import NewField from "./partials/new-field";
import { makeId } from "../utils/helpers";
import {
  ExpedientRequirement,
  ExpedientRequirementType,
  Section,
  Type,
} from "../utils/types";

type Props = {
  requirements: any;
  formik: any;
  onEditSection: (sectionName: string, nombre: string) => void;
  onDeleteSection: (nombre: string) => void;
  section: Section;
};

const RequirementsBuilder = ({
  section,
  formik,
  onEditSection,
  onDeleteSection,
}: Props) => {
  const { setFieldValue, values } = formik;

  const [isAddingNewField, setIsAddingNewField] = useState(false);

  console.log({ values });

  const onAddField = ({
    nombre,
    tipo,
    descripcion = false,
  }: {
    nombre: string;
    tipo: ExpedientRequirementType;
    descripcion?: string | boolean;
  }) => {
    setFieldValue(
      "secciones",
      values.secciones.map((sectionItem: Section) =>
        sectionItem.nombre === section.nombre
          ? {
              ...sectionItem,
              requerimientos: [
                ...sectionItem.requerimientos,
                {
                  id: makeId(10),
                  nombre,
                  tipo,
                  descripcion: descripcion ? descripcion : "",
                  texto: "",
                  archivo: "",
                  custom: true,
                },
              ],
            }
          : sectionItem
      )
    );
  };

  const onDeleteField = (id: string) => {
    setFieldValue(
      "secciones",
      values.secciones.map((sectionItem: Section) =>
        sectionItem.nombre === section.nombre
          ? {
              ...sectionItem,
              requerimientos: sectionItem.requerimientos?.filter(
                (requirement: ExpedientRequirement) => requirement.id !== id
              ),
            }
          : sectionItem
      )
    );
  };

  const onEditField = (id: string, text: string) => {
    setFieldValue(
      "secciones",
      values.secciones.map((sectionItem: Section) =>
        sectionItem.nombre === section.nombre
          ? {
              ...sectionItem,
              requerimientos: sectionItem.requerimientos.map((requeriment) =>
                requeriment.id === id
                  ? { ...requeriment, texto: text }
                  : requeriment
              ),
            }
          : sectionItem
      )
    );
  };

  const getFieldValue = (nombre: string) => {
    values.secciones.forEach((sectionItem: Section) => {
      if (sectionItem.nombre === section.nombre) {
        return sectionItem.requerimientos.find(
          (requirement) => requirement.nombre === nombre
        )?.texto;
      }
    });
  };

  console.log({ section });
  return (
    <div className="shadow sm:rounded-md bg-white py-6 px-4 sm:p-6">
      <div className="text-black">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <FormSection
              title={section.nombre}
              onEditSection={onEditSection}
              onDeleteSection={onDeleteSection}
            >
              <div className="space-y-6 sm:space-y-5">
                {section.requerimientos.map((data) => {
                  const props = {
                    data: {
                      ...data,
                      onDeleteField,
                      onEditField,
                      formik,
                      getFieldValue,
                    },
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
    </div>
  );
};

export default RequirementsBuilder;
