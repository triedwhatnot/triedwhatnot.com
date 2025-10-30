import { files } from './data';
import './App.css';
import { useState, useRef, createContext, useEffect, useContext } from 'react';

const sortFileFolderArr = (dataArr) => {
  // folder, files - alphabatically sorting
  // index where files start
  const folderArr = [], fileArr = [];

  for(let i=0; i<dataArr.length; i++){
    if(dataArr[i].isFolder === true) folderArr.push(dataArr[i]);
    else fileArr.push(dataArr[i]);
  }
  folderArr.sort(sortingUtility);
  fileArr.sort(sortingUtility);

  folderArr.forEach((folder, idx, arr) => {
    const response = sortFileFolderArr(folder.children);
    arr[idx].children = response.fileData;
    arr[idx].fileStartIdx = response.fileStartIdx;
  })

  return {
    fileStartIdx: folderArr.length,
    fileData: [...folderArr, ...fileArr],
  }
}

const sortingUtility = (a, b) => (a?.name).localeCompare(b?.name);

const FileStructureContext = createContext();

export default function App() {
  const [fileDataObj, setFileDataObj] = useState(sortFileFolderArr(files));
  const [activeLevel, setActiveLevel] = useState("DEFAULT");
  const [isAddNewActive, setIsAddNewActive] = useState(false);
  const [addNewType, setAddNewType] = useState(null);
  
  const handleClickEvent = (e) => {
    // e.stopPropagation();
    // setActiveLevel("DEFAULT");
  }

  const buttonHandler = (type) => {
    setAddNewType(type);
    setIsAddNewActive(true);
  }

  return (
    <div className='flex flex-col gap-5' onClick={handleClickEvent}>
      <div className='flex gap-2'>
        <button onClick={() => buttonHandler("file")} className='p-1 px-2 border-black border rounded-md text-sm'>Add file</button>
        <button onClick={() => buttonHandler("folder")} className='p-1 px-2 border-black border rounded-md text-sm'>Add folder</button>
      </div>
        
      <div className='border-black border-[1px] p-2 w-[300px]'>
        <FileStructureContext.Provider value={{
          activeLevel, setActiveLevel, isAddNewActive, setIsAddNewActive, addNewType,setAddNewType, setFileDataObj
        }}>
          <RenderFileStructure fileArr={fileDataObj.fileData} fileStartIdx={fileDataObj.fileStartIdx} levelName={"DEFAULT"} />
        </FileStructureContext.Provider>
      </div>
    </div>
      
  )
}

const AddNewElement = ({ type }) => {
  const fileStructureCtx = useContext(FileStructureContext);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const saveNewElement = () => {
    if(inputRef.current.value){
      // logic to save this file in fileData
      fileStructureCtx.setFileDataObj(prevFileDataObj => {
        const copyFileDataObj = JSON.parse(JSON.stringify(prevFileDataObj));
        
        if(fileStructureCtx.activeLevel === "DEFAULT"){
          copyFileDataObj.fileData = addElement(copyFileDataObj.fileData, copyFileDataObj.fileStartIdx);
          if(fileStructureCtx.addNewType === "folder") copyFileDataObj.fileStartIdx++;
        }
        else{
          let targetLevel = null;
          const queue = [];
          queue.push(...copyFileDataObj.fileData);

          while(targetLevel === null){
            const node = queue.pop();
            if(node.name === fileStructureCtx.activeLevel){
              targetLevel = node;
            }
            else{
              if(node.children?.length > 0) queue.push(...node.children);
            }
          }

          targetLevel.children = addElement(targetLevel.children, targetLevel.fileStartIdx);
          if(fileStructureCtx.addNewType === "folder") targetLevel.fileStartIdx++;
        }
        return copyFileDataObj;
      });

      function addElement(array, fileStartIdx){
        const newData = {
          name: inputRef.current.value,
          isFolder: fileStructureCtx.addNewType === "folder",
          children: [],
          fileStartIdx: 0,
        }

        const folderArr = array.slice(0, fileStartIdx);
        const fileArr = array.slice(fileStartIdx);
        const targetArr = fileStructureCtx.addNewType === "folder" ? folderArr : fileArr;
        targetArr.push(newData);
        targetArr.sort(sortingUtility);

        return [...folderArr, ...fileArr];
      }
    }

    // remove this component from DOM - update state
    fileStructureCtx.setIsAddNewActive(false);
    fileStructureCtx.setAddNewType(null);
  }

  const handleEnterClick = (e) => {
    e.stopPropagation();
    if(e.key === "Enter") saveNewElement();
  }

  return (
    <div className='flex gap-1 items-center' onKeyDown={handleEnterClick}>
      {type === "folder" && <img className={`h-2.5`} src={"https://www.iconpacks.net/icons/2/free-arrow-right-icon-3098-thumb.png"} />}
      <img src={type === "folder" ? "https://cdn-icons-png.flaticon.com/512/5994/5994710.png" : "https://images.freeimages.com/fic/images/icons/2813/flat_jewels/512/file.png"} className={"h-4"} />
      <input onBlur={saveNewElement} ref={inputRef} type='text' className='px-2 text-md min-w-28' />
    </div>
  )
}

