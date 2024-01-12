import { useStore } from "@nanostores/solid";
import CardStackedVerticalList from "./CardStackedVerticalList";
import { $slideCards } from "../stores/Cards";

const SlideDownSearchResults = (props) => {

    const sideCards = useStore($slideCards);

    return (
        <div>
            <CardStackedVerticalList cards={sideCards()} singleCol={true} />
        </div>
    );
}
export default SlideDownSearchResults;