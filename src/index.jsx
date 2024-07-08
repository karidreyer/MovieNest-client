import { createRoot } from "react-dom/client"
import { MainView } from "./components/main-view/main-view";

//Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//Main component (will eventually use all the others)
const MovieNestApplication = () => {
    return <MainView />;
};

//Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells Reach to render your app in the root DOM element
root.render(<MovieNestApplication />);