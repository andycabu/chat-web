import PropTypes from "prop-types";

const ContainerIcon = ({ icon }) => {
  return (
    <div className=" flex text-2xl justify-center hover:cursor-pointer ">
      <div className="p-3 hover:bg-[var(--background-color)] rounded-md">
        {icon}
      </div>
    </div>
  );
};

ContainerIcon.propTypes = {
  icon: PropTypes.node,
};

export default ContainerIcon;
