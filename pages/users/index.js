import React from 'react';

import DashboardLayout from "shared-ui/layout/DashboardLayout";
import DashboardNavbar from "shared-ui/layout/DashboardNavbar";
import Footer from "shared-ui/layout/Footer";
import EditorController from "shared-ui/components/editor/EditorController";
import { userConfig } from "./user-config"

function UsersEditor() {
    return (
        <DashboardLayout>
        <DashboardNavbar absolute={true}/>
            <EditorController
                registerConfig={userConfig}
            />
        <Footer/>
    </DashboardLayout>
    );
}

export default UsersEditor;