import { useState } from "react";
import { useForm } from "react-hook-form";

export function PlazoFijoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const [isShownForm, setIsShownForm] = useState(true);
  const [isShownResult, setIsShownResult] = useState(false);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 form container">
          {isShownForm && (
            <form onSubmit={onSubmit}>
              <label htmlFor="inversion">Monto a invertir</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresá el monto a invertir"
                {...register("inversion", {
                  required: {
                    value: true,
                    message: "Para continuar, ingresá el monto a invertir",
                  },
                  validate: (value) => {
                    if (isNaN(value)) {
                      return "El monto a invertir debe ser un número";
                    } else if (value < 1000) {
                      return "El monto a invertir debe ser mayor a $1000";
                    } else {
                      return true;
                    }
                  },
                })}
              />

              {errors.inversion && <span>{errors.inversion.message}</span>}

              <label htmlFor="fechaFinalizacion">Fecha de finalización</label>
              <input
                className="form-control" type="date"
                {...register("fechaFinalizacion", {
                  required: {
                    value: true,
                    message: "La fecha de finalización es requerida",
                  },
                  validate: (value) => {
                    //console.log(value);
                    const fechaFinalizacion = new Date(value);
                    const fechaActual = new Date();
                    const diferencia = fechaFinalizacion.getTime() - fechaActual.getTime();
                    const TotalDias = Math.ceil(diferencia / (1000 * 3600 * 24) + 1);
                    console.log(TotalDias);
                    
                    if (TotalDias > 30) {
                      return true;
                    } else {
                      return "La fecha de finalización debe ser mayor a 30 días";
                    }
                  },
                })}
              />

              {errors.fechaFinalizacion && (
                <span>{errors.fechaFinalizacion.message}</span>
              )}

              <button className="btn btn-success">Calcular</button>

              <pre>{JSON.stringify(watch(), null, 2)}</pre>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
