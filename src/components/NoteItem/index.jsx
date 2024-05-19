import { FiPlus, FiX } from "react-icons/fi";

import { Container } from "./styles";

export function NoteItem({ isNew, value, onClick, ...rest }) {
  return (
    <Container isNew={isNew}>
      <input
        type="text"
        value={value}
        readOnly={!isNew}
        {...rest}
      />
      <button
        type="button"
        onClick={onClick}
        className={isNew ? "button-add" : "button-delete"}
      >
        {/* Se for um novo note, mostrar o botão de adicionar, caso contrário mostrar o botão de deletar  */}
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  );
}