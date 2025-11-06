import React from "react";
import CKEditorBlock from "@/components/shared/pageBuilder/CKEditorBlock";
import ImageBlock from "@/components/shared/pageBuilder/ImageBlock";
import ListBlock from "@/components/shared/pageBuilder/ListBlock";
import TitleBlock from "@/components/shared/pageBuilder/TitleBlock";
import TableBlock from "@/components/shared/pageBuilder/TableBlock";
import BlockControls from "@/components/shared/pageBuilder/BlockControls";

const ContentBlock = ({ 
  block, 
  index, 
  totalBlocks, 
  onUpdate, 
  onRemove, 
  onMoveUp, 
  onMoveDown,
  onUploadImage,
  onDeleteImage
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case "title":
        return (
          <TitleBlock 
            content={block.content} 
            onChange={(content) => onUpdate(block.id, content)} 
          />
        );
      case "ckeditor":
        return (
          <CKEditorBlock 
            content={block.content} 
            onChange={(content) => onUpdate(block.id, content)} 
          />
        );
      case "image":
        return (
          <ImageBlock 
            content={block.content} 
            onChange={(content) => onUpdate(block.id, content)} 
            onUpload={onUploadImage}
            onDelete={onDeleteImage}
          />
        );
      case "list":
        return (
          <ListBlock 
            items={block.content} 
            onChange={(content) => onUpdate(block.id, content)} 
          />
        );
      case "table":
        return (
          <TableBlock 
            content={block.content} 
            onChange={(content) => onUpdate(block.id, content)} 
          />
        );
      default:
        return <div>Unknown block type: {block.type}</div>;
    }
  };

  return (
    <div className="content-block mb-4 p-4 border rounded">
      <BlockControls
        blockId={block.id}
        index={index}
        totalBlocks={totalBlocks}
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
      
      <div className="block-content">
        {renderBlockContent()}
      </div>
    </div>
  );
};

export default ContentBlock;