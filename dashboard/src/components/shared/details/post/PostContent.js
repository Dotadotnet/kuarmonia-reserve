import  Tag  from '@/components/icons/Tag';
import SkeletonText from "@/components/shared/skeletonLoading/SkeletonText";

const PostContent = ({ content, isLoading,title ,selectedTags }) => (
    <>
    <div className="text-lg flex mt-4 justify-center">{title}</div>
    <div className="text-base leading-8 my-1 px-2 text-justify">
      {content ? (
        <div
        dangerouslySetInnerHTML={{
          __html: content
        }}
        ></div>
      ) : (
        <SkeletonText lines={8} />
      )}
  
  {selectedTags?.length > 0 ? (
              selectedTags.map((item) => (
                <div
                  key={item.id}
                  className="bg-blue-100  text-blue-700 px-2 py-1 rounded-md flex items-center gap-1 "
                >
                 <span className="mr-1"><Tag /></span>
                  {item.value}
                 
                </div>
              ))
            ) : (
              <SkeletonText lines={1} />
            )}
    </div>
      </>
  );
  export default PostContent;