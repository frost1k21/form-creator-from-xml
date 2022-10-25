import Row from "../components/Row.jsx";
import Grid from "../components/Grid.jsx";
import Textbox from "../components/Textbox.jsx";
import Datechooser from "../components/Datechooser.jsx";


let xmlString, arrayElementsStructure, gridData;

export class ElementsCreatorFromXml {
    constructor(xmlStringProp, arrayElementsStructureProp, gridDataProp) {
        xmlString = xmlStringProp
        arrayElementsStructure = arrayElementsStructureProp;
        gridData = gridDataProp;
    }

    createElements() {
        const elements = [];

        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlString, "application/xml");
        const xmlElements = doc.documentElement.querySelector("Layout").children;

        for (const xmlElement of xmlElements) {
            elements.push(getAttributes(xmlElement));
        }
        return elements;
    }
}

function getAttributes(xmlElement) {
    const namedNodeMap = xmlElement.attributes;
    const typeElement = namedNodeMap.getNamedItem("type");
    if (typeElement) {
        switch (typeElement.nodeValue) {
            case "row":
                return (
                    <Row>
                        {getNestedElements(xmlElement.children)}
                    </Row>);
            case "grid":
                return createGrid(xmlElement);
            default:
                return ;
        }
    }
    return (
        <Row>
            {getComponentFromRegularElement(xmlElement)}
        </Row>
    )
}

function getComponentFromRegularElement(xmlElement) {
    const namedNodeMap = xmlElement.attributes;
    const field = namedNodeMap.getNamedItem("field").nodeValue;
    
    const [alias, code] = field.split(".");
    const elementStructure = arrayElementsStructure.find(el => el.alias === alias && el.code === code);
    if (!elementStructure) return;
    switch (elementStructure.type) {
        case "textbox":
            return createTextbox(xmlElement, elementStructure);
        case "datechooser":
            return createDatechooser(xmlElement, elementStructure);
    }
}

function getNestedElements(nestedXmlElements) {
    const elements = [];
    for (const xmlElement of nestedXmlElements) {
        elements.push(getComponentFromRegularElement(xmlElement))
    }
    return elements;
}

function createTextbox(xmlElement, elementStructure) {
    const [moveToRight, extendToRight, label] = getBehavior(xmlElement);
    
    const props = {
        title: (label) ? elementStructure.title : undefined,
        position: label,
        moveToRight: moveToRight,
        extendToRight: extendToRight,
    }
    return <Textbox {...props}/>
}

function createDatechooser(xmlElement, elementStructure) {
    const [moveToRight, extendToRight, label] = getBehavior(xmlElement);
    
    const props = {
        title: (label) ? elementStructure.title : undefined,
        position: label,
        moveToRight: moveToRight,
        extendToRight: extendToRight,
    }
    return <Datechooser {...props}/>
}


function getBehavior(xmlElement) {
    const moveToRight = !!xmlElement.attributes.getNamedItem("movetoright")?.nodeValue;
    const extendToRight = !!xmlElement.attributes.getNamedItem("extendtoright")?.nodeValue;
    const label = xmlElement.attributes.getNamedItem("label")?.nodeValue;
    
    return [moveToRight, extendToRight, label];
}

function createGrid(xmlElement) {
    const extendToBottom = !!xmlElement.attributes.getNamedItem("extendtobottom")?.nodeValue;
    const header = [...gridData.header];
    const body = [...gridData.body];
    return <Grid extendToBottom header={header} body={body}/>
}
