
const QuickCardDetails = ({cardJSON}) => {
    return (
        <div class="flex grow pl-4">
            <p class="self-center">{cardJSON['name']}</p>
            <p></p>    
        </div>
    );
}
export default QuickCardDetails;