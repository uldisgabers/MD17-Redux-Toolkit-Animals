import style from "./App.module.css";
import Card from "./components/Card/Card";
import { useState } from "react";
import type { RootState } from "./app/store";
import { useSelector, useDispatch } from "react-redux";
import { addAnimal } from "./features/animals/animalsSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Sorter from "./components/Sorter/Sorter";

function App() {
  const dispatch = useDispatch();
  const animals = useSelector((state: RootState) => state.animals.value);

  console.log(animals);

  const [newAnimal, setNewAnimal] = useState({
    id: Math.random(),
    name: "",
    img: "",
  });

  const FormSchema = z
    .object({
      name: z.string().min(2),
      img: z.string().url(),
    })
    .required();

  type FormData = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = (data: FormData) => {
    dispatch(addAnimal(newAnimal));
    console.log(data);

    setNewAnimal({
      id: Math.random(),
      name: "",
      img: "",
    });
  };

  return (
    <>
      <Sorter />
      <div>
        <form className={style.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("name")}
            className={style.inputForm}
            required
            placeholder="Animal name..."
            value={newAnimal.name}
            onChange={(e) => {
              setNewAnimal({
                ...newAnimal,
                name: e.target.value,
              });
            }}
          />
          <span>{errors.name && errors.name?.message}</span>
          <input
            type="text"
            {...register("img")}
            required
            className={style.inputForm}
            placeholder="Animal picture"
            value={newAnimal.img}
            onChange={(e) => {
              setNewAnimal({
                ...newAnimal,
                img: e.target.value,
              });
            }}
          />
          <span>{errors.img?.message}</span>
          {/* ADD BUTTON */}
          <button className={style.button} type="submit">
            ADD
          </button>
        </form>
      </div>
      {animals.length == 0 ? (
        <h1>NO DATA</h1>
      ) : (
        <>
          {animals.map((animal) => {
            return (
              <Card
                id={animal.id}
                name={animal.name}
                img={animal.img}
                key={animal.id}
              />
            );
          })}
        </>
      )}
    </>
  );
}

export default App;
