import { useState } from "react";
import style from "./Card.module.css";
import { Animal } from "../../features/animals/animalsSlice";
import { useDispatch } from "react-redux";
import { removeAnimal, editAnimal } from "../../features/animals/animalsSlice";

const Card = ({ name, img, id }: Animal) => {
  const dispatch = useDispatch();

  const [editState, setEditState] = useState(false);
  const [editValues, setEditValues] = useState({
    id: id,
    name: name,
    img: img,
  });

  return (
    <>
      {editState ? (
        <div className={style.cardWrapper}>
          <form
            className={style.editForm}
            onSubmit={(e) => {
              e.preventDefault();

              dispatch(editAnimal(editValues));

              setEditState(false);
            }}
          >
            <input
              type="text"
              className={style.inputForm}
              placeholder="Change name"
              value={editValues.name}
              onChange={(e) => {
                setEditValues({ ...editValues, name: e.target.value });
              }}
            />
            <input
              type="text"
              className={style.inputForm}
              placeholder="Change picture link"
              value={editValues.img}
              onChange={(e) => {
                setEditValues({ ...editValues, img: e.target.value });
              }}
            />
            <button className={style.button}>SAVE</button>
          </form>
        </div>
      ) : (
        <div className={style.cardWrapper}>
          <h1>{name}</h1>
          <img className={style.picture} src={img} alt={name} />
          <div className={style.buttonWrapper}>
            <button
              className={`${style.button} ${style.buttonDelete}`}
              onClick={(e) => {
                e.preventDefault();

                dispatch(removeAnimal(id));
              }}
            >
              DELETE
            </button>
            <button
              className={style.button}
              onClick={() => {
                setEditState(true);
              }}
            >
              EDIT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
