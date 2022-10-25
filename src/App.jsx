import FormData from "./xml/form.xml?raw";
import ElementStructure from "./elements-structure/structure.json";
import GridData from "./elements-structure/grid.json";
import Layout from "./components/Layout.jsx";
import {ElementsCreatorFromXml} from "./utils/createElementsFromXml.jsx";

function App() {
  const elementsCreator = new ElementsCreatorFromXml(FormData, ElementStructure, GridData);
  return (
    <Layout firstMargin={16}>
        {elementsCreator.createElements()}
    </Layout>
  )
}

export default App
