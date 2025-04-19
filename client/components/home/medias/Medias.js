import MediasClient from "./MediasClient";

const MediasServer = async () => {
  const api = `${process.env.API}/media/get-medias`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["medias"] },
  });
  const res = await response.json();
  const medias = res.data;

  return <MediasClient medias={medias} />;
};

export default MediasServer;
