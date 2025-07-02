import React from 'react';

import DashboardLayout from "shared-ui/layout/DashboardLayout";
import DashboardNavbar from "shared-ui/layout/DashboardNavbar";
import Footer from "shared-ui/layout/Footer";
import EditorController from "shared-ui/components/editor/EditorController";
import { userConfig } from "./user-config"
import EditorFilter from 'shared-ui/components/editor/EditorFilter';

function UsersEditor() {
    return (
        <DashboardLayout>
        <DashboardNavbar absolute={true}/>
            <EditorController
                registerConfig={userConfig}

                defaultFilterData={{ active: true }}
                renderFilter={
                    ({ filterData, setFilterData }) => {
                    return (
                        <EditorFilter
                            filterData={filterData}
                            setFilterData={setFilterData} 
                            fields={[
                                { label: "Ativos", name: "active", default: true, type: "boolean" },
                            ]}/>
                    );
                }}
            />
        <Footer/>
    </DashboardLayout>
    );
}

export default UsersEditor;