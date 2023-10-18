import { configureStore } from "@reduxjs/toolkit"
import profile from "./profile"
import center from "./center";
import siteSetting from "./siteSetting";
import chat from "./chat";
import bot from "./bot";

const store = configureStore({
    reducer:{ profile, center, siteSetting, chat, bot }
})

export default store;