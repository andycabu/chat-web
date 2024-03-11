import PropTypes from "prop-types";

const Ticks = ({ status }) => {
  const tickColor =
    status === "read" ? "text-[var(--color-primary)]" : "text-white";

  return (
    <div className={`flex items-center ${tickColor}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[0.90rem] w-[0.90rem]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {(status === "delivered" || status === "read") && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[0.90rem] w-[0.90rem] -ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
};
Ticks.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Ticks;
