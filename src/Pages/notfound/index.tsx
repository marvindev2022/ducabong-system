import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const sectionPage = window.location.pathname.split("/")[1];
  const navigate = useNavigate();
  function handleBack() {
    navigate(`/${sectionPage}/home`);
  }

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-secondary">
      <h1 className="text-5xl text-white">404</h1>
      <h2 className="text-2xl text-white">Page Not Found</h2>
      <button
        onClick={handleBack}
        className="bg-primary text-white px-4 py-2 rounded-md mt-4"
      >
        Voltar
      </button>
    </section>
  );
}
