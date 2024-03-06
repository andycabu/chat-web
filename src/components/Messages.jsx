import { useApp } from "../context/AppContext";

const Messages = () => {
  const { user } = useApp();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  const isLessThanTwoDaysAgo = (timestamp) => {
    const twoDaysInSeconds = 2 * 24 * 60 * 60; // 2 días en segundos
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return currentTime - timestamp < twoDaysInSeconds;
  };

  // Ordenar los mensajes por fecha y hora
  user.messages.sort((a, b) => a.timestamp - b.timestamp);

  let currentDay = null;

  return (
    <main className="h-[84vh] overflow-y-auto p-4">
      {/* Message negocio */}
      <div className="mb-3 flex">
        <p className="bg-[#1B2831] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl">
          Hola
        </p>
      </div>
      {/* Message cliente */}

      {user?.messages.map((message) => {
        const date = new Date(message.timestamp * 1000);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const day = formatDate(message.timestamp);
        const showDateLabel = day !== currentDay;
        currentDay = day;

        // Determinar si mostrar la fecha completa o solo el día de la semana
        const showFullDate = !isLessThanTwoDaysAgo(message.timestamp);

        return (
          <div key={message._id} className="mb-3 flex justify-end">
            {showDateLabel && (
              <div className="text-center mb-2">
                {showFullDate
                  ? day
                  : date.toLocaleDateString("es-ES", { weekday: "long" })}
              </div>
            )}
            <div className="flex bg-[#054640] max-w-[80%]  xl:max-w-2xl py-1 px-2 rounded-tl-xl rounded-bl-xl rounded-br-xl">
              <p className="max-w-[400px] break-words">{message.text.body}</p>
              <p className="flex justify-end text-right text-[0.70rem] text-grey-dark pt-5 pl-4">
                {hour}:{minute}
              </p>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Messages;
