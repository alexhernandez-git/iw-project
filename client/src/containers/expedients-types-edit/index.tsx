import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../../components/button";
import Form from "../../components/form";
import HandleStatus from "../../components/handle-status";
import Sections from "../../components/sections";
import useUserRole from "../../hooks/use-user-role";
import DashboardLayout from "../../layouts/layout";
import { useAppSelector } from "../../store";
import {
  destroyExpedientType,
  editExpedientType,
  editFileExpedientType,
  getExpedientType,
} from "../../store/expedient-type";
import { getExpedientTypes } from "../../store/expedient-types";
import { FormInputType, SliceState, Type } from "../../utils/types";

const ExpedientsTypesEdit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpedientType(id));
    dispatch(getExpedientTypes({ getAll: true }));
  }, []);

  const { id } = useParams();

  const { status, value: expedientType } = useAppSelector(
    (state) => state.expedientType
  );

  const { status: expedientTypesStatus, value: expedientTypes } =
    useAppSelector((state) => state.expedientTypes);

  const formik = useFormik({
    initialValues: {
      codigo: expedientType?.codigo ?? "",
      nombre: expedientType?.nombre ?? "",
      honorarios: expedientType?.honorarios ?? "",
      tramitePadre: expedientType?.tramitePadre?._id ?? "",
      secciones: expedientType?.secciones ?? [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      var formData = new FormData();

      delete values?.files;

      formData.append("data", JSON.stringify(values));

      dispatch(editExpedientType({ id, data: formData }));
    },
  });

  const { isAdmin, isSuperAdmin } = useUserRole();

  const updateFile = ({
    sectionName,
    fieldName,
    file,
  }: {
    sectionName: string;
    fieldName: string;
    file: any;
  }) => {
    const data = new FormData();
    data.append("files", file, file.name);
    data.append("sectionName", sectionName);
    data.append("fieldName", fieldName);
    dispatch(editFileExpedientType({ id, sectionName, fieldName, data }));
  };

  const { handleSubmit } = formik;

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const deleteItem = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      dispatch(destroyExpedientType({ id }))
        .unwrap()
        .then(() => {
          Swal.fire(
            "Borrado!",
            "El expediente ha sido borrado.",
            "success"
          ).then(() => {
            navigate("/expedients");
          });
        });
    });
  };

  return (
    <DashboardLayout
      title={"Editar expediente"}
      button={{
        label: "Guardar",
        onClick: handleSubmit,
      }}
      pages={[
        {
          name: "Tipos de trámites",
          href: "/expedients-types",
          current: false,
        },
        {
          name: "Tipo de expediente",
          href: `/expedients-types/${id}`,
          current: false,
        },
        {
          name: "Editar tipo de expediente",
          href: `/expedients-types/edit/${id}`,
          current: true,
        },
      ]}
    >
      {MySwal}
      <HandleStatus status={status} data={expedientType} />
      <HandleStatus status={expedientTypesStatus} data={expedientTypes} />
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 mb-6">
        <Form
          onSubmit={handleSubmit}
          data={[
            {
              label: "Información",
              description: "Descripcion",
              inputs: [
                {
                  label: "Codigo",
                  name: "codigo",
                  type: FormInputType.Text,
                },
                {
                  label: "Nombre",
                  name: "nombre",
                  type: FormInputType.Text,
                },
                {
                  label: "Honorarios",
                  name: "honorarios",
                  type: FormInputType.Text,
                },
                {
                  label: "Padre",
                  name: "tramitePadre",
                  type: FormInputType.Select,
                  options:
                    expedientTypesStatus === SliceState.Success &&
                    expedientTypes
                      ? expedientTypes.data
                          .filter(({ isAreaFuncional }) => isAreaFuncional)
                          .map(({ nombre, codigo, _id }) => ({
                            label: `Nombre: ${nombre} Codigo: ${codigo}`,
                            id: _id,
                          }))
                          .filter(
                            (expedientTypeItem) => expedientTypeItem.id !== id
                          )
                      : [],
                },
              ].map((item) => ({ ...item, formik })),
            },
          ]}
        >
          <Sections updateFile={updateFile} formik={formik} editable />
        </Form>
      </div>
      {(isAdmin || isSuperAdmin) && (
        <div className="flex justify-end py-4">
          <Button type={Type.Secondary} onClick={deleteItem}>
            Eliminar
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ExpedientsTypesEdit;
