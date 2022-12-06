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
import useUserRole from "../hooks/use-user-role";

type Props = {
  formik: any;
  onEditSection: (sectionName: string, nombre: string) => void;
  onDeleteSection: (nombre: string) => void;
  section: Section;
  editable?: boolean;
};

const RequirementsBuilder = ({
  section,
  editable = false,
  formik,
  onEditSection,
  onDeleteSection,
}: Props) => {
  const { setFieldValue, values } = formik;

  const [isAddingNewField, setIsAddingNewField] = useState(false);

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
              recursos: [
                ...sectionItem.recursos,
                {
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
              recursos: sectionItem.recursos?.filter(
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
              recursos: sectionItem.recursos.map((requeriment) =>
                requeriment.nombre === id
                  ? { ...requeriment, texto: text }
                  : requeriment
              ),
            }
          : sectionItem
      )
    );
  };

  const onEditFileField = (id: string, files: any) => {
    values.secciones.forEach((sectionItem: Section) => {
      if (sectionItem.nombre === section.nombre) {
        setFieldValue(`files`, [
          ...formik.values.files,
          {id: `${section.nombre}/${id}`, files: files},
        ]);
      }
    });
  };

  const getFieldValue = (nombre: string): string => {
    let texto = "";
    values.secciones.forEach((sectionItem: Section) => {
      if (sectionItem.nombre === section.nombre) {
        texto =
          sectionItem.recursos.find(
            (requirement) => requirement.nombre === nombre
          )?.texto ?? "";
      }
    });
    return texto;
  };

  const getFieldFiles = (nombre: string): string[] => {
    let files: string[] = [];
    values.secciones.forEach((sectionItem: Section) => {
      if (sectionItem.nombre === section.nombre) {
        files =
          sectionItem.recursos.find(
            (requirement) => requirement.nombre === nombre
          )?.archivos ?? [];
      }
    });
    return files;
  };

  const { isAdmin, isSuperAdmin } = useUserRole();

  return (
    <div className="shadow sm:rounded-md bg-white py-6 px-4 sm:p-6">
      <div className="text-black">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <FormSection
              title={section.nombre}
              editable={section.custom || editable}
              onEditSection={onEditSection}
              onDeleteSection={onDeleteSection}
            >
              <div className="space-y-6 sm:space-y-5">
                {section.recursos.map((data) => {
                  const props = {
                    data: {
                      ...data,
                      onDeleteField,
                      onEditField,
                      formik,
                      getFieldFiles,
                      editable,
                      getFieldValue,
                      onEditFileField,
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
      {(isAdmin || isSuperAdmin) && (
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
      )}
    </div>
  );
};

export default RequirementsBuilder;
