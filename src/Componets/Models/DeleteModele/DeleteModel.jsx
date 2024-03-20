import "./DeleteModel.css";
import PropTypes from "prop-types";

const DeleteModal = ({ setShowDeleteModal, deleteTodo }) => {
  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="overlay" onClick={() => setShowDeleteModal(false)}></div>
      <div className="model">
        <h3> هل أنت متأكد من رغبتك في حذف المهمة؟</h3>
        <p> لا يمكنك التراجع عن الحذف بعد إتمامه</p>
        <div className="btns">
          <button onClick={handleDeleteModalClose}>إغلاق</button>
          <button autoFocus onClick={deleteTodo}>
            نعم، قم بالحذف
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  setShowDeleteModal: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default DeleteModal;
