import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Providers from "./providers";
import Auth from "./auth";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/auth/signin/index";
import SignUp from "./pages/auth/signup/index";
import MyProfile from "./pages/my-profile/index";
import Users from "./pages/users/index";
import { Toaster } from "react-hot-toast";
import Categories from "./pages/categories";
import SocialLinks from "./pages/socialLinks";
import AddCategory from "./pages/categories/add";
import Tags from "./pages/tags";
import Currencies from "./pages/currencies";
import Posts from "./pages/posts";
import AddPost from "./pages/posts/add";
import Blogs from "./pages/blogs";
import PostInfo from "./pages/posts/info/index";
import BlogInfo from "./pages/blogs/info/index";
import AddBlog from "./pages/blogs/add";
import Galleries from "./pages/galleries";
import Properties from "./pages/properties";
import AddProperty from "./pages/properties/add";
import PropertyTrades from "./pages/prop-trades";
import Sales from "./pages/prop-sales";
import PropTypes from "./pages/prop-types";
import Award from "./pages/awards";
import AddAward from "./pages/awards/add";
import Standard from "./pages/standards";
import AddStandard from "./pages/standards/add";
import Venues from "./pages/venues";
import AddVenue from "./pages/venues/add";
import VenueType from "./pages/venue-types";
import VenueService from "./pages/venue-services";
import VenueAmenities from "./pages/venue-amenities";
import VenueSetting from "./pages/venue-settings";
import CeremonyType from "./pages/ceremony-types";
import VenueVendor from "./pages/venue-vendors";
import AddVenueVendor from "./pages/venue-vendors/add";
import JobTypes from "./pages/job-types";
import JobTimes from "./pages/job-times";
import JobModes from "./pages/job-modes";
import EmploymentTypes from "./pages/employment-types";
import ExperienceLevels from "./pages/experience-levels";
import ResidencyStatus from "./pages/residency-status";
import CitizenshipOutcome from "./pages/citizenship-outcome";
import InstitutionType from "./pages/institution-type";
import Institutions from "./pages/institutions";
import AddInstitutions from "./pages/institutions/add";
import Opportunities from "./pages/opportunities";
import AddOpportunitie from "./pages/opportunities/add";
import News from "./pages/news";
import AddNews from "./pages/news/add";
import NewsCountry from "./pages/news-countries";
import Countries  from "./pages/countries";
import NewsType from "./pages/news-types";
import Settings from "./pages/settings";
import Aboutus from "./pages/settings/aboutus";
import AddMember from "./pages/settings/aboutus/add";
import Rents from "./pages/rents";
import AddRent from "./pages/rents/add";
import Faqs from "./pages/settings/faqs";
import AddFaqs from "./pages/settings/faqs/add";
import Services from "./pages/settings/services";
import AddService from "./pages/settings/services/add";
import Banners from "./pages/banners";
import Stories from "./pages/stories";
import AddStory from "./pages/stories/add";
import VisaTypes from "./pages/visa-types";
import AddVisaType from "./pages/visa-types/add";
import Visas from "./pages/visas";
import AddVisa from "./pages/visas/add";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    document.querySelector("html").setAttribute("dir", "rtl");
  }, [location.pathname]);
  return (
    <Providers>
      <Toaster />
      <Auth>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/my-profile" element={<MyProfile />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/tags" element={<Tags />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/socialLinks" element={<SocialLinks />} />
          <Route exact path="/currencies" element={<Currencies />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/posts/add" element={<AddPost />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blogs/add" element={<AddBlog />} />
          <Route exact path="/stories/add" element={<AddStory />} />
          <Route exact path="/stories" element={<Stories />} />
          <Route exact path="/banners" element={<Banners />} />
          <Route exact path="/galleries" element={<Galleries />} />
          <Route exact path="/categories/add" element={<AddCategory />} />
          <Route path="/posts/info/:id" element={<PostInfo />} />
          <Route exact path="/properties" element={<Properties />} />
          <Route exact path="/countries" element={<Countries />} />
          <Route exact path="/properties/add" element={<AddProperty />} />
          <Route exact path="/prop-trades" element={<PropertyTrades />} />
          <Route exact path="/prop-sales" element={<Sales />} />
          <Route exact path="/prop-types" element={<PropTypes />} />
          <Route exact path="/awards" element={<Award />} />
          <Route exact path="/awards/add" element={<AddAward />} />
          <Route exact path="/standards" element={<Standard />} />
          <Route exact path="/standards/add" element={<AddStandard />} />
          <Route exact path="/venues" element={<Venues />} />
          <Route exact path="/venues/add" element={<AddVenue />} />
          <Route exact path="/venue-types" element={<VenueType />} />
          <Route exact path="/visa-types/add" element={<AddVisaType />} />
          <Route exact path="/visa-types" element={<VisaTypes />} />
          <Route exact path="/visas/add" element={<AddVisa />} />
          <Route exact path="/visas" element={<Visas />} />
          <Route exact path="/venue-services" element={<VenueService />} />
          <Route exact path="/venue-amenities" element={<VenueAmenities />} />
          <Route exact path="/venue-settings" element={<VenueSetting />} />

          <Route
            exact
            path="/venue-ceremony-types"
            element={<CeremonyType />}
          />
          <Route exact path="/venue-vendors/add" element={<AddVenueVendor />} />
          <Route exact path="/venue-vendors" element={<VenueVendor />} />
          <Route exact path="/job-types" element={<JobTypes />} />
          <Route exact path="/job-times" element={<JobTimes />} />
          <Route exact path="/job-modes" element={<JobModes />} />
          <Route exact path="/employment-types" element={<EmploymentTypes />} />
          <Route
            exact
            path="/experience-levels"
            element={<ExperienceLevels />}
          />
          <Route
            exact
            path="/citizenship-outcome"
            element={<CitizenshipOutcome />}
          />
          <Route exact path="/residency-status" element={<ResidencyStatus />} />
          <Route exact path="/institution-type" element={<InstitutionType />} />
          <Route exact path="/institutions" element={<Institutions />} />
          <Route exact path="/institutions/add" element={<AddInstitutions/>} />
          <Route exact path="/opportunities" element={<Opportunities />} />
          <Route exact path="/Opportunities/add" element={<AddOpportunitie/>} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/news/add" element={<AddNews />} />
          <Route exact path="/news-countries" element={<NewsCountry />} />
          <Route exact path="/news-types" element={<NewsType />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/settings/aboutus/" element={<Aboutus />} />
          <Route exact path="/settings/aboutus/add" element={<AddMember />} />
          <Route exact path="/settings/faqs/" element={<Faqs />} />
          <Route exact path="/settings/faqs/add" element={<AddFaqs />} />
          <Route exact path="/rents/" element={<Rents />} />
          <Route exact path="/rents/add" element={<AddRent />} />
          <Route exact path="/settings/services/" element={<Services />} />
          <Route exact path="/settings/services/add" element={<AddService />} />
        </Routes>
      </Auth>
    </Providers>
  );
}

export default App;
