
import VenueTags from "./VenueTags";
import VenueGallery from "./VenueGallery";
import VenueHeader from "./VenueHeader";
import VenuePrice from "./VenuePrice";
import VenueAbout from "./VenueAbout";
import VenueAmenity from "./VenueAmenity";
import VenueService from "./VenueService";
import VenueSettting from "./VenueSetting";
import VenueAwards from "./VenueAwards";
import VenueSpace from "./VenueSpace";
import VenuePackages from "./VenuePackages";
function VenueContent({ venue }) {
  return (
    <main className="px-2 mt-2 flex flex-col gap-y-4 h-[650px] overflow-y-auto dark:bg-gray-900 bg-white scrollbar-hide">
      <VenueTags venue={venue} />
      <VenueGallery venue={venue} />

      <section className="md:grid md:grid-cols-6 w-full h-full p-4">
        <div className="flex flex-col gap-y-4 col-span-6">
          <VenueHeader venue={venue} />
          <hr className="border-gray-300" />
          <VenuePrice venue={venue} />
          <hr className="border-gray-300" />
          <VenueAbout venue={venue} />
          <hr className="border-gray-300" />
          <VenueAmenity venue={venue} />
          <hr className="border-gray-300" />
          <VenueService venue={venue} />
          <hr className="border-gray-300" />
          <VenueSettting venue={venue} />
          <hr className="border-gray-300" />
          <VenueAwards venue={venue} />
          <hr className="border-gray-300" />
          <VenueSpace venue={venue} />
          <hr className="border-gray-300" />
          <VenuePackages venue={venue} />
          <hr className="border-gray-300" />
        </div>
      </section>
    </main>
  );
}

export default VenueContent;
