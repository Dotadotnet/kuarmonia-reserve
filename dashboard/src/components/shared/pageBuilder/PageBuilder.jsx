import React, { useState } from "react";
import ContentBlock from "@/components/shared/pageBuilder/ContentBlock";
import BlockToolbar from "@/components/shared/pageBuilder/BlockToolbar";
import { useUploadMutation } from "@/services/upload/uploadApi";

const PageBuilder = ({ initialValue = "", onChange }) => {
  // Parse initial HTML content into blocks
  const [blocks, setBlocks] = useState(() => {
    if (initialValue) {
      // For now, we'll treat the entire content as a single CKEditor block
      // In a more advanced implementation, we could parse HTML into different block types
      return [
        {
          id: Date.now(),
          type: "ckeditor",
          content: initialValue
        }
      ];
    }
    return [];
  });

  const [upload] = useUploadMutation();

  // Add a new block
  const addBlock = (type, index = blocks.length) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: type === "title" ? { text: "", icon: null } :
               type === "ckeditor" ? "" : 
               type === "image" ? { images: [], caption: "" } :
               type === "list" ? { listTitle: "", items: [{ text: "", icon: null }] } : // Initialize with one empty item
               type === "table" ? { title: "", rows: [[]], columns: ["ستون 1"] } : ""
    };

    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, newBlock);
    setBlocks(newBlocks);
    onChange(serializeBlocks(newBlocks));
  };

  // Update a block
  const updateBlock = (id, content) => {
    const newBlocks = blocks.map(block => 
      block.id === id ? { ...block, content } : block
    );
    setBlocks(newBlocks);
    onChange(serializeBlocks(newBlocks));
  };

  // Remove a block
  const removeBlock = (id) => {
    const newBlocks = blocks.filter(block => block.id !== id);
    setBlocks(newBlocks);
    onChange(serializeBlocks(newBlocks));
  };

  // Move a block up
  const moveBlockUp = (id) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index <= 0) return;

    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    setBlocks(newBlocks);
    onChange(serializeBlocks(newBlocks));
  };

  // Move a block down
  const moveBlockDown = (id) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index === -1 || index >= blocks.length - 1) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setBlocks(newBlocks);
    onChange(serializeBlocks(newBlocks));
  };

  // Upload an image
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const result = await upload(formData).unwrap();
      return result.data.url; // Assuming the API returns the URL in result.data.url
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  // Delete an image
  const deleteImage = async (imageUrl) => {
    // In a real implementation, you would call an API to delete the image
    // For now, we'll just log it
    console.log("Deleting image:", imageUrl);
  };

  // Serialize blocks to HTML
  const serializeBlocks = (blocksToSerialize) => {
    return blocksToSerialize.map(block => {
      if (block.type === "title") {
        // Handle title block with icon using Tailwind classes
        // Responsive text sizing: smaller on mobile, larger on desktop
        // Remove bold styling on mobile
        if (block.content.icon && block.content.text) {
          return `<h2 class="flex items-center gap-2 text-lg md:text-2xl font-normal  text-gray-900 dark:text-white"><span class="inline-block w-5 h-5">${block.content.icon.symbol}</span> ${block.content.text}</h2>`;
        } else if (block.content.text) {
          return `<h2 class="text-lg md:text-2xl font-normal  text-gray-900 dark:text-white">${block.content.text}</h2>`;
        }
        return "";
      } else if (block.type === "ckeditor") {
        // Make CKEditor content smaller on mobile and remove bold styling
        return `<div class="text-sm md:text-base font-normal">${block.content}</div>`;
      } else if (block.type === "image") {
        // Handle multiple images with responsive grid layout using Tailwind classes
        // Single column on mobile, two columns on desktop
        // With glassmorphism effect for captions
        const imagesHtml = block.content.images.map(img => {
          // If image has a caption, create overlay with glassmorphism effect
          if (img.caption) {
            return `
              <div class="relative">
                <div class="flex justify-center">
                  <img src="${img.url}" alt="${img.alt}" class="max-w-full h-auto rounded-lg my-2" />
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-b-lg p-1">
                  <p class="!text-white text-center text-xs md:text-sm">${img.caption}</p>
                </div>
              </div>
            `;
          } else {
            // If no caption, just show the image normally
            return `
              <div class="flex justify-center">
                <img src="${img.url}" alt="${img.alt}" class="max-w-full h-auto rounded-lg my-2" />
              </div>
            `;
          }
        }).join("");
        
        return `
          <div class="my-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${imagesHtml}
            </div>
            ${block.content.caption ? `<p class="text-center text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base">${block.content.caption}</p>` : ""}
          </div>
        `;
      } else if (block.type === "list") {
        // Handle the new list structure with icons using Tailwind classes
        // Remove bold styling on mobile
        // Fix icon vertical alignment for multi-line text
        // Add support for individual list item styles
        const styleOptions = [
          { value: "default", class: "" },
          { value: "blue", class: "flex items-center gap-1 p-1 md:p-2 dark:bg-gray-800 dark:border-gray-700 border-gray-100 w-fit bg-blue-200 border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-shadow" },
          { value: "red", class: "flex items-center gap-1 p-1 md:p-2 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-red-50 border border-red-200 w-fit rounded-xl shadow-sm hover:shadow-md transition-shadow" },
          { value: "green", class: "flex items-center gap-1 p-1 md:p-2 dark:bg-gray-800 dark:border-gray-700 border-gray-100 w-fit bg-green-50 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-shadow" }
        ];
        
        let html = "";
        if (block.content.listTitle) {
          html += `<h3 class="text-base md:text-lg font-normal text-gray-800 dark:text-white my-2">${block.content.listTitle}</h3>`;
        }
        
        const items = block.content.items.map(item => {
          // Get the style class for this specific item
          const itemStyle = styleOptions.find(style => style.value === (item.style || "default")) || styleOptions[0];
          
          if (item.icon && item.icon.symbol) {
            // Include icon in the list item using Tailwind classes
            // Use flexbox to vertically center icon with multi-line text
            return `<li class="${itemStyle.class} mb-1 flex text-sm md:text-base font-normal">
              <span class="flex-shrink-0 w-4 h-4 ltr:mr-2 rtl:ml-2">${item.icon.symbol}</span>
              <span>${item.text}</span>
            </li>`;
          }
          return `<li class="${itemStyle.class} mb-1 text-sm md:text-base font-normal">${item.text}</li>`;
        }).join("");
        
        return `<ul class="mb-4 space-y-1">${items}</ul>`;
      } else if (block.type === "table") {
        // Handle table block with Tailwind classes
        // Remove bold styling on mobile
        // Modified to use w-fit, center alignment, and proper borders
        let html = '<div class="my-4 flex justify-center"><table class="w-fit bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-xs md:text-sm">';
        
        // Add header row with title if exists
        if (block.content.columns && block.content.columns.length > 0) {
          html += '<thead class="bg-gray-50 dark:bg-gray-700 text-xs"><tr>';
          
          // If table has a title, add it as the first header cell that spans all columns
          if (block.content.title) {
            html += `<th class="px-4 py-3 text-center font-normal text-gray-900 dark:text-white text-sm md:text-base border border-gray-200 dark:border-gray-600" colspan="${block.content.columns.length}">${block.content.title}</th>`;
            html += '</tr><tr>'; // Start a new row for column headers
          }
          
          // Add column headers with borders
          block.content.columns.forEach(col => {
            html += `<th class="px-4 py-3 text-center font-normal text-gray-900 dark:text-white text-xs md:text-sm border border-gray-200 dark:border-gray-600">${col}</th>`;
          });
          html += '</tr></thead>';
        }
        
        // Add body rows with borders
        if (block.content.rows && block.content.rows.length > 0) {
          html += '<tbody>';
          block.content.rows.forEach(row => {
            html += '<tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">';
            row.forEach(cell => {
              html += `<td class="px-4 py-3 text-center text-gray-900 dark:text-white text-xs md:text-sm font-normal border border-gray-200 dark:border-gray-600">${cell}</td>`;
            });
            html += '</tr>';
          });
          html += '</tbody>';
        }
        
        html += '</table></div>';
        return html;
      }
      return "";
    }).join("");
  };

  return (
    <div className="page-builder">
      <BlockToolbar onAddBlock={addBlock} />
      
      <div className="blocks-container">
        {blocks.map((block, index) => (
          <ContentBlock
            key={block.id}
            block={block}
            index={index}
            totalBlocks={blocks.length}
            onUpdate={updateBlock}
            onRemove={removeBlock}
            onMoveUp={moveBlockUp}
            onMoveDown={moveBlockDown}
            onUploadImage={uploadImage}
            onDeleteImage={deleteImage}
          />
        ))}
      </div>
    </div>
  );
};

export default PageBuilder;