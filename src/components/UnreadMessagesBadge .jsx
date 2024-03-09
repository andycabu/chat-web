import { useApp } from "../hooks/useApp";

const UnreadMessagesBadge = () => {
  const { unread } = useApp();

  console.log(unread?.count);
  return (
    <div
      className={`flex items-center justify-center h-6 w-6 bg-green-500 rounded-full text-white text-xs ${
        count > 0 ? "block" : "hidden"
      }`}
    >
      {count}
    </div>
  );
};

export default UnreadMessagesBadge;
