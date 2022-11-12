import Layout from "../../layouts/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { FormInputType, SliceState } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Form from "../../components/form";
import { newExpedient } from "../../store/expedient";

export default function NewExpedientType() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, value: expedientTypes } = useSelector(
    (state: RootState) => state.expedientTypes
  );

  const { vinculated } = useParams() ?? { vinculated: null };

  const formik = useFormik({
    initialValues: {
      tipo: "",
      vinculado: vinculated,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(newExpedient(values))
        .unwrap()
        .then(({ expedient }) => {
          navigate(`/expedients/${expedient._id}`);
        })
        .catch(() => {
          alert("error");
        });
      resetForm({});
    },
  });

  const { handleSubmit } = formik;

  return (
    <Layout
      button={{
        label: "Siguiente",
        onClick: handleSubmit,
      }}
      title={`Creación del expediente${
        vinculated ? " vinculado a expediente: " + vinculated : ""
      }`}
      pages={
        vinculated
          ? [
              {
                name: "Expedientex",
                href: "/expedients",
                current: false,
              },
              {
                name: "Expediente 3",
                href: "/expedients/3",
                current: false,
              },
              {
                name: "Crear expediente vinculado",
                href: "/expedients/new/2",
                current: true,
              },
            ]
          : [
              {
                name: "Nuevo expediente",
                href: "/expedients/new",
                current: true,
              },
            ]
      }
    >
      <Form
        onSubmit={handleSubmit}
        data={[
          {
            label: "Información",
            description: "",
            inputs: [
              {
                label: "Tipo",
                name: "tipo",
                type: FormInputType.Select,
                options:
                  status === SliceState.Success && expedientTypes
                    ? expedientTypes.data.map(({ nombre, codigo, _id }) => ({
                        label: `Nombre: ${nombre} Codigo: ${codigo}`,
                        id: _id,
                      }))
                    : [],
              },
            ].map((item) => ({ ...item, formik })),
          },
        ]}
      />
    </Layout>
  );
}
