import { useFormik } from "formik";
import React, { useState } from "react";
import RequirementsBuilder from "../../requirements-builder";
import { Section, Type } from "../../utils/types";
import Button from "../button";

const Sections = ({ formik }) => {
  const [isAddingSection, setIsAddingSection] = useState(false);

  const newSectionFormik = useFormik({
    initialValues: {
      nombre: "",
      requerimientos: [],
    },
    onSubmit: (data, { resetForm }) => {
      formik.setFieldValue("secciones", [...formik.values.secciones, data]);
      setIsAddingSection(false);
      resetForm();
    },
  });

  const onEditSection = (sectionName: string, nombre: string) => {
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
  };

  const onDeleteSection = (nombre: string) => {
    formik.setFieldValue(
      "secciones",
      formik.values.secciones.filter(
        (sectionItem: Section) => sectionItem.nombre !== nombre
      )
    );
  };
  return (
    <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
      <div>
        {formik.values.secciones.map((section: Section) => (
          <RequirementsBuilder
            formik={formik}
            section={section}
            onEditSection={onEditSection}
            onDeleteSection={onDeleteSection}
          />
        ))}
      </div>

      {isAddingSection ? (
        <div className="">
          <span className="text-base font-medium text-gray-900">
            Elige el nombre de la nueva sección
          </span>
          <div className="mt-3">
            <div className="mt-1">
              <input
                type="text"
                name="nombre"
                onChange={newSectionFormik.handleChange}
                onBlur={newSectionFormik.handleBlur}
                value={newSectionFormik.values.nombre}
                id="nombre"
                placeholder=""
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
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
        <div
          className={
            formik.values.secciones.length !== 0 &&
            "border-t border-gray-200 pt-4"
          }
        >
          <Button onClick={() => setIsAddingSection(true)}>
            Añadir sección
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sections;
