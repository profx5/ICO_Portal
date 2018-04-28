import React from 'react'
//containers
import ContentWrapper from './js/containers/ContentWrapper'
import Warnings from './js/containers/Warnings'
import UserOffice from './js/containers/UserOffice'
import NavSidebar from './js/containers/NavSidebar'

const App = () => {
    return (
        <div>
            <Warnings/>
            <ContentWrapper
                left={<NavSidebar/>}
                rest={<UserOffice/>}/>
        </div>
    )
}

export default App;
