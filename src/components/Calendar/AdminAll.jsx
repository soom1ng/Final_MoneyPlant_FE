import React from "react";
import styled from "styled-components";
import BlockLine from "../Common/BlockLine";
import AdminSchedule from "./AdminSchedule";
import AdminLedger from "./AdminLedger";

const AdminAll = ({setValue}) => {


  return (
    <AdminAllContainer>
      <BlockLine />

      {/* 일정 */}
      <AdminSchedule/>

      <BlockLine />

      {/* 가계부 */}
      <AdminLedger value={setValue}/>

    </AdminAllContainer>
  );
};

export default AdminAll;

const AdminAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


