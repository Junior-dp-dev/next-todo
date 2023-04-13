import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainContainer({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-vh90 text-center font-handlee">{children}</div>
      <Footer />
    </>
  );
}
