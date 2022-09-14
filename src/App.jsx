import React, { useEffect, useState } from "react";
import "./styles.css";
const resultData = {
  departmentList: [
    {
      departmentCd: "id_000",
      departmentName: "組織0",
      belongList: [
        {
          departmentCd: "id_001",
          departmentName: "組織1",
          belongList: []
        },
        {
          departmentCd: "id_002",
          departmentName: "組織2",
          belongList: []
        }
      ]
    },
    {
      departmentCd: "id_003",
      departmentName: "組織3",
      belongList: [
        {
          departmentCd: "id_004",
          departmentName: "組織4",
          belongList: [
            {
              departmentCd: "id_005",
              departmentName: "組織5"
              // belongList: []
            }
          ]
        }
      ]
    }
  ]
};

export const App = () => {
  const [state, setState] = useState({ departmentList: [] });

  /** 親子関係のある組織名を”/”区切りで結合し、
   * 【組織名】として表示する。 */
  /** 組織階層形式で返却(1-5階層全て) */
  const createBelongList = (
    departmentList /** 親の配列と第二階層以降が渡されている */
  ) => {
    // 返却値
    const rtnOrgList = [];
    //階層を保持した親配列にて ループ処理
    // console.log(departmentList);
    departmentList.forEach((dep) => {
      // プルダウンリストを生成
      rtnOrgList.push({
        departmentCd: dep.departmentCd,
        departmentName: dep.departmentName,
        belongList: dep.belongList
      });
      // 第二階層以降
      // console.log(dep.belongList);
      // 子組織がある場合
      if (dep.belongList.length !== 0) {
        belongHierarchy(dep.belongList, [dep.departmentName], rtnOrgList);
      }
      // 組織0
      // console.log([dep.departmentName]);
    });
    // console.log(rtnOrgList);
    return rtnOrgList;
    //中身
    /** (3) [Object, Object, Object]
    0: Object
    departmentCd: "id_000"
    departmentName: "組織0"
    belongList: Array(2)
      > 0: Object
        departmentCd: "id_001"
        departmentName: "組織1"
        belongList: Array(0)
      > 1: Object
        departmentCd: "id_002"
        departmentName: "組織2"
        belongList: Array(0)
    1: Object
    departmentCd: "id_001"
    departmentName: "組織0 / 組織1"
    belongList: Array(0)
    2: Object
    departmentCd: "id_002"
    departmentName: "組織0 / 組織2"
    belongList: Array(0) */
  };

  /** 子階層を生成 */
  const belongHierarchy = (belongList /** 第二階層以降 */, parent, orgList) => {
    const setOrgList = orgList;
    belongList.forEach((dep) => {
      // console.log(dep.belongList);
      /** 中身
       * (1) [Object]
            0: Object
            departmentCd: "id_005"
            departmentName: "組織5"
       */
      // console.log(dep.departmentName);
      /** 中身
       * 組織1 
       組織2 
       組織4 
       組織5 
       */
      // 階層名称を生成
      const setParent = [...parent, dep.departmentName];
      // プルダウンリストを生成
      setOrgList.push({
        departmentCd: dep.departmentCd,
        departmentName: setParent.join(" / "),
        belongList: dep.belongList
      });
      // console.log(setParent)
      // console.log(dep.belongList)
      // 子組織がある場合
      if (dep.belongList.length !== 0) {
        //（階層数だけループ処理）
        belongHierarchy(dep.belongList, setParent, setOrgList);
      }
    });
  };

  useEffect(() => {
    /** 第一階層 */
    const setOrganizationList = resultData.departmentList.map((dep) => {
      /** 第二階層以降 */
      const belong = [
        {
          belongList: dep.belongList,
          departmentCd: dep.departmentCd,
          departmentName: dep.departmentName
        }
      ];
      // console.log(dep)
      /** 第一階層目 */
      const topOrganization = {
        departmentCd: dep.departmentCd,
        departmentName: dep.departmentName,
        belongList: createBelongList(belong)
      };
      return topOrganization;
    });

    setState({ ...state, departmentList: setOrganizationList });
  }, []);

  return (
    <div className="App">
      <h1>Hierarchy</h1>
      <p>{state.departmentList}</p>
    </div>
  );
};
