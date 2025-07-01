import Navbar from "../include/Navbar";
import Footer from "../include/Footer";

const layout = ({ children }) => {
  return (
    <main className="container">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
