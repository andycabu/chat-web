import PropTyes from "prop-types";
const UnreadMessagesBadge = ({ count }) => {
  return (
    <div className="flex items-center justify-center h-6 w-6 bg-[var(--color-secundary)] rounded-full text-white text-xs ">
      {count}
    </div>
  );
};
UnreadMessagesBadge.propTypes = {
  count: PropTyes.number.isRequired,
};
export default UnreadMessagesBadge;
