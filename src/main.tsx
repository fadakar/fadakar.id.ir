import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import TagManager from 'react-gtm-module'
import {GOOGLE_TAG_ID} from "./settings.ts";

import App from './App.tsx'
import './index.css'


const tagManagerArgs = {
    gtmId: GOOGLE_TAG_ID,
}
TagManager.initialize(tagManagerArgs)


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
