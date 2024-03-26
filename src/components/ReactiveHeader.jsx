import { $selectedCard } from "./PrettyMuchTheIndexPage.jsx";
import SearchBar from "./SearchBar.jsx";
import ThemeToggle from "./ThemeToggle.jsx";


const ReactiveHeader = () => {

    const clearCard = () => {
        $selectedCard.set({});
    }

    return (
        <nav class="flex grow items-center justify-between m-auto">
            <h1 class="flex shrink w-fit">
                <a onclick={() => clearCard()} class="h-min" href="/" >MTG Card Search Site!</a>
            </h1>
            <div class="flex grow lg:grow max-w-2xl mx-3">
                <SearchBar client:visible />
            </div>
            <ThemeToggle client:load />
            <a href={'/decks'}>My Decks! :D</a>
        </nav>
    );
}

export default ReactiveHeader;