import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import useUserRole from "../../hooks/use-user-role";
import RequirementsBuilder from "../requirements-builder";
import { Section, Type } from "../../utils/types";
import Button from "../button";

type Props = {
  formik: any;
  editable?: boolean;
  updateFile: ({
    sectionName,
    fieldName,
    file,
  }: {
    sectionName: string;
    fieldName: string;
    file: any;
  }) => void | null;
};

const Sections = ({ formik, editable = false, updateFile = null }: Props) => {
  const [isAddingSection, setIsAddingSection] = useState(false);

  const newSectionFormik = useFormik({
    initialValues: {
      nombre: "",
      recursos: [],
      custom: true,
    },
    onSubmit: (data, { resetForm }) => {
      formik.setFieldValue("secciones", [...formik.values.secciones, data]);
      setIsAddingSection(false);
      resetForm();
      formik.handleSubmit();
    },
  });

  const onEditSection = (sectionName: string, nombre: string) => {
    console.log("entraaa");
    formik.setFieldValue(
      "secciones",
      formik.values.secciones.map((sectionItem: Section) =>
        sectionItem.nombre === sectionName
          ? {
              ...sectionItem,
              nombre,
            }
          : sectionItem
      )
    );
    formik.handleSubmit();
  };

  const onDeleteSection = (nombre: string) => {
    if (!editable) {
      return;
    }
    formik.setFieldValue(
      "secciones",
      formik.values.secciones.filter(
        (sectionItem: Section) => sectionItem.nombre !== nombre
      )
    );
    formik.handleSubmit();
  };

  const inputRef = useRef();

  useEffect(() => {
    if (isAddingSection) {
      inputRef.current.focus();
    }
  }, [isAddingSection]);

  const { isAdmin, isSuperAdmin } = useUserRole();

  return (
    <div className="">
      <div className="space-y-6 mb-5">
        {formik.values.secciones.map((section: Section) => (
          <RequirementsBuilder
            updateFile={updateFile}
            formik={formik}
            editable={editable}
            section={section}
            onEditSection={onEditSection}
            onDeleteSection={onDeleteSection}
          />
        ))}
      </div>
      {(isAdmin || isSuperAdmin) && (
        <>
          {isAddingSection ? (
            <div className="">
              <span className="text-base font-medium text-gray-900">
                Elige el nombre de la nueva sección
              </span>
              <div className="mt-3">
                <div className="mt-1">
                  <input
                    type="text"
                    ref={inputRef}
                    autoFocus
                    name="nombre"
                    onChange={newSectionFormik.handleChange}
                    onBlur={newSectionFormik.handleBlur}
                    value={newSectionFormik.values.nombre}
                    id="nombre"
                    placeholder=""
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-esan-color focus:ring-esan-color sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => setIsAddingSection(false)}
                  type={Type.Secondary}
                  className="mr-2"
                >
                  Cancelar
                </Button>
                <Button onClick={newSectionFormik.handleSubmit}>Crear</Button>
              </div>
            </div>
          ) : (
            <div className={formik.values.secciones.length !== 0 && "pt-4"}>
              <Button onClick={() => setIsAddingSection(true)}>
                Añadir sección
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sections;
