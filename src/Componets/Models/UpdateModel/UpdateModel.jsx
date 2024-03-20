import "./UpdateModel.css";
import PropTypes from "prop-types";

const UpdateModal = ({
  updateTodoValue,
  setUpdateTodoValue,
  setShowUpdateModal,
  updateTodo,
}) => {
  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };
  return (
    <div>
      <div className="overlay" onClick={handleUpdateModalClose}></div>
      <div className="model">
        <h3>تعديل المهمة</h3>
        <input
          type="text"
          placeholder="العنوان"
          value={updateTodoValue.title}
          onChange={(e) =>
            setUpdateTodoValue({ ...updateTodoValue, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="التفاصيل"
          value={updateTodoValue.details}
          onChange={(e) =>
            setUpdateTodoValue({ ...updateTodoValue, details: e.target.value })
          }
        />
        <div className="btns">
          <button onClick={handleUpdateModalClose}>إغلاق</button>
          <button autoFocus onClick={updateTodo}>
            تعديل
          </button>
        </div>
      </div>
    </div>
  );
};

UpdateModal.propTypes = {
  updateTodoValue: PropTypes.object.isRequired,
  setUpdateTodoValue: PropTypes.func.isRequired,
  setShowUpdateModal: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default UpdateModal;
