import AdditionalInfo from "./components/AdditionalInfo.jsx";
import Banner from "./components/Banner.jsx";
import DashboardInfo from "./components/DashboardInfo.jsx";
import Info from "./components/Info.jsx";
import Introduction from "./components/Introduction.jsx";

export default async function Home() {
  return (
    <section>
      <Introduction />
      <Info />
      <DashboardInfo />
      <AdditionalInfo />
      <Banner />
    </section>
  );
}
