import { useState, Fragment } from "react";
import "./index.css";
import { initalState } from "./data";

export default function App() {
  return (
    <div className="App">
      <NestedCheckbox />
    </div>
  );
}

function NestedCheckbox() {
  const [dataObjArr, setDataObjArr] = useState(initalState);

  return (
    <RenderCheckbox dataObjArr={dataObjArr} setDataObjArr={setDataObjArr} />
  );
}

function RenderCheckbox({ dataObjArr, setDataObjArr }) {
  // const dataObj = dataObjMap[checkboxId];

  const handleCheckboxUpdate = (e, nodeId) => {
    setDataObjArr((prevDataArr) => {
      let copyDataArr = [...prevDataArr];
      // update current checkbox useState + update children's state
      updateTargetAndChildTree(nodeId, copyDataArr, e.target.checked);

      // update parent's state
      updateParentTree(copyDataArr);

      return copyDataArr;
    });
  };

  function updateTargetAndChildTree(nodeId, dataMapArr, checkedValue) {
    const stack = [];
    let targetNode = null;
    stack.push(...dataMapArr);

    while (targetNode === null) {
      const node = stack.pop();
      if (node.id === nodeId) {
        targetNode = node;
        break;
      }

      if (node.children?.length > 0) {
        stack.unshift(...node.children);
      }
    }
    if (targetNode) {
      targetNode.isChecked = checkedValue;
      const queue = [];
      queue.push(...targetNode.children);

      while (queue.length) {
        let node = queue.pop();
        node.isChecked = checkedValue;
        queue.push(...node.children);
      }
    }
  }

  function updateParentTree(dataArr) {
    function shouldNodeBeChecked(node) {
      if (node.children?.length > 0) {
        let areAllChildrenChecked = true;
        for (const childNode of node.children) {
          childNode.isChecked = shouldNodeBeChecked(childNode);

          if (childNode.isChecked === false) {
            areAllChildrenChecked = false;
          }
        }
        return areAllChildrenChecked;
      } else return node.isChecked;
    }

    dataArr.forEach((node) => {
      node.isChecked = shouldNodeBeChecked(node);
    });
  }

  return (
    <>
      {dataObjArr.map((dataObj, idx) => {
        return (
          <Fragment key={idx}>
            <div>
              <input
                id={dataObj.id}
                type={"checkbox"}
                checked={dataObj.isChecked}
                onChange={(e) => handleCheckboxUpdate(e, dataObj.id)}
              />
              <span>{dataObj.label}</span>
            </div>
            <div style={{ paddingLeft: "50px" }}>
              {dataObj.children?.length > 0 && (
                <RenderCheckbox
                  dataObjArr={dataObj.children}
                  setDataObjArr={setDataObjArr}
                />
              )}
            </div>
          </Fragment>
        );
      })}
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
