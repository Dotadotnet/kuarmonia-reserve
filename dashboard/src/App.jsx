import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Providers from "./providers";
import Auth from "./auth"
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/auth/signin/index";
import SignUp from "./pages/auth/signup/index";
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
import Galleries  from "./pages/galleries";
import Properties  from "./pages/properties";
import AddProperty  from "./pages/properties/add";
import PropertyTrades  from "./pages/prop-trades";
import PropSales  from "./pages/prop-sales";
import PropTypes  from "./pages/prop-types";
import Venues  from "./pages/venues";
import AddVenue  from "./pages/venues/add";
import VenueType  from "./pages/venue-types";
import VenueService  from "./pages/venue-services";
import VenueAmenities  from "./pages/venue-amenities";
import VenueStandard  from "./pages/venue-standards";
import AddVenueStandard from "./pages/venue-standards/add";
import VenueSetting  from "./pages/venue-settings";
import VenueAward  from "./pages/venue-awards";
import AddVenueAward from "./pages/venue-awards/add";
import CeremonyType  from "./pages/ceremony-types";
import VenueVendor  from "./pages/venue-vendors";
import AddVenueVendor from "./pages/venue-vendors/add";
import News from "./pages/news";
import AddNews from "./pages/news/add";
import Settings from "./pages/settings";

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
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/tags" element={<Tags />} />
          <Route exact path="/categories" element={<Categories/>} />
          <Route exact path="/socialLinks" element={<SocialLinks />} />
          <Route exact path="/currencies" element={<Currencies />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/posts/add" element={<AddPost />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blogs/add" element={<AddBlog/>} />
          <Route exact path="/galleries" element={<Galleries  />} />
          <Route exact path="/categories/add" element={<AddCategory />} />
          <Route path="/posts/info/:id" element={<PostInfo />} />
          <Route exact path="/properties" element={<Properties />} />
          <Route exact path="/properties/add" element={<AddProperty />} />
          <Route exact path="/prop-trades" element={<PropertyTrades />} />
          <Route exact path="/prop-sales" element={<PropSales />} />
          <Route exact path="/prop-types" element={<PropTypes />} />
          <Route exact path="/venues" element={<Venues />} />
          <Route exact path="/venues/add" element={<AddVenue />} />
          <Route exact path="/venue-types" element={<VenueType />} />
          <Route exact path="/venue-services" element={<VenueService />} />
          <Route exact path="/venue-amenities" element={<VenueAmenities />} />
          <Route exact path="/venue-settings" element={<VenueSetting />} />
          <Route exact path="/venue-awards" element={<VenueAward />} />
          <Route exact path="/venue-awards/add" element={<AddVenueAward />} />
          <Route exact path="/venue-standards" element={<VenueStandard />} />
          <Route exact path="/venue-standards/add" element={<AddVenueStandard />} />
          <Route exact path="/venue-ceremony-types" element={<CeremonyType />} />
          <Route exact path="/venue-vendors/add" element={<AddVenueVendor />} />
          <Route exact path="/venue-vendors" element={<VenueVendor />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/news/add" element={<AddNews />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </Auth>
    </Providers>
  );
}

export default App;
