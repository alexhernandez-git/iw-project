import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import RequirementsBuilder from "../../requirements-builder";
import { Section, Type } from "../../utils/types";
import Button from "../button";

type Props = {
  formik: any;
  editable?: boolean;
};

const Sections = ({ formik, editable = false }: Props) => {
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
    if (!editable) {
      return;
    }
    formik.setFieldValue(
      "secciones",
      formik.values.secciones.filter(
        (sectionItem: Section) => sectionItem.nombre !== nombre
      )
    );
  };

  const inputRef = useRef();

  useEffect(() => {
    if (isAddingSection) {
      inputRef.current.focus();
    }
  }, [isAddingSection]);

  return (
    <div className="">
      <div className="space-y-6 mb-5">
        {formik.values.secciones.map((section: Section) => (
          <RequirementsBuilder
            formik={formik}
            editable={editable}
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
                ref={inputRef}
                autoFocus
                name="nombre"
                onChange={newSectionFormik.handleChange}
                onBlur={newSectionFormik.handleBlur}
                value={newSectionFormik.values.nombre}
                id="nombre"
                placeholder=""
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-esan-color focus:ring-esan-color sm:max-w-xs sm:text-sm"
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
    </div>
  );
};

export default Sections;
