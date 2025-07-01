import React from 'react';

import DashboardLayout from "shared-ui/layout/DashboardLayout";
import DashboardNavbar from "shared-ui/layout/DashboardNavbar";
import Footer from "shared-ui/layout/Footer";
import EditorController from "shared-ui/components/editor/EditorController";
import { roleConfig } from "./role-config"

function RolesEditor() {
    return (
        <DashboardLayout>
        <DashboardNavbar absolute={true}/>
            <EditorController
                registerConfig={roleConfig}
            />
        <Footer/>
        </DashboardLayout>
    );
}

export default RolesEditor;

