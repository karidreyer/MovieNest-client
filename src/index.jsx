import { createRoot } from "react-dom/client"
import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';


// Import React Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Main component (will eventually use all the others)
const MovieNestApplication = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

//Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells Reach to render your app in the root DOM element
root.render(<MovieNestApplication />);