const RenderFileStructure = ({fileArr, fileStartIdx, levelName}) => {
  const fileStructureCtx = useContext(FileStructureContext);

  return (
    <>
    {
      fileStructureCtx.isAddNewActive && levelName === fileStructureCtx.activeLevel && fileStructureCtx.addNewType === "folder" && <AddNewElement type={"folder"} />
    }
    {
      fileArr.slice(0, fileStartIdx).map((folder, idx) => <Folder key={folder.name} fileName={folder.name} fileStartIdx={folder.fileStartIdx} childFileArr={folder.children} /> )
    }
    {
      fileStructureCtx.isAddNewActive && levelName === fileStructureCtx.activeLevel && fileStructureCtx.addNewType === "file" && <AddNewElement type={"file"} />
    }
    {
      fileArr.slice(fileStartIdx).map((file, idx) => <FileHeader  key={file.name} fileName={file.name} /> )
    }
    </>
  )
}

const Folder = ({fileName, childFileArr, fileStartIdx}) => {
  const fileStructureCtx = useContext(FileStructureContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionToggle = () => {
    setIsOpen(isOpen => !isOpen);
  }

  useEffect(() => {
    if(fileStructureCtx.activeLevel === fileName && isOpen === false) setIsOpen(true);
  }, [fileStructureCtx.activeLevel, fileStructureCtx.addNewType]);

  const handleClickEvent = (e) => {
    e.stopPropagation();
    fileStructureCtx.setActiveLevel(fileName);
  }

  return (
    <div onClick={handleClickEvent}>
      <FileHeader clickHandler={handleAccordionToggle} fileName={fileName} isOpen={isOpen} />
      {
        isOpen &&
        <div className='pl-5'>
          <RenderFileStructure fileArr={childFileArr} fileStartIdx={fileStartIdx} levelName={fileName} />
        </div>
      }
    </div>
  )
}

const FileHeader = ({fileName, clickHandler, isOpen}) => {

  return (
    <div {...(clickHandler ? {onClick: clickHandler} : {})} className={`flex items-center ${clickHandler ? "cursor-pointer" : "cursor-default"}`}>
      {clickHandler && <img className={`h-2.5 pr-1 ${isOpen ? "rotate-90" : ""}`} src={"https://www.iconpacks.net/icons/2/free-arrow-right-icon-3098-thumb.png"} />}
      <img src={getIcon(fileName)} className={"h-4 pr-1"} />
      <span>{fileName}</span>
    </div>
  )
}

function getIcon(fileName){
  if (fileName.endsWith(".js")) {
    return "https://cdn-icons-png.flaticon.com/512/4726/4726005.png";
  } else if (fileName.endsWith(".css")) {
    return "https://cdn-icons-png.flaticon.com/512/2656/2656408.png";
  } else if (fileName.endsWith(".html")) {
    return "https://cdn-icons-png.flaticon.com/512/4248/4248142.png";
  } else if (fileName.endsWith(".json")) {
    return "https://png.pngtree.com/png-clipart/20190630/original/pngtree-json-file-document-icon-png-image_4166911.jpg";
  } else {
    return "https://cdn-icons-png.flaticon.com/512/5994/5994710.png";
  }
}


/*
  expandable : accordion
    - arrow + icon + name
  non expandable : name
    - icon + name

    renderFolder(fileObj)
      - isFolder && children.length ? <Accordion>{children.forEach(renderFolder)}</Accordion> : <Filename />

    add new file / folder
      - state: 
        1. ctaTypeClicked - file/folder
        2. isAddNewActive - show component on relevant level, remove on blur
        3. activeLevel - default to top

    1. need to transform fileDataArr - folder, then file. both alphabettically. keep a count of files starting index
    2. render - add new folder > folders > add new file > files
    3. context API to communicate everything in the tree
    4. save on blur
    5. current level - expand/collapse - prevent propogation and update current level basis click received in a folder
    

*/