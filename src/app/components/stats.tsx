const Stats = ({ stats, isLoading }: Props) => {
  const { count, going, notGoing } = stats;

  return (
    <div className="w-10/12 sm:max-w-[400px]">
      <h1 className="text-center text-3xl font-bold">📊 Estadísticas</h1>
      <div className="flex min-h-[84px] flex-col justify-center">
        {isLoading ? (
          <h2 className="text-center text-xl">Cargando...</h2>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-lg">📨 Respuestas totales</span>{" "}
              <p className="text-xl">{count}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg">✅ Confirmados</span>
              <p className="text-xl">{going}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg">❌ No vienen</span>
              <p className="text-xl">{notGoing}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

type Props = {
  stats: {
    count: number;
    going: number;
    notGoing: number;
  };
  isLoading: boolean;
};

export default Stats;