import Footer from "../include/Footer";
import Navbar from "../include/Navbar";

export default function layout({ children }) {
  return (
    <main className={`antialiased container`}>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
