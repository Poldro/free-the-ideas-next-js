export const Title = ({title}: {title: string}) => {
  return (
    <h1 className={`text-center text-lg font-semibold text-gray-50 md:text-3xl`}>
      {title}
    </h1>
  );
};
