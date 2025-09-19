import Container from "@/components/shared/container/Container";
import VisasFilterSidebar from "./VisasFilterSidebar";
import VisasGrid from "./VisasGrid";

const VisasSection = () => {
  return (
    <Container>
      <section className="grid grid-cols-12 gap-8 py-12 md:relative">
        <VisasFilterSidebar />
        <VisasGrid />
      </section>
    </Container>
  );
};

export default VisasSection;

