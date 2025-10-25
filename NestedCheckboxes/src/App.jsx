import { useState } from "react";
import "./index.css";
import { initalState } from "./data";

function transformInitialDataObj(dataObj) {
  const queue = [],
    resultMap = {},
    currentParentId = null;
  queue.push(dataObj);

  while (queue.length) {
    let currentObj = queue.pop();

    const childrenIdArr = [];
    for (const obj of currentObj.children) {
      childrenIdArr.push(obj.id);
      queue.push({ ...obj, currentParentId: currentObj.id });
    }

    resultMap[currentObj.id] = {
      id: currentObj.id,
      parentId: currentObj.currentParentId || null,
      label: currentObj.label,
      isChecked: currentObj.isChecked,
      childrenIdArr,
    };
  }

  return resultMap;
}

export default function App() {
  return (
    <div className="App">
      <NestedCheckbox />
    </div>
  );
}

function NestedCheckbox() {
  const rootObjId = initalState.id;
  const [dataObjMap, setDataObjMap] = useState(
    transformInitialDataObj(initalState)
  );

  return (
    <RenderCheckbox
      checkboxId={rootObjId}
      dataObjMap={dataObjMap}
      setDataObjMap={setDataObjMap}
    />
  );
}

function RenderCheckbox({ checkboxId, dataObjMap, setDataObjMap }) {
  const dataObj = dataObjMap[checkboxId];

  const handleCheckboxUpdate = (e) => {
    setDataObjMap((prevDataMap) => {
      let copyDataMap = { ...prevDataMap };
      // update current checkbox useState
      copyDataMap[checkboxId].isChecked = e.target.checked; // to confirm this

      // update children's state
      updateChildTree(checkboxId, dataObjMap, e.target.checked);

      // update parent's state
      const parentId = dataObj.parentId;
      if (parentId) updateParentTree(parentId, copyDataMap);

      return copyDataMap;
    });
  };

  function updateChildTree(parentId, copyDataMap, checkedValue) {
    const queue = [];
    queue.push(...copyDataMap[parentId].childrenIdArr);

    while (queue.length) {
      let childId = queue.pop();
      copyDataMap[childId].isChecked = checkedValue;
      queue.push(...copyDataMap[childId].childrenIdArr);
    }
  }

  function updateParentTree(parentId, copyDataMap) {
    let areAllChildrenChecked = true;
    const parentObj = copyDataMap[parentId];
    for (const id of parentObj.childrenIdArr) {
      if (copyDataMap[id].isChecked === false) {
        areAllChildrenChecked = false;
        break;
      }
    }
    if (areAllChildrenChecked === false) {
      let existingParentState = parentObj.isChecked;
      if (existingParentState === true) {
        parentObj.isChecked = false;
        if (parentObj.parentId)
          updateParentTree(parentObj.parentId, copyDataMap);
      }
    } else {
      parentObj.isChecked = true;
      if (parentObj.parentId) updateParentTree(parentObj.parentId, copyDataMap);
    }
  }

  return (
    <>
      <div>
        <input
          id={dataObj.id}
          type={"checkbox"}
          checked={dataObj.isChecked}
          onChange={handleCheckboxUpdate}
        />
        <span>{dataObj.label}</span>
      </div>
      <div style={{ paddingLeft: "50px" }}>
        {dataObj.childrenIdArr?.length > 0 &&
          dataObj.childrenIdArr.map((childId) => (
            <RenderCheckbox
              key={childId}
              checkboxId={childId}
              dataObjMap={dataObjMap}
              setDataObjMap={setDataObjMap}
            />
          ))}
      </div>
    </>
  );
}

/*

id  number
label string
isChecked boolean
children []

1. Update initial structure and add parent
2. UI render
3. loigc on check change -
  on check - check all children + bubble up and keep on checking parent till, any one sibling isn't checked
  on uncheck - uncheck all children + bubble up and uncheck all parents if checked
*/
