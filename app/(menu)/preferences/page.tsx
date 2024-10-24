import Breadcrumb from '@/components/Common/bread-crumb'
import React from 'react'
import Services from '@/components/(menu)/Services/services'
import { Metadata } from 'next'
import Preferences from '@/components/(menu)/Preferences/preferences'

export const metadata: Metadata = {
    title: "Preferences"
}
const PreferencesPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Preferences"
description = "Who are you looking to meet?  &nbsp;We will match you with the best based on your CQ (compatibility quotient) and theirs."            />

            <Preferences />
        </>
    );
};

export default PreferencesPage;
