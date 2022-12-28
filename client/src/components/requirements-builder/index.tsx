import React, { useState } from "react";
import Button from "../button";
import { FormFileField, FormTextAreaField, FormTextField } from "../form-field";
import FormSection from "../form-section";
import NewField from "./partials/new-field";
import {
  ExpedientRequirement,
  ExpedientRequirementType,
  Section,
  Type,
} from "../../utils/types";
import useUserRole from "../../hooks/use-user-role";
import jwt from "jsonwebtoken";

type Props = {
  formik: any;
  onEditSection: (sectionName: string, nombre: string) => void;
  onDeleteSection: (nombre: string) => void;
  section: Section;
  editable?: boolean;
  updateFile: ({ token, file }: { token: string; file: any }) => void | null;
};

const RequirementsBuilder = ({
  section,
  editable = false,
  formik,
  onEditSection,
  onDeleteSection,
  updateFile,
}: Props) => {
  const { setFieldValue, values } = formik;

  const [isAddingNewField, setIsAddingNewField] = useState(false);

  const onEditFile = (fieldName: string, file: any) => {
    if (updateFile) {
      const token = jwt.sign(
        { sectionName: section?.nombre, fieldName },
        "shhhhh"
      );
      updateFile({ token, file });
    }
  };

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
    formik.handleSubmit();
  };

  const onDeleteField = (id: string) => {
    console.log({ id });
    setFieldValue(
      "secciones",
      values.secciones.map((sectionItem: Section) => {
        if (sectionItem.nombre === section.nombre) {
          console.log({ sectionItem });
          return {
            ...sectionItem,
            recursos: sectionItem.recursos?.filter(
              (requirement: ExpedientRequirement) => requirement.nombre !== id
            ),
          };
        } else {
          return sectionItem;
        }
      })
    );
    formik.handleSubmit();
  };

  const onEditFieldLabel = (id: string, nombre: string) => {
    console.log({ id });
    setFieldValue(
      "secciones",
      values.secciones.map((sectionItem: Section) => {
        if (sectionItem.nombre === section.nombre) {
          console.log({ id, nombre });
          console.log({ sectionItem });
          return {
            ...sectionItem,
            recursos: sectionItem.recursos?.map(
              (requirement: ExpedientRequirement) =>
                requirement.nombre === id
                  ? {
                      ...requirement,
                      nombre,
                    }
                  : requirement
            ),
          };
        } else {
          return sectionItem;
        }
      })
    );
    formik.handleSubmit();
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
    formik.handleSubmit();
  };

  const onEditFileField = (id: string, files: any) => {
    values.secciones.forEach((sectionItem: Section) => {
      if (sectionItem.nombre === section.nombre) {
        setFieldValue(`files`, {
          ...formik.values.files,
          [`${section.nombre}]-[${id}`]: files,
        });
      }
    });
    formik.handleSubmit();
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

  const getNotUploadedFieldFiles = (nombre: string): string[] => {
    let files: string[] = [];
    if (values?.files) {
      var fileKeys = Object.keys(values?.files);
      console.log({ fileKeys });
      fileKeys.forEach(function (key) {
        const [sectionName, fieldName] = key.split("]-[");
        if (sectionName === section.nombre && nombre === fieldName) {
          for (let i = 0; i < values.files[key].length; i++) {
            let file = values.files[key].item(i);
            console.log({ file });
            files = [...files, file?.name];
          }
        }
      });
    }
    console.log({ files });
    return files;
  };

  console.log(values.files);

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
                      onEditFieldLabel,
                      editable,
                      getFieldValue,
                      onEditFileField,
                      getNotUploadedFieldFiles,
                      updateFile,
                      onEditFile,
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